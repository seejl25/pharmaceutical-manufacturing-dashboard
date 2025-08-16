import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, 
    ModuleRegistry, 
    colorSchemeLightCold, 
    colorSchemeDarkBlue, 
    themeAlpine } from 'ag-grid-community'; 
import "../Production.css"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const lightTheme = themeAlpine.withPart(colorSchemeLightCold)
const darkTheme = themeAlpine.withPart(colorSchemeDarkBlue)

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function ProductionTable({ pharmaData, startDate, endDate, darkMode}) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const StatusCell = (props) => {
    const colorMap = {
      Completed: "green",
      "In Progress": "orange",
      Halted: "red",
    };
    return (
      <span
        style={{
          background: colorMap[props.value],
          color: "white",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "0.8rem",
        }}
      >
        {props.value}
      </span>
    );
  };

    const rowData = filteredData.map(each => ({
        date: each.date,
        batch: each.batch_id,
        units: each.units_produced,
        operator: each.operator,
        dept: each.department,
        status: each.status
    }))

    const colNames = [
        { field: 'date', headerName: 'Start Date'},
        { field: "batch", headerName: "Batch ID" },
        { field: "units", headerName: "Units Produced" },
        { field: "operator", headerName: "Operator" },
        { field: "dept", headerName: "Department" },
        { field: "status", headerName: "Status", cellRenderer: StatusCell },
    ]

    return (
        <div className="ag-theme-alpine" style={{ height: 700, width: "100%" }}>
        <AgGridReact
        theme={darkMode ? darkTheme : lightTheme}
          rowData={rowData}
          columnDefs={colNames}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    )
}

export default ProductionTable