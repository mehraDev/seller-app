import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from 'app/pages/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
