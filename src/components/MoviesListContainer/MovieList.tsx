import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

import css from './Movies.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const MovieList: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;
    const {theme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const addToFav = () => {
        const accountId = localStorage.getItem('account_id');
        const sessionId = localStorage.getItem('session_id')

        dispatch(authActions.addFavoriteMovie({accountId, sessionId, movieId: id} ))
        alert(`${title} has been added to the favorite list`)
    }

    return (
        <div className={`${css.MovieCard} ${theme === 'light' ? css.lightCards : css.darkCards}`}>
            <img src={require('../../images/like.png')} alt="" className={css.like} onClick={addToFav}/>
            <img className={css.images} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} onClick={() => navigate(`/movie/${id}`)}/>
            <div className={`${css.text} ${theme === 'light' ? css.lightText : css.darkText}`}>
                <p>{title}</p>
            </div>
        </div>
    );
};

export {
    MovieList
};