import {useState} from "react";
import "src/ui/components/beauty/CrossBtn.scss"
import {PrintedText} from "src/ui/components/dynamic/PrintedText";
import {Box, CenterBox} from "src/ui/components/layout/box/Box";
import {Header} from "src/ui/components/layout/header/Header";
import {emptyReactNode} from "src/ui/ReactUtils";
import "./StartPage.scss";

export type StartPage_props = {
    onButtonClick: () => void;
}

export function StartPage({onButtonClick}: StartPage_props) {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);

    return <Box className={"StartPage " + (btnHovered ? "has-shit-hovered" : "has-shit")} fullSize>
        <Header>
            <PrintedText text={"А не пойти бы тебе нахуй"} delay={50} onComplete={() => setShowSecondRow(true)}/>
            {showSecondRow && <h2>
                <PrintedText text={"Сынок ёбаный?"} delay={50} onComplete={() => setShowBtn(true)}/>
            </h2>
            }
        </Header>
        <CenterBox className={"cross-btn-container"}>
            {showBtn
                ? <button onClick={onButtonClick}
                          onMouseEnter={() => setBtnHovered(true)}
                          onMouseLeave={() => setBtnHovered(false)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    ПОЙТИ НАХУЙ
                </button>
                : emptyReactNode}
        </CenterBox>
    </Box>
}