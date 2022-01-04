import React, {useEffect, useState} from "react";
import { Navbar, Collapse, Nav, NavItem, NavLink,
	DropdownItem, DropdownMenu, UncontrolledDropdown,
	DropdownToggle} from 'reactstrap';
import './header.css';
import userPicture from '../../assets/user.png';
import logoutIcon from '../../assets/logout.png';
import {Link} from "react-router-dom";
import StorageService from "../../services/storage/StorageService";
import {getUserData, logout} from "../../services/auth/AuthService";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../store";
import LocalStorageService from "../../services/storage/StorageService";

interface HeaderData {
	isUserAuthorized: boolean
}

const Header = (): JSX.Element => {

	const currentUser = useSelector((state: State) => state.auth.currentUser);
	const isAuthenticated = useSelector((state: State) => state.auth.isAuthenticated);

	console.log(isAuthenticated)
	console.log(currentUser)

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const token = StorageService.getAccessToken();
	// 		const result = await getUserData(token);
	// 		console.log(result)
	// 		return result;
	// 	}
	// 	getData().then(result => {
	// 		if (result.email !== '') {
	// 			setAuth(true)
	// 		}
	// 	});
	// }, [])
	// let navigatorData: string;
	let href: string;


	const onLogout = async () => {
		const token = LocalStorageService.getAccessToken();
		await logout(token);
		LocalStorageService.clearToken();
		window.location.replace('/login');
	}


	if (isAuthenticated) {
		href = "/profile";
	} else {
		href = "/login";
	}

	return (
		<div className="header">
			<Navbar
				expand="md"
				light
			>
				<Collapse navbar>
					<Nav
						className="me-auto"
						navbar
					>
						<NavItem className='links'>
							<Link to='/home'>
								Home
							</Link>
						</NavItem>
						<NavItem className='links'>
							<Link to='/analysis' id='second'>
								Analysis
							</Link>
						</NavItem>
					</Nav>
					{isAuthenticated ? <div className='profile-info'>
						<div className='profile-logo'>
							<Link to={href}>
								<img
									className="userLogo"
									src={userPicture}
									color="white"
									alt="myProfile"
								/>
							</Link>
						</div>
						<div className='logout-logo'>
							<img
								className="logoutLogo"
								src={logoutIcon}
								color="white"
								alt="logout"
								onClick={onLogout}
							/>
						</div>
						</div>: <Link to={href}>Sign In</Link>}
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header
