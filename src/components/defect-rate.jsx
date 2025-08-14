import { Line } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(num => parseInt(num, 10));
  return new Date(2000 + year, month - 1, day); // year -> 2025
}

function DefectRate({ pharmaData, startDate, endDate }) {
    const filteredData = pharmaData.filter(item => {
        const itemDate = parseCustomDate(item.date)
        return itemDate >= startDate && itemDate <= endDate
    })

    const labels = filteredData.map(each => each.date);
    const values = filteredData.map(each => each.defect_rate_pct);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Defect Rate/%",
                data: values,
                borderColor: "#E4AD2E",
                backgroundColor: "#f5f5f5",
                tension: 0.3 
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {position: "top"},
            title: { display: true, text: "Defect Rate" }
        }
    };

    return <Line data={data} options={options} />
}

export default DefectRate