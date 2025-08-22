import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <>
      <Header />
      <main className="container page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
