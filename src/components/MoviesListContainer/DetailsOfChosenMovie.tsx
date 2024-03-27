import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as React from 'react';

import {IGenres, IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {additionalActions} from "../../redux";

import YouTube from "react-youtube";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import css from './MovieDetails.module.css';
import {responsive} from "../../styles";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const DetailsOfChosenMovie: FC<IProps> = ({movie}) => {
    const {trailer, images, people, director, recommended} = useAppSelector(state => state.additional);
    const {theme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(additionalActions.getTrailer(id));
        dispatch(additionalActions.getImages(id));
        dispatch(additionalActions.getPerson(id));
        dispatch(additionalActions.getRecommendedMovies(id));
    }, [dispatch]);

    const video = trailer && trailer.find(vid => vid.name === 'Official Trailer');

    const someImages = images && images.slice(1, 9);

    const direct = director.find(directed => directed.job === 'Director')
    const producer = direct && direct.name

    const cast = people && people.filter((person) => person.known_for_department === 'Acting');
    const sortedCast = cast.sort((a, b) => a.cast_id - b.cast_id).slice(1, 11);

    const {
        id,
        overview,
        title,
        genres,
        poster_path,
        vote_average,
        original_title,
        production_countries,
        runtime,
        tagline,
        release_date
    } = movie;

    const year = release_date.split('-')[0];
    const countryNames = (countries: { name: string }[]) => {
        return countries.map(country => country.name);
    }

    const countries = countryNames(production_countries);

    const opts = {
        width: '800',
        height: '400'
    }

    const genreBadges = genres && genres.map((genre: IGenres, index: number) => (
        <Badge key={index} bg="danger">
            {genre.name}
            {genre.id}
        </Badge>
    ));

    const handleClick = (genreName: string, genreId: number) => {
        navigate(`/chosenGenre/${genreId}/${genreName.toLowerCase()}`);
    };

    return (
        <div className={`${css.MovieDetails} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <button onClick={() => navigate(-1)}
                    className={`${css.Btn} ${theme === 'light' ? css.lightBtn : css.darkBtn}`}>Back
            </button>
            <div className={css.details}>
                <div className={`${css.head} ${theme === 'light' ? css.light : css.dark}`}>
                    <h1>{title}</h1>
                    <h3>{original_title}</h3>
                    <img className={css.mainImage} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="img"/>
                    <Box
                        sx={{
                            '& > legend': {mt: 2},
                        }}
                    >
                        <Rating name="customized-10" defaultValue={2} max={10} value={vote_average} precision={0.5}
                                emptyIcon={<StarIcon style={{opacity: 0.55, color: 'white'}} fontSize="inherit"/>}/>
                    </Box>
                    <p>Release year: {year}</p>
                    <p>Countries: {countries.join(', ')}</p>
                    <p>RunTime: {runtime}min</p>
                    <p> {tagline ? 'Slogan: ' : null} {tagline}</p>
                    <p>Directed by: {producer && producer}</p>

                    <div className={css.GenresDiv}>
                        <p>Genres:</p>
                        <Stack direction="horizontal" gap={2}>
                            {genreBadges.map((badge: React.ReactElement, index: number) => (
                                <Badge key={index} bg="dark" className={css.Badges}
                                       onClick={() => handleClick(badge.props.children[0], badge.props.children[1])}>
                                    {badge.props.children[0]}
                                </Badge>
                            ))}
                        </Stack>
                    </div>
                </div>

                <div className={css.main}>
                    <h3>Overview:</h3>
                    <h6>{overview}</h6>
                    <div className={css.watch}>
                        {video && <h4>Watch trailer</h4>}
                        {
                            video && <YouTube videoId={video.key} opts={opts} key={video.key}/>
                        }
                    </div>

                    <div className={css.imagesDiv}>
                        {
                            someImages && <h4>Pictures from movies</h4>
                        }
                        {
                            someImages.map(image => <img className={css.images}
                                                         src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                                         alt="img"/>)
                        }
                    </div>

                    <div className={css.CastDiv}>
                        <h2>Cast:</h2>
                        <div className={css.Cast}>
                            {sortedCast.map(hum => (
                                <div className={css.castAndImage}>
                                    <img
                                        src={hum.profile_path ? `https://image.tmdb.org/t/p/w500${hum.profile_path}` : require('../../images/notFound.jpg')}
                                        alt="img" title={hum.name}
                                        className={css.Circle}
                                        onClick={() => navigate(`/actor/${hum.id}/${hum.name})`)}
                                    />
                                    <p>{hum.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={css.carousel}>
                        {
                            recommended && <h4>Recommendations:</h4>
                        }

                        <Carousel responsive={responsive} showDots={true}
                                  dotListClass={css.dots} containerClass={css.forDots} sliderClass={css.SliderDiv}
                                  itemClass={css.SliderItems} infinite={true}>
                            {
                                recommended && recommended.map(mov => <div className={css.SliderCard}>
                                    <img onClick={() => window.location.href = (`/movie/${mov.id}`)}
                                         className={css.SliderImages}
                                         src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                                         alt={mov.title}/>
                                    <div>{mov.title}</div>
                                </div>)
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {DetailsOfChosenMovie};