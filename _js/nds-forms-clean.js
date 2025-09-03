    // Date Picker functionality - now uses modular calendar system
    function initDatePicker(dateInput, formControl) {
        // Use the new modular calendar system
        if (typeof DatePickerCalendar !== 'undefined') {
            new DatePickerCalendar(dateInput, formControl);
        } else {
            console.warn('DatePickerCalendar not available. Make sure nds-calendar.js is loaded.');
        }
    }