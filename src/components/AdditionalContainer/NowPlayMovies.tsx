import {FC, PropsWithChildren} from "react";

import {IMovie} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {additionalActions} from "../../redux";

import css from './NowPlaying.module.css';

interface IProps extends PropsWithChildren {
    nowPlay: IMovie
}

const NowPlayMovies: FC<IProps> = ({nowPlay}) => {

    const {title, poster_path} = nowPlay;

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(additionalActions.setMovie(nowPlay))
    }

    return (
        <div className={css.SliderCard} onClick={handleClick}>
            <img className={css.SliderImages} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
            <div>{title}</div>
        </div>
    );
};

export {NowPlayMovies};