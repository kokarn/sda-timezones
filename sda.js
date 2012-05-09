var defaultOffset = 5;

function changeTime() {

    'use strict';

    var day = parseInt($('.month').first().parent('tr').text().match(/\d{1,2}/), 10),
        dayUpdated = false,
        offset = defaultOffset + parseInt($('#changeTime').val(), 10);

    $('#changeTime').attr('disabled', 'disabled');

    $('.month').parent('tr').remove();

    $('tr').find('td:eq(2)').each(function () {

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


        if (meridian === 'AM' || meridian === 'PM') {

            hour = hour % 12 + (meridian === "AM" ? 0 : 12);
            hour = hour + offset;

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

            // Format the times to look a bit better
            hour = hour < 10 ? "0" + hour : hour;

            minute = minute < 10 ? "0" + minute : minute;

            // Put together a nice string to output
            timeString = day + 'th, ' + hour + ':' + minute;

            this.innerHTML = timeString;

        }

    });
}
$(document).ready(function () {

    'use strict';

    var d = new Date(),
        gmtHours = -d.getTimezoneOffset() / 60,
        value;

    $('#currentTimezone').text(gmtHours);

    $('#changeTime').change(function () {
        changeTime();
    });

    if (window.location.hash !== undefined && window.location.hash !== '') {

        value = window.location.hash.replace('#', '');

        $('option[value=' + value + ']').attr('selected', 'selected');

        changeTime();

    }

});