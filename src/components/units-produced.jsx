import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function UnitsProduced({ pharmaData, startDate, endDate, darkMode }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const labels = filteredData.map(each => each.date);
    const values = filteredData.map(each => each.units_produced);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Units Produced",
                data: values,
                backgroundColor: "#E4AD2E",
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
                        text: "Units Produced",
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
            return <Bar data={data} options={options} />
        } else {
            const options = {
                responsive: true,
                plugins: {
                    legend: {position: "top"},
                    title: { display: true, text: "Units Produced" }
                },
                tooltip: {
                    backgroundColor: "black"
                }
            };
            return <Bar data={data} options={options} />
        }
}

export default UnitsProduced