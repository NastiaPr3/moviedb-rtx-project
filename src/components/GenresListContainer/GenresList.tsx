import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreListActions} from "../../redux";
import {GenreList} from "./GenreList";

import css from './GenresList.module.css'

const GenresList = () => {

    const {genres} = useAppSelector(state => state.genreList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreListActions.getGenresList())
    }, []);

    return (
        <div className={css.GenresList}>
            {
                genres.map(genre => <GenreList key={genre.id} genre={genre}/>)
            }
        </div>
    );
};

export {GenresList};