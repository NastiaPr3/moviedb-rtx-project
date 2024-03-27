import * as React from 'react';
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {genreListActions} from "../../redux";
import {ChosenGenreList} from "./ChosenGenreList";

import css from './ChosenGenre.module.css';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ChosenGenre = () => {

    const {genreMovieList} = useAppSelector(state => state.genreList);
    const {theme} = useAppSelector(state => state.theme);
    const {page, pg} = usePageQuery();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreListActions.getMovieListByGenreId({id: parseInt(id), page: page}))
    }, [id, page]);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pg(value)
    }

    return (
        <div className={`${css.Genre} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={css.btnDiv}>
                <button onClick={() => navigate(-1)}
                        className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`}>Back
                </button>
            </div>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
                <div className={css.paginationDiv}>
                    <Stack spacing={2}>
                        <Pagination count={500} variant="outlined" shape="rounded" page={+page}
                                    onChange={handlePaginationChange} className={css.pg}
                                    sx={
                                        {
                                            '& .MuiButtonBase-root': {
                                                backgroundColor: '#5c6067',
                                                color: 'white'
                                            },
                                            '& .MuiButtonBase-root:hover': {
                                                backgroundColor: '#4d4b4b'
                                            },
                                            '& .Mui-selected': {
                                                backgroundColor: '#2a2828'
                                            }
                                        }}
                        />
                    </Stack>
                </div>
                <div className={css.cards}>
                    {
                        genreMovieList.map(genreMovie => <ChosenGenreList key={genreMovie.id} genreMovie={genreMovie}/>)
                    }
                </div>
                <div className={css.paginationDiv}>
                    <Stack spacing={2}>
                        <Pagination count={500} variant="outlined" shape="rounded" page={+page}
                                    onChange={handlePaginationChange}
                                    sx={
                                        {
                                            '& .MuiButtonBase-root': {
                                                backgroundColor: '#5c6067',
                                                color: 'white'
                                            },
                                            '& .MuiButtonBase-root:hover': {
                                                backgroundColor: '#4d4b4b'
                                            },
                                            '& .Mui-selected': {
                                                backgroundColor: '#2a2828'
                                            }
                                        }}
                        />
                    </Stack>

                </div>
            </div>
        </div>
    );
}

export {ChosenGenre};