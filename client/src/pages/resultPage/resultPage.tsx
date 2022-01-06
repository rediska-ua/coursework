import React, {useEffect, useRef, useState} from "react";
import {Button} from "reactstrap";
import {useParams} from "react-router-dom";
import {getResultDataById, updateResultInfo} from "../../services/api/dataService";
import wordcloudPicture from "../../assets/saved_figure-100dpi.png";
import { useReactToPrint } from 'react-to-print';



const Result = (): JSX.Element => {
	const { id } = useParams();
	const [data, setData] = useState({
		input_text: '',
		verdict: false,
		date: '',
		original_source_text: '',
		source_keywords: [],
		source_channel: '',
		picture: '',
		cosine_similarity: '',
		createdBy: '',
		isSaved: false
	});

	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleSaving = async (e: any) => {
		e.preventDefault()
		await updateResultInfo(id, true);
		alert("Result is saved");
	}

	const [wordCloudPicture, setImportPicture] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			const resultData = await getResultDataById(id);
			console.log(resultData)
			setData(() => ({
				...resultData
			}));
		}
		fetchData()
	}, [])

	const formatDate = (date: string) => {
		const first = date.replace('T', ' - ');
		return first.replace('Z', ' ');
	}

	const formatKeyWords = (keywords: string[]) => {
		keywords.splice(6);
		return keywords.join('  ')
	}

	return (
		<div className="container-for-result">
			<div className="result-wrapper">
				<h1>Here are your results</h1>
				{ !data.verdict ? (
					<div className="fake-info">
						<div className='input-result-area'>
							<h2>Your input text:</h2>
							<span>{data.input_text}</span>
						</div>
						<div className='fake-info-verdict'>
							<h2>You shouldn`t trust this information. It is most likely a fake one</h2>
						</div>
					</div>
				) : (
					<div className="true-info">
						<div ref = {componentRef}>
							<div className='input-result-area'>
								<h2>Your input text:</h2>
								<span>{data.input_text}</span>
							</div>
							<div className='true-info-verdict'>
								<h2>Your information is most likely true</h2>
							</div>
							<div className='true-info-wordcloud'>
								<h2>Word cloud</h2>
								<img src = {wordcloudPicture} alt = "wordCloud"/>
							</div>
							<div className='true-info-source'>
								<div className="source-wrapper">
									<div className="date-source">
										<h2>Date of publishing</h2>
										<span>{formatDate(data.date)}</span>
									</div>
									<div className="text-source">
										<h2>Source original text</h2>
										<span>{data.original_source_text}</span>
									</div>
									<div className="keywords-source">
										<h2>Source key words</h2>
										<span>{formatKeyWords(data.source_keywords)}</span>
									</div>
									<div className="channel-source">
										<h2>Source channel</h2>
										<span>{data.source_channel}</span>
									</div>
									<div className="cos-sim">
										<h2>Your information is similar to source by</h2>
										<h3>{parseFloat(parseFloat(data.cosine_similarity).toFixed(2)) * 100}%</h3>
									</div>
								</div>
							</div>
						</div>
						<div>
							<Button
								className="save-to-acc-btn"
								color="primary"
								outline
								size="lg"
								onClick={handleSaving}
							>Save results in your account</Button>
							<Button
								className="save-as-pdf"
								color="primary"
								outline
								size="lg"
								onClick={handlePrint}
							>Save results as PDF</Button>
						</div>
					</div>)
				}
			</div>
		</div>);
}

export default Result;
