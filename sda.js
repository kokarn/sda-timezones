var defaultOffset = 5;
function changeTime(){
    $('#changeTime').attr('disabled', 'disabled');
    var day = 4;
    var once = false;
    offset = defaultOffset + parseInt($('#changeTime').val());
    $('tr').find('td:eq(2)').each(function(){
        timeData = this.innerHTML.split(' ');
        time = timeData[0].split(':');
        minute = time[1];
        hour = time[0];
        meridian = timeData[1];
        if(meridian == 'AM' || meridian == 'PM'){
            if(jQuery.isNumeric(hour)){
                hour = hour %12 + (meridian === "AM"? 0 : 12);
                hour = hour + offset;
                if(hour > 23){
                    hour = hour % 24;
                    if(!once){
                        day++;
                        once = true;
                    }
                }else{
                    once = false;
                }
                hour = hour < 10 ? "0" + hour : hour;
                if(jQuery.isNumeric(minute)){
                    timeString = day+'th '+hour+':'+minute
                }else{
                    timeString = day+'th '+hour+':00';
                }
                this.innerHTML = timeString;
            }
        }

    });
}
$('document').ready(function(){
    var d = new Date();
    var gmtHours = -d.getTimezoneOffset()/60;
    $('#currentTimezone').text(gmtHours);
    $('#changeTime').change(function(){
        changeTime();
    });

    if( window.location.hash !== undefined ){
        var value = window.location.hash.replace('#', '');
        $('option[value=' + value + ']').attr( 'selected', 'selected' );
        changeTime();
    }

})