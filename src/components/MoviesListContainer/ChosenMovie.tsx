import {useParams} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {DetailsOfChosenMovie} from "./DetailsOfChosenMovie";

const ChosenMovie = () => {

    const {movie} = useAppSelector(state => state.movie);
    const {id} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getById(parseInt(id)))
    }, []);

    return (
        <div>
            {
                movie && <DetailsOfChosenMovie key={movie.id} movie={movie}/>
            }
        </div>
    );
};

export {ChosenMovie};