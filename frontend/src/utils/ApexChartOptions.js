export const get_chart_options = (y_axis_title, colors=null, show_revenue=true) => {
    return {
        chart: {
            type: 'bar',
            stacked: false,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    console.log("Apex Chart Clicked", config, chartContext);
                }
            }
        },
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: '20px',
        colors: (!colors ? ['#66DA26', '#546E7A', '#E91E63', '#FF9800' ] : colors),
        plotOptions: {
            bar: {
                borderRadius: 3,
                horizontal: false,
                columnWidth: '60%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return (show_revenue) ? `$${val}K` : `${val}`
            },
            offsetY: -20,
            style: {
                fontSize: '14px',
                fontWeight: 'thin',
                colors: ["#909090"]
            },
        },
        stroke: {
            show: true, width: 2,
        },
        xaxis: {
            categories: []
        },
        yaxis: {
            title: {
                text: y_axis_title,
                style: {
                    fontSize: '16px',
                    fontWeight: 'thin',
                    colors:['#909090'],
                }
            },
        },
        fill: {
            opacity: 0.5,
            colors: (!colors ? ['#66DA26', '#546E7A', '#E91E63', '#FF9800' ] : colors),

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return (show_revenue) ? `$${val} K` : `${val}`
                }
            }
        }
    }
}
