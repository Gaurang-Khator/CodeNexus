import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const PieChart = ({series,labels }) => {
    useEffect(() => {
        const options = {
            series,
            labels, // Updated labels
            chart: {
                type: "pie",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        // Cleanup
        return () => {
            chart.destroy();
        };
    }, [series,labels]); // Empty dependency array to ensure it only runs once on mount

    return <div id="chart" className="w-[500px]"></div>;
};

export default PieChart;
