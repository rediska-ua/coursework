const Path = require('path')
const PyConnector = require('pyconnector')

// create connector
const PyAPI = new PyConnector({
    endpoint: 24001,
    //path: Path.join('', 'D:\\nlpforcoursework\\service.py')
});

const sentData = async (text) => {
    console.log('Available Python routes:', await PyAPI.routes())
    console.log('Python version:', await PyAPI.query('pyversion'))
    const value = await PyAPI.query('text', {text});
    console.log(value);
    PyAPI.end();
    return value;
};

module.exports = {
    sentData
}

