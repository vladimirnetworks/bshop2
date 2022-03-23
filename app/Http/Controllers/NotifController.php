<?php

namespace App\Http\Controllers;

use App\Models\Notif;
use Illuminate\Http\Request;




class NotifController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notif  $notif
     * @return \Illuminate\Http\Response
     */
    public function show(Notif $notif)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notif  $notif
     * @return \Illuminate\Http\Response
     */
    public function edit(Notif $notif)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notif  $notif
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notif $notif)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notif  $notif
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notif $notif)
    {
        //
    }

    public function sendsmstome()
    {
        
    }
    public function sendsmstome_sus()
    {
  
        date_default_timezone_set("Asia/Tehran");
        $APIKey = "4c48b285236cc111af315ba9";
        $SecretKey = "yech!vetb0em";
        $LineNumber = "30002176999072";
        $APIURL = "https://ws.sms.ir/";
        $MobileNumbers = array('09232249183'/*,'09163686265'*/);
        //$Messages = array('بهکیانا سفارش جدید','بهکیانا سفارش جدید');

        $Messages = array('بهکیانا سفارش جدید');

        @$SendDateTime = date("Y-m-d")."T".date("H:i:s");
        $SmsIR_SendMessage = new \App\bensms\smsir($APIKey, $SecretKey, $LineNumber, $APIURL);
        $SendMessage = $SmsIR_SendMessage->sendMessage($MobileNumbers, $Messages, $SendDateTime);
    }

}
