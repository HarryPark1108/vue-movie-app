exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        // body: "Hello world!" // 문자일때
        body: JSON.stringify({
            name: "HEROPY",
            age: 85,
            email: "thesecon@gmail.com"
        })
    }
}