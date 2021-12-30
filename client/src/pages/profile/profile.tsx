import {Button, Col, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";
import React from "react";


interface UserFullInfo {
	email: string,
	firstName: string,
	lastName: string
}

const Profile = (obj: UserFullInfo) => {

	const { email, firstName, lastName } = obj;

	return (
		<div className="container-signup-page">
			<h2>Full information</h2>
			<div className="signup-form">
				<div className="form-col">
					<h5>First Name:</h5>
					<span>{firstName}</span>
				</div>
				<div className="form-col">
					<h5>Last Name:</h5>
					<span>{lastName}</span>
				</div>
				<div className="form-col">
					<h5>Email:</h5>
					<span>{email}</span>
				</div>
			</div>
		</div>
	);
}
export default Profile;
