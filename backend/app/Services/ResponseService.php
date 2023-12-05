<?php

namespace App\Services;

Class ResponseService
{
    public static $response = array('status' => '', 'data' => '', 'message' => '', 'code' =>'');

    public static function getResponse($data = '', $code = 200, $status = false, $message = '') {
        self::$response['status'] = $status;
        self::$response['code'] = $code;
        self::$response['data'] = $data;
        self::$response['message'] = $message;
        return self::$response;
    }
}
