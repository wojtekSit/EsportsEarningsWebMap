import './style.css';
import { fetchGameList, loadGameData } from './data.js'; // Zmienione importy
import { refreshMapData } from './map.js';
import { initPopup, initSearch, initLayerSwitcher, initGameSelector } from './ui.js'; // + initGameSelector

// 1. Initialize UI Listeners
initPopup();
initSearch();
initLayerSwitcher();

// 2. Start App Flow
async function initApp() {
  try {
    console.log("Pobieranie listy gier...");
    
    // A. Pobierz listę gier z arkusza Index
    const games = await fetchGameList();
    
    if (games.length === 0) {
      alert("Nie znaleziono gier w arkuszu GameIndex!");
      return;
    }

    // B. Wypełnij dropdown i ustaw zachowanie przy zmianie
    initGameSelector(games, (selectedGid) => {
      // Callback: co robić jak user zmieni grę
      loadGameData(selectedGid, () => {
        console.log('Nowe dane załadowane, odświeżam mapę...');
        refreshMapData();
      });
    });

    // C. Załaduj pierwszą grę na start automatycznie
    const firstGameGid = games[0].gid;
    loadGameData(firstGameGid, () => {
      console.log('Dane startowe załadowane.');
      refreshMapData();
    });

  } catch (err) {
    console.error("Błąd inicjalizacji aplikacji:", err);
  }
}

initApp();