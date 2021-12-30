interface DataForAnalysis {
	text: string
}

const getTestDataFromMongo = async () => {
	const response = fetch('http://localhost:8080/api',);
	const result = await response;
	return result.json();
};

const sendTextInfo = async (dataText: DataForAnalysis) => {
	const response = await fetch('http://localhost:8080/api/sentInfo', {
		method: 'POST',
		body: JSON.stringify(dataText),
		headers: {
			"Content-Type": "application/json"
		}
	});
	const data = await response.json();
	return data;
};

export { getTestDataFromMongo, sendTextInfo };
