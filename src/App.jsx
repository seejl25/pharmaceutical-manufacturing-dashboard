import { useEffect, useState } from "react";
import "./App.css";

import MachineUptimeLine from "./components/Machine-uptime";
import KPIMachineUptime from "./components/Kpi-machine-uptime";
import KPIUnitsProduced from "./components/Kpi-units";
import KPIDefect from "./components/Kpi-defect-rate";
import KPIEnergy from "./components/Kpi-energy";

import dashboardIcon from "./assets/dashboard.svg";
import productionIcon from "./assets/production.svg";
import darkMode from "./assets/dark_mode.svg";

function toInputDateFormat(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function App() {
  const [pharmaData, setPharmaData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2025, 5, 1))
  const [endDate, setEndDate] = useState(new Date(2025, 5, 31))

  useEffect(() => {
    fetch("pharma_manufacturing.json")
      .then((response) => response.json())
      .then((data) => setPharmaData(data))
      .catch((err) => console.log(err));
  }, []);

  if (pharmaData) {
    return (
      <>
        <nav>
          <div className="dashboard">
            <img src={dashboardIcon} alt="dashboard icon" />
            <h1>Dashboard</h1>
          </div>
          <div className="production">
            <img src={productionIcon} alt="production icon" />
            <h1>Production</h1>
          </div>
        </nav>
        <div className="container">
          <header>
            <h1>Manufacturing Dashboard</h1>
            <div className="right-header">
              <div className="dates">
                <label htmlFor="startDate">Start from:</label>
                <input 
                type="date" 
                id="startDate" 
                name="startDate" 
                value={toInputDateFormat(startDate)} 
                onChange={e => {
                  const [y,m,d] = e.target.value.split("-")
                  setStartDate(new Date(y, m-1, d))
                }}/>
                <label htmlFor="endDate">End at:</label>
                <input 
                type="date" 
                name="endDate" 
                id="endDate" 
                value={toInputDateFormat(endDate)} 
                onChange={e => {
                  const [y,m,d] = e.target.value.split("-")
                  setEndDate(new Date(y, m-1, d))
                }}/>
              </div>
              <button type="button" className="mode"><img src={darkMode} alt="dark mode" /></button>
            </div>
          </header>
          
          <div className="kpi-container">
          <div className="kpi">
            <KPIMachineUptime pharmaData={pharmaData} startDate={startDate} endDate={endDate}/>
          </div>
          <div className="kpi">
            <KPIUnitsProduced pharmaData={pharmaData} startDate={startDate} endDate={endDate} />
          </div>
          <div className="kpi">
            <KPIDefect pharmaData={pharmaData} startDate={startDate} endDate={endDate}/>
          </div>
          <div className="kpi">
            <KPIEnergy pharmaData={pharmaData} startDate={startDate} endDate={endDate}/>
          </div>
          </div>

          <div>
            <MachineUptimeLine pharmaData={pharmaData} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
