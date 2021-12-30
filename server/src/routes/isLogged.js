const isLogged = async (request) => {
    try {
        console.log(request)
        const { userId, isLogged } = request.session.user;

        if (isLogged) {
            request.user = userId;
        }
    } catch (error) {
        throw new Error("Must be logged in to access this resource.")
    }
}

module.exports = {
    isLogged
}
