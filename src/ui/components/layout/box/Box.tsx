import React, {CSSProperties, ReactElement, ReactNode} from "react";
import {maybe, some} from "../../../../util/Option";
import {HtmlNodeProps} from "../../../ReactUtils";
import "./Box.scss";
import {BoxJustify} from "./BoxJustify";

export type Box_props = HtmlNodeProps<HTMLDivElement> & {
    fullSize?: boolean,
}

export type LineBox_props = Box_props & {
    reverse?: boolean,
    justify?: BoxJustify,
    spacing?: number,
}

export type SingleBox_props = Box_props & {
    children: ReactElement,
}

type BoxInfo = {
    children: ReactNode | undefined,
    divProps: HtmlNodeProps<HTMLDivElement>
}

class BoxInfoBuilder {
    boxInfo: BoxInfo;

    constructor({children, fullSize, ...rest}: Box_props) {
        this.boxInfo = {
            children: children,
            divProps: rest
        }

        this.modifyStyle(s => {
            if (fullSize) {
                if (maybe(s.width).isEmpty()) {
                    s.width = "100%";
                }
                if (maybe(s.height).isEmpty()) {
                    s.height = "100%";
                }
            }
        });
    }

    build(): ReactElement {
        return <div children={this.boxInfo.children}
                    {...this.boxInfo.divProps}/>
    }

    addLineProps({justify, reverse, spacing}: LineBox_props,
                 className: string,
                 spacingStyle: (_: number) => React.CSSProperties) {
        if (reverse) {
            className += "_Reverse";
        }
        this.addCssClass(className);
        if (justify) {
            this.addCssClass(justify.toCssClass());
        }
        // noinspection SuspiciousTypeOfGuard
        if (spacing && this.boxInfo.children instanceof Array) {
            let children = new Array(this.boxInfo.children.length * 2 - 1);
            for (let i = 0; i < this.boxInfo.children.length - 1; i++) {
                let i0 = i * 2;
                let i1 = i0 + 1;
                children[i0] = this.boxInfo.children[i];
                children[i1] = <div key={i} style={spacingStyle(spacing)}></div>
            }
            children[children.length - 1] = this.boxInfo.children[this.boxInfo.children.length - 1];
            this.boxInfo.children = children
        }
        return this;
    }

    modifyStyle(fn: (_: CSSProperties) => void) {
        maybe(this.boxInfo.divProps.style)
            .ifEmpty(() => this.boxInfo.divProps.style = {})
            .orElse(this.boxInfo.divProps.style as CSSProperties)
            .accept(fn);
        return this;
    }

    addCssClass(cl: string) {
        some(this.boxInfo.divProps).accept(
            x => x.className = maybe(x.className)
                .map(y => y + " " + cl)
                .orElse(cl)
                .get());
        return this;
    }
}

export function Box(props: Box_props) {
    return new BoxInfoBuilder(props).build();
}

export function VBox(props: LineBox_props) {
    return new BoxInfoBuilder(props)
        .addLineProps(props, "VBox", x => {
            return {
                width: 1,
                height: x
            }
        })
        .build();
}

export function HBox(props: LineBox_props) {
    return new BoxInfoBuilder(props)
        .addLineProps(props, "HBox", x => {
            return {
                width: x,
                height: 1
            }
        })
        .build();
}

export function CenterBox(props: SingleBox_props) {
    return new BoxInfoBuilder(props)
        .addCssClass("CenterBox")
        .build();
}
