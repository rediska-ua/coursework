import React from "react";
import './button.css';

interface ButtonData {
	text: string;
}

const Button = ({text}: ButtonData): JSX.Element => {
	return (
		<button className="btn">{text}</button>
	);
}

export default Button;
