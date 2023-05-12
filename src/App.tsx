import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Host from 'app/Host/Host'
import DashboardPage from 'app/pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Host/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App
