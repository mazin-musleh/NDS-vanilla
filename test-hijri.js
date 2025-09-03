// Hijri Calendar Test Utility
// This file tests the mathematical Hijri calendar conversion functionality
// Run with: node test-hijri.js

console.log('='.repeat(60));
console.log('HIJRI CALENDAR CONVERSION TEST');
console.log('='.repeat(60));

// Import the Hijri calendar functions (simulate the calendar object)
var HijriCalendar = {
    // Gregorian to Julian Day conversion
    gregorianToJulianDay: function(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        var a = Math.floor(year / 100);
        var b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    },
    
    // Julian Day to Hijri conversion
    julianDayToHijri: function(jd) {
        // Hijri calendar starts on July 16, 622 CE (Julian Day 1948439.5)
        var hijriEpoch = 1948439.5;
        var daysSinceEpoch = jd - hijriEpoch;
        
        // Average Hijri year length (354.367 days)
        var averageYearLength = 354.367;
        var estimatedYear = Math.floor(daysSinceEpoch / averageYearLength) + 1;
        
        // Fine-tune the year calculation
        var yearStart = this.hijriYearStart(estimatedYear);
        if (jd < yearStart) {
            estimatedYear -= 1;
            yearStart = this.hijriYearStart(estimatedYear);
        }
        
        var nextYearStart = this.hijriYearStart(estimatedYear + 1);
        if (jd >= nextYearStart) {
            estimatedYear += 1;
            yearStart = nextYearStart;
        }
        
        // Calculate month and day
        var dayOfYear = Math.floor(jd - yearStart) + 1;
        var month = 1;
        var dayOfMonth = dayOfYear;
        
        for (var m = 1; m <= 12; m++) {
            var monthLength = this.hijriMonthLength(estimatedYear, m);
            if (dayOfMonth <= monthLength) {
                month = m;
                break;
            }
            dayOfMonth -= monthLength;
        }
        
        return {
            year: estimatedYear,
            month: month,
            day: dayOfMonth
        };
    },
    
    // Calculate start of Hijri year in Julian Days
    hijriYearStart: function(year) {
        var hijriEpoch = 1948439.5;
        var averageYearLength = 354.367;
        return hijriEpoch + (year - 1) * averageYearLength;
    },
    
    // Calculate length of Hijri month
    hijriMonthLength: function(year, month) {
        if (month < 1 || month > 12) return 0;
        
        // Base lengths: odd months 30 days, even months 29 days
        var baseLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        var length = baseLengths[month - 1];
        
        // Add leap day to last month in leap years
        if (month === 12 && this.isHijriLeapYear(year)) {
            length += 1;
        }
        
        return length;
    },
    
    // Determine if Hijri year is a leap year
    isHijriLeapYear: function(year) {
        // 11 leap years in every 30-year cycle
        var leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
        var cyclePosition = ((year - 1) % 30) + 1;
        return leapYears.includes(cyclePosition);
    },
    
    // Convert Gregorian date to Hijri
    gregorianToHijri: function(gregorianDate) {
        try {
            var jd = this.gregorianToJulianDay(
                gregorianDate.getFullYear(),
                gregorianDate.getMonth() + 1,
                gregorianDate.getDate()
            );
            return this.julianDayToHijri(jd);
        } catch (error) {
            return null;
        }
    },
    
    // Julian Day to Gregorian conversion
    julianDayToGregorian: function(jd) {
        var a = jd + 32044;
        var b = Math.floor((4 * a + 3) / 146097);
        var c = a - Math.floor((146097 * b) / 4);
        var d = Math.floor((4 * c + 3) / 1461);
        var e = c - Math.floor((1461 * d) / 4);
        var m = Math.floor((5 * e + 2) / 153);
        
        var day = Math.floor(e - Math.floor((153 * m + 2) / 5) + 1);
        var month = Math.floor(m + 3 - 12 * Math.floor(m / 10));
        var year = Math.floor(100 * b + d - 4800 + Math.floor(m / 10));
        
        return new Date(year, month - 1, day);
    },
    
    monthNames: {
        ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
        en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah']
    }
};

// Test Functions
function testBasicConversion() {
    console.log('\n1. BASIC DATE CONVERSION TEST');
    console.log('-'.repeat(40));
    
    var today = new Date();
    var jd = HijriCalendar.gregorianToJulianDay(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
    );
    
    var hijri = HijriCalendar.julianDayToHijri(jd);
    
    console.log('Today (Gregorian):', today.toDateString());
    console.log('Julian Day:', jd);
    console.log('Today (Hijri):', hijri.day + '/' + hijri.month + '/' + hijri.year);
    console.log('Today (Hijri EN):', hijri.day + ' ' + HijriCalendar.monthNames.en[hijri.month - 1] + ' ' + hijri.year + ' AH');
    console.log('Today (Hijri AR):', hijri.day + ' ' + HijriCalendar.monthNames.ar[hijri.month - 1] + ' ' + hijri.year + ' هـ');
}

function testMonthLengths() {
    console.log('\n2. HIJRI MONTH LENGTHS TEST');
    console.log('-'.repeat(40));
    
    var today = new Date();
    var hijri = HijriCalendar.gregorianToHijri(today);
    
    console.log('Month lengths for Hijri year', hijri.year + ':');
    var totalDays = 0;
    
    for (var m = 1; m <= 12; m++) {
        var days = HijriCalendar.hijriMonthLength(hijri.year, m);
        var monthName = HijriCalendar.monthNames.en[m - 1];
        console.log('  ' + m.toString().padStart(2) + '. ' + monthName.padEnd(20) + ': ' + days + ' days');
        totalDays += days;
    }
    
    console.log('Total days in year:', totalDays);
    console.log('Is leap year:', HijriCalendar.isHijriLeapYear(hijri.year) ? 'Yes' : 'No');
}

function testLeapYears() {
    console.log('\n3. LEAP YEAR PATTERN TEST');
    console.log('-'.repeat(40));
    
    var today = new Date();
    var hijri = HijriCalendar.gregorianToHijri(today);
    var currentYear = hijri.year;
    
    console.log('Leap years around current year (' + currentYear + '):');
    
    for (var y = currentYear - 5; y <= currentYear + 5; y++) {
        var isLeap = HijriCalendar.isHijriLeapYear(y);
        var cyclePos = ((y - 1) % 30) + 1;
        var status = isLeap ? '✓ LEAP' : '  Regular';
        console.log('  ' + y + ' (cycle pos: ' + cyclePos.toString().padStart(2) + ') - ' + status);
    }
}

function testSpecificDates() {
    console.log('\n4. SPECIFIC DATES TEST');
    console.log('-'.repeat(40));
    
    var testDates = [
        new Date(2024, 0, 1),   // Jan 1, 2024
        new Date(2024, 6, 16),  // Jul 16, 2024 (close to Hijri epoch anniversary)
        new Date(2025, 8, 3),   // Sep 3, 2025 (today)
        new Date(2030, 11, 31)  // Dec 31, 2030
    ];
    
    testDates.forEach(function(date) {
        var hijri = HijriCalendar.gregorianToHijri(date);
        var gregorianStr = date.toDateString();
        var hijriStr = hijri.day + ' ' + HijriCalendar.monthNames.en[hijri.month - 1] + ' ' + hijri.year + ' AH';
        console.log(gregorianStr + ' = ' + hijriStr);
    });
}

function testRoundTripConversion() {
    console.log('\n5. ROUND-TRIP CONVERSION TEST');
    console.log('-'.repeat(40));
    
    var originalDate = new Date();
    console.log('Original date:', originalDate.toDateString());
    
    // Convert to Hijri
    var hijri = HijriCalendar.gregorianToHijri(originalDate);
    console.log('Converted to Hijri:', hijri.day + '/' + hijri.month + '/' + hijri.year);
    
    // Convert back to Gregorian (approximate)
    var yearStart = HijriCalendar.hijriYearStart(hijri.year);
    var dayOfYear = 0;
    
    for (var m = 1; m < hijri.month; m++) {
        dayOfYear += HijriCalendar.hijriMonthLength(hijri.year, m);
    }
    dayOfYear += hijri.day - 1;
    
    var jd = yearStart + dayOfYear;
    var convertedBack = HijriCalendar.julianDayToGregorian(jd);
    
    console.log('Converted back to Gregorian:', convertedBack.toDateString());
    
    var daysDifference = Math.abs((convertedBack.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24));
    console.log('Difference in days:', Math.round(daysDifference));
    console.log('Accuracy:', daysDifference < 2 ? '✓ Good (< 2 days)' : '⚠ Poor (≥ 2 days)');
}

function testCalendarGeneration() {
    console.log('\n6. CALENDAR GENERATION TEST');
    console.log('-'.repeat(40));
    
    var today = new Date();
    var hijri = HijriCalendar.gregorianToHijri(today);
    
    console.log('Testing generateCalendarData for current Hijri month:');
    console.log('Month:', HijriCalendar.monthNames.en[hijri.month - 1], '(' + hijri.month + '), Year:', hijri.year);
    
    // Simulate the generateCalendarData function
    var daysInMonth = HijriCalendar.hijriMonthLength(hijri.year, hijri.month);
    
    // Calculate start offset
    var yearStart = HijriCalendar.hijriYearStart(hijri.year);
    var dayOfYear = 0;
    
    for (var m = 1; m < hijri.month; m++) {
        dayOfYear += HijriCalendar.hijriMonthLength(hijri.year, m);
    }
    
    var firstDayJD = yearStart + dayOfYear;
    var firstDayGregorian = HijriCalendar.julianDayToGregorian(firstDayJD);
    var startOffset = firstDayGregorian.getDay();
    
    console.log('Days in month:', daysInMonth);
    console.log('First day of month (Gregorian):', firstDayGregorian.toDateString());
    console.log('Start offset (day of week):', startOffset, '(' + ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][startOffset] + ')');
    
    // Show calendar grid preview
    console.log('\nCalendar grid preview:');
    console.log('Su Mo Tu We Th Fr Sa');
    
    var line = '';
    // Add empty spaces for start offset
    for (var i = 0; i < startOffset; i++) {
        line += '   ';
    }
    
    // Add days of the month
    for (var day = 1; day <= daysInMonth; day++) {
        line += day.toString().padStart(2) + ' ';
        if ((startOffset + day) % 7 === 0) {
            console.log(line);
            line = '';
        }
    }
    if (line.trim()) {
        console.log(line);
    }
}

// Run all tests
console.log('Testing Hijri Calendar Mathematical Conversion...\n');

try {
    testBasicConversion();
    testMonthLengths();
    testLeapYears();
    testSpecificDates();
    testRoundTripConversion();
    testCalendarGeneration();
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ ALL TESTS COMPLETED SUCCESSFULLY');
    console.log('='.repeat(60));
    
} catch (error) {
    console.log('\n' + '='.repeat(60));
    console.log('✗ TEST FAILED:', error.message);
    console.log('='.repeat(60));
}