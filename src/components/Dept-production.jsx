import engineeringIcon from "../assets/engineering.svg"
import engineeringWhiteIcon from "../assets/engineering_white.svg"
import vaccineIcon from "../assets/vaccine.svg"
import vaccineWhiteIcon from "../assets/vaccine_white.svg"
import immuneIcon from "../assets/immunology.svg"
import immuneWhiteIcon from "../assets/immunology_white.svg"

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function DeptProduction({ pharmaData, startDate, endDate, darkMode}) {
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
        <div className="dept-container" style={
            darkMode
              ? { backgroundColor: "#757575" }
              : { backgroundColor: "#D9D9D9" }
          }>
            <h3 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Production by Department</h3>
            <div className="engineering">
                {
                    darkMode ?
                    <img src={engineeringWhiteIcon} alt="" /> :
                    <img src={engineeringIcon} alt="" />
                }
                <div className="values">
                    <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Engineering</p>
                    <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{engUnits}</h1>
                </div>
            </div>
            <div className="vaccination">
                {
                    darkMode ?
                    <img src={vaccineWhiteIcon} alt="" /> :
                    <img src={vaccineIcon} alt="" />
                }
                <div className="values">
                    <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Vaccination</p>
                    <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{vacUnits}</h1>
                </div>
            </div>
            <div className="immunology">
                {
                    darkMode ?
                    <img src={immuneWhiteIcon} alt="" /> :
                    <img src={immuneIcon} alt="" />
                }
                <div className="values">
                    <p style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Immunology</p>
                    <h1 style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>{immUnit}</h1>
                </div>
            </div>
        </div>
    )
}

export default DeptProduction