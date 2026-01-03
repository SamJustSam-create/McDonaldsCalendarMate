# CalendarMate - Feature Guide

## 🎨 Application Flow

### 1. Login Screen
When you first open the app, you'll see:
- 📅 CalendarMate title with emoji
- Brief description
- "Login with Google" button
- Beautiful gradient purple background

**What happens when you click login:**
- Redirects to Google OAuth
- You authenticate with your Google account
- Grant calendar permissions
- Redirected back to the app

---

### 2. Main Dashboard (After Login)

#### Header Section
- **Left**: 📅 CalendarMate logo
- **Right**: "Logout" button

#### Section 1: Shift Input
- **Title**: 📋 Paste Your Shift Schedule
- **Component**: Large textarea
- **Placeholder**: Shows example format
- **Button**: "Parse Schedule" (purple button)

**What you do:**
1. Paste your shift schedule text
2. Click "Parse Schedule"

---

#### Section 2: Parsed Preview (appears after parsing)
- **Style**: Light gray box with purple left border
- **Title**: "Parsed Information"
- **Shows**: Grid layout with:
  - Date
  - Start time
  - End time
  - Location
  - Break time (if provided)
  - Hours (if provided)

**Purpose**: Let you verify the parsing was correct

---

#### Section 3: Calendar Selector
- **Title**: 📅 Select Calendar
- **Component**: Dropdown menu
- **Options**: All your Google calendars
  - Shows "(Primary)" for main calendar
  - Auto-selects "Work Roster" if found

**What you do:**
- Select which calendar to add the event to

---

#### Section 4: Email Manager
- **Title**: ✉️ Add Guests (Optional)
- **Saved Emails Section**:
  - Shows list of previously saved emails
  - Each email has:
    - Checkbox to select as guest
    - Email address display
    - "Remove" button (red)

- **Add Email Section**:
  - Text input for new email
  - "Add Email" button (blue)
  - Press Enter or click to add

**Features:**
- Emails saved to localStorage (persistent)
- Email validation
- Duplicate prevention
- Quick checkbox selection

---

#### Section 5: Create Event
- **Component**: Large purple gradient button
- **Text**: "CREATE EVENT 🚀"
- **State**: 
  - Enabled: Purple gradient, clickable, hover effects
  - Disabled: Gray, not clickable

**What happens when clicked:**
1. Creates event in selected calendar
2. Shows success message
3. Opens event in Google Calendar (new tab)
4. Resets form for next entry

---

## 🎯 Created Event Details

When an event is created, it includes:

### Event Title
```
Sam - Work
```

### Date & Time
- Start: Parsed from your input
- End: Parsed from your input
- Timezone: Australia/Melbourne (configurable)

### Location
```
STRATH VILLAGE VIC
(or whatever location was in your shift)
```

### Description
```
Location: STRATH VILLAGE VIC
Break: 11:30 AM - 12:00 PM
Total Hours: 7:30 (Break: 0:30)
Area: DT2:DT Intermediate - OTC
```

### Guests
- Any emails you selected with checkboxes

### Show As
- **Free** (not Busy)
- This is key - you wanted events to show as Free

### Reminder
- 30 minutes before (popup)

---

## 💡 Smart Features

### 1. Flexible Parsing
The parser handles:
- ✅ Optional break times
- ✅ Optional hours worked
- ✅ Optional area information
- ✅ Various spacing formats
- ✅ Different time formats (7:30 AM vs 7:30AM)

### 2. Auto-Selection
- Automatically tries to select "Work Roster" calendar
- Falls back to first available calendar
- Remembers your selection during session

### 3. Email Persistence
- Saved emails persist across sessions
- Stored in browser localStorage
- No server storage needed (privacy)

### 4. Error Handling
- Validates email format
- Checks for required fields
- Shows clear error messages
- Graceful failure handling

### 5. Success Feedback
- Success alert when event created
- Direct link to view event
- Form resets for next entry
- Visual confirmation

---

## 📱 Responsive Design

