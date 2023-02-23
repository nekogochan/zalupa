import "./global.scss";
import {VBox} from "./components/layout/box/Box";
import {StringArtPage} from "./pages/string_art_generator/StringArtPage";

export function App() {
    return (
        <VBox fullSize={true}>
            <StringArtPage/>
        </VBox>
    )
}