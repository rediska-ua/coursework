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
	const result = await fetch('http://localhost:8080/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await result.json()
	console.log(data)
	return data
};

const loginUser = async (obj: LoginUser) => {
	const response = await fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await response.json();
	console.log(data)
	return data;
};

const logout = async (token: string | null) => {
	const response = fetch(`http://localhost:8080/api/auth/logout`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});
	const result = await response;
	return result.json();
};

const changePassword = async (obj: NewPassword) => {
	console.log(obj)
}

export { authUser, loginUser, getData, changePassword , getUserData, logout };
