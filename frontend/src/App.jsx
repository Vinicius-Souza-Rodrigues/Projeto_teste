import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const authRoutes = ['/login', '/register'];

  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      
      <Container customClass='start'>
        <Routes>
          <Route path='/' element={<Content />} />
          <Route path='/dashboard' element={<Content />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Container>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
