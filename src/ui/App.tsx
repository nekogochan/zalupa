import {GhostsDebugNoise} from "@/ui/pages/ghosts/debug/GhostsDegubNoise";
import {Ghosts} from "@/ui/pages/ghosts/Ghosts";
import {Links} from "@/ui/pages/Links";
import {Route, Routes} from "react-router-dom";
import {VBox} from "./components/layout/box/Box";
import "./global.scss";
import {StartPage} from "./pages/startpage/StartPage";

export function App() {
    return (
        <VBox fullSize={true}>
            <Routes>
                <Route index element={<StartPage/>}/>
                <Route path={Links.Ghosts} element={<Ghosts/>}/>
                <Route path={"/ghosts-debug"} element={<GhostsDebugNoise/>}/>
            </Routes>
        </VBox>
    )
}