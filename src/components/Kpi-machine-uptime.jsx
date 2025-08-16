import uptimeIcon from "../assets/uptime.svg"
import uptimeWhiteIcon from "../assets/uptime_white.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIMachineUptime({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const uptimeValues = filteredData.map(each => each.machine_uptime_pct)
    let total = 0;

    uptimeValues.forEach(uptime => {
        total += uptime
    });

    let avgUptime = Math.round(total / uptimeValues.length * 100)/100

    return (
        <>
            <div className="title">
                <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Machine uptime</p>
                {
                    darkMode ?
                    <img src={uptimeWhiteIcon} alt="" /> :
                    <img src={uptimeIcon} alt="" />
                }
            </div>
            <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{avgUptime}%</h1>
        </>
    )
}

export default KPIMachineUptime