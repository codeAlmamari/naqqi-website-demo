import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './client/LandingPage';
import { VendorsList } from './client/VendorsList';
import { VendorProfile } from './client/VendorProfile';
import { BookingFlow } from './client/BookingFlow';
import { VendorDashboard } from './vendor/VendorDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendors" element={<VendorsList />} />
        <Route path="/vendor/:id" element={<VendorProfile />} />
        <Route path="/booking/:vendorId/service/:serviceId" element={<BookingFlow />} />
        
        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
