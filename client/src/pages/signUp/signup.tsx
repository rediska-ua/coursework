import React, { useState } from 'react';
import {Form, FormGroup, Col, Input, Button, NavLink} from "reactstrap";
import './signup.css';
import {authUser, loginUser} from "../../services/auth/authService";
import {Link} from "react-router-dom";
import LocalStorageService from "../../services/storage/StorageService";

const SignUp = () => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formValid, setFormValidation] = useState(false)

	const formValidation = (): boolean => {
		const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		const firstNameValid = firstName.match(/^[a-zA-Z]+$/);
		const lastNameValid = lastName.match(/^[a-zA-Z]+$/);
		const passwordValid = password.length > 6;
		const isEmailValid = !!emailValid;
		const isNameValid = (!!lastNameValid) && (!!firstNameValid);
		const isFormValid = passwordValid && isEmailValid && isNameValid;
		setFormValidation(isFormValid)
		return isFormValid;
	}

	console.log(formValid)

	const onSignUp = async (): Promise<void> => {
		try {
			const signupResult = authUser({email: email, password: password,
				lastName: lastName, firstName: firstName});
			signupResult.then(async (response) => {
				const signupResult = await response.json();
				const result = await loginUser({email: email, password: password})
				const storage = LocalStorageService;
				storage.clearToken()
				storage.setToken(result.token)
				window.location.replace("http://localhost:3000/home");
				console.log(signupResult)
				console.log(result)
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container-signup-page">
			<h2>Sign up at the website</h2>
			<Form className="signup-form" onChange={formValidation}>
				<FormGroup className="form-col">
					<h5>First Name:</h5>
					<Col>
						<Input
							placeholder="Enter your first name"
							className="firstname"
							name="firstname"
							type="text"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="form-col">
					<h5>Last Name:</h5>
					<Col>
						<Input
							placeholder="Enter your last name"
							className="lastname"
							name="lastname"
							type="text"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="form-col">
					<h5>Email:</h5>
					<Col>
						<Input
							placeholder="Enter your email"
							className="email"
							name="email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="form-col">
					<h5>Password:</h5>
					<Col>
						<Input
							placeholder="Enter password"
							className="password"
							name="password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup
					check
					row
				>
					<Col>
						<Button color="success" onClick={onSignUp} disabled={!formValid}>
							Sign up
						</Button>
					</Col>
				</FormGroup>
			</Form>
			<Link to="/restore_password">Forgot your password?</Link>
			<div className="no-acc">
				<span>You already have got an account?  </span>
				<Link to="/login">Sign in</Link>
			</div>
		</div>
	);
}

export default SignUp;
