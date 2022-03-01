<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::apiResource('orders', 'App\Http\Controllers\OrderController');
Route::post('preorder', 'App\Http\Controllers\OrderController@preorder');
Route::post('xnotif', 'App\Http\Controllers\NotifController@sendsmstome');

Route::apiResource('products', 'App\Http\Controllers\ProductController');
Route::apiResource('fastprice', 'App\Http\Controllers\fastprice');

Route::get('products2/{q}', 'App\Http\Controllers\ProductController@index');

Route::get('admin/orders', 'App\Http\Controllers\OrderController@allorders');
Route::put('admin/orders/{order}', 'App\Http\Controllers\OrderController@changeorder');
Route::get('admin/latestusers', 'App\Http\Controllers\monitorController@LatestUsers');

Route::get('admin/imagecleaner', 'App\Http\Controllers\ProductController@imagecleaner');





Route::get('categories/{parentid}', 'App\Http\Controllers\CatController@index');
Route::post('categories/{parentid}', 'App\Http\Controllers\CatController@store');
Route::put('categories/{parentid}/{Cat}', 'App\Http\Controllers\CatController@update');
Route::delete('categories/{parentid}/{Cat}', 'App\Http\Controllers\CatController@destroy');







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('index', 'App\Http\Controllers\ProductController@indexxv')->middleware('tokin');
Route::get('fromcat/{catid}', 'App\Http\Controllers\ProductController@indecat');
Route::get('relateto/{prodid}', 'App\Http\Controllers\ProductController@relateto')->middleware('tokin');
Route::get('maincat', 'App\Http\Controllers\CatController@maincat');
Route::post('search', 'App\Http\Controllers\SearchController@search');
Route::post('catload', 'App\Http\Controllers\CatController@catload');


Route::get('search/{squery}', 'App\Http\Controllers\SearchController@search2')->middleware('tokin');


Route::get('myorders', 'App\Http\Controllers\OrderController@indexapi');
Route::post('onlinepay', 'App\Http\Controllers\OrderController@onlinepayapi');


Route::get('onelevelchild/{rootid}', 'App\Http\Controllers\CatController@oneLevelChild');
Route::post('setshipping', 'App\Http\Controllers\OrderController@setshipping');
Route::post('reguserdata', 'App\Http\Controllers\UserdataController@setuserdata');
Route::post('androidwebviewlog', function() {
  return "ok";
});



Route::get('setbaseaddress', function(Request $request) {



  if ($request->baseaddress == 'admin' && $request->xaddress == '1234') {
      
  }

});
