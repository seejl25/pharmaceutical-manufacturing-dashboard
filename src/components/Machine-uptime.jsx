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

function MachineUptimeLine({ pharmaData }) {
    const labels = pharmaData.map(each => each.date);
    const values = pharmaData.map(each => each.machine_uptime_pct);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Machine Uptime/%",
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.3 
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {position: "top"},
            title: { display: true, text: "Machine uptime" }
        }
    };

    return <Line data={data} options={options} />
}

export default MachineUptimeLine