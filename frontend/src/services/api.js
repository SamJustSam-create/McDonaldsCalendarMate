import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Auth endpoints
  getAuthUrl: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/url`);
    return response.data;
  },

  checkAuth: async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/status`);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  },

  // Calendar endpoints
  getCalendars: async () => {
    const response = await axios.get(`${API_BASE_URL}/calendar/list`);
    return response.data;
  },

  parseShift: async (text) => {
    const response = await axios.post(`${API_BASE_URL}/calendar/parse`, { text });
    return response.data;
  },

  createEvent: async (calendarId, eventDetails, attendees) => {
    const response = await axios.post(`${API_BASE_URL}/calendar/create`, {
      calendarId,
      eventDetails,
      attendees,
    });
    return response.data;
  },
};

export default api;
