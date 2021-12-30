interface User {
	firstName: string,
	lastName: string,
	password: string,
	email: string,
}

interface LoginUser {
	password: string,
	email: string,
}


interface NewPassword {
	newPassword: string
}

const getData = async () => {
	const response = fetch('http://localhost:8080/api',);
	const result = await response;
	return result.json();
};

const getUserData = async (token: string | null) => {
	const response = fetch(`http://localhost:8080/api/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});
	const result = await response;
	return result.json();
}

const authUser = async (obj: User): Promise<Response> => {
	const response = fetch('http://localhost:8080/api/signup', {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json"
		}
	});
	return response;
};

const loginUser = async (obj: LoginUser) => {
	console.log(obj)
	const response = await fetch('http://localhost:8080/api/login', {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await response.json();
	return data;
};

const changePassword = async (obj: NewPassword) => {
	console.log(obj)
}

export { authUser, loginUser, getData, changePassword , getUserData };
