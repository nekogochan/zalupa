import {useState} from "react";
import {CrossBtn} from "@/ui/components/beauty/CrossBtn";
import "@/ui/components/beauty/CrossBtn.scss"
import {PrintedText} from "@/ui/components/dynamic/PrintedText";
import {Box} from "@/ui/components/layout/box/Box";
import {Header} from "@/ui/components/layout/header/Header";
import {emptyReactNode} from "@/ui/ReactUtils";
import "./StartPage.scss";

export type StartPage_props = {
    onComplete: () => void;
    onDebug: () => void;
}

export function StartPage({onComplete, onDebug}: StartPage_props) {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);

    let boxExtraClass = (btnClicked || btnHovered) ? "has-btn-hovered" : '';
    if (btnClicked) boxExtraClass += " has-btn-clicked";

    const onBtnClick = () => {
        if (btnClicked) return;
        setTimeout(onComplete, 1000);
        setBtnClicked(true);
    }

    return <Box className={"StartPage " + boxExtraClass} fullSize>
        <Header>
            <PrintedText text={"Hello wanderer"} delay={50} onComplete={() => setShowSecondRow(true)}/>
            {showSecondRow && <h2>
                <PrintedText text={"Seek for something?"} delay={50} onComplete={() => setShowBtn(true)}/>
            </h2>}
        </Header>
        <CrossBtn onClick={onDebug}
                  color={"red"}>
            I want to debug
        </CrossBtn>
        <div className={"main"}>
            {showBtn
                ? <CrossBtn onClick={onBtnClick}
                            fakeHover={btnClicked}
                            onMouseEnter={() => setBtnHovered(true)}
                            onMouseLeave={() => setBtnHovered(false)}>
                    I want to see ghosts
                </CrossBtn>
                : emptyReactNode}
        </div>
    </Box>
}