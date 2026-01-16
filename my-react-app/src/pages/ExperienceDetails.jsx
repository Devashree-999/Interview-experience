import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import './ExperienceDetails.css';

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExperienceById } = useInterview();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const exp = getExperienceById(id);
    setExperience(exp);
  }, [id, getExperienceById]);

  if (!experience) {
    return (
      <div className="experience-details">
        <div className="details-container">
          <div className="not-found">
            <h2>Experience Not Found</h2>
            <p>The interview experience you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="back-btn">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  const getResultColor = (result) => {
    switch (result) {
      case 'Selected':
        return '#d4edda';
      case 'Rejected':
        return '#f8d7da';
      case 'Awaiting Result':
        return '#fff3cd';
      default:
        return '#e9ecef';
    }
  };

  return (
    <div className="experience-details">
      <div className="details-container">
        <button onClick={() => navigate('/search')} className="back-btn">
          ← Back to Search
        </button>

        <div className="details-header">
          <div className="header-info">
            <h1>{experience.company}</h1>
            <p className="job-role-text">{experience.jobRole}</p>
          </div>
          <div className="header-badges">
            <span
              className="badge difficulty"
              style={{ backgroundColor: getDifficultyColor(experience.overallDifficulty) }}
            >
              {experience.overallDifficulty}
            </span>
            <span className="badge experience">{experience.experienceLevel}</span>
          </div>
        </div>

        <div className="details-meta">
          <div className="meta-item">
            <strong>Result:</strong>
            <span
              className="result-badge"
              style={{ backgroundColor: getResultColor(experience.result) }}
            >
              {experience.result}
            </span>
          </div>
          <div className="meta-item">
            <strong>Submitted:</strong>
            <span>{experience.submittedAt}</span>
          </div>
          {experience.anonymous && (
            <div className="meta-item">
              <strong>Status:</strong>
              <span className="anonymous">Anonymous Submission</span>
            </div>
          )}
          <div className="meta-item">
            <strong>Total Rounds:</strong>
            <span>{experience.rounds.length}</span>
          </div>
        </div>

        <div className="rounds-section">
          <h2>Interview Rounds</h2>

          {experience.rounds.map((round, index) => (
            <div key={index} className="round-detail">
              <div className="round-title">
                <h3>Round {index + 1}: {round.roundName || round.name}</h3>
                {round.difficulty && (
                  <span
                    className="round-difficulty"
                    style={{ backgroundColor: getDifficultyColor(round.difficulty) }}
                  >
                    {round.difficulty}
                  </span>
                )}
              </div>

              <div className="topics-section">
                <strong>Topics Covered:</strong>
                <div className="topics-list">
                  {round.topicsCovered && round.topicsCovered.map((topic) => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="questions-section">
                <strong>Questions Asked:</strong>
                <div className="questions-content">
                  {Array.isArray(round.questions) ? (
                    round.questions.map((q, idx) => <p key={idx}>• {q}</p>)
                  ) : (
                    <p>• {round.questions}</p>
                  )}
                </div>
              </div>

              {round.experience && (
                <div className="experience-section">
                  <strong>Experience:</strong>
                  <p>{round.experience}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="details-footer">
          <p>Found this experience helpful?</p>
          <div className="action-buttons">
            <button onClick={() => navigate('/search')} className="continue-browsing">
              Continue Browsing
            </button>
            <button onClick={() => navigate('/add-experience')} className="share-experience">
              + Share Your Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
