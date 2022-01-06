interface AnalysisResult {
	inputText: string,
	verdict: boolean,
	date: string,
	original_source_text: string,
	source_keywords: string[],
	source_channel: string,
	picture: string,
	cosine_similarity: string,
	createdBy: string,
	isSaved: boolean
}

const getTestDataFromMongo = async () => {
	const response = fetch('http://localhost:8080/api',);
	const result = await response;
	return result.json();
};

const analyzeTextData = async (text: string, sources: string[]) => {
	const dataInfo =  {
		text,
		sources
	}
	const response = await fetch('http://localhost:8080/api/analyze/analyse_text', {
		method: 'POST',
		body: JSON.stringify(dataInfo),
		headers: {
			"Content-Type": "application/json"
		}
	});
	return await response.json();
};


const postResultData = async (dataObj: AnalysisResult) => {
	const response = await fetch('http://localhost:8080/api/analyze/sendResultInfo', {
		method: 'POST',
		body: JSON.stringify(dataObj),
		headers: {
			"Content-Type": "application/json"
		}
	});
	return await response.json();
};


const getResultDataById = async (id: string | undefined) => {
	const response = await fetch(`http://localhost:8080/api/analyze/result/${id}`)
	return await response.json();
}


const getResultsByUser = async (id: string) => {
	const response = await fetch(`http://localhost:8080/api/analyze/getResultsByUser/${id}`);
	return await response.json();
};

const updateResultInfo = async (id: string | undefined, statement: boolean) => {
	const response = await fetch(`http://localhost:8080/api/analyze/result/${id}`, {
		method: "PUT",
		body: JSON.stringify(statement)
	})
	return await response.json();
}

const deleteResult = async (id: string) => {
	const response = await fetch(`http://localhost:8080/api/analyze/result/${id}`, {
		method: "DELETE",
	})
	return await response.json();
}


export { getTestDataFromMongo, analyzeTextData, postResultData, getResultDataById, getResultsByUser, updateResultInfo, deleteResult };
