import React, {useEffect, useState} from "react";
import { Navbar, Collapse, Nav, NavItem, NavLink,
	DropdownItem, DropdownMenu, UncontrolledDropdown,
	DropdownToggle} from 'reactstrap';
import './header.css';
import userPicture from '../../assets/user.png';
import {Link} from "react-router-dom";
import StorageService from "../../services/storage/StorageService";
import {getUserData} from "../../services/auth/authService";

interface HeaderData {
	isUserAuthorized: boolean
}

const Header = (): JSX.Element => {


	const [isAuthorisied, setAuth] = useState(false);
	useEffect(() => {
		const getData = async () => {
			const token = StorageService.getAccessToken();
			const result = await getUserData(token);
			console.log(result)
			return result;
		}
		getData().then(result => {
			if (result.email !== '') {
				setAuth(true)
			}
		});
	}, [])
	let navigatorData: string;
	let href: string;

	console.log(isAuthorisied)

	if (isAuthorisied) {
		navigatorData = "Sign up";
		href = "/signup";
	} else {
		navigatorData = "My profile";
		href = "/profile";
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
					<Link to={href}>
						<img
							className="userLogo"
							src={userPicture}
							color="white"
							alt={navigatorData}
						/>
					</Link>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header
