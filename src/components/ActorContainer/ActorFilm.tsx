import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import css from './ActorFilms.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const ActorFilm: FC<IProps> = ({movie}) => {

    const {id, title, poster_path} = movie;
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    return (
        <div>
            <div className={`${css.MovieCard} ${theme === 'light' ? css.lightCards : css.darkCards}`}
                 onClick={() => navigate(`/movie/${id}`)}>
                <img className={css.images}
                     src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : require('../../images/notFound.jpg')}
                     alt={title}/>
                <div className={`${css.text} ${theme === 'light' ? css.lightText : css.darkText}`}>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    );
};

export {ActorFilm};