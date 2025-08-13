import defectIcon from "../assets/defect.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIDefect({ pharmaData, startDate, endDate }) {
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
                <p>Defect Rate</p>
                <img src={defectIcon} alt="" />
            </div>
            <h1>{avgDefect}%</h1>
        </>
    )
}

export default KPIDefect