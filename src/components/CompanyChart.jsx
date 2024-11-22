import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  chartLoadingSelector,
  chartErrorSelector,
  annualReportsSelector,
} from "../store/selectors/chartSelector";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchChart } from "../store/actions/chartActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompanyChart = ({ ticker }) => {
  const loading = useSelector(chartLoadingSelector);
  const error = useSelector(chartErrorSelector);
  const annualReports = useSelector(annualReportsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticker) {
      dispatch(fetchChart(ticker));
    }
  }, [ticker, dispatch]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading chart data...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Error loading chart data: {error}
      </p>
    );
  }

  if (!annualReports || annualReports.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No financial data available to display.
      </p>
    );
  }

  const fiscalDates = annualReports.map((report) => report.fiscalDateEnding);
  const totalRevenues = annualReports.map((report) =>
    parseInt(report.totalRevenue, 10)
  );

  const chartData = {
    labels: fiscalDates,
    datasets: [
      {
        label: "Total Revenue",
        data: totalRevenues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Total Revenue Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Financial Performance</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CompanyChart;
