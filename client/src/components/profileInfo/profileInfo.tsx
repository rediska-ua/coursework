import React from "react";
import { Navbar, Collapse, Nav, NavItem, NavLink,
	DropdownItem, DropdownMenu, UncontrolledDropdown,
	DropdownToggle} from 'reactstrap';
import './header.css';
import userPicture from '../../assets/user.png';
import {Link} from "react-router-dom";

interface HeaderData {
	isUserAuthorized: boolean
}

const ProfileInfo = ({isUserAuthorized}: HeaderData): JSX.Element => {
	let navigatorData: string;
	let href: string;

	if (!isUserAuthorized) {
		navigatorData = "Sign up";
		href = "/signup";
	} else {
		navigatorData = "My profile";
		href = "/profile";
	}

	return (
		<div className="profile_info">
			<Link to={href}>
				<img
					className="userLogo"
					src={userPicture}
					color="white"
					alt={navigatorData}
				/>
			</Link>
		</div>
	);
}

export default ProfileInfo;
