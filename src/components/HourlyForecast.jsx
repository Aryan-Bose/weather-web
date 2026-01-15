export default function HourlyForecast({ hourly }) {
  return (
    <>
      <h3 className="section-title">Hourly Forecast</h3>

      <div className="scroll-row">
        {hourly.map((h, i) => (
          <div className="hour-card" key={i}>
            <p>{new Date(h.dt * 1000).getHours()}:00</p>

            <img
              src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
              alt=""
            />

            <p>{Math.round(h.main.temp)}°</p>
          </div>
        ))}
      </div>
    </>
  );
}

