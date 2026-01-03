import React from 'react';

function CreateEvent({ onCreateEvent, disabled }) {
  return (
    <div className="component-card create-event-container">
      <button
        onClick={onCreateEvent}
        className="create-event-button"
        disabled={disabled}
      >
        Create Event 🚀
      </button>
    </div>
  );
}

export default CreateEvent;
