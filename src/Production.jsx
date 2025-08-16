import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

import dashboardIcon from "./assets/dashboard.svg";
import productionIcon from "./assets/production.svg";
import darkModeIcon from "./assets/dark_mode.svg";
import lightModeIcon from "./assets/light_mode.svg"

import ProductionTable from "./components/Production-table";

function toInputDateFormat(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function Production() {
  const [pharmaData, setPharmaData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2025, 5, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 5, 31));
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    fetch("pharma_manufacturing.json")
      .then((response) => response.json())
      .then((data) => setPharmaData(data))
      .catch((err) => console.log(err));
  }, []);

  if (pharmaData) {
    return (
      <>
        <nav style={darkMode ? {backgroundColor: "#757575"} : {backgroundColor: "#D9D9D9"}}>
          <div className="dashboard">
            <img src={dashboardIcon} alt="dashboard icon" />
            <h1>
              <Link to="/" style={darkMode ? { textDecoration: "none", color: "#f5f5f5" } : { textDecoration: "none", color: "black" }}>
                Dashboard
              </Link>
            </h1>
          </div>
          <div className="production">
            <img src={productionIcon} alt="production icon" style={{boxShadow: "2px 2px 4px #E4AD2E"}} />
            <h1>
              <Link
                to="/production"
                style={darkMode ? { textDecoration: "none", color: "#f5f5f5", textShadow: "2px 2px 4px #E4AD2E" } : { textDecoration: "none", color: "black", textShadow: "2px 2px 4px #E4AD2E" }}
              >
                Production
              </Link>
            </h1>
          </div>
        </nav>
        <div className="container" style={darkMode ? {backgroundColor: "#404040"} : {backgroundColor: "white"}}>
          <header>
            <h1>Production Status</h1>
            <div className="right-header">
              <div className="dates">
                <label htmlFor="startDate" style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Start from:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={toInputDateFormat(startDate)}
                  onChange={(e) => {
                    const [y, m, d] = e.target.value.split("-");
                    setStartDate(new Date(y, m - 1, d));
                  }}
                />
                <label htmlFor="endDate" style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>End at:</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={toInputDateFormat(endDate)}
                  onChange={(e) => {
                    const [y, m, d] = e.target.value.split("-");
                    setEndDate(new Date(y, m - 1, d));
                  }}
                />
              </div>
              <button type="button" className="mode" onClick={toggleDarkMode}>
                {
                    darkMode ? 
                    <img src={lightModeIcon} alt="light mode" /> :
                    <img src={darkModeIcon} alt="dark mode" />
                }
              </button>
            </div>
          </header>
            <ProductionTable pharmaData={pharmaData} startDate={startDate} endDate={endDate} darkMode={darkMode} />
        </div>
      </>
    );
  }
}

export default Production;
