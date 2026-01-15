export default function CurrentWeather({ data }) {
  const icon = data.weather[0].icon;

  return (
    <div className="card">
      <h2>{data.name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt="weather"
      />

      <p className="desc">{data.weather[0].description}</p>
      <h3>{Math.round(data.main.temp)}°C</h3>

      <p style={{ opacity: 0.85 }}>
      Feels like {Math.round(data.main.feels_like)}°C
      </p>

       <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>
      Updated {new Date(data.dt * 1000).toLocaleTimeString()}
      </p>


      <div className="stats">
        <span>💧 {data.main.humidity}%</span>
        <span>💨 {data.wind.speed} m/s</span>
      </div>
    </div>
  );
}
