import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay.js';
import { ScaleLine, defaults as defaultControls } from 'ol/control.js';
import { Style, Fill, Stroke } from 'ol/style';
import { getDataForFeature, getMaxEarnings } from './data.js'; // <--- Import from Data Module

// 1. Define Style Function
const styleFunction = function (feature) {
  const stats = getDataForFeature(feature);
  const earnings = stats.earnings || 0;
  const max = getMaxEarnings();
  console.log(max)
  let fillColor = '#fff5f0';
  let zIndex = 0;

  if (earnings > 0 && max > 0) {
    const ratio = earnings / max;
    if (ratio > 0.5) fillColor = '#67000d';
    else if (ratio > 0.1) fillColor = '#a50f15';
    else if (ratio > 0.05) fillColor = '#cb181d';
    else if (ratio > 0.01) fillColor = '#ef3b2c';
    else fillColor = '#fc9272';
    zIndex = 10;
  }

  return new Style({
    stroke: new Stroke({ color: '#333', width: 1 }),
    fill: new Fill({ color: fillColor }),
    zIndex: zIndex
  });
};

// 2. Create Layers
export const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: './DATA/world.geojson',
    format: new GeoJSON(),
  }),
  title: 'all_games',
  visible: true,
  style: styleFunction,
});

const baseLayer = new TileLayer({ source: new OSM(), title: 'OpenStreetMap', visible: true });
const satLayer = new TileLayer({
  source: new XYZ({ url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', maxZoom: 19 }),
  title: 'Satellite', visible: false
});

// 3. Create Overlay (Popup container)
export const overlay = new Overlay({
  element: document.getElementById('popup'),
  autoPan: { animation: { duration: 250 } },
});

// 4. Create Map
export const map = new Map({
  target: 'map',
  layers: [baseLayer, satLayer, vectorLayer],
  view: new View({ center: [0, 0], zoom: 2 }),
  overlays: [overlay],
  controls: defaultControls().extend([new ScaleLine()]),
});

// Helper to refresh layer when data loads
export function refreshMapData() {
  vectorLayer.changed();
}