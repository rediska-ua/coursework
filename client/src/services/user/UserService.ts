interface updateUserInfo {
    email: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
}



const getResults = async (token: string) => {
    const response = await fetch(`http://localhost:8080/api/user/getResultsByUser`, {
        headers: {
            'Authorization': token
        }
    });
    console.log(response)
    return await response.json();
};


const updateUserInfo = async (info: updateUserInfo, id: string) => {
    const response = await fetch(`http://localhost:8080/api/user/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(info)
    });
    console.log(response)
    return await response.json();
}


const getUserInfoByEmail = async (email: string) => {
    const response = await fetch(`http://localhost:8080/api/user/getFullInfoByEmail/${email}`);
    console.log(response)
    return await response.json();
}


export { getUserInfoByEmail, getResults, updateUserInfo }

