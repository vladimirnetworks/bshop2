<?php

namespace App\Http\Controllers;

use App\Models\monitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class monitorController extends Controller
{
     public function LatestUsers(Request $request)
     {
       
      $latest = monitor::where("liteauth_id",">","0")->groupBy("liteauth_id")->orderBy('liteauth_id', 'DESC')->paginate(20, ['*'], 'page', $request->page);

     // $latest = DB::select("SELECT useragent FROM monitor where `liteauth_id` > 0 GROUP BY `liteauth_id` ORDER BY `liteauth_id` DESC limit 50");
      return  $latest ;


     }


     public function Usersearchs(Request $request)
     {
       
      $latest = monitor::where("url","like","%/api/search/%")->orderBy('id', 'DESC')->paginate(20, ['*'], 'page', $request->page);

     // $latest = DB::select("SELECT useragent FROM monitor where `liteauth_id` > 0 GROUP BY `liteauth_id` ORDER BY `liteauth_id` DESC limit 50");
      return  $latest ;


     }


     public function Monitoring(Request $request)
     {
       
          date_default_timezone_set("Asia/Tehran");
      $latest = monitor::where("url","not like","%/api/admin/%")->orderBy('id', 'DESC')->paginate(20, ['*'], 'page', $request->page);

     // $latest = DB::select("SELECT useragent FROM monitor where `liteauth_id` > 0 GROUP BY `liteauth_id` ORDER BY `liteauth_id` DESC limit 50");
      return  $latest ;


     }

}
