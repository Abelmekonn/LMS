import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CourseMonthlyChartProps {
    courseName: string;
    monthlyRegistrations: number[]; // Array of registration numbers for each month
}

const CourseMonthlyChart: React.FC<CourseMonthlyChartProps> = ({ courseName, monthlyRegistrations }) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Monthly labels
        datasets: [
            {
                label: `${courseName} Monthly Registrations`, // Chart label
                data: monthlyRegistrations, // Data from props
                borderColor: '#D346B1', // Line color
                backgroundColor: 'rgba(211, 70, 177, 0.2)', // Fill color
                fill: true, // Fill area under the line
                tension: 0.4, // Controls the curve of the line (zigzag effect with lower value)
                pointRadius: 5, // Size of points
                pointHoverRadius: 8, // Hover effect on points
                pointBorderColor: '#D346B1', // Color of points
                pointBackgroundColor: '#D346B1', // Fill color of points
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to grow vertically
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            title: {
                display: true,
                text: `Monthly Registrations for ${courseName}`,
                
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Registrations: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Ensures the chart starts at 0
            },
        },
    };

    return (
        <div style={{ height: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default CourseMonthlyChart;
