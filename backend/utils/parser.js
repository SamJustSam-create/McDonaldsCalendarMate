/**
 * Parses shift schedule text and extracts relevant information
 * Handles optional fields gracefully
 */

function parseShiftSchedule(text) {
  const lines = text.trim().split('\n').map(line => line.trim()).filter(line => line);
  
  const result = {
    day: null,
    date: null,
    storeLocation: null,
    startTime: null,
    startDate: null,
    endTime: null,
    endDate: null,
    breakStart: null,
    breakEnd: null,
    totalHours: null,
    breakHours: null,
    area: null,
  };

  for (let line of lines) {
    // Parse first line: Day and Date (e.g., "Thursday 01/Jan/2026")
    if (!result.date && /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i.test(line)) {
      const match = line.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(.+)$/i);
      if (match) {
        result.day = match[1];
        result.date = match[2];
      }
      continue;
    }

    // Parse store location (usually second line, all caps or mixed)
    if (!result.storeLocation && !line.toLowerCase().includes('start') && 
        !line.toLowerCase().includes('finish') && !line.toLowerCase().includes('break') &&
        !line.toLowerCase().includes('hrs') && result.date) {
      result.storeLocation = line;
      continue;
    }

    // Parse start time (e.g., "Start 7:30 AM Thursday 01/Jan/2026")
    if (line.toLowerCase().startsWith('start')) {
      const match = line.match(/Start\s+(\d{1,2}:\d{2}\s*[AP]M)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?\s*(.+)?$/i);
      if (match) {
        result.startTime = match[1].trim();
        result.startDate = match[3] ? match[3].trim() : result.date;
      }
      continue;
    }

    // Parse finish time (e.g., "Finish 3:30 PM Thursday 01/Jan/2026")
    if (line.toLowerCase().startsWith('finish')) {
      const match = line.match(/Finish\s+(\d{1,2}:\d{2}\s*[AP]M)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?\s*(.+)?$/i);
      if (match) {
        result.endTime = match[1].trim();
        result.endDate = match[3] ? match[3].trim() : result.date;
      }
      continue;
    }

    // Parse break time (e.g., "Break time 11:30 AM - 12:00 PM")
    if (line.toLowerCase().includes('break time')) {
      const match = line.match(/Break time\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
      if (match) {
        result.breakStart = match[1].trim();
        result.breakEnd = match[2].trim();
      }
      continue;
    }

    // Parse total hours (e.g., "7:30hrs +0:30hrs Break")
    if (line.toLowerCase().includes('hrs')) {
      const hoursMatch = line.match(/(\d+:\d+)hrs/);
      if (hoursMatch) {
        result.totalHours = hoursMatch[1];
      }
      const breakMatch = line.match(/\+(\d+:\d+)hrs\s*Break/i);
      if (breakMatch) {
        result.breakHours = breakMatch[1];
      }
      continue;
    }

    // Parse area (usually last line with colons or specific format)
    if (!result.area && (line.includes(':') || line.includes('DT') || line.includes('OTC'))) {
      result.area = line;
    }
  }

  return result;
}

/**
 * Converts parsed shift data to Google Calendar event format
 */
function createEventFromShift(shiftData) {
  // Parse date and time into ISO format
  const startDateTime = parseDateTime(shiftData.startDate || shiftData.date, shiftData.startTime);
  const endDateTime = parseDateTime(shiftData.endDate || shiftData.date, shiftData.endTime);

  // Build description
  let description = '';
  if (shiftData.storeLocation) {
    description += `Location: ${shiftData.storeLocation}\n`;
  }
  if (shiftData.breakStart && shiftData.breakEnd) {
    description += `Break: ${shiftData.breakStart} - ${shiftData.breakEnd}\n`;
  }
  if (shiftData.totalHours) {
    description += `Total Hours: ${shiftData.totalHours}`;
    if (shiftData.breakHours) {
      description += ` (Break: ${shiftData.breakHours})`;
    }
    description += '\n';
  }
  if (shiftData.area) {
    description += `Area: ${shiftData.area}\n`;
  }

  return {
    summary: 'Sam - Work',
    location: shiftData.storeLocation || '',
    description: description.trim(),
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
}

/**
 * Parses date and time strings into ISO 8601 format
 * Expected formats: "01/Jan/2026" or "1/Jan/2026" and "7:30 AM" or "7:30AM"
 */
function parseDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    throw new Error('Date and time are required');
  }

  // Parse date (e.g., "01/Jan/2026")
  const dateMatch = dateStr.match(/(\d{1,2})\/([A-Za-z]+)\/(\d{4})/);
  if (!dateMatch) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  const day = parseInt(dateMatch[1], 10);
  const monthStr = dateMatch[2];
  const year = parseInt(dateMatch[3], 10);

  // Convert month name to number
  const months = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  const month = months[monthStr.toLowerCase()];
  if (month === undefined) {
    throw new Error(`Invalid month: ${monthStr}`);
  }

  // Parse time (e.g., "7:30 AM" or "7:30AM")
  const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (!timeMatch) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }

  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const period = timeMatch[3].toUpperCase();

  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  // Create date object
  const date = new Date(year, month, day, hours, minutes, 0);
  
  // Return ISO 8601 format
  return date.toISOString();
}

module.exports = {
  parseShiftSchedule,
  createEventFromShift,
  parseDateTime
};
