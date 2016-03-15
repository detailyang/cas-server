<?php

$cas = [
    "name" => "demo",
    "secret" => "977beed4-ab6f-4e1f-b60c-9d84c60e1d5a",
];

$uri = $_SERVER['PATH_INFO'] ? $_SERVER['PATH_INFO'] : '/';
$qs = $_SERVER['QUERY_STRING'];
switch ($uri) {
  case '/':
    // so i assume you havent login
    header('Location: https://cas.qima-inc.com/public/oauth/authorize?name=' . $cas["name"]);
    break;
  case '/cas/oauth/callback':
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"https://cas.qima-inc.com/oauth/users/self?" . $qs);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: oauth ' . $cas['secret'],
    ));
    $resp = curl_exec ($ch);
    curl_close ($ch);
    $resp = json_decode($resp);
    if ($resp->code != 0) {
       echo "23333333333";
       return;
    }
    echo "hello, big brother: " . $resp->data->value->username;
    break;
  default:
    break;
}
