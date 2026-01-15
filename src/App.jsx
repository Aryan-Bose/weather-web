import { useEffect, useState } from "react";
import { getFullWeather, getWeatherByCity } from "./services/weatherApi";

import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import AirQuality from "./components/AirQuality";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadByCity() {
    try {
      setLoading(true);
      const res = await getWeatherByCity(city);
      const full = await getFullWeather(res.coord.lat, res.coord.lon);
      setData(full);
      setError("");
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await getFullWeather(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setData(res);
        } catch {
          setError("Failed to load weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p className="center">Loading…</p>;
  if (error) return <p className="center error">{error}</p>;

  function getTempClass(temp) {
  if (temp <= 10) return "cold";
  if (temp <= 25) return "mild";
  return "hot";
}

const now = data.current.dt;
const sunrise = data.current.sys.sunrise;
const sunset = data.current.sys.sunset;
const isNight = now < sunrise || now > sunset;


  return (
    <div className={`container 
    ${data.current.weather[0].main.toLowerCase()} 
    ${getTempClass(data.current.main.temp)}
    ${isNight ? "night" : "day"}
  `}
>
      <h1 className="title">Weather Web 🌦️</h1>

      <input
        className="search"
        placeholder="Search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && loadByCity()}
      />

      <button className="btn" onClick={loadByCity}>
        Search
      </button>

      <CurrentWeather data={data.current} />
      <AirQuality air={data.air} />
      <HourlyForecast hourly={data.hourly} />
      <DailyForecast daily={data.daily} />
      <p
      style={{
      marginTop: "20px",
      fontSize: "0.75rem",
      opacity: 0.6,
      textAlign: "center",
       }}
     >
     Weather data provided by OpenWeather. Forecasts may vary due to
     real-time atmospheric changes and location precision.
     </p>

    </div>
  );
}

export default App;
