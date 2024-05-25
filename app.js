async function fetchData() {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function processData(geoData) {
    return geoData.features.map(feature => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        magnitude: feature.properties.mag,
        time: new Date(feature.properties.time),
        depth: feature.geometry.coordinates[2]
    }));
}

// Appeler la fonction pour récupérer les données
fetchData()
    .then(rawData => {
        const processedData = processData(rawData);
        plotWorldMap(processedData);
        plotMagnitudeHistogram(processedData);
        plotTimeSeries(processedData);
        plotDepthMagnitudeScatter(processedData);
    })
    .catch(error => console.error('Erreur :', error));
