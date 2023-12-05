<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->options('{all:.*}', function () {
    return;
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    // $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('/logout', 'AuthController@logout');

        // Roles
        $router->get('roles', 'RoleController@index');
        $router->post('roles', 'RoleController@store');
        $router->get('roles/{id}', 'RoleController@edit');
        $router->post('roles/{id}', 'RoleController@update');
        $router->post('/roles/{id}/change-status', 'RoleController@changeStatus');
        $router->delete('/roles/{id}', 'RoleController@destroy');

        // Role permission
        $router->get('roles-permissions', 'RolePermissionController@index');
        $router->post('/roles/{id}/role-permissions', 'RolePermissionController@assignRolePermission');

        // Users
        $router->get('users', 'UserController@index');
        $router->post('users', 'UserController@store');
        $router->get('users/{id}', 'UserController@edit');
        $router->post('users/{id}', 'UserController@update');
        $router->post('/users/{id}/change-status', 'UserController@changeStatus');
        $router->delete('/users/{id}', 'UserController@destroy');

        // Dashboard
        $router->get('dashboard-card-data', 'ExampleController@dashboardCardData');
        $router->get('dashboard-chart-data', 'ExampleController@dashboardChartData');
    });
});