document.getElementById("searchBtn").addEventListener("click", async () => {
const city = document.getElementById("cityInput").value.trim();
if (!city) return alert("Enter a city name");


const res = await fetch(`${AEMET_BASE}/maestro/municipios?api_key=${AEMET_API_KEY}`);
const data = await res.json();


const cityMatch = data.datos.find(m => m.nombre.toLowerCase() === city.toLowerCase());


if (!cityMatch) return alert("City not found");


localStorage.setItem("cityCode", cityMatch.id);
localStorage.setItem("cityName", cityMatch.nombre);


window.location.href = "forecast.html";
});