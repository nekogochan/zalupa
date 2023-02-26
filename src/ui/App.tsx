import {Route, Routes, useNavigate} from "react-router-dom";
import {Beauty} from "@/ui/pages/beauty/Beauty";
import {VBox} from "./components/layout/box/Box";
import "./global.scss";
import {StartPage} from "./pages/startpage/StartPage";

export function App() {
    const navigate = useNavigate();

    return (
        <VBox fullSize={true}>
            <Routes>
                <Route index element={<StartPage onComplete={() => navigate("/beauty")}/>}/>
                <Route path={"/beauty"} element={<Beauty/>}/>
            </Routes>
        </VBox>
    )
}