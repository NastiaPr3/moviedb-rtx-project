import {Outlet} from "react-router-dom";

import {useAppSelector} from "../hooks";

import css from "./MainLayout.module.css";

const AuthLayout = () => {
    const {theme} = useAppSelector(state => state.theme);

    return (
        <div className={`${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <Outlet/>
        </div>
    );
};

export {AuthLayout};