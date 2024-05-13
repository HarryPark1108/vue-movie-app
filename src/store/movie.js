import axios from "axios"
import _uniqBy from "lodash/uniqBy"

const _defaultMessage = "Search for the movie title!"

export default {
    namespaced: true, // module로 사용하겠다고 명시함
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {

        }
    }), // 취급해야 할 data를 의미함
    getters: {}, // computed와 같은 의미
    mutations: {
        updateState(state, payload) {
            // ["movies", "message", loading]
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    }, // methods와 같은 의미 (Data 즉 state를 변경할 수 있음)
    actions: {
        async searchMovies({ state, commit }, payload) {
            if (state.loading) { // search 동작을 실행중일때 클릭하여 재 실행되지 않도록 한다.
                return
            }

            commit("updateState", {
                message: "", // 검색을 시작하면 message의 값을 초기화 시킨다.
                loading: true
            })
            try {
                // Search movies..
                // const { title, type, number, year} = payload
                // const OMDB_API_KEY = 'f88998d5'
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data
                commit("updateState", {
                    movies: _uniqBy(Search, "imdbID")
                })
                console.log(totalResults) // 268 @frozen
                console.log(typeof totalResults) // string @frozen

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                console.log(total)
                console.log(pageLength)

                // 추가 요청
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page += 1) {
                        if (page > (payload.number / 10)) {
                            break
                        }
                        const res = await _fetchMovie({
                            ...payload, 
                            page: page
                        })
                        const { Search } = res.data
                        commit("updateState", {
                            movies: [
                                ...state.movies, 
                                ..._uniqBy(Search, "imdbID")
                            ] // ... 전개 연산자
                        })
                    }
                }
            } catch ({ message }) { // 서버리스 함수에서 error를 받아오는데, 객체 분해 해서 message만 사용하겠다라는 의미
                commit("updateState",  {
                    movies: [], // error가 발생했을 때 초기화 한다.
                    message: message,
                })
            } finally {
                commit("updateState", {
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state, commit }, payload) {
            if (state.loading) return
            
            commit("updateState", {
                theMovie: {},
                loading: true
            })
            try {
                const res = await _fetchMovie(payload)
                console.log(res.data.Ratings)
                commit("updateState", {
                    theMovie: res.data
                })
            } catch(error) {
                commit("updateState", {
                    theMovie: {} // 초기화
                })
            } finally {
                commit("updateState", {
                    loading: false
                })
            }
        }
    } // methods와 같은 의미 (Data 즉 state를 변경할 수 없음), 비동기로 동작함

}

async function _fetchMovie(payload) {
    return await axios.post("/.netlify/functions/movie", payload)

    // 아래 코드를 serverless 함수로 옮기고
    // 해당 serverless 함수를 호출하도록 구성함

    // const { title, type, year, page, id } = payload
    // const OMDB_API_KEY = 'f88998d5'
    // const url = id 
    //     ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    //     : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // return new Promise((resolve, reject) => {
    //     axios.get(url)
    //         .then((res) => {
    //             if(res.data.Error) {
    //                 reject(res.data.Error)
    //             }
    //             resolve(res)
    //         })
    //         .catch((err) => {
    //             reject(err.message)
    //         })
    // })
}