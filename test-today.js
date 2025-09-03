// Test current day detection for Hijri calendar
console.log('TESTING CURRENT DAY DETECTION');
console.log('='.repeat(40));

// Simulate the Hijri calendar functions
var HijriCalendar = {
    gregorianToJulianDay: function(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        var a = Math.floor(year / 100);
        var b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    },
    
    julianDayToHijri: function(jd) {
        var hijriEpoch = 1948439.5;
        var daysSinceEpoch = jd - hijriEpoch;
        var averageYearLength = 354.367;
        var estimatedYear = Math.floor(daysSinceEpoch / averageYearLength) + 1;
        
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
    
    hijriYearStart: function(year) {
        var hijriEpoch = 1948439.5;
        var averageYearLength = 354.367;
        return hijriEpoch + (year - 1) * averageYearLength;
    },
    
    hijriMonthLength: function(year, month) {
        if (month < 1 || month > 12) return 0;
        var baseLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        var length = baseLengths[month - 1];
        if (month === 12 && this.isHijriLeapYear(year)) {
            length += 1;
        }
        return length;
    },
    
    isHijriLeapYear: function(year) {
        var leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
        var cyclePosition = ((year - 1) % 30) + 1;
        return leapYears.includes(cyclePosition);
    },
    
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
    }
};

// Test today detection
var today = new Date();
console.log('Today (Gregorian):', today.toDateString());

var todayHijri = HijriCalendar.gregorianToHijri(today);
console.log('Today (Hijri):', todayHijri.day + '/' + todayHijri.month + '/' + todayHijri.year);

// Simulate generating calendar dates for current Hijri month
console.log('\nTesting calendar generation for current month:');
var yearStart = HijriCalendar.hijriYearStart(todayHijri.year);

// Calculate day of year for the start of current month
var currentMonthDayOfYear = 0;
for (var m = 1; m < todayHijri.month; m++) {
    currentMonthDayOfYear += HijriCalendar.hijriMonthLength(todayHijri.year, m);
}

console.log('Year start JD:', yearStart);
console.log('Current month day of year:', currentMonthDayOfYear);

// Test generating a few days around today
console.log('\nDays around today:');
for (var day = Math.max(1, todayHijri.day - 2); day <= Math.min(30, todayHijri.day + 2); day++) {
    var dayOfYear = currentMonthDayOfYear + day - 1;
    var jd = yearStart + dayOfYear;
    var gregorianDate = HijriCalendar.julianDayToGregorian(jd);
    var backToHijri = HijriCalendar.gregorianToHijri(gregorianDate);
    
    var isToday = gregorianDate.toDateString() === today.toDateString();
    var marker = isToday ? ' ← TODAY!' : '';
    
    console.log('  Hijri day ' + day + ' = ' + gregorianDate.toDateString() + ' (Hijri: ' + backToHijri.day + '/' + backToHijri.month + '/' + backToHijri.year + ')' + marker);
}

console.log('\n' + '='.repeat(40));
console.log('✓ Today detection test completed');