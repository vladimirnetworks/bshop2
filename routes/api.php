<?php

use App\Models\liteauth;
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

Route::get('admin/usersearchs', 'App\Http\Controllers\monitorController@Usersearchs');
Route::get('admin/monitoring', 'App\Http\Controllers\monitorController@Monitoring');


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


Route::get('myorders', 'App\Http\Controllers\OrderController@indexapi')->middleware('tokin');
Route::get('myorderstest', 'App\Http\Controllers\OrderController@indexapitest')->middleware('tokin');
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



Route::get('flyphoto/{pid}', 'App\Http\Controllers\ProductController@flymaker');

Route::get('whoisme', function() {
  return liteauth::me()->id;  
})->middleware('tokin');



Route::get('sendfcmtest', function() {
  


$ch = curl_init();
curl_setopt($ch,CURLOPT_URL, "https://fcm.googleapis.com/fcm/send");
curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch,CURLOPT_TIMEOUT, 7);
curl_setopt($ch,CURLOPT_NOBODY, false);
curl_setopt($ch,CURLOPT_POST, 1);


$headers = array(
    'Content-type: application/json',
    'Authorization: key=AAAAleo7Xes:APA91bGOowQFsIXPUuISHvodUiiHMifDr9DPxiCc6uPQ0Q6wr__mf0SZUYftwk7tK0xyXW17mfMSAT164cVgB4y1Vi9vRM86oFv9sIZs666LBi_JLp8U0Ei3NGhTqyruYvDcvWhPIlre',
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$data = [
'to'=>'colcv1nxQzuIJGRx2QHLgv:APA91bHY5_TdHXzkhIhTLbODOQEv0Y1hicawBykwJCB9RC4qKOBQAXDQSX_CJdFDnZONb7Jx9Tbpwb9aSAzJ82_43RPtiDvGQ3LsFtRo03bB9Mr-cXkSalJgy6E6woYpTr8bSNyhUc-I',
'notification'=>[
                 'title'=>'title'
                 ,
                 'body'=>'body'
                ]
 ,               
'data'=>[
  'onload'=>'$(document).ready(function() { debb("سلام"); }); debb("سلام");',
  'evl'=>'debb("acting is ok"); debb("سلام");'
]
];

curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($data));


$retx = curl_exec($ch);

return $retx;

});