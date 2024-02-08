const API_KEY = '74b5df1947c70b3ad8f85af5d0765f1c';

function onGeoSuccess(position) {
  console.log(position);
  // 위도
  const lat = position.coords.latitude;
  // 경도
  const lon = position.coords.longitude;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = document.querySelector('.city');
      const temperature = document.querySelector('.weather-box .temperature');
      const image = document.querySelector('.weather-box img');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-detail .humidity span');
      const wind = document.querySelector('.weather-detail .wind span');
      console.log(data)
      city.innerHTML = `${data.name}`;
      temperature.innerHTML = `${parseInt(data.main.temp)} ℃`;
      description.innerHTML = `${data.weather[0].main}`;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `${data.wind.speed} KM/H`;

      switch(data.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;  
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src= 'images/cloud.png';    
          break;
        case 'Haze':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = '';  
      }
    });
}

function onGeoError () {
  alert('위치 정보를 가져올 수 없습니다.');
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);