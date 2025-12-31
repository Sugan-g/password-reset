import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home = Login + Register */}
        <Route path="/" element={<Home />} />

        {/* Forgot & Reset */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
