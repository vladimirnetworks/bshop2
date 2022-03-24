<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class monitor extends Model
{
    use HasFactory;

    protected $table = 'monitor';

    protected $fillable = ['url','useragent','cookie','get_param','post_param','referer','ip','phpinput','terminate_response','liteauth_id'];



    public function getTimeAttribute()
    {


        $now = new \DateTime;
        $ago = new \DateTime($this->created_at);
        $diff = $now->diff($ago);
    
        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;
    
        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }
    
        $full = false;
        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';



    //  $date = new \DateTime($this->created_at, new \DateTimeZone("Asia/Tehran"));

     //   return $date;

    }
    

    protected $appends = ['time'];

}
