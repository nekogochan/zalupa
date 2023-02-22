import "./global.scss";
import {CenterBox, HBox, VBox} from "./components/layout/box/Box";
import {FlexJustify} from "./components/layout/box/BoxJustify";
import {StringArtPage} from "./pages/string_art_generator/StringArtPage";

const {Center} = FlexJustify

export function App() {
    return (
        <VBox fullSize={true}>
            <StringArtPage/>
        </VBox>
    )
}