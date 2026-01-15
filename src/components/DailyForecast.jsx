export default function DailyForecast({ daily }) {
  return (
    <>
      <h3 className="section-title">7-Day Forecast</h3>

      {daily.map((d, i) => (
        <div className="day-row" key={i}>
          <span>
            {new Date(d.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </span>

          <img
            src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
            alt=""
          />

          <span>
            {Math.round(d.main.temp)}°C
          </span>
        </div>
      ))}
    </>
  );
}
