import {Button, Col, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LocalStorageService from "../../services/storage/StorageService";
import {useSelector} from "react-redux";
import {State} from "../../store";
// @ts-ignore
import {getResultsByUser} from "../../services/user/UserService";


interface UserFullInfo {
	email: string,
	firstName: string,
	lastName: string
}

const Profile = () => {

	const currentUser = useSelector((state: State) => state.auth.currentUser);

	const [userInfo, setUser] = useState({
		email: '',
		firstName: '',
		lastName: ''
	});

	const [userResults, setResults] = useState([])

	useEffect(() => {
		if (currentUser) {
			setUser(() => ({
				...currentUser
			}));
			const results = getResultsByUser(currentUser.email)
		}
	}, [])

	console.log(userInfo)

	return (
		<div className="container-signup-page">
			<h2>Full information</h2>
			<div className="profile-container">
				<div className="profile-col">
					<h5>First Name:</h5>
					<span>{userInfo.firstName}</span>
				</div>
				<div className="profile-col">
					<h5>Last Name:</h5>
					<span>{userInfo.lastName}</span>
				</div>
				<div className="profile-col">
					<h5>Email:</h5>
					<span>{userInfo.email}</span>
				</div>
			</div>
			<div className="results-container">

			</div>
		</div>
	);
}
export default Profile;
