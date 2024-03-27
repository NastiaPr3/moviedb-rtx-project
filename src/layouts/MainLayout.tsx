import {Outlet} from "react-router-dom";

import {Header} from "../components";
import css from './MainLayout.module.css'
import {useAppSelector} from "../hooks";

const MainLayout = () => {
    const {theme} = useAppSelector(state => state.theme);
    return (
        <div className={`${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <Header/>
            <Outlet/>
        </div>

    );
};

export {MainLayout};