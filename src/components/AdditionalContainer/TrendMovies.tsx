import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import css from './Trending.module.css'

interface IProps extends PropsWithChildren {
    trend: IMovie
}

const TrendMovies: FC<IProps> = ({trend}) => {

    const {id, title, poster_path} = trend;
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    return (
        <div className={`${css.card} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <img onClick={() => navigate(`/movie/${id}`)} className={css.cardImage}
                 src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            <p>{title}</p>
        </div>
    );
};

export {TrendMovies};