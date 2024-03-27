import * as React from "react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {additionalActions} from "../../redux";
import {ActorFilm} from "./ActorFilm";

import css from './ActorFilms.module.css'

const ActorFilms = () => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {actor} = useAppSelector(state => state.additional);
    const {theme} = useAppSelector(state => state.theme);

    useEffect(() => {
        dispatch(additionalActions.getActorMovies(parseInt(id)))
    }, []);

    return (
        <div className={`${css.ActorMovies} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={css.btnDiv}>
                <button onClick={() => navigate(-1)}
                        className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`}>Back
                </button>
            </div>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
                <div className={css.cards}>
                    {
                        actor && actor.map(movie => <ActorFilm key={id} movie={movie}/>)
                    }
                </div>
            </div>
        </div>

    );
};

export {ActorFilms};