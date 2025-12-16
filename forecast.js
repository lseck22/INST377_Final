const cityCode = localStorage.getItem("cityCode");
const cityName = localStorage.getItem("cityName");


document.getElementById("cityTitle").textContent = cityName;


async function loadForecast() {
// API #1: try DB first
const cacheRes = await fetch(`http://localhost:3000/api/weather/${cityName}`);


if (cacheRes.ok) {
const cached = await cacheRes.json();
renderChart(cached.forecast);
return;
}


// API #2: fetch external data + write to DB
const apiRes = await fetch('http://localhost:3000/api/weather', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ city: cityName, cityCode })
});


const freshData = await apiRes.json();
renderChart(freshData);
}


function renderChart(days) {
const labels = days.map(d => d.date);
const maxTemps = days.map(d => d.max);
const minTemps = days.map(d => d.min);


new Chart(document.getElementById('tempChart'), {
type: 'line',
data: {
labels,
datasets: [
{ label: 'Max Temp', data: maxTemps },
{ label: 'Min Temp', data: minTemps }
]
}
});
}

loadForecast();