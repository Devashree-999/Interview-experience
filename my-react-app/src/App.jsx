import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import AddExperience from './pages/AddExperience';
import SearchResults from './pages/SearchResults';
import ExperienceDetails from './pages/ExperienceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import './App.css';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
            💼 Interview Experience Platform
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
            <Link to="/search" className="nav-link" onClick={closeMobileMenu}>Browse</Link>
            <Link to="/add-experience" className="nav-link add-exp-link" onClick={closeMobileMenu}>+ Add Experience</Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <span className="nav-user">👤 {user.email}</span>
                    <button onClick={() => { logout(); closeMobileMenu(); }} className="nav-link logout-btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="nav-link" onClick={closeMobileMenu}>Login</Link>
                    <Link to="/register" className="nav-link register-btn" onClick={closeMobileMenu}>Register</Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Interview Experience Platform. Built with ❤️ for job seekers.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Router>
          <AppContent />
        </Router>
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
