import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageProvider';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PerfumeBuilder from './pages/PerfumeBuilder';
import BagsBuilder from './pages/BagsBuilder';
import EyewearBuilder from './pages/EyewearBuilder';
import WatchesBuilder from './pages/WatchesBuilder';
import AIAdvisorPage from './pages/AIAdvisorPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminQuotations from './pages/AdminQuotations';
import AdminPricing from './pages/AdminPricing';
import AdminFactories from './pages/AdminFactories';
import AdminMedia from './pages/AdminMedia';
import AdminAISettings from './pages/AdminAISettings';
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        {/* Public Website */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/builder/perfumes" element={<PerfumeBuilder />} />
          <Route path="/builder/bags" element={<BagsBuilder />} />
          <Route path="/builder/eyewear" element={<EyewearBuilder />} />
          <Route path="/builder/watches" element={<WatchesBuilder />} />
          <Route path="/ai-advisor" element={<AIAdvisorPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/quotations" element={<AdminQuotations />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/factories" element={<AdminFactories />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          <Route path="/admin/ai-settings" element={<AdminAISettings />} />
        </Route>

        {/* Auth / Fallback */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}
