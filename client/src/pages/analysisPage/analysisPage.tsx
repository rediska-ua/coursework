import React, {useState} from "react";
import {Button, Input, Spinner} from "reactstrap";
import {analyzeTextData, postResultData} from "../../services/api/dataService";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {State} from "../../store";



const Analysis = (): JSX.Element => {

	const [sources, setSources] = useState(['']);
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate();
	const currentUser = useSelector((state: State) => state.auth.currentUser);
	const [showAlert, setAlert] = useState(false);

	const alertDiv = document.getElementById("alert");

	const sendData = async () => {
		if (text && sources) {
			if (text.length > 3000) {
				setAlert(true)
				return
			}
			setAlert(false)

			setLoading(true);
			const result  = await analyzeTextData(text, sources);
			if (currentUser) {
				console.log(currentUser.id)
				console.log(result.result)
				const dataObj = {
					...result.result,
					createdBy: currentUser.id,
					isSaved: false
				}
				console.log(dataObj)
				const id = await postResultData(dataObj);
				console.log(id);
				navigate(`/result/${id.resultId}`);
			}
		} else {
			alert('Text must not be empty')
		}
	}

	const handleMultiple = (e: any): void => {
		const updatedOptions: string[] = [...e.target.options]
			.filter(option => option.selected)
			.map(x => x.value);
		setSources(updatedOptions)
	}

	if (loading) {

		return (
			<div className='div-spinner'>
				<Spinner animation="border" style={{ width: '10rem', height: '10rem' }}/>
			</div>);
	}

	return (
		<div className="main-container">
			<div className="container-for-input">
				<h2>Enter some text to analyse</h2>
				<div className="alert alert-danger" id="alert" style={{display: showAlert ? 'block' : 'none' }} role="alert">
					The text is too long!
				</div>
				<Input
					bsSize="sm"
					type="textarea"
					rows="15"
					value={text}
					onChange={e => setText(e.target.value)}
					required
				/>
			</div>
			<div className="news-sources-input">
				<h2>Choose news sources to base on</h2>
				<select
					className="form-select"
					multiple={true}
					value={sources}
					onChange={handleMultiple}
					size={3}
				>
					<option value="@hromadske_ua">Hromadske</option>
					<option value="@liganet">Ліга</option>
					<option value="@suspilnenews">Суспільне</option>
					<option value="@babel">Бабель</option>
					<option value="@znua_live">Дзеркало тижня</option>
					<option value="@censor_net">Цензор.net</option>
				</select>
				<Button
					onClick={sendData}
					color="primary"
					outline
					size="lg"
				>Start analysis</Button>
			</div>
		</div>);
}

export default Analysis;
