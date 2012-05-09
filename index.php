<?php

/*
* Changes needed just because we host a version of the schedule instead of doing it the "real" way
*/
$marathonUrl = 'http://speeddemosarchive.com/marathon/';
$marathonImagesUrl = $marathonUrl.'image/';
$marathonScheduleUrl = $marathonUrl.'schedule/';

$page = file_get_contents( $marathonScheduleUrl );

$page = str_replace( 'schedule.css', $marathonScheduleUrl.'schedule.css', $page );

$page = str_replace( '../', $marathonUrl, $page );

//Get the different banners!
preg_match_all( '/Quotation\[\d\].=."(.*)"/', $page, $matches );

$imageSrc = $matches[1][ mt_rand( 0, count( $matches[1] ) - 1 ) ];
$image = '<div id="header"><a href=""><img src="'.$marathonImagesUrl.$imageSrc.'.png" alt="" ></a></div>';

$page = preg_replace('/<div.id="header">.+?<\/div>/s', $image, $page, 1 );

/*
* End location specific changes
*/

$scripts = array(
    '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>',
    '<script src="sda.js"></script>'
);

foreach( $scripts as $script ):
    $scriptWithHead = $script.'</head>';
    $page = str_replace( '</head>', $scriptWithHead, $page );
endforeach;

$selector = 'Timezone: <select id="changeTime">
        <option value="-23">UTC -23</option>
        <option value="-22">UTC -22</option>
        <option value="-21">UTC -21</option>
        <option value="-20">UTC -20</option>
        <option value="-19">UTC -19</option>
        <option value="-18">UTC -18</option>
        <option value="-17">UTC -17</option>
        <option value="-16">UTC -16</option>
        <option value="-15">UTC -15</option>
        <option value="-14">UTC -14</option>
        <option value="-13">UTC -13</option>
        <option value="-12">UTC -12</option>
        <option value="-11">UTC -11</option>
        <option value="-10">UTC -10</option>
        <option value="-9">UTC -9</option>
        <option value="-8">UTC -8</option>
        <option value="-7">UTC -7</option>
        <option value="-6">UTC -6</option>
        <option value="-5" selected="selected">UTC -5</option>
        <option value="-4">UTC -4</option>
        <option value="-3">UTC -3</option>
        <option value="-2">UTC -2</option>
        <option value="-1">UTC -1</option>
        <option value="0">UTC +/- 0</option>
        <option value="1">UTC +1</option>
        <option value="2">UTC +2</option>
        <option value="3">UTC +3</option>
        <option value="4">UTC +4</option>
        <option value="5">UTC +5</option>
        <option value="6">UTC +6</option>
        <option value="7">UTC +7</option>
        <option value="8">UTC +8</option>
        <option value="9">UTC +9</option>
        <option value="10">UTC +10</option>
        <option value="11">UTC +11</option>
        <option value="12">UTC +12</option>
        <option value="13">UTC +13</option>
        <option value="14">UTC +14</option>
        <option value="15">UTC +15</option>
        <option value="16">UTC +16</option>
        <option value="17">UTC +17</option>
        <option value="18">UTC +18</option>
        <option value="19">UTC +19</option>
        <option value="20">UTC +20</option>
        <option value="21">UTC +21</option>
        <option value="22">UTC +22</option>
        <option value="23">UTC +23</option>
    </select>
    Your timezone: UTC <span id="currentTimezone"></span>';

$page = str_replace( '<div id="schedule">', $selector.'<div id="schedule">', $page );

echo $page;
?>