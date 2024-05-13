const axios = require("axios") // node.js 환경에서 동작하는 경우

// store의 movie.js의 _fetchMovie 함수를
// netlify의 Serverless 함수에서 동작하도록 구성
exports.handler = async function(event) {
    console.log(event)
    const payload = JSON.parse(event.body)
    const { title, type, year, page, id } = payload
    const OMDB_API_KEY = 'f88998d5'
    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    try {
        const { data } = await axios.get(url)
        if (data.Error) {
            return {
                statusCode: "400",
                body: data.Error
            }            
        }
        return {
            statusCode: "200",
            body: JSON.stringify(data) // 문자데이터만 반환 가능. 객체데이터(data)를 문자로 변환 필요
        }
    } catch (error) {
        return {
            statusCode: error.response.status,
            body: error.message
        }
    }

    // 위와 같이 작성 가능
    // return new Promise((resolve, reject) => {
    // axios.get(url)
    //     .then((res) => {
    //         if(res.data.Error) {
    //             reject(res.data.Error)
    //         }
    //         resolve(res)
    //     })
    //     .catch((err) => {
    //         reject(err.message)
    //     })
    // })
}