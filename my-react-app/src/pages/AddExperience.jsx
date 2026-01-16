import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import './AddExperience.css';

const AddExperience = () => {
  const navigate = useNavigate();
  const { addExperience } = useInterview();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    company: '',
    jobRole: '',
    experienceLevel: 'Fresher',
    result: 'Awaiting Result',
    anonymous: false,
    overallDifficulty: 'Medium',
    rounds: [{ name: '', topicsCovered: [], questions: '', difficulty: 'Medium' }],
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="add-experience">
        <div className="form-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render form if not authenticated
  if (!user) {
    return null;
  }

  const topics = ['DSA', 'React', 'HR', 'System Design', 'Other'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRoundChange = (index, field, value) => {
    const updatedRounds = [...formData.rounds];
    if (field === 'topicsCovered') {
      if (updatedRounds[index].topicsCovered.includes(value)) {
        updatedRounds[index].topicsCovered = updatedRounds[index].topicsCovered.filter(
          (t) => t !== value
        );
      } else {
        updatedRounds[index].topicsCovered.push(value);
      }
    } else {
      updatedRounds[index][field] = value;
    }
    setFormData((prev) => ({ ...prev, rounds: updatedRounds }));
  };

  const addRound = () => {
    setFormData((prev) => ({
      ...prev,
      rounds: [...prev.rounds, { name: '', topicsCovered: [], questions: '', difficulty: 'Medium' }],
    }));
  };

  const removeRound = (index) => {
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to add an experience');
      navigate('/login');
      return;
    }

    if (!formData.company.trim() || !formData.jobRole.trim()) {
      alert('Please fill in company name and job role');
      return;
    }

    if (
      formData.rounds.some(
        (round) => !round.name.trim() || round.topicsCovered.length === 0 || !round.questions.trim()
      )
    ) {
      alert('Please complete all round details');
      return;
    }

    try {
      const id = await addExperience(formData);
      alert('Experience submitted successfully!');
      navigate(`/experience/${id}`);
    } catch (error) {
      alert('Failed to submit experience: ' + error.message);
    }
  };

  return (
    <div className="add-experience">
      <div className="form-container">
        <h1>Share Your Interview Experience</h1>
        <p className="form-subtitle">Help others prepare by sharing your experience</p>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <section className="form-section">
            <h2>Basic Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company Name *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Google, Microsoft, Amazon"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobRole">Job Role *</label>
                <input
                  type="text"
                  id="jobRole"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  placeholder="e.g., SDE Intern, Frontend Developer"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experienceLevel">Experience Level *</label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                >
                  <option>Intern</option>
                  <option>Fresher</option>
                  <option>1-3 Years</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="overallDifficulty">Overall Difficulty *</label>
                <select
                  id="overallDifficulty"
                  name="overallDifficulty"
                  value={formData.overallDifficulty}
                  onChange={handleInputChange}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="result">Final Result *</label>
                <select
                  id="result"
                  name="result"
                  value={formData.result}
                  onChange={handleInputChange}
                >
                  <option>Selected</option>
                  <option>Rejected</option>
                  <option>Awaiting Result</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                  />
                  Submit Anonymously
                </label>
              </div>
            </div>
          </section>

          {/* Interview Rounds */}
          <section className="form-section">
            <h2>Interview Rounds</h2>
            <p className="section-info">Describe each round of your interview</p>

            {formData.rounds.map((round, index) => (
              <div key={index} className="round-card">
                <div className="round-header">
                  <h3>Round {index + 1}</h3>
                  {formData.rounds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRound(index)}
                      className="remove-btn"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`roundName-${index}`}>Round Name *</label>
                    <input
                      type="text"
                      id={`roundName-${index}`}
                      placeholder="e.g., Online Test, Technical, HR, Coding Round"
                      value={round.name}
                      onChange={(e) => handleRoundChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`roundDifficulty-${index}`}>Difficulty Level *</label>
                    <select
                      id={`roundDifficulty-${index}`}
                      value={round.difficulty}
                      onChange={(e) => handleRoundChange(index, 'difficulty', e.target.value)}
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Topics Covered * (Select at least one)</label>
                  <div className="checkbox-grid">
                    {topics.map((topic) => (
                      <label key={topic} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={round.topicsCovered.includes(topic)}
                          onChange={() => handleRoundChange(index, 'topicsCovered', topic)}
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor={`questions-${index}`}>Questions Asked *</label>
                  <textarea
                    id={`questions-${index}`}
                    placeholder="Describe the questions asked in this round..."
                    value={round.questions}
                    onChange={(e) => handleRoundChange(index, 'questions', e.target.value)}
                    rows={5}
                    required
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={addRound} className="add-round-btn">
              + Add Another Round
            </button>
          </section>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Experience
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExperience;
