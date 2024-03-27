import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {GenresList} from "../GenresListContainer";
import {useAppDispatch, useAppSelector} from "../../hooks";

import {MaterialUISwitch} from '../../styles';
import css from './Header.module.css';

import FormControlLabel from '@mui/material/FormControlLabel';
import {themeActions} from "../../redux/slices/themeSlice";

const Header = () => {
    const {theme} = useAppSelector(state => state.theme);
    const {register, reset, handleSubmit} = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleThem = () => {
        dispatch(themeActions.toggleTheme())
    }

    const submit = (data: any) => {
        if (data.name.includes(' ')) {
            const replaceName = data.name.replace(/\s+/g, '-')
            navigate(`/search/${replaceName}`, {state: {replaceName}});
            reset()
        } else {
            const nm = data.name
            navigate(`search/${data.name}`, {state: {nm}})
            reset()
        }
    }

    return (
        <div className={`${css.Header} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>

            <div className={css.home}>
                <Link to={'/movies'}>Home</Link>
            </div>

            <div className={css.Genres}>
                Genres
                <div className={css.genresList}>
                    <GenresList/>
                </div>
            </div>


            <div className={css.Form_and_Button}>
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder={'Search movie...'} {...register('name')}
                           className={`${css.Input} ${theme === 'light' ? css.inputLight : css.inputDark}`}/>
                    <button className={`${css.SearchButton} ${theme === 'light' ? css.lightBtn : css.darkBtn}`}>Search
                    </button>
                    <svg className={`${css.icon} ${theme === 'light' ? css.lightIcon : css.darkIcon}`} focusable="false"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </form>

                <div className={css.switcher}>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{m: 1}}/>}
                        label=""
                        checked={theme === 'dark'} onChange={toggleThem}
                    />
                </div>

                <div>
                    <Link to={'/auth'} className={css.linkAuth}>Auth</Link>
                    <Link to={'/favorite'} className={css.linkFav}>Favorite</Link>
                </div>

                <div className={css.UserDiv}>
                    <img src={require('../../images/icons-user.png')} alt="" className={css.IconUser}/>
                    <p>user123</p>
                </div>
            </div>
        </div>
    )
}

export {Header};