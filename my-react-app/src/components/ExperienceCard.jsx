import React from 'react';
import { Link } from 'react-router-dom';
import './ExperienceCard.css';

export const ExperienceCard = ({ experience }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'Hard':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <Link to={`/experience/${experience.id}`} className="card-link">
      <div className="experience-card">
        <div className="card-header">
          <h3>{experience.company}</h3>
          <span
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(experience.overallDifficulty) }}
          >
            {experience.overallDifficulty}
          </span>
        </div>
        <div className="card-body">
          <p className="job-role">
            <strong>Role:</strong> {experience.jobRole}
          </p>
          <p className="experience-level">
            <strong>Experience Level:</strong> {experience.experienceLevel}
          </p>
          <p className="result">
            <strong>Result:</strong>
            <span
              className={`result-badge ${experience.result.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {experience.result}
            </span>
          </p>
          <p className="rounds-count">
            <strong>Rounds:</strong> {experience.rounds.length}
          </p>
        </div>
        <div className="card-footer">
          <span className="submitted-date">Submitted on {experience.submittedAt}</span>
          {experience.anonymous && <span className="anonymous-badge">Anonymous</span>}
        </div>
      </div>
    </Link>
  );
};
