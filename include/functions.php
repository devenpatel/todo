<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getTimeZone() {
    $sa__timezone = array("-12.01" => "(GMT- 12:00) International Date Line West", "-11.01" => "(GMT- 11:00) Midway Island Samoa", "-10.01" => "(GMT- 10:00) Hawaii", "-9.01" => "(GMT- 09:00) Alaska", "-8.01" => "(GMT- 08:00) Pacific Time (US &amp; Canada)", "-8.02" => "(GMT- 08:00) Tijuna, Baja California", "-7.01" => "(GMT- 07:00) Arizona", "-7.02" => "(GMT- 07:00)  Chihuahua, La Paz, Mazatlan - New", "-7.03" => "(GMT- 07:00)  Chihuahua, La Paz, Mazatlan - Old", "-7.04" => "(GMT- 07:00) Mountain Time (US &amp; Canada)", "-6.01" => "(GMT- 06:00) Central America", "-6.02" => "(GMT- 06:00) Central Time (US &amp; Canda)", "-6.03" => "(GMT- 06:00) Guadalajara, Mexico City, Monterrey - New", "-6.04" => "(GMT- 06:00) Guadalajara, Mexico City, Monterrey - Old", "-6.05" => "(GMT- 06:00) Saskatchewan", "-5.01" => "(GMT- 05:00) Bogota, Lima, Quito, Rio Branco", "-5.02" => "(GMT- 05:00) Eastern Time (US &amp; Canada)", "-5.03" => "(GMT- 05:00) Indiana (East)", "-4.01" => "(GMT- 04:00) Atlantic Time (Canda)", "-4.02" => "(GMT- 04:00) Caracas, La Paz", "-4.03" => "(GMT- 04:00) Manaus", "-4.04" => "(GMT- 04:00) Santiago", "-3.51" => "(GMT- 03:30) Newfoundland", "-3.01" => "(GMT- 03:00) Brazilia", "-3.02" => "(GMT- 03:00) Buenos Aires, Georgtown", "-3.03" => "(GMT- 03:00) Greenland", "-3.04" => "(GMT- 03:00) Montevideo", "-2.01" => "(GMT- 02:00) Mid-Atlantic", "-1.01" => "(GMT- 01:00) Azores", "-1.02" => "(GMT- 01:00) Cape Verde Is.", "0.01" => "(GMT) Casablanka, Monrovia, Reykjavik", "0.02" => "(GMT) Greenwhich Mean Time : Dublin, Edinburgh, Lisbon, London", "1.01" => "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "1.02" => "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "1.03" => "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "1.04" => "(GMT+01:00) Sarajeva,Skopje, Warsaw, Zagreb", "1.05" => "(GMT+01:00) West Central Africa", "2.01" => "(GMT+02:00) Amman", "2.02" => "(GMT+02:00) Athens, Bucharest, Istanbul", "2.03" => "(GMT+02:00) Beriut", "2.04" => "(GMT+02:00) Cario", "2.05" => "(GMT+02:00) Harare, Pretoria", "2.06" => "(GMT+02:00) Helsinki, Kyiv, Rig, Sofia, Tallin, Vilnius", "2.07" => "(GMT+02:00) Jerusalem", "2.08" => "(GMT+02:00) Minsk", "2.09" => "(GMT+02:00) Windhoek", "3.01" => "(GMT+03:00) Baghdad", "3.02" => "(GMT+03:00) Kuwait, Riyadh", "3.03" => "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "3.04" => "(GMT+03:00) Nairobi", "3.05" => "(GMT+03:00) Tbilisi", "3.06" => "(GMT+03:00) Tehran", "4.01" => "(GMT+04:00) Abu Dhabi, Muscat", "4.02" => "(GMT+04:00) Baku", "4.03" => "(GMT+04:00) Yerevan", "4.04" => "(GMT+04:00) Kabul", "5.01" => "(GMT+05:00) Ekaterinburg", "5.02" => "(GMT+05:00) Islamabad, Karachi, Tashkent", "5.51" => "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "5.52" => "(GMT+05:30) Sri Jayawardenepura", "5.751" => "(GMT+05:45) Kathmandu", "6.01" => "(GMT+06:00) Almaty, Novosibirsk", "6.02" => "(GMT+06:00) Astana, Dhaka", "6.51" => "(GMT+06:30) Yangon (Rangoon)", "7.01" => "(GMT+07:00) Bangkok, Hanoi, Jakarta", "7.02" => "(GMT+07:00) Krasnoyarsk", "8.01" => "(GMT+08:00) Beijing, Chongping, Hong Kong, Urmaqi", "8.02" => "(GMT+08:00) Irkutsk, Ulaan Bataar", "8.03" => "(GMT+08:00) Kuala Lumpur, Singapore", "8.04" => "(GMT+08:00) Perth", "8.05" => "(GMT+08:00) Taipei", "9.01" => "(GMT+09:00) Osaka, Sapporo, Tokyo", "9.02" => "(GMT+09:00) Seoul", "9.03" => "(GMT+09:00) Yakutsk", "9.51" => "(GMT+09:30) Adelaide", "9.52" => "(GMT+09:30) Darwin", "10.01" => "(GMT+10:00) Brisbane", "10.02" => "(GMT+10:00) Canberra, Melbourne, Sydney", "10.03" => "(GMT+10:00) Guam, Port Moresby", "10.04" => "(GMT+10:00) Hobart", "10.05" => "(GMT+10:00) Vladivostok", "11.01" => "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "12.01" => "(GMT+12:00) Auckland, wellington", "12.02" => "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "13.01" => "(GMT+13:00) Nuku'alofa");
    return $sa__timezone;
}

function logged_in() {
    if (isset($_SESSION['id_user'])) {
        return true;
    } else {
        return false;
    }
}

function redirect_to($location = "/") {
    header("Location: $location");
}

/* function add_day($time,$days = 0,$format = "Y-m-d") {
  $zone=3600*$time_zone;
  $new_time = $time + ($days * 24 * 60 * 60);
  $new_date=gmdate($format, $new_time);
  return $new_time;
  }

  function sub_day($time,$days = 0,$format = "Y-m-d") {
  $zone=3600*$time_zone;
  $new_time = $time - ($days * 24 * 60 * 60);
  $new_date=gmdate($format, $new_time);
  return $new_time;
  } */

function add_day($time, $days = 0, $time_zone = 5.50, $format = "Y-m-d") {
    $zone = 3600 * $time_zone;
    $new_time = $time + $zone + ($days * 24 * 60 * 60);
    $new_date = gmdate($format, $new_time);
    return $new_time;
}

function sub_day($time, $days = 0, $time_zone = 5.50, $format = "Y-m-d") {
    $zone = 3600 * $time_zone;
    $new_time = $time + $zone - ($days * 24 * 60 * 60);
    $new_date = gmdate($format, $new_time);
    return $new_time;
}

function reOrderTodo($member_id, $do_on) {
    $q = Doctrine_Query::create()
            ->select('*')
            ->from('Todos')
            ->where("member_id = '" . $_SESSION['id_user'] . "' AND DATE_FORMAT(do_on, '%Y-%m-%d') = '" . $do_on . "'")
            ->orderBy("ord ASC");

    $todo = $q->execute();
    $c = 1;
    foreach ($todo as $td) {
        $td->ord = $c;
        $td->save();
        $c++;
    }
}

function getNewOrder($do_on) {
    $order = Doctrine_Query::create()
            ->select("id")
            ->from("Todos")
            ->where("member_id = '" . $_SESSION['id_user'] . "' AND DATE_FORMAT(do_on, '%Y-%m-%d') = '" . $do_on . "'")
            ->execute()
            ->count();
    return $order+=1;
}
?>


<?php

/**
 *
 * Validate a date
 *
 * @param    string    $date
 * @param    string    format
 * @return    bool
 *
 */
function validateDate($date, $format='YYYY-MM-DD') {
    switch ($format) {
        case 'YYYY/MM/DD':
        case 'YYYY-MM-DD':
            list( $y, $m, $d ) = preg_split('/[-\.\/ ]/', $date);
            break;

        case 'YYYY/DD/MM':
        case 'YYYY-DD-MM':
            list( $y, $d, $m ) = preg_split('/[-\.\/ ]/', $date);
            break;

        case 'DD-MM-YYYY':
        case 'DD/MM/YYYY':
            list( $d, $m, $y ) = preg_split('/[-\.\/ ]/', $date);
            break;

        case 'MM-DD-YYYY':
        case 'MM/DD/YYYY':
            list( $m, $d, $y ) = preg_split('/[-\.\/ ]/', $date);
            break;

        case 'YYYYMMDD':
            $y = substr($date, 0, 4);
            $m = substr($date, 4, 2);
            $d = substr($date, 6, 2);
            break;

        case 'YYYYDDMM':
            $y = substr($date, 0, 4);
            $d = substr($date, 4, 2);
            $m = substr($date, 6, 2);
            break;

        default:
            throw new Exception("Invalid Date Format");
    }
    return checkdate($m, $d, $y);
}



?>