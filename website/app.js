/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '2720b14abd4e4278ddc5bce59c78f150';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//fetch GET request
const getWeather = async(url, zip, apiKey) => {
    const res = await fetch (`${url}?q${zip}&appid=${apiKey}`);
    try{
        const returnData = await res.json();
        return returnData;
    } catch (error){
        console.log(error);
    }
}

//POST request
const postWeather = async(url = '', userData = {}) => {
    const req = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: userData.temp,
            date: userData.date,
            content: userData.content,
        })
    });
    try{
        const newData = await req.json();
        return newData;
    } catch (error){
        console.log(error);
    }
}

//eventlistener
document.getElementById('generate').addEventListener('click', (e) => {
    e.preventDefault();
    //data entered by user (zip code - content)
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(url, zip, apiKey)
        .then((weatherData) => {
            //add data
            postWeather('/add', {
                temp: weatherData.main.temp,
                date: newDate,
                content,
            });
        }).then(() => updateContent())
});

//update page content function
async function updateContent(){
    const res = await fetch ('/weather');
    try{
        const weatherData = await res.json();
        document.getElementById('date').innerHTML = weatherData.date;
        document.getElementById('temp').innerHTML = weatherData.temp;
        document.getElementById('content').innerHTML = weatherData.content;
    } catch (error){
        console.log(error);
    }
}