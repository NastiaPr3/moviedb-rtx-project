import {Outlet} from "react-router-dom";

import {Header} from "../components";
import {useAppSelector} from "../hooks";

import css from './MainLayout.module.css'

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