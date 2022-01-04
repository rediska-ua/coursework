
const getResultsByUser = async (email: string) => {
    const response = await fetch(`http://localhost:8080/api/user/getResultsByUser`, {
    });
    console.log(response)
    return await response.json();
};

const getResults = async (token: string) => {
    const response = await fetch(`http://localhost:8080/api/user/getResultsByUser`, {
        headers: {
            'Authorization': token
        }
    });
    console.log(response)
    return await response.json();
};


export { getResultsByUser }

