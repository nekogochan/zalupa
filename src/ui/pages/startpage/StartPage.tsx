import {useState} from "react";
import {PrintedText} from "src/ui/components/dynamic/PrintedText";
import {Box, CenterBox} from "src/ui/components/layout/box/Box";
import {Header} from "src/ui/components/layout/header/Header";

export type StartPage_props = {
    onButtonClick: () => void;
}

export function StartPage({onButtonClick}: StartPage_props) {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    return <Box className={"StartPage"} fullSize>
        <Header>
            <PrintedText text={"А не пойти бы тебе нахуй"} delay={50} onComplete={() => setShowSecondRow(true)}/>
            {showSecondRow &&
                <h2><PrintedText text={"Сынок ёбаный"} delay={50} onComplete={() => setShowBtn(true)}/></h2>}
        </Header>
        {showBtn && (
            <CenterBox fullSize>
                <button onClick={onButtonClick}>
                    ПОЙТИ НАХУЙ
                </button>
            </CenterBox>
        )}
    </Box>
}