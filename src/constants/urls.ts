const baseURL = 'https://api.themoviedb.org';
const API_KEY = 'api_key=89c280d9540eb692d6636c6c77c4b05a';
const language = 'language=uk-UA'

const movies = '/3/discover/movie';
const movieById = '/3/movie';
const genres = '/3/genre/movie/list';
const search = '/3/search/movie';
const trending = '/3/trending/movie/week';
const nowPlaying = '/3/movie/now_playing';
const trailer = '/3/movie';
const actor = '/3/person';

const requestToken = '/3/authentication/token/new';
const createSession = '/3/authentication/session/new';
const accountDetails = '/3/account';
const deleteSession = '/3/authentication/session'

const urls = {
    movies: {
        base: `${movies}?${API_KEY}`,
        byId: (id: number) => `${movieById}/${id}?${API_KEY}`
    },

    genres: {
        base: `${genres}?${API_KEY}`,
        byGenresId: (id: number) => `${movies}?${API_KEY}&with_genres=${id}`
    },

    trending: {
        base: `${trending}?${API_KEY}`
    },

    nowPlaying: {
        base: `${nowPlaying}?${API_KEY}`
    },

    trailer: {
        base: (id: number) => `${trailer}/${id}/videos?${API_KEY}`
    },

    images: {
        base: (id: number) => `${trailer}/${id}/images?${API_KEY}`
    },

    people: {
        base: (id: number) => `${movieById}/${id}?${API_KEY}&append_to_response=credits`
    },

    actor: {
        base: (id: number) => `${actor}/${id}/movie_credits?${API_KEY}`
    },

    recommendations: {
        base: (id: number) => `${trailer}/${id}/recommendations?${API_KEY}`
    },

    search: {
        base: (name: string) => `${search}?${API_KEY}&query=${name}`
    },


    requestToken: {
        base: `${requestToken}?${API_KEY}`
    },

   createSession: {
        base: (reqToken: string) => `${createSession}?${API_KEY}`
   },

    accountDetails: {
        base: (sessionId: string) => `${accountDetails}?${API_KEY}&session_id=${sessionId}`
    },

    addFavorite: {
        base: (accountId: string, sessionId: string) => `${accountDetails}/${accountId}/favorite?${API_KEY}&session_id=${sessionId}`
    },

    getFavoriteMovies: (accountId: string, sessionId: string) => `${accountDetails}/${accountId}/favorite/movies?${API_KEY}&session_id=${sessionId}`,

    deleteSession: {
        base: `${deleteSession}?${API_KEY}`
    }


}

export {
    baseURL,
    urls
}