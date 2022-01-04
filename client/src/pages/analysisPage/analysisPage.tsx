import React, {useState} from "react";
import {Button, Input} from "reactstrap";
import {sendTextInfo} from "../../services/api/dataService";



const Analysis = (): JSX.Element => {

	const [sources, setSources] = useState(['']);
	const [text, setText] = useState('');

	const sendData = async () => {
		/*const obj: DataForAnalysis = {
			text: text,
		}
		const result = await sendTextInfo(obj);
		console.log(result.result)*/
		console.log(sources)
	}

	const handleMultiple = (e: any): void => {
		const updatedOptions: string[] = [...e.target.options]
			.filter(option => option.selected)
			.map(x => x.value);
		console.log("updatedOptions", updatedOptions);
		setSources(updatedOptions)
	}

	return (
		<div className="main-container">
			<div className="container-for-input">
				<h2>Enter some text to analyse</h2>
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
					<option value="hromadske">Hromadske</option>
					<option value="liga">Ліга</option>
					<option value="suspilne">Суспільне</option>
					<option value="babel">Бабель</option>
					<option value="dzerkalo">Дзеркало тижня</option>
					<option value="censor">Цензор.net</option>
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
