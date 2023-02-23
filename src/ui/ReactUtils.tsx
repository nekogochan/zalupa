import React from "react";

export type HtmlNodeProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export type SingleProp<T, K extends string> = {
    [key in K]: T
}

export const emptyReactNode = <></>;