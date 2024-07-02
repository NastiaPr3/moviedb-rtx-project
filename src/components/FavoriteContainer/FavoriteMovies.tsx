import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {FavoriteMoviesList} from "./FavoriteMoviesList";

import css from './Favorite.module.css'

const FavoriteMovies = () => {

    const {movies} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme);

    const [trigger, setTrigger] = useState(true)


    useEffect(() => {
        const accountId = localStorage.getItem('account_id');
        const sessionId = localStorage.getItem('session_id')
        dispatch(authActions.getFavoriteMovies({accountId, sessionId}))
    }, [dispatch, trigger]);


    return (
        <div className={`${css.Favorite} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
                <div className={css.cards}>
                    {
                        movies && movies.map(movie => <FavoriteMoviesList key={movie.id} movie={movie}
                                                                          setTrigger={setTrigger}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export {FavoriteMovies};