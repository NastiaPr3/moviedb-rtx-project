import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {additionalActions} from "../../redux";
import {TrendMovies} from "./TrendMovies";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import css from './Trending.module.css';
import {responsive} from "../../styles";

const TrendingMovies = () => {

    const {trending} = useAppSelector(state => state.additional);
    const {theme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(additionalActions.trendingMovies())
    }, []);

    return (
        <div className={`${css.main} ${theme === 'light' ? css.light : css.dark}`}>
            <h1>Trending Movies</h1>
            <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={1000} showDots={true}
                      dotListClass={css.dots} containerClass={css.forDots} infinite={true}>
                {trending.map(trend => <TrendMovies key={trend.id} trend={trend}/>)}
            </Carousel>
        </div>
    );
};

export {TrendingMovies};