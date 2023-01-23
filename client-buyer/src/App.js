import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import MainMenu from './modules/main-menu/MainMenu';
import ScanQRC from './modules/scan-qrc/ScanQRC';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/scan-qrc" element={<ScanQRC />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
