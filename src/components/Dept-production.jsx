import engineeringIcon from "../assets/engineering.svg"
import vaccineIcon from "../assets/vaccine.svg"
import immuneIcon from "../assets/immunology.svg"
function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function DeptProduction({ pharmaData, startDate, endDate}) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    let engUnits = 0
    let vacUnits = 0
    let immUnit = 0

    filteredData.forEach(data => {
        switch (data.department) {
            case "Engineering":
                engUnits += data.units_produced
                break;
            case "Vaccination":
                vacUnits += data.units_produced
                break;
            case "Immunology":
                immUnit += data.units_produced
                break;
            default:
                break;
        }
    });

    return (
        <div className="dept-container">
            <h3>Production by Department</h3>
            <div className="engineering">
                <img src={engineeringIcon} alt="" />
                <div className="values">
                    <p>Engineering</p>
                    <h1>{engUnits}</h1>
                </div>
            </div>
            <div className="vaccination">
                <img src={vaccineIcon} alt="" />
                <div className="values">
                    <p>Vaccination</p>
                    <h1>{vacUnits}</h1>
                </div>
            </div>
            <div className="immunology">
                <img src={immuneIcon} alt="" />
                <div className="values">
                    <p>Immunology</p>
                    <h1>{immUnit}</h1>
                </div>
            </div>
        </div>
    )
}

export default DeptProduction