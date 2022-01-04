import React from "react";
import './homePage.css';
import mainPage from '../../assets/Word-frequencyof-fake-news-focused-articles-Top-100-words_Q640.jpg';
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';



const HomePage = (): JSX.Element => {
	return (
		<div className="main-container">
			<h1>Welcome to InfoChecker</h1>
			<h4>Let`s check your information</h4>
			<div className="image-block">
				<img src = {mainPage} width='640' height='640' alt='mainPage'/>
			</div>
			<Button color="primary" className='home-btn'><Link to = '/analysis'>Go to analysis</Link></Button>
		</div>
	);
}

export default HomePage;
