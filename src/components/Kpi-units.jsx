import unitsIcon from "../assets/units.svg"
import unitsWhiteIcon from "../assets/units_white.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIUnitsProduced({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    console.log(filteredData)

    const unitsValues = filteredData.map(each => each.units_produced)
    let total = 0

    unitsValues.forEach(units => {
        total += units
    });

    return (
        <>
            <div className="title">
                <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Units Produced</p>
                {
                    darkMode ?
                    <img src={unitsWhiteIcon} alt="" /> :
                    <img src={unitsIcon} alt="" />
                }
            </div>
            <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{total}</h1>
        </>
    )
}

export default KPIUnitsProduced