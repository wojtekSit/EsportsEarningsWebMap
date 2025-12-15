import { map, vectorLayer, overlay } from './map.js';
import { getDataForFeature } from './data.js';

// Elements
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
const searchInput = document.getElementById('search-input');
const gameSelect = document.getElementById('game-selector'); // <--- NOWE

// 1. Popup Logic (Bez zmian)
export function initPopup() {
  closer.onclick = () => { overlay.setPosition(undefined); closer.blur(); return false; };

  map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
    
    if (feature) {
        const geoName = feature.get('shapeName');
        const stats = getDataForFeature(feature); 
  
        // SPRAWDZAMY CZY MAMY DANE O GRZE (Dla ogólnego rankingu)
        // Jeśli stats.game istnieje, tworzymy linię HTML. Jeśli nie - puszczamy pusty string.
        const topGameRow = stats.game 
          ? `<p><b>Top Game:</b> ${stats.game}</p>` 
          : ''; 
  
        // SPRAWDZAMY CZY MAMY PROCENTY (Dla ogólnego rankingu, jeśli były)
        const percentRow = stats.percent_of_total
          ? `<p><b>Udział:</b> ${stats.percent_of_total}</p>`
          : '';
  
        content.innerHTML = `
          <div style="min-width: 200px; font-family: sans-serif;">
            <h3 style="margin-top:0;">${geoName}</h3>
            <hr>
            <p><b>Zarobki:</b> $${stats.earnings ? stats.earnings.toLocaleString() : '0'}</p>
            <p><b>Gracze:</b> ${stats.number_of_players ? stats.number_of_players : 'N/A'}</p>
            ${topGameRow}
            ${percentRow}
          </div>
        `;
        overlay.setPosition(evt.coordinate);
      } else {
      overlay.setPosition(undefined);
    }
  });
}

// 2. Search Logic (Bez zmian)
export function initSearch() {
  const btn = document.getElementById('search-button');
  if(!btn) return; // zabezpieczenie

  btn.addEventListener('click', () => {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) return;

    const source = vectorLayer.getSource();
    const match = source.getFeatures().find(f => {
      const name = f.get('shapeName') || '';
      return name.toLowerCase().includes(term);
    });

    if (match) {
      const geom = match.getGeometry();
      map.getView().fit(geom.getExtent(), { duration: 1000, padding: [100,100,100,100] });
      // Możesz tu też otworzyć popup manualnie
    } else {
      alert('Nie znaleziono kraju');
    }
  });
}

// 3. Layer Switcher Logic (Bez zmian)
export function initLayerSwitcher() {
  document.querySelectorAll('input[name="layer"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const layerTitle = e.target.value;
      const isVisible = e.target.checked;
      
      map.getLayers().forEach(lyr => {
        if (lyr.get('title') === layerTitle) lyr.setVisible(isVisible);
      });
    });
  });
}

// 4. NOWE: Obsługa Wyboru Gry
export function initGameSelector(games, onGameChange) {
  if (!gameSelect) {
    console.error("Nie znaleziono elementu #game-selector w HTML!");
    return;
  }

  gameSelect.innerHTML = ''; // Wyczyść "Loading..."
  
  // Dodaj opcję domyślną/placeholder (opcjonalne)
  // const defaultOpt = document.createElement('option');
  // defaultOpt.text = "Wybierz grę...";
  // gameSelect.appendChild(defaultOpt);

  games.forEach(game => {
    const option = document.createElement('option');
    option.value = game.gid;
    option.textContent = game.name;
    gameSelect.appendChild(option);
  });

  // Listener zmiany
  gameSelect.addEventListener('change', (e) => {
    const selectedGid = e.target.value;
    onGameChange(selectedGid);
  });
}