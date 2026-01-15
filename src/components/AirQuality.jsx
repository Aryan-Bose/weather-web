export default function AirQuality({ air }) {
  const aqiMap = {
    1: "Good 😊",
    2: "Fair 🙂",
    3: "Moderate 😐",
    4: "Poor 😷",
    5: "Very Poor ☠️",
  };

  return (
    <div className="card">
      <h3>Air Quality</h3>
      <p>AQI: {aqiMap[air.main.aqi]}</p>
    </div>
  );
}
