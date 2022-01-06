import React, { useState, FC } from 'react';
import {Link} from "react-router-dom";
import {Col, FormGroup, Input, Form, Button} from "reactstrap";
import {loginUser} from "../../services/auth/AuthService";
import LocalStorageService from "../../services/storage/StorageService";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formValid, setFormValidation] = useState(false)
	const navigate = useNavigate()

	const formValidation = (): boolean => {
		const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]+)$/i);
		const passwordValid = password.length > 6;
		const isEmailValid = !!emailValid;
		const isFormValid = passwordValid && isEmailValid;
		setFormValidation(isFormValid)
		return isFormValid;
	}

	const onLogin = async (): Promise<void> => {
		try {
			const obj = {
				password: password,
				email: email,
			}
			const result = await loginUser(obj);
			const storage = LocalStorageService;
			storage.setToken(result.result)
			window.location.replace('/home')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container-signup-page">
			<h2>Sign in at the website</h2>
				<Form className="signup-form" onChange={formValidation}>
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
					<FormGroup>
						<Button
							className="btn btn-success"
							onClick={onLogin}
							disabled={!formValid}
						>
							Sign in
						</Button>
					</FormGroup>
				</Form>
				<div className="no-acc">
					<span>You already have got an account?</span>
					<Link to="/signup">{" Sign up"}</Link>
				</div>
		</div>
	);
}

export default Login;
