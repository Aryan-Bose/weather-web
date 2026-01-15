const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("City not found");

  return res.json();
}

export async function getFullWeather(lat, lon) {
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const airRes = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!currentRes.ok || !forecastRes.ok || !airRes.ok) {
    throw new Error("Weather fetch failed");
  }

  const current = await currentRes.json();
  const forecast = await forecastRes.json();
  const air = await airRes.json();

  return {
    current,
    hourly: forecast.list.slice(0, 8),
    daily: forecast.list.filter((_, i) => i % 8 === 0).slice(0, 7),
    air: air.list[0],
  };
}

