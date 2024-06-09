import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ data }) => {
    return <Pie data={data} />;
};

export default PieChart;
