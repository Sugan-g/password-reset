import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

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
