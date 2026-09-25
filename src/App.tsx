import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Public pages
import ManagedPage from '@/pages/ManagedPage';
import ContentStatus from '@/components/ContentStatus';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import AcademicLevels from '@/pages/AcademicLevels';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';

// Auth pages
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Student pages
import Dashboard from '@/pages/student/Dashboard';
import Courses from '@/pages/student/Courses';
import CourseDetail from '@/pages/student/CourseDetail';
import TopicLearning from '@/pages/student/TopicLearning';
import Practice from '@/pages/student/Practice';
import CaseLaw from '@/pages/student/CaseLaw';
import Progress from '@/pages/student/Progress';
import Library from '@/pages/student/Library';
import Notifications from '@/pages/student/Notifications';

// Account pages
import AccountLayout from '@/pages/account/AccountLayout';
import Profile from '@/pages/account/Profile';
import Subscriptions from '@/pages/account/Subscriptions';
import PaymentHistory from '@/pages/account/PaymentHistory';
import Security from '@/pages/account/Security';

// Payment pages
import Checkout from '@/pages/payment/Checkout';
import PaymentSuccess from '@/pages/payment/Success';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p role="status" className="p-8">Loading your account…</p>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const from = location.state?.from;
  const destination = typeof from?.pathname === 'string' && from.pathname.startsWith('/') && !from.pathname.startsWith('//')
    ? { pathname: from.pathname, search: from.search || '', hash: from.hash || '' }
    : '/dashboard';
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p role="status" className="p-8">Loading your account…</p>;
  if (isAuthenticated) return <Navigate to={destination} replace />;
  return <>{children}</>;
}

function Layout({ children, noFooter }: { children: React.ReactNode; noFooter?: boolean }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ContentStatus />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/academic-levels" element={<Layout><AcademicLevels /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          <Route path="/faq" element={<Layout><ManagedPage slug="faq" title="Frequently Asked Questions" /></Layout>} />
          <Route path="/terms" element={<Layout><ManagedPage slug="terms" title="Terms of Service" /></Layout>} />
          <Route path="/privacy" element={<Layout><ManagedPage slug="privacy" title="Privacy Policy" /></Layout>} />
          {/* Auth routes — redirect if logged in */}
          <Route path="/login" element={<PublicOnlyRoute><Layout noFooter><Login /></Layout></PublicOnlyRoute>} />
          <Route path="/signup" element={<PublicOnlyRoute><Layout noFooter><SignUp /></Layout></PublicOnlyRoute>} />
          <Route path="/forgot-password" element={<Layout noFooter><ForgotPassword /></Layout>} />

          <Route path="/reset-password" element={<Layout noFooter><ResetPassword /></Layout>} />

          {/* Protected student routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Layout><Courses /></Layout></ProtectedRoute>} />
          <Route path="/courses/:courseId" element={<ProtectedRoute><Layout><CourseDetail /></Layout></ProtectedRoute>} />
          <Route path="/courses/:courseId/topic/:topicId" element={<ProtectedRoute><TopicLearning /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><Layout><Practice /></Layout></ProtectedRoute>} />
          <Route path="/case-law" element={<ProtectedRoute><Layout><CaseLaw /></Layout></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Layout><Progress /></Layout></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />

          {/* Account routes */}
          <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/account/profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="security" element={<Security />} />
            <Route path="preferences" element={<Profile />} />
          </Route>

          {/* Payment routes */}
          <Route path="/checkout/:levelId" element={<ProtectedRoute><Layout noFooter><Checkout /></Layout></ProtectedRoute>} />
          <Route path="/payment/success" element={<ProtectedRoute><Layout noFooter><PaymentSuccess /></Layout></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
