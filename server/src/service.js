const Path = require('path')
const PyConnector = require('pyconnector')

// create connector
const PyAPI = new PyConnector({
    endpoint: 24001,
    //path: Path.join('', 'D:\\nlpforcoursework\\service.py')
});

(async () => {
    console.log('Available Python routes:', await PyAPI.routes())
    console.log('Python version:', await PyAPI.query('pyversion'))
    const value = await PyAPI.query('value', {text})
    console.log(value)
    PyAPI.end()
})()
