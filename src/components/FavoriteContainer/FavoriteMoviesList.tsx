import React, {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

import css from "../FavoriteContainer/Favorite.module.css";

interface IProps extends PropsWithChildren {
    movie: IMovie;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavoriteMoviesList: FC<IProps> = ({movie, setTrigger}) => {

    const {id, title, poster_path} = movie;
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

        const deleteFromFav = () => {
            const accountId = localStorage.getItem('account_id');
            const sessionId = localStorage.getItem('session_id')
            dispatch(authActions.deleteFavoriteMovie({accountId, sessionId, movieId: id}))
            setTrigger(prevState => !prevState)
        }

    return (
        <div className={`${css.MovieCard} ${theme === 'light' ? css.lightCards : css.darkCards}`}>
            <img src={require('../../images/remove.png')} alt="" className={css.remove} onClick={deleteFromFav}/>
            <img className={css.images} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}
                 onClick={() => navigate(`/movie/${id}`)}/>
            <div className={`${css.text} ${theme === 'light' ? css.lightText : css.darkText}`}>
                <p>{title}</p>
            </div>
        </div>
    );
};

export {FavoriteMoviesList};