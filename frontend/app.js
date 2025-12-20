const API_BASE = "http://localhost:3000"; 
// 🔁 CHANGE THIS TO YOUR VERCEL URL AFTER DEPLOYING

/* ---------- MAP (Home page only) ---------- */
const mapDiv = document.getElementById("map");

let map;
if (mapDiv) {
  map = L.map("map").setView([40.4168, -3.7038], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
}

/* ---------- SEARCH BUTTON ---------- */
function searchCity() {
  const cityInput = document.getElementById("cityInput");

  if (!cityInput || cityInput.value.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  const city = cityInput.value.trim();
  console.log("Searching for:", city);

  fetch(`${API_BASE}/api/weather?city=${city}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then(data => {
      console.log("Forecast data:", data);
      localStorage.setItem("forecast", JSON.stringify(data));
      window.location.href = "forecast.html";
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("Failed to fetch weather data. Check console.");
    });
}

/* ---------- FORECAST PAGE ---------- */
const chartCanvas = document.getElementById("tempChart");

if (chartCanvas) {
  const stored = localStorage.getItem("forecast");

  if (!stored) {
    alert("No forecast data found. Please search a city first.");
  } else {
    const forecast = JSON.parse(stored);

    const temps = forecast.map(day => day.temp);
    const labels = forecast.map(day => day.date);

    new Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Temperature (°C)",
          data: temps,
          borderWidth: 3,
          tension: 0.3
        }]
      }
    });
  }
}
