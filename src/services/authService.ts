import {IRes} from "../types";
import {IRequestToken} from "../interfaces/requestTokenInterface";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IAccount} from "../interfaces/accountDetailsInterface";
import {ISession} from "../interfaces/sessionInterface";
import {IMovie, IMovies} from "../interfaces";

const authService = {
    getRequestToken: (): IRes<IRequestToken> => apiService.get(urls.requestToken.base),
    createSession: (reqToken: string): IRes<ISession> => apiService.post(urls.createSession.base(reqToken), {request_token: reqToken}),
    getAccountDetails: (sessionId: string): IRes<IAccount> => apiService.get(urls.accountDetails.base(sessionId)),

    addFavorite: (accountId: string, sessionId: string, movieId: number) => apiService.post(urls.addFavorite.base(accountId, sessionId), {
        media_type: 'movie',
        media_id: movieId,
        favorite: true
    }),

    deleteFavorite: (accountId: string, sessionId: string, movieId: number) => apiService.post(urls.addFavorite.base(accountId, sessionId), {
        media_type: 'movie',
        media_id: movieId,
        favorite: false
    }),

    getFavoriteMovies: (accountId: string, sessionId: string): IRes<IMovies<IMovie>> => apiService.get(urls.getFavoriteMovies(accountId, sessionId)),

    deleteSession: (sessionId: string) => apiService.delete(urls.deleteSession.base, { params: { session_id: sessionId }})


}

export {
    authService
}