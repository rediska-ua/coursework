import React, { useState, FC } from 'react';
import {Form, FormGroup, Col, Input, Button, NavLink} from "reactstrap";
import './signup.css';
import {authUser, loginUser} from "../../services/auth/AuthService";
import {Link} from "react-router-dom";
import LocalStorageService from "../../services/storage/StorageService";
import { useNavigate } from "react-router-dom";

const SignUp: FC  = ()=> {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formValid, setFormValidation] = useState(false)
	const navigate = useNavigate()

	const [showAlert, setAlert] = useState(false);

	const alertDiv = document.getElementById("alert");

	const formValidation = (): boolean => {
		const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]+)$/i);
		const firstNameValid = firstName.length > 1;
		const lastNameValid = lastName.length > 4;
		const passwordValid = password.length > 6;
		const isEmailValid = !!emailValid;
		const isNameValid = lastNameValid && firstNameValid;
		const isFormValid = passwordValid && isEmailValid && isNameValid;
		setFormValidation(isFormValid)
		return isFormValid;
	}

	console.log(formValid)

	const onSignUp = async (): Promise<void> => {
		const data = await authUser({email, password, lastName, firstName});
		if ("error" in data) {
			setFirstName('')
			setLastName('')
			setEmail('')
			setPassword('')
			setAlert(true)
			setFormValidation(false)
			return
		}
		const result = await loginUser({email, password});
		const storage = LocalStorageService;
		storage.clearToken()
		storage.setToken(result.result)
		navigate('/home')
	}

	return (
		<div className="container-signup-page">
			<h2>Sign up at the website</h2>
			<div className="alert alert-danger" id="alert" style={{display: showAlert ? 'block' : 'none' }} role="alert">
				This user already exists
			</div>
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
			<div className="no-acc">
				<span>You already have got an account?  </span>
				<Link to="/login">{'  '}Sign in</Link>
			</div>
		</div>
	);
}

export default SignUp;
