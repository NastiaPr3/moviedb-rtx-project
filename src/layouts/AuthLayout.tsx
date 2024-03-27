import {Outlet} from "react-router-dom";
import css from "./MainLayout.module.css";
import {useAppSelector} from "../hooks";

const AuthLayout = () => {
    const {theme} = useAppSelector(state => state.theme);

    return (
        <div className={`${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <Outlet/>
        </div>
    );
};

export {AuthLayout};