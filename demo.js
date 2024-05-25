function plotWorldMap(data) {
    const locations = data.map(d => ({
        lon: d.longitude,
        lat: d.latitude,
        size: d.magnitude
    }));

    const trace = {
        type: 'scattergeo',
        mode: 'markers',
        lon: locations.map(d => d.lon),
        lat: locations.map(d => d.lat),
        marker: {
            size: locations.map(d => d.size * 5),
            color: locations.map(d => d.size),
            cmin: 0,
            cmax: 8,
            colorscale: 'Viridis',
            colorbar: {
                title: 'Magnitude',
                titleside: 'top',
                tickmode: 'array',
                tickvals: [0, 2, 4, 6, 8],
                ticktext: ['0', '2', '4', '6', '8'],
                ticks: 'outside'
            }
        }
    };

    const layout = {
        title: 'World Map of Earthquake Locations',
        geo: {
            projection: {
                type: 'natural earth'
            },
            showland: true,
            landcolor: 'white',
            countrycolor: 'black'
        }
    };

    Plotly.newPlot('earthquakeMap', [trace], layout);
}

function plotMagnitudeHistogram(data) {
    const magnitudes = data.map(d => d.magnitude);
    const trace = {
        x: magnitudes,
        type: 'histogram',
        marker: {
            color: 'rgba(100, 200, 102, 0.7)',
            line: {
                color: 'rgba(100, 200, 102, 1)',
                width: 1
            }
        }
    };

    const layout = {
        title: 'Histogram of Earthquake Magnitudes',
        xaxis: {title: 'Magnitude'},
        yaxis: {title: 'Count'},
        bargap: 0.05
    };

    Plotly.newPlot('magnitudeHistogram', [trace], layout);
}

function plotTimeSeries(data) {
    const dates = data.map(d => d.time);
    const counts = dates.reduce((acc, date) => {
        const dateStr = date.toISOString().slice(0, 10);
        acc[dateStr] = (acc[dateStr] || 0) + 1;
        return acc;
    }, {});

    const trace = {
        x: Object.keys(counts),
        y: Object.values(counts),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: 'red'
        }
    };

    const layout = {
        title: 'Daily Earthquake Frequency',
        xaxis: {title: 'Date'},
        yaxis: {title: 'Number of Earthquakes'}
    };

    Plotly.newPlot('timeSeriesChart', [trace], layout);
}

function plotDepthMagnitudeScatter(data) {
    const trace = {
        x: data.map(d => d.magnitude),
        y: data.map(d => d.depth),
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: data.map(d => d.magnitude),
            colorscale: 'Viridis',
            colorbar: {
                title: 'Magnitude'
            }
        }
    };

    const layout = {
        title: 'Magnitude vs Depth of Earthquakes',
        xaxis: {title: 'Magnitude'},
        yaxis: {title: 'Depth (km)'},
        showlegend: false
    };

    Plotly.newPlot('depthMagnitudeScatter', [trace], layout);
}
