import express from 'express';
import fetch from 'node-fetch';
import { supabase } from '../supabaseClient.js';


const router = express.Router();


// API #1 — Retrieve cached data from DB
router.get('/:city', async (req, res) => {
const { city } = req.params;


const { data } = await supabase
.from('weather_cache')
.select('*')
.eq('city', city)
.order('created_at', { ascending: false })
.limit(1);


if (data.length > 0) {
return res.json(data[0]);
}


res.status(404).json({ message: 'No cached data' });
});


// API #2 — Fetch from AEMET, manipulate, and write to DB
router.post('/', async (req, res) => {
const { city, cityCode } = req.body;


const metaRes = await fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`);
const metaData = await metaRes.json();


const forecastRes = await fetch(metaData.datos);
const forecast = await forecastRes.json();


const simplifiedForecast = forecast[0].prediccion.dia.map(d => ({
date: d.fecha,
max: d.temperatura.maxima,
min: d.temperatura.minima
}));


await supabase.from('weather_cache').insert({
city,
city_code: cityCode,
forecast: simplifiedForecast
});


res.json(simplifiedForecast);
});


export default router;