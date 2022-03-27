<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;

class mainPageController extends Controller
{
    public function index(Request $request)
    {


        $prods = Product::orderBy('id', 'DESC')->paginate(10, ['*'], 'page', $request->page);


        $prods->each(function ($item) {

            $phot = json_decode($item->photos, true);


            if (isset($phot[0])) {
                $item->photo = $phot[0]['medium'];
            }
        });


       // if (true) {
         //   return view('androidinstall');
       // } else {

        return view('index', ['pageTitle' => "بهکیانا - فروشگاه محصولات بهداشتی", "products" => $prods]);
  
       // }
  
    }


    public function index33(Request $request)
    {

      

        if (preg_match("!android!i",$_SERVER['HTTP_USER_AGENT']) && !preg_match("!webapp!i",$_SERVER['REQUEST_URI']) && !preg_match("!paymentid!i",$_SERVER['REQUEST_URI'])) {
            return view('androidinstall');
        } else if((preg_match("!iPad!i",$_SERVER['HTTP_USER_AGENT']) || preg_match("!iPhone!i",$_SERVER['HTTP_USER_AGENT'])) && !preg_match("!webapp!i",$_SERVER['REQUEST_URI']) && !preg_match("!paymentid!i",$_SERVER['REQUEST_URI'])) {
            return view('iosinstall');
        } else {
        /**/

        //$im = new \Imagick();

       if (isset($_GET['paymentid'])) {
           
       
        $payment = Payment::whereId(decode_id($_GET['paymentid']))->first();

        $ordi =  Order::whereId(decode_id($payment->order_id))->first();

        

        $Authority = $payment->authority; //$_GET['Authority'];

       
        $amount = $ordi->total_amount;

       
        $data = array("merchant_id" => env("ZARINMERCH"), "authority" => $Authority, "amount" => $amount*10);
        
 
        //print_r($data);

        $jsonData = json_encode($data);
        $ch = curl_init('https://api.zarinpal.com/pg/v4/payment/verify.json');
        curl_setopt($ch, CURLOPT_USERAGENT, 'ZarinPal Rest Api v4');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($jsonData)
        ));

        $result = curl_exec($ch);
        curl_close($ch);


        $result = json_decode($result, true);


        $pdata = json_decode($payment->payment_data);

        date_default_timezone_set("Asia/Tehran");
        $pdata[] = [
            "time"=>date("Y-m-d h:i:s"),
            "res"=>$result
        ];

        $payment->payment_data = json_encode($pdata);
        $payment->save();
        


        if (isset($result['data']) && isset($result['data']['code'])) {
            if ($result['data']['code'] == 100 || $result['data']['code'] == 101) {
                $payment->status = 1;
                $payment->save();
            }
        }

       
    }
        /**/

        if ((request('apptype')=='androidapp' || request('apptype')=='iosapp') && isset($_GET['paymentid'])) {
      //  return redirect(""/*.$_GET['paymentid']*/);

      if (strtoupper($_GET['Status']) == 'OK') {
        $txt = "پرداخت موفق";
      } else {
        $txt = "پرداخت انجام نشد";
      }
      return view("backtoapp",['text'=>$txt]);

        } else {

         return view('index3', ['pageTitle' => "سوپرمارکت آنلاین بروجرد"]);

        }

    }

    }

    public function index22(Request $request)
    {


        $prods = Product::orderBy('id', 'DESC')->paginate(10, ['*'], 'page', $request->page);


        $prods->each(function ($item) {

            $phot = json_decode($item->photos, true);


            if (isset($phot[0])) {
                $item->photo = $phot[0]['medium'];
            }
        });



        return view('index2', ['pageTitle' => "بهکیانا - فروشگاه محصولات بهداشتی", "products" => $prods]);
    }


    public function index2(Request $request)
    {


        $prods = Product::orderBy('id', 'DESC')->paginate(10, ['*'], 'page', $request->page);


        $prods->each(function ($item) {

            $phot = json_decode($item->photos, true);


            if (isset($phot[0])) {
                $item->photo = $phot[0]['medium'];
            }


            $item->jsondata = str_replace('','',json_encode([

                "id"=>$item->id,
                "title"=>$item->title,
                "tinytitle"=>$item->tinytitle,
                "price"=>$item->price,
                "caption"=>lize($item->caption),
                "photos"=>$phot,
                

            ]));

        });



        


        return view('index2', ['pageTitle' => "بهکیانا - فروشگاه محصولات بهداشتی", "products" => $prods]);

        

    }


    public function index3(Request $request)
    {


      
      
        $prods = Product::orderBy('id', 'DESC')->paginate(10, ['*'], 'page', $request->page);


        $prods->each(function ($item) {

            $phot = json_decode($item->photos, true);


            if (isset($phot[0])) {
                $item->photo = $phot[0]['medium'];
            }


            $item->jsondata = str_replace('','',json_encode([

                "id"=>$item->id,
                "title"=>$item->title,
                "tinytitle"=>$item->tinytitle,
                "price"=>$item->price,
                "caption"=>lize($item->caption),
                "photos"=>$phot,
                

            ]));

        });



        


        return view('index3', ['pageTitle' => "بهکیانا - فروشگاه محصولات بهداشتی", "products" => $prods]);

        

    }


}
