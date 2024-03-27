import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {MoviesPage, ChosenMoviePage, ChosenGenrePage, ActorPage, SearchPage} from "./pages";
import {AuthPage} from "./pages/AuthPage";
import {FavoriteMoviesPage} from "./pages/FavoriteMoviesPage";
import {AuthRequired} from "./hoc/AuthRequired";
import {AuthLayout} from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },

            {
                element: <AuthRequired><AuthLayout/></AuthRequired>, children: [
                    {
                        path: 'favorite', element: <FavoriteMoviesPage/>
                    }
                ]
            },

            {
                path: 'movies', element: <MoviesPage/>
            },

            {
                path: 'movie/:id', element: <ChosenMoviePage/>
            },

            {
                path: 'chosenGenre/:id/:name', element: <ChosenGenrePage/>
            },

            {
                path: 'actor/:id/:name', element: <ActorPage/>
            },

            {
                path: 'search/:name', element: <SearchPage/>
            },

            {
                path: 'auth', element: <AuthPage/>
            }

        ]
    }
])

export {
    router
}