import Papa from 'papaparse';

// Stan bazy danych
const state = {
  esportsData: {},
  maxEarnings: 0
};

// --- KONFIGURACJA ---
// 1. WKLEJ TU ID Z PASKA ADRESU (spomiędzy /d/ a /edit)
// NIE używaj linku "2PACX..."!
const SHEET_ID = '19yUIA-ng4bPIdcRABwjwczkjtfGTh_A0P4NGSndbquE'; 

// 2. To zostaw bez zmian - to magiczny link, który pozwala wybierać zakładki (gid)
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
// 1. Pobieranie listy gier (zakładamy, że GameIndex to gid=0)
// Jeśli GameIndex nie jest pierwszą zakładką, sprawdź jego gid w URL i zmień '0' poniżej.
export async function fetchGameList() {
  const response = await fetch(`${BASE_URL}&gid=537063812`); // Pobiera GameIndex
  const text = await response.text();
  
  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        // results.data to tablica [{ "Game Name": "Fortnite", "GID": "12345" }, ...]
        // Musimy dopasować klucze do tych z Twojego arkusza GameIndex
        // Apps Script dał nagłówki: "Game Name", "GID"
        const games = results.data
          .filter(r => r['Game Name'] && r['GID']) // Filtruj puste
          .map(r => ({
            name: r['Game Name'],
            gid: r['GID']
          }));
        resolve(games);
      }
    });
  });
}

// 2. Pobieranie danych konkretnej gry
export function loadGameData(gid, onLoadCallback) {
  // Resetujemy stan przed wczytaniem nowej gry
  state.esportsData = {};
  state.maxEarnings = 0;

  console.log(`Pobieranie danych dla GID: ${gid}...`);

  fetch(`${BASE_URL}&gid=${gid}`)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true, // Zamienia liczby na typ number
        skipEmptyLines: true,
        complete: function(results) {
          processData(results.data);
          if (onLoadCallback) onLoadCallback();
        }
      });
    });
}

// 3. Przetwarzanie (Dopasowane do kolumn ze skryptu: ID, country, earnings, number_of_players)
function processData(rows) {
  rows.forEach(row => {
    // Skrypt Apps Script generuje kolumny: "country", "earnings"
    if (row.country) {
      const cleanName = row.country.toString().trim().toLowerCase();
      
      // Parsowanie zarobków (na wszelki wypadek, gdyby dynamicTyping nie zadziałał przez przecinki)
      let earnings = row.earnings;
      if (typeof earnings === 'string') {
        // Usuń spacje i zamień przecinek na kropkę (jeśli tak przyszło)
        earnings = parseFloat(earnings.replace(/\s/g, '').replace(',', '.'));
      }

      row.earnings = earnings || 0; // Nadpisujemy wyczyszczoną wartością

      state.esportsData[cleanName] = row;

      if (row.earnings > state.maxEarnings) {
        state.maxEarnings = row.earnings;
      }
    }
  });
  console.log(`✅ Załadowano: ${Object.keys(state.esportsData).length} krajów. Max zarobki: ${state.maxEarnings}`);
}

// 4. Exporty (API dla Mapy)
export function getDataForFeature(feature) {
  const name = feature.get('shapeName'); // Upewnij się, że w GeoJSON masz 'shapeName'
  if (!name) return {};
  return state.esportsData[name.trim().toLowerCase()] || {};
}

export function getMaxEarnings() {
  return state.maxEarnings;
}