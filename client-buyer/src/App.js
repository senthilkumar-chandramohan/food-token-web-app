import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import MainMenu from './modules/main-menu/MainMenu';
import ScanQRC from './modules/scan-qrc/ScanQRC';
import GenerateQRC from './modules/generate-qrc/GenerateQRC';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/scan-qrc" element={<ScanQRC />} />
          <Route path="/generate-qrc" element={<GenerateQRC sellerName="LLP Catering" address="0x9f7e7c6f2114C114bA070C82e30901aE6526F673" amount={20} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
