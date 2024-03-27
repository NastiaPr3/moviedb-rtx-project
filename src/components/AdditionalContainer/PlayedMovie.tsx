import * as React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {additionalActions} from "../../redux";

import css from './NowPlaying.module.css';

import YouTube from "react-youtube";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const PlayedMovie = () => {

    const {selected, trailer, def} = useAppSelector(state => state.additional);
    const {backdrop_path, title, overview, id, vote_average} = selected;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(additionalActions.getTrailer(id));
    }, [dispatch, id]);

    const video = trailer && trailer.find(vid => vid.name === 'Official Trailer');

    const opts = {
        width: '700',
        height: '360'
    }

    return (
        <div>
            {
                !selected.title ?
                    <div className={css.Selected}>
                        <div className={css.title}>
                            <h1 onClick={() => navigate(`/movie/${def.id}`)}>{def.title}</h1>
                        </div>
                        <div className={css.info}>
                            <div className={css.imgAndStars}>
                                <img onClick={() => navigate(`/movie/${def.id}`)} className={css.mainImage}
                                     src={`https://image.tmdb.org/t/p/w500${def.backdrop_path}`}
                                     alt={def.title}/>
                            </div>
                            <div className={css.video}>
                                <p>{def.overview}</p>
                                {
                                    video && <YouTube videoId={video.key} opts={opts}/>
                                }
                            </div>
                        </div>
                    </div>

                    :

                    <div className={css.Selected}>
                        <div className={css.title}>
                            <h1 onClick={() => navigate(`/movie/${id}`)}>{title}</h1>
                        </div>
                        <div className={css.info}>
                            <div className={css.imgAndStars}>
                                <img onClick={() => navigate(`/movie/${id}`)} className={css.mainImage}
                                     src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                                     alt={title}/>
                                <Box
                                    sx={{
                                        '& > legend': {mt: 2},
                                    }}
                                >
                                    <Rating name="customized-10" defaultValue={2} max={10} value={vote_average}
                                            precision={0.5} emptyIcon={<StarIcon style={{opacity: 0.55, color: 'white'}}
                                                                                 fontSize="inherit"/>}/>
                                </Box>
                            </div>
                            <div className={css.video}>
                                <p>{overview}</p>
                                {
                                    video && <YouTube videoId={video.key} opts={opts}/>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export {PlayedMovie};