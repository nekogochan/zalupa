import {GhostsDebugNoise} from "@/ui/pages/ghosts/debug/GhostsDegubNoise";
import {Ghosts} from "@/ui/pages/ghosts/Ghosts";
import {Route, Routes, useNavigate} from "react-router-dom";
import {VBox} from "./components/layout/box/Box";
import "./global.scss";
import {StartPage} from "./pages/startpage/StartPage";

export function App() {
    const navigate = useNavigate();

    return (
        <VBox fullSize={true}>
            <Routes>
                <Route index element={<StartPage onComplete={() => navigate("/beauty")}/>}/>
                <Route path={"/beauty"} element={<Ghosts/>}/>
                <Route path={"/beauty-debug"} element={<GhostsDebugNoise/>}/>
            </Routes>
        </VBox>
    )
}