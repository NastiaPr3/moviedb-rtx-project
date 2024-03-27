import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {authActions} from "../../redux/slices/authSlice";
import {FavoriteMoviesList} from "./FavoriteMoviesList";

import css from './Favorite.module.css'

const FavoriteMovies = () => {

    const {movies} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme);

    useEffect(() => {
        const accountId = localStorage.getItem('account_id');
        const sessionId = localStorage.getItem('session_id')
        dispatch(authActions.getFavoriteMovies({accountId, sessionId}))
    }, []);
    
    return (
        <div className={`${css.Favorite} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
                <div className={css.cards}>
                    {
                        movies && movies.map(movie => <FavoriteMoviesList key={movie.id} movie={movie}/>)
                    }
                </div>

            </div>

        </div>
    );
};

export {FavoriteMovies};