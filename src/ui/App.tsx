import {useState} from "react";
import {VBox} from "./components/layout/box/Box";
import "./global.scss";
import {StartPage} from "./pages/startpage/StartPage";

function Beauty() {
    return <p>Говно</p>;
}

export function App() {
    const [showBeauty, setShowBeauty] = useState(false);

    return (
        <VBox fullSize={true}>
            {!showBeauty && <StartPage onButtonClick={() => setShowBeauty(true)}/>}
            {showBeauty && <Beauty/>}
        </VBox>
    )
}1