import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Interview Experience Platform</h1>
          <p>Share & Learn from Real Interview Experiences at India's Top Companies</p>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by company name, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Use This Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Share Your Experience</h3>
              <p>Submit your interview experience and help others prepare better.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Search & Filter</h3>
              <p>Find experiences by company, role, topic, and difficulty level.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Learn & Prepare</h3>
              <p>Understand what questions are asked and ace your interviews.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community Driven</h3>
              <p>Built by job seekers, for job seekers. Share anonymously if you prefer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Share Your Story?</h2>
            <p>Sign in to add your interview experience and help the community!</p>
            <a href="/login" className="cta-btn">
              Sign In to Share
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
