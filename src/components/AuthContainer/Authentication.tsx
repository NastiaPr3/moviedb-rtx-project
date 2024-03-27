import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

import css from './Auth.module.css';

const Authentication = () => {

    const {theme} = useAppSelector(state => state.theme);
    const {req, accountId, sessionId} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(authActions.getRequestToken())
    }
    const requestToken = req && req
    if (requestToken) {
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/auth`;
        localStorage.setItem('request_token', requestToken)
    }

    const click = () => {
        const token = localStorage.getItem('request_token');
        dispatch(authActions.createSession(token));
        alert('You received session id')
    }
    sessionId && localStorage.setItem('session_id', sessionId);
    const sesId = localStorage.getItem('session_id')

    dispatch(authActions.getAccountDetails(sesId))
    const accId = accountId && accountId.toString()
    localStorage.setItem('account_id', accId);

    const deleteSession = () => {
        const sessId = localStorage.getItem('session_id');
        dispatch(authActions.deleteSession(sessId));
        localStorage.removeItem('request_token')
        localStorage.removeItem('session_id')
        localStorage.removeItem('account_id')
    }

    return (
        <div className={`${css.Auth} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
                <h3>If you want to get more opportunities to use the site, namely to manage the list of Favorite movies
                    (for
                    now), follow these steps:</h3>

                <h4>
                    1: Get the request token (After clicking the button, you will be transferred to the site
                    where you need to click the "Approve" button)
                </h4>
                <button className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`} onClick={handleClick}>Get request token</button>
                <br/>

                <h4>2: get session id</h4>
                <button className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`} onClick={click}>Get session id</button>

                <h4>Now you can use the favorite list</h4>

                <h4>If u wanna log out, just press this button</h4>

                <button className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`} onClick={deleteSession}>DeleteSession</button>

            </div>
        </div>
    );
};

export {Authentication};