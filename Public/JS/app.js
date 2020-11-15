const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.querySelector('#messageA');
const para2 = document.querySelector('#messageB');

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    para1.textContent = 'One Moment Please...';
    para2.textContent = '';
    const location = search.value;
    fetch('http://localhost:5050/weatherApp?address='+ location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                para1.textContent = data.error;
                para2.textContent = '';
            }
            else{
                para1.textContent = 'The Temperature in ' + data.location + ' is ' + data.temperature + ' Deg. Celcius!';
                para2.textContent = 'The Humidity is ' + data.humidity + '%';
            }
        })
    })
})