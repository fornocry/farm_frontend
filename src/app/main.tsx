import './globals.css'

import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router, Routes as ReactRoutes, Route} from "react-router-dom";
import InventoryPage from "../pages/inventory.tsx";
import {useEffect} from "react";
import {initMiniApp, initViewport} from '@telegram-apps/sdk-react';
import TasksPage from "../pages/tasks.tsx";
import FriendsPage from "../pages/friends.tsx";
import {LevelSelector} from "../pages/levels/levelSelector.tsx";
import {AnimatePresence} from "framer-motion";

createRoot(document.querySelector("body")!).render(
    <App/>
)

const initializeTelegramSDK = async () => {
    try {
        const [miniApp] = initMiniApp();
        const [viewport] = initViewport();
        const vp = await viewport;
        miniApp.setHeaderColor("#61898d")
        miniApp.setBgColor("#FFFFFF")
        miniApp.ready();
        if (!vp.isExpanded) {
            vp.expand();
        }
        return true
    } catch (error) {
        console.error('Ошибка при инициализации Telegram:', error);
        return false;
    }
}

function App() {

    // const [isTelegram, setIsTelegram] = useState(false)

    useEffect(() => {
        const initialize = async () => {
            await initializeTelegramSDK();
            // setIsTelegram(isTelegramData)
        };
        document.body.style.setProperty("touch-action", "none", "important");
        initialize();
    }, []);


    return (
        <AnimatePresence>
            <Router>
                <ReactRoutes location={location}>
                    <Route path="/" element={<LevelSelector/>}/>
                    <Route path="/inv" element={<InventoryPage/>}/>
                    <Route path="/tasks" element={<TasksPage/>}/>
                    <Route path="/friends" element={<FriendsPage/>}/>
                </ReactRoutes>
            </Router>
        </AnimatePresence>
    )
}