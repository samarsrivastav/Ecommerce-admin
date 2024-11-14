import './App.css';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { SidebarComponent } from './components/Sidebar';
import { Error404 } from './components/Error404';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginComponent } from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    // console.log(token)
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <SidebarComponent />}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginComponent/>} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
          <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
