import React, {useState} from "react";
import { Input, Button } from "reactstrap";
import { sendTextInfo } from "../../services/api/dataService";
interface DataForAnalysis {
	text: string
}

const TextArea = (): JSX.Element => {

	const [text, setText] = useState('');

	const sendData = async () => {
		const obj: DataForAnalysis = {
			text: text,
		}
		const result = await sendTextInfo(obj);
		console.log(result.result)
	}

	return (
		<div className="container-for-analysis">
			<div className="container-for-input">
				<h2>Enter some text to analyse</h2>
				<Input
					bsSize="lg"
					type="textarea"
					rows="15"
					value={text}
					onChange={e => setText(e.target.value)}
					required
				/>
				<Button
					onClick={sendData}
					color="primary"
					outline
					size="lg"
				>Start analysis</Button>
			</div>
		</div>
	);
}

export default TextArea;

