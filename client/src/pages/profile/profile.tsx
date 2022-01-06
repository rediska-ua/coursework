import {Button, Col, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LocalStorageService from "../../services/storage/StorageService";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {deleteResult, getResultDataById, getResultsByUser} from "../../services/api/dataService";
import deleteImage from '../../assets/delete.png';
import editImage from '../../assets/edit.png';


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
		const fetchData = async () => {
			if (currentUser) {
				setUser(() => ({
					...currentUser
				}));
				const results = await getResultsByUser(currentUser.id)
				setResults(results)
				console.log(results)
			}
		}
		fetchData()
	}, [])

	console.log(userInfo)


	const handleDelete = async (e: any) => {
		deleteResult(e.target.id)
		if (currentUser) {
			const results = await getResultsByUser(currentUser.id)
			setResults(results)
		}
	}

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
				<div className="profile-col">
					<Link to = {'/profile-edit'}>
						<img
							className="deleteLogo"
							src={editImage}
							alt="delete"
							width="50px"
							height="50px"
						/>
					</Link>
				</div>
			</div>
			<div className="results-container">
				<h2>Saved analysis results</h2>
				<div className="saved-results">
					{userResults.map((item: any) => {
						return (
							<div className="saved-result">
								<div>
									<Link to={`/result/${item._id}`}>{item._id}</Link>
								</div>
								<div>
									<img
										onClick={handleDelete}
										className="deleteLogo"
										src={deleteImage}
										alt="delete"
										width="50px"
										height="50px"
										id={item._id}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
}
export default Profile;
