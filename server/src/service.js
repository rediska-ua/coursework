
import PyConnector from 'pyconnector';

// create connector
const PyAPI = new PyConnector({
    endpoint: 24001,
    //path: Path.join('', 'D:\\nlpforcoursework\\service.py')
});

(async () => {
    console.log('Available Python routes:', await PyAPI.routes())
    const value = await PyAPI.query('text', {text: "В Україні обрали нового презиндента. Їм став комік Михайло Галустян"})
    console.log(value)
    PyAPI.end()
})()
