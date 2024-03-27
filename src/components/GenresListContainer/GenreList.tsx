import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IGenres} from "../../interfaces";

import css from './GenresList.module.css'

interface IProps extends PropsWithChildren {
    genre: IGenres
}

const GenreList: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const navigate = useNavigate();

    return (
        <button className={css.btn} onClick={() => navigate(`/chosenGenre/${id}/${name}`)}>{name}</button>
    );
};

export {GenreList};