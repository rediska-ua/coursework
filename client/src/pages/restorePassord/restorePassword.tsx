import React, { useState } from 'react';
import {Col, FormGroup, Input, Form, Button, NavLink} from "reactstrap";
import { changePassword } from "../../services/auth/AuthService";
//import LocalStorageService from "../../services/storage/StorageService";
import {Link} from "react-router-dom";

const RestorePassword = () => {

	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [formValid, setFormValidation] = useState(false)

	const formValidation = (): boolean => {
		const passwordValid = password.length > 6;
		const newPasswordValid = newPassword.length > 6;
		const isEmailValid = passwordValid && newPasswordValid;
		setFormValidation(isEmailValid)
		return isEmailValid;
	}

	const toRestorePassword = async (): Promise<void> => {
		try {
			const ifSame = password === newPassword;
			if (ifSame) {
				const obj = {
					newPassword: password
				}
				const result = await changePassword(obj);
				//const storage = LocalStorageService;
				console.log(result)
			} else {
				console.log('passwords are not the same')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container-signup-page">
			<h2>Change your password</h2>
			<Form className="signup-form" onChange={formValidation}>
				<FormGroup className="form-col">
					<h5>New password:</h5>
					<Col>
						<Input
							placeholder="Enter your new password"
							className="password"
							name="password"
							type="password"
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							required
						/>
					</Col>
				</FormGroup>
				<FormGroup className="form-col">
					<h5>Repeat new password</h5>
					<Col>
						<Input
							placeholder="Enter new password again"
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
						onClick={toRestorePassword}
						disabled={!formValid}
					>
						Change password
					</Button>
				</FormGroup>
			</Form>
			<div className="no-acc">
				<span>You already have got an account?</span>
				<Link to="/signup">Sign up</Link>
			</div>
		</div>
	);
}

export default RestorePassword;
