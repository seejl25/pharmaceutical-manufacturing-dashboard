import energyIcon from "../assets/energy.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function KPIEnergy({ pharmaData, startDate, endDate }) {
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
                <p>Energy Consumption</p>
                <img src={energyIcon} alt="" />
            </div>
            <h1>{total}kWh</h1>
        </>
    )
}

export default KPIEnergy