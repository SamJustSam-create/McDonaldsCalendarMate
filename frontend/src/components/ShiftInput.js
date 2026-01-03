import React from 'react';

function ShiftInput({ value, onChange, onParse }) {
  const exampleText = `Thursday 01/Jan/2026
STRATH VILLAGE VIC
Start 7:30 AM Thursday 01/Jan/2026
Finish 3:30 PM Thursday 01/Jan/2026
Break time 11:30 AM - 12:00 PM
7:30hrs +0:30hrs Break
DT2:DT Intermediate - OTC`;

  return (
    <div className="component-card shift-input-container">
      <h2>📋 Paste Your Shift Schedule</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={exampleText}
      />
      <button onClick={onParse} className="parse-button">
        Parse Schedule
      </button>
    </div>
  );
}

export default ShiftInput;
