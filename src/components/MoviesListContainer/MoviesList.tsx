import * as React from 'react';
import {useEffect} from "react";

import {useAppDispatch, usePageQuery, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {MovieList} from "./MovieList";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import css from './Movies.module.css';

const MoviesList = () => {

    const {movies} = useAppSelector(state => state.movie);
    const {theme} = useAppSelector(state => state.theme);
    const {page, pg} = usePageQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [page, dispatch]);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pg(value)
    }

    return (
        <div className={`${css.Movies} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
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

                <div className={css.cards}>
                    {
                        movies.map(movie => <MovieList key={movie.id} movie={movie}/>)
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
};

export {
    MoviesList
};