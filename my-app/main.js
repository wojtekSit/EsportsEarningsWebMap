import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';


const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

const layers = [
  new TileLayer({
    source: new OSM(),
    title: 'OpenStreetMap',
    type: 'base',
    visible: true
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'layers': 'EsportsEarnings:World_map' },
      serverType: 'geoserver',
    }),
    title: 'World_Map',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'layers': 'EsportsEarnings:World_map2' },
      serverType: 'geoserver',
    }),
    title: 'World_map2',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'layers': 'EsportsEarnings:earnings_map' },
      serverType: 'geoserver',
    }),
    title: 'earnings_map',
    type: 'base',
    visible: false
  }),
];


const map = new Map({
  target: 'map',
  layers: layers,
  overlays: [overlay],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

// Function to change the layer visibility based on checkbox state
function changeLayer(layerTitle, visible) {
  const layer = layers.find(layer => layer.get('title') === layerTitle);
  if (layer) {
    layer.setVisible(visible);
  }
}
// Event listener for the checkboxes
document.querySelectorAll('input[name="layer"]').forEach(checkbox => {
  checkbox.addEventListener('change', function (e) {
    changeLayer(e.target.value, e.target.checked);
  });
});

// Map Handle Single Click and display Info
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  // Display clicked coordinates
  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);

  // Get feature info
  const infoFormat = 'application/json';
  const url = layers[1].getSource().getFeatureInfoUrl(
    coordinate,
    map.getView().getResolution(),
    map.getView().getProjection(),
    {
      'INFO_FORMAT': infoFormat,
      'FEATURE_COUNT': 50  // Adjust as needed
    }
  );

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Parse the feature information from the response
      const feature = data.features[0]; // Assuming only one feature is returned

      // Format the information to display
      const featureInfo = `
        <p>Name: ${feature.properties.name}</p>
        <p>Status: ${feature.properties.status}</p>
        <p>Continent: ${feature.properties.continent}</p>
        <p>Region: ${feature.properties.region}</p>
        <p>ISO Code: ${feature.properties.iso_3166_1_}</p>
        <!-- Add more properties as needed -->
      `;

      // Display the formatted feature information in the popup
      content.innerHTML += featureInfo;
    })
    .catch(error => {
      console.error('Error fetching feature info:', error);
    });

  fetch(url)

});
