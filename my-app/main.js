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
      params: { 'LAYERS': 'EsportsEarnings:World_map' },
      serverType: 'geoserver',
    }),
    title: 'World_Map',
    type: 'base',
    visible: false
  }),
  //FORTNITE
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:fortniteearnings2020' },
      serverType: 'geoserver',
    }),
    title: 'fortniteearnings2020',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:fortniteearnings2021' },
      serverType: 'geoserver',
    }),
    title: 'fortniteearnings2021',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:fortniteearnings2022' },
      serverType: 'geoserver',
    }),
    title: 'fortniteearnings2022',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:fortniteearnings2023' },
      serverType: 'geoserver',
    }),
    title: 'fortniteearnings2023',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:fortniteearnings2024' },
      serverType: 'geoserver',
    }),
    title: 'fortniteearnings2024',
    type: 'base',
    visible: false
  }),
  //LEAGUEOFLEGENDS
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:lolearnings2020' },
      serverType: 'geoserver',
    }),
    title: 'lolearnings2020',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:lolearnings2021' },
      serverType: 'geoserver',
    }),
    title: 'lolearnings2021',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:lolearnings2022' },
      serverType: 'geoserver',
    }),
    title: 'lolearnings2022',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:lolearnings2023' },
      serverType: 'geoserver',
    }),
    title: 'lolearnings2023',
    type: 'base',
    visible: false
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:lolearnings2024' },
      serverType: 'geoserver',
    }),
    title: 'lolearnings2024',
    type: 'base',
    visible: false
  }),
  //DOTA2
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:dotaearnings2020' },
      serverType: 'geoserver',
    }),
    title: 'dotaearnings2020',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:dotaearnings2021' },
      serverType: 'geoserver',
    }),
    title: 'dotaearnings2021',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:dotaearnings2022' },
      serverType: 'geoserver',
    }),
    title: 'dotaearnings2022',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:dotaearnings2023' },
      serverType: 'geoserver',
    }),
    title: 'dotaearnings2023',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:dotaearnings2024' },
      serverType: 'geoserver',
    }),
    title: 'dotaearnings2024',
    type: 'base',
    visible: false
  }),
  //STARCRAFT
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:starcraftearnings2020' },
      serverType: 'geoserver',
    }),
    title: 'starcraftearnings2020',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:starcraftearnings2021' },
      serverType: 'geoserver',
    }),
    title: 'starcraftearnings2021',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:starcraftearnings2022' },
      serverType: 'geoserver',
    }),
    title: 'starcraftearnings2022',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:starcraftearnings2023' },
      serverType: 'geoserver',
    }),
    title: 'starcraftearnings2023',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:starcraftearnings2024' },
      serverType: 'geoserver',
    }),
    title: 'starcraftearnings2024',
    type: 'base',
    visible: false
  }),
  //CSGO
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:csgoearnings2020' },
      serverType: 'geoserver',
    }),
    title: 'csgoearnings2020',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:csgoearnings2021' },
      serverType: 'geoserver',
    }),
    title: 'csgoearnings2021',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:csgoearnings2022' },
      serverType: 'geoserver',
    }),
    title: 'csgoearnings2022',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:csgoearnings2023' },
      serverType: 'geoserver',
    }),
    title: 'csgoearnings2023',
    type: 'base',
    visible: false
  }),

  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8081/geoserver/EsportsEarnings/wms',
      params: { 'LAYERS': 'EsportsEarnings:csgoearnings2024' },
      serverType: 'geoserver',
    }),
    title: 'csgoearnings2024',
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

  // Find the currently visible WMS layer
  const visibleLayers = layers.filter(layer => layer.getVisible() && layer.getSource() instanceof TileWMS);

  if (visibleLayers.length > 0) {
    const visibleLayer = visibleLayers[0];
    const infoFormat = 'application/json';
    const url = visibleLayer.getSource().getFeatureInfoUrl(
      coordinate,
      map.getView().getResolution(),
      map.getView().getProjection(),
      {
        'INFO_FORMAT': infoFormat,
        'QUERY_LAYERS': visibleLayer.getSource().getParams().LAYERS,
        'LAYERS': visibleLayer.getSource().getParams().LAYERS,
        'FEATURE_COUNT': 50  // Adjust as needed
      }
    );

    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            // Parse the feature information from the response
            data.features.forEach(feature => {
              // Format the information to display
              const featureInfo = `
              
              <p>Name: ${feature.properties["Player ID"]}</p>
              <p>Name: ${feature.properties["Total earnings(year)"]}</p>
            `;
              // Display the formatted feature information in the popup
              content.innerHTML += featureInfo;
            });
          } else {
            content.innerHTML += '<p>No feature information found at this location.</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching feature info:', error);
          content.innerHTML += '<p>Error fetching feature information.</p>';
        });
    } else {
      content.innerHTML += '<p>No feature information found at this location.</p>';
    }
  } else {
    content.innerHTML += '<p>No visible WMS layer to query.</p>';
  }
});
