import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import MainMenu from './modules/main-menu/MainMenu';
import ScanQRC from './modules/scan-qrc/ScanQRC';
import GenerateQRC from './modules/generate-qrc/GenerateQRC';
import SetPhoneNumber from './modules/set-phone-number/SetPhoneNumber';
import ViewBalance from './modules/view-balance/ViewBalance';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/scan-qrc" element={<ScanQRC />} />
          <Route path="/set-phone-number" element={<SetPhoneNumber />} />
          <Route path="/view-balance" element={<ViewBalance />} />
          <Route path="/generate-qrc" element={<GenerateQRC sellerName="LLP Catering" accountID={localStorage.getItem('accountID')} amount={20} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