### Desktop
- Centered layout (max-width 800px)
- Spacious padding
- Large buttons and inputs
- Easy to read text

### Mobile
- Adapts to smaller screens
- Touch-friendly buttons
- Readable font sizes
- Single column layout for grids

---

## 🎨 Color Scheme

### Primary Colors
- **Purple**: #667eea
- **Dark Purple**: #764ba2
- **Light Blue**: #48dbfb
- **Red**: #ff4757

### Backgrounds
- **Main**: Purple gradient (135deg)
- **Cards**: White with shadow
- **Previews**: Light gray (#f8f9fa)

### States
- **Hover**: Slight lift + shadow increase
- **Disabled**: Gray (#ccc)
- **Focus**: Purple border

---

## 🔄 User Flow Example

1. **User pastes this:**
   ```
   Thursday 01/Jan/2026
   STRATH VILLAGE VIC
   Start 7:30 AM Thursday 01/Jan/2026
   Finish 3:30 PM Thursday 01/Jan/2026
   Break time 11:30 AM - 12:00 PM
   7:30hrs +0:30hrs Break
   DT2:DT Intermediate - OTC
   ```

2. **Clicks**: "Parse Schedule"

3. **Sees**: Parsed preview showing all extracted info

4. **Selects**: "Work Roster" calendar (auto-selected)

5. **Optionally**: Checks boxes for "[email protected]", "[email protected]"

6. **Clicks**: "CREATE EVENT 🚀"

7. **Result**: 
   - Success message appears
   - Event opens in Google Calendar
   - Form clears
   - Ready for next shift

8. **In Google Calendar**:
   - Event title: "Sam - Work"
   - Date: January 1, 2026
   - Time: 7:30 AM - 3:30 PM
   - Location: STRATH VILLAGE VIC
   - Description: Full details with breaks
   - Guests: manager@ and colleague@
   - Shows as: Free
   - Reminder: 30 min before

---

## ⚡ Power User Tips

### Tip 1: Bulk Email Setup
Add all your common contacts first:
- Manager email
- Team lead email
- HR email
Then just check boxes for each shift

### Tip 2: Keyboard Shortcuts
- Paste: Ctrl+V in textarea
- Submit: Click Parse or Enter in email input
- Quick select: Tab through interface

### Tip 3: Multiple Shifts
Create multiple events in sequence:
1. Paste first shift → Parse → Create
2. Paste second shift → Parse → Create
3. Repeat as needed

### Tip 4: Verify Before Creating
Always check the parsed preview:
- Correct date?
- Correct times?
- Location looks good?
- Break time accurate?

### Tip 5: Calendar Organization
Use different calendars for:
- Work shifts
- On-call duties
- Training sessions
Select appropriate calendar each time

---

## 🎁 Hidden Features

### 1. Auto Date Format
Handles various date separators:
- 01/Jan/2026
- 1/Jan/2026
- 01/January/2026

### 2. Time Format Flexibility
Accepts:
- 7:30 AM
- 7:30AM
- 07:30 AM

### 3. Case Insensitive
Parsing works regardless of:
- UPPERCASE
- lowercase
- Mixed Case

### 4. Extra Whitespace
Handles:
- Extra spaces
- Extra line breaks
- Tabs vs spaces

---

## 🎯 What Makes CalendarMate Special

1. ✨ **One-Click Creation**: Paste, parse, create - done!
2. 🎨 **Beautiful UI**: Modern, clean, professional
3. 🧠 **Smart Parsing**: Understands various formats
4. 💾 **Saves Time**: No manual entry needed
5. 📧 **Guest Management**: Quick email selection
6. 🆓 **Free Status**: Events don't block your calendar
7. 🔄 **Repeatable**: Create many events quickly
8. 📱 **Responsive**: Works on any device
9. 🔒 **Secure**: OAuth 2.0 authentication
10. ☁️ **Cloud Hosted**: Access from anywhere

---

**Your work schedule management just got a whole lot easier!** 🎉
