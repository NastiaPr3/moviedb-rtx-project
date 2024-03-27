import * as React from "react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {searchActions} from "../../redux";
import {SearchMovie} from "./SearchMovie";

import css from './Search.module.css';

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const SearchByName = () => {

    const {search, totalPage} = useAppSelector(state => state.searchMovie);
    const {theme} = useAppSelector(state => state.theme);
    const {page, pg} = usePageQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const currentName = pathname.split('/')[2];

    useEffect(() => {
        dispatch(searchActions.search({movieName: currentName, page: page}))
    }, [currentName, page, totalPage]);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pg(value)
    }

    return (
        <div className={`${css.Search} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
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
                        search && search.map(movies => <SearchMovie key={movies.id} movies={movies}/>)
                    }
                </div>

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
            </div>
        </div>
    );
};

export {SearchByName};