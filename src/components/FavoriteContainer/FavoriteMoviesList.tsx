import {FC, PropsWithChildren, useEffect} from "react";
import {IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from "../FavoriteContainer/Favorite.module.css";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux/slices/authSlice";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const FavoriteMoviesList: FC<IProps> = ({movie}) => {

    const {id, title, poster_path, vote_average} = movie;
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const deleteFromFav = () => {
        const accountId = localStorage.getItem('account_id');
        const sessionId = localStorage.getItem('session_id')

        dispatch(authActions.deleteFavoriteMovie({accountId, sessionId, movieId: id}))
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