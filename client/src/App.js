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
import TransactionHistory from './modules/transaction-history/TransactionHistory';

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
          <Route path="/view-transactions" element={<TransactionHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
