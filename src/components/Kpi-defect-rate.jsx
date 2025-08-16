import defectIcon from "../assets/defect.svg"
import defectWhiteIcon from "../assets/defect_white.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIDefect({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const defectValues = filteredData.map(each => each.defect_rate_pct)
    let total = 0
     
    defectValues.forEach(units => {
        total += units
    });

    let avgDefect = Math.round(total / defectValues.length * 100)/100
     
    return (
        <>
            <div className="title">
                <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Defect Rate</p>
                {
                    darkMode ?
                    <img src={defectWhiteIcon} alt="" /> :
                    <img src={defectIcon} alt="" />
                }
            </div>
            <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{avgDefect}%</h1>
        </>
    )
}

export default KPIDefect