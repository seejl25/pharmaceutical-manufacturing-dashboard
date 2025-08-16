import { Line } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales,
);

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function MachineUptimeLine({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const labels = filteredData.map(each => each.date);
    const values = filteredData.map(each => each.machine_uptime_pct);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Machine Uptime/%",
                data: values,
                borderColor: "#E4AD2E",
                backgroundColor: "#f5f5f5",
                tension: 0.3 
            }
        ]
    };

    if (darkMode) {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: "#f5f5f5"
                    }
                },
                title: { 
                    display: true, 
                    text: "Machine Uptime",
                    color: "#f5f5f5" 
                }
            },
            tooltip: {
                backgroundColor: "black"
            },
            scales: {
                x: {
                    ticks: {
                        color: "#f5f5f5"
                    },
                    grid: {
                        color: "rgba(245,245,245,0.1)"
                    }
                },
                y: {
                    ticks: {
                        color: "#f5f5f5"
                    },
                    grid: {
                        color: "rgba(245,245,245,0.1)"
                    }
                }
            }
        };
        return <Line data={data} options={options} />
    } else {
        const options = {
            responsive: true,
            plugins: {
                legend: {position: "top"},
                title: { display: true, text: "Machine Uptime" }
            },
            tooltip: {
                backgroundColor: "black"
            }
        };
        return <Line data={data} options={options} />
    }
}

export default MachineUptimeLine