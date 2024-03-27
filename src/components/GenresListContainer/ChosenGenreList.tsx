import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import css from './ChosenGenre.module.css'

interface IProps extends PropsWithChildren {
    genreMovie: IMovie
}

const ChosenGenreList: FC<IProps> = ({genreMovie}) => {

    const {id, title, poster_path, vote_average} = genreMovie;
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    return (
        <div className={`${css.MovieCard} ${theme === 'light' ? css.lightCards : css.darkCards}`}
             onClick={() => navigate(`/movie/${id}`)}>
            <img className={css.images} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            <div className={`${css.text} ${theme === 'light' ? css.lightText : css.darkText}`}>
                <p>{title}</p>
            </div>
        </div>
    );
};

export {ChosenGenreList};