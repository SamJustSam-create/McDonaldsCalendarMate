import React, { useState, useEffect } from 'react';
import './App.css';
import ShiftInput from './components/ShiftInput';
import CalendarSelector from './components/CalendarSelector';
import EmailManager from './components/EmailManager';
import CreateEvent from './components/CreateEvent';
import api from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shiftText, setShiftText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
    
    // Check for auth callback
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
      setIsAuthenticated(true);
      // Clean up URL
      window.history.replaceState({}, document.title, '/');
    } else if (params.get('auth') === 'error') {
      alert('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  // Fetch calendars when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCalendars();
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const response = await api.checkAuth();
      setIsAuthenticated(response.authenticated);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.getAuthUrl();
      window.location.href = response.url;
    } catch (error) {
      console.error('Error getting auth URL:', error);
      alert('Failed to initiate login');
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setIsAuthenticated(false);
      setParsedData(null);
      setEventData(null);
      setCalendars([]);
      setSelectedCalendar('');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchCalendars = async () => {
    try {
      const response = await api.getCalendars();
      setCalendars(response.calendars);
      
      // Auto-select "Work Roster" if it exists
      const workRoster = response.calendars.find(cal => 
        cal.summary.toLowerCase().includes('work roster')
      );
      if (workRoster) {
        setSelectedCalendar(workRoster.id);
      } else if (response.calendars.length > 0) {
        setSelectedCalendar(response.calendars[0].id);
      }
    } catch (error) {
      console.error('Error fetching calendars:', error);
      alert('Failed to fetch calendars');
    }
  };

  const handleParseShift = async () => {
    if (!shiftText.trim()) {
      alert('Please enter shift information');
      return;
    }

    try {
      const response = await api.parseShift(shiftText);
      setParsedData(response.parsed);
      setEventData(response.eventData);
    } catch (error) {
      console.error('Error parsing shift:', error);
      alert('Failed to parse shift data: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCreateEvent = async () => {
    if (!selectedCalendar) {
      alert('Please select a calendar');
      return;
    }

    if (!eventData) {
      alert('Please parse shift data first');
      return;
    }

    try {
      const response = await api.createEvent(selectedCalendar, eventData, selectedEmails);
      alert('Event created successfully! 🎉');
      
      // Reset form
      setShiftText('');
      setParsedData(null);
      setEventData(null);
      setSelectedEmails([]);
      
      // Open event in new tab
      if (response.eventLink) {
        window.open(response.eventLink, '_blank');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="login-container">
          <h1>📅 CalendarMate</h1>
          <p>Automatically create work shift calendar events</p>
          <button onClick={handleLogin} className="login-button">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>📅 CalendarMate</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <main className="App-main">
        <ShiftInput 
          value={shiftText}
          onChange={setShiftText}
          onParse={handleParseShift}
        />

        {parsedData && (
          <div className="parsed-preview">
            <h3>Parsed Information</h3>
            <div className="preview-grid">
              <div><strong>Date:</strong> {parsedData.date}</div>
              <div><strong>Start:</strong> {parsedData.startTime}</div>
              <div><strong>End:</strong> {parsedData.endTime}</div>
              <div><strong>Location:</strong> {parsedData.storeLocation}</div>
              {parsedData.breakStart && (
                <div><strong>Break:</strong> {parsedData.breakStart} - {parsedData.breakEnd}</div>
              )}
              {parsedData.totalHours && (
                <div><strong>Hours:</strong> {parsedData.totalHours}</div>
              )}
            </div>
          </div>
        )}

        {eventData && (
          <>
            <CalendarSelector
              calendars={calendars}
              selectedCalendar={selectedCalendar}
              onSelectCalendar={setSelectedCalendar}
            />

            <EmailManager
              selectedEmails={selectedEmails}
              onEmailsChange={setSelectedEmails}
            />

            <CreateEvent
              onCreateEvent={handleCreateEvent}
              disabled={!selectedCalendar || !eventData}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
