var timezone = parseInt('-5', 10),
    autoSet = true, // Change to not set the timezone on page load
    firstDay,
    isOriginal = true;

function changeTime() {

    'use strict';

    var day = firstDay,
        dayUpdated = false,
        newTimezone = parseInt($('#changeTime').val(), 10),
        difference = newTimezone - timezone,
        lastHour = 0;

    //$('#changeTime').attr('disabled', 'disabled');

    $('.month').parent('tr').remove();

    $('tr').find('td:eq(2)').each(function () {

        if( isOriginal ) {

            var timeData = this.innerHTML.split(' '),
                time = timeData[0].split(':'),
                minute = parseInt(time[1], 10),
                hour = time[0],
                meridian = timeData[1],
                timeString;

            // Make sure minute is numeric
            if (!$.isNumeric(minute)) {
                minute = 0;
            }

            hour = hour % 12 + (meridian === "AM" ? 0 : 12);
            hour = hour + difference;

            if (hour > 23) {

                // Make sure we stay in 24-hour land
                hour = hour % 24;

                // Check if we've already counted this day or not
                if (!dayUpdated) {
                    day += 1;
                    dayUpdated = true;
                }

            } else {

                // It's early so this day has not been counted yet
                dayUpdated = false;
            }

        } else {

            var timeData = this.innerHTML.split(' '),
                time = timeData[1].split(':'),
                minute = parseInt(time[1], 10),
                hour = parseInt(time[0], 10),
                timeString;

            // Make sure minute is numeric
            if (!$.isNumeric(minute)) {
                minute = 0;
            }

            //hour = hour % 12 + (meridian === "AM" ? 0 : 12);
            hour = hour + difference;

            if(hour < 0){
                hour += 24;
            }

            // Make sure we stay in 24-hour land
            hour = hour % 24;

            if (hour < lastHour) {

                // Check if we've already counted this day or not
                if (!dayUpdated) {
                    day += 1;
                    dayUpdated = true;
                }

            } else {

                // It's early so this day has not been counted yet
                dayUpdated = false;
            }

            lastHour = hour;
        }

        // Format the times to look a bit better
        hour = hour < 10 ? "0" + hour : hour;

        minute = minute < 10 ? "0" + minute : minute;

        // Put together a nice string to output
        timeString = day + 'th, ' + hour + ':' + minute;

        this.innerHTML = timeString;

    });

    if( isOriginal ) {
        isOriginal = false;
    }

    timezone = newTimezone;
}
$(document).ready(function () {

    'use strict';

    var d = new Date(),
        gmtHours = -d.getTimezoneOffset() / 60,
        value,
        hoursString;

    firstDay = parseInt($('.month').first().parent('tr').text().match(/\d{1,2}/), 10);

    if (gmtHours > 0) {
        hoursString = '+' + gmtHours;
    } else {
        hoursString = gmtHours;
    }

    $('#currentTimezone').text(hoursString);

    $('#changeTime').change(function () {
        changeTime();
    });

    if (window.location.hash !== undefined && window.location.hash !== '') {

        value = window.location.hash.replace('#', '');

        $('option[value=' + value + ']').attr('selected', 'selected');

        changeTime();

    } else if (autoSet) {

        $('option[value=' + gmtHours + ']').attr('selected', 'selected');

        changeTime();
    }

});