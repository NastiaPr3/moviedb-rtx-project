import {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import {useAppLocation} from "../hooks";

interface IProps extends PropsWithChildren {

}

const AuthRequired:FC<IProps> = ({children}) => {

    const sessionId = localStorage.getItem('session_id')

    const {pathname} = useAppLocation();

    if (!sessionId) {
        return <Navigate to={'/auth'} state={{pathname}}/>
    }

    return (
       <>
           {children}
       </>
    );
};

export {AuthRequired};