import energyIcon from "../assets/energy.svg"
import energyWhiteIcon from "../assets/energy_white.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIEnergy({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const energyValues = filteredData.map(each => each.energy_consumption_kwh)
    let total = 0

    energyValues.forEach(energy => {
        total += energy
    });

    total = Math.round(total * 100)/100

    return (
        <>
            <div className="title">
                <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Energy Consumption</p>
                {
                    darkMode ?
                    <img src={energyWhiteIcon} alt="" /> :
                    <img src={energyIcon} alt="" />
                }
            </div>
            <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{total}kWh</h1>
        </>
    )
}

export default KPIEnergy