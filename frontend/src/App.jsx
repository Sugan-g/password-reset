import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navbar Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
