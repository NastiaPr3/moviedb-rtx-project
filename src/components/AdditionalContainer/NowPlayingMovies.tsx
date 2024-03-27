import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {additionalActions} from "../../redux";
import {NowPlayMovies} from "./NowPlayMovies";
import {PlayedMovie} from "./PlayedMovie";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import css from "./NowPlaying.module.css";
import {responsive} from "../../styles";
const NowPlayingMovies = () => {

    const {nowPlaying} = useAppSelector(state => state.additional);
    const {theme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(additionalActions.nowPlayingMovies());
    }, []);


    return (
        <div className={`${css.main} ${theme === 'light' ? css.lightBackground : css.darkBackground}`}>
            <h1>Now Playing Movies</h1>
            <div className={`${css.selectedMovie} ${theme === 'light' ? css.light : css.dark}`}>
                <PlayedMovie/>
            </div>
            <div className={css.carousel}>
            <Carousel responsive={responsive} showDots={true}
                      dotListClass={css.dots} containerClass={css.forDots} sliderClass={css.SliderDiv} itemClass={css.SliderItems} infinite={true}>
                {nowPlaying.map(nowPlay => <NowPlayMovies key={nowPlay.id} nowPlay={nowPlay}/>)}
            </Carousel>
            </div>
        </div>
    )
};

export {NowPlayingMovies};