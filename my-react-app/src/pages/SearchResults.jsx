import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { ExperienceCard } from '../components/ExperienceCard';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { filterExperiences, experiences } = useInterview();
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('q') || '';

  const [filters, setFilters] = useState({
    company: searchQuery,
    role: '',
    topic: '',
    difficulty: '',
    experienceLevel: '',
  });

  const topics = ['DSA', 'React', 'HR', 'System Design'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const experienceLevels = ['Intern', 'Fresher', '1-3 Years'];

  const filteredResults = useMemo(() => {
    let results = filterExperiences(filters);

    if (filters.company || filters.role || filters.difficulty || filters.experienceLevel || filters.topic) {
      return results;
    }

    return experiences;
  }, [filters, filterExperiences, experiences]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      company: '',
      role: '',
      topic: '',
      difficulty: '',
      experienceLevel: '',
    });
  };

  const isFiltered = Object.values(filters).some((value) => value !== '');

  return (
    <div className="search-results">
      <div className="results-container">
        <div className="results-header">
          <div className="header-top">
            <h1>Search Results</h1>
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
              ☰ Filters
            </button>
          </div>
          <p>Found {filteredResults.length} experience(s)</p>
        </div>

        <div className={`results-layout ${showFilters ? 'filters-open' : ''}`}>
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <button className="close-filters-btn" onClick={() => setShowFilters(false)}>✕</button>
            <div className="filters-header">
              <h3>Filters</h3>
              {isFiltered && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All
                </button>
              )}
            </div>

            <div className="filter-group">
              <label htmlFor="company-filter">Company Name</label>
              <input
                type="text"
                id="company-filter"
                placeholder="Search by company..."
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="role-filter">Job Role</label>
              <input
                type="text"
                id="role-filter"
                placeholder="Search by role..."
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Interview Topic</label>
              <div className="checkbox-options">
                <label className="checkbox-option">
                  <input
                    type="radio"
                    name="topic"
                    value=""
                    checked={filters.topic === ''}
                    onChange={() => handleFilterChange('topic', '')}
                  />
                  All Topics
                </label>
                {topics.map((topic) => (
                  <label key={topic} className="checkbox-option">
                    <input
                      type="radio"
                      name="topic"
                      value={topic}
                      checked={filters.topic === topic}
                      onChange={() => handleFilterChange('topic', topic)}
                    />
                    {topic}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Difficulty Level</label>
              <div className="checkbox-options">
                <label className="checkbox-option">
                  <input
                    type="radio"
                    name="difficulty"
                    value=""
                    checked={filters.difficulty === ''}
                    onChange={() => handleFilterChange('difficulty', '')}
                  />
                  All Levels
                </label>
                {difficulties.map((difficulty) => (
                  <label key={difficulty} className="checkbox-option">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={filters.difficulty === difficulty}
                      onChange={() => handleFilterChange('difficulty', difficulty)}
                    />
                    {difficulty}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Experience Level</label>
              <div className="checkbox-options">
                <label className="checkbox-option">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value=""
                    checked={filters.experienceLevel === ''}
                    onChange={() => handleFilterChange('experienceLevel', '')}
                  />
                  All Levels
                </label>
                {experienceLevels.map((level) => (
                  <label key={level} className="checkbox-option">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level}
                      checked={filters.experienceLevel === level}
                      onChange={() => handleFilterChange('experienceLevel', level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="results-main">
            {filteredResults.length > 0 ? (
              <div className="results-grid">
                {filteredResults.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h2>No Experiences Found</h2>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="try-again-btn">
                  Clear Filters
                </button>
                <button onClick={() => navigate('/add-experience')} className="add-exp-btn">
                  + Share Your Experience
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
