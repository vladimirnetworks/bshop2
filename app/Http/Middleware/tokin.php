<?php

namespace App\Http\Middleware;

use App\Models\liteauth;
use Closure;
use Illuminate\Http\Request;

class tokin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

     public function makeme()
     {
        $hash = md5(str_shuffle("abcdefghijklmnopqrstuvwxyz123456789!@#$%^&*"));
        $tokin =  liteauth::create(['hash'=>$hash]);  

        $id =  base_convert($tokin->id,10,33);
       

 
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time()-1000);
                setcookie($name, '', time()-1000, '/');
            }
        }

        
        $hostx = $_SERVER["HTTP_HOST"];

        $hostx = str_replace(":8000","",$hostx);

       // dd($hostx);

        setcookie(
            "x_address",
            $hash,
            time() + (60*24)
            ,"/"/*,$hostx*/
          ); 

          setcookie(
            "base_address",
            $id ,
            time() + (60*24)
            ,"/"/*,$hostx*/
          );

          return ["x_address"=>$hash,"base_address"=>$id];
     }

    public function handle(Request $request, Closure $next)
    {

        if (!isset($_COOKIE['x_address']) || !isset($_COOKIE['base_address'])) {
            $newisme =   $this->makeme();   
           
            $request->merge(array("x_address" => $newisme['x_address'],"base_address" => $newisme['base_address']));           
        } else {
            
            $id =  base_convert($_COOKIE['base_address'],33,10);

          
            $whoiam = liteauth::where([["id",'=',$id],['hash','=',$_COOKIE['x_address']]]);

            if (!isset($whoiam->get()[0]['id'])) {
                $newisme = $this->makeme();
                 $request->merge(array("x_address" => $newisme['x_address'],"base_address" => $newisme['base_address']));
        
                } 

        }

        return $next($request);
    }
}
