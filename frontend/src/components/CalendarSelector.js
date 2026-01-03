import React from 'react';

function CalendarSelector({ calendars, selectedCalendar, onSelectCalendar }) {
  return (
    <div className="component-card calendar-selector">
      <h2>📅 Select Calendar</h2>
      <select
        value={selectedCalendar}
        onChange={(e) => onSelectCalendar(e.target.value)}
      >
        <option value="">-- Select a calendar --</option>
        {calendars.map((calendar) => (
          <option key={calendar.id} value={calendar.id}>
            {calendar.summary} {calendar.primary ? '(Primary)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CalendarSelector;
