import React, { useState, useEffect } from 'react';

function EmailManager({ selectedEmails, onEmailsChange }) {
  const [savedEmails, setSavedEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');

  // Load saved emails from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calendarmate_emails');
    if (saved) {
      try {
        setSavedEmails(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved emails:', error);
      }
    }
  }, []);

  // Save emails to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarmate_emails', JSON.stringify(savedEmails));
  }, [savedEmails]);

  const handleAddEmail = () => {
    const trimmedEmail = newEmail.trim();
    if (!trimmedEmail) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check for duplicates
    if (savedEmails.includes(trimmedEmail)) {
      alert('This email is already in your list');
      return;
    }

    setSavedEmails([...savedEmails, trimmedEmail]);
    setNewEmail('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setSavedEmails(savedEmails.filter(email => email !== emailToRemove));
    onEmailsChange(selectedEmails.filter(email => email !== emailToRemove));
  };

  const handleToggleEmail = (email) => {
    if (selectedEmails.includes(email)) {
      onEmailsChange(selectedEmails.filter(e => e !== email));
    } else {
      onEmailsChange([...selectedEmails, email]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddEmail();
    }
  };

  return (
    <div className="component-card">
      <h2>✉️ Add Guests (Optional)</h2>
      
      {savedEmails.length > 0 && (
        <div className="email-list">
          {savedEmails.map((email) => (
            <div key={email} className="email-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(email)}
                  onChange={() => handleToggleEmail(email)}
                />
                {email}
              </label>
              <button
                onClick={() => handleRemoveEmail(email)}
                className="remove-email-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="add-email-form">
        <input
          type="email"
          placeholder="Enter email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddEmail} className="add-email-button">
          Add Email
        </button>
      </div>
    </div>
  );
}

export default EmailManager;
