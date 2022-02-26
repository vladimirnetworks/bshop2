<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <title>{{$pageTitle}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script src="/jquery/jquery.min.js"></script>
  <link rel="stylesheet" href="/bs4/bootstrap.min.css">

  <link rel="stylesheet" href="/css/main.css?{{time()}}">
  <script src="/scripts/funcs.js?{{time()}}"></script>


</head>

<body>

<div id="custompage_contactus" class="custompage" style="display:none">

  <div style="direction: rtl;text-align:right;padding: 1rem;">
     <h1>تماس با ما</h1>
    <div style="padding: 1rem;"> <p>شماره تماس : 42448787</p>
     <p>واتسپ : 09332999594</p>

     <p>آدرس :‌ شهرک نیاوران دانش شمالی ، دانش ۶</p>


    </div>

    <div style="direction: rtl;text-align:center;margin-top: 1rem;">
      <a id="enamadlink" referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=244136&Code=NAYvp5VDiHI1pstposy1"><img style="width:100%"  referrerpolicy="origin" src="https://www.behkiana.ir/photos/small_72181087.jpg" alt="" style="cursor:pointer" id="NAYvp5VDiHI1pstposy1"></a>
   <!-- https://trustseal.enamad.ir/?id=244136&Code=NAYvp5VDiHI1pstposy1
  https://Trustseal.eNamad.ir/logo.aspx?id=244136&Code=NAYvp5VDiHI1pstposy1
  -->
    </div>
  </div>
<script>
  $("#enamadlink").click(function() {
    debb("clicked");
    if (apptype() == 'androidapp') {
      androidinterface.openurl("https://www.behkiana.ir/enamad");
     return false;
    }
  });
</script>

</div>
  
  <script>
    myorder = {};
   
    apix = new api();    
 xcart = new Cart();
$(document).ready(function() {

 


   // xcart.triggerAllChangeListeners();


   if (readCookie('zcart')) {
        xcart.loadfromjson(readCookie('zcart'));
   }

});
  </script>




  @yield('main')

  <div class="top">
    <a style="height: 90%;visibility: hidden;" referrerpolicy="origin" target="_blank"
      href="https://trustseal.enamad.ir/?id=244136&Code=NAYvp5VDiHI1pstposy1" style="height: 95%;"><img
        style="height: 100%" referrerpolicy="origin"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" /></a>

    <input onClick='ssearchbox();hpu({ act: "searchbox" });' id="searchinputtext" class="minpt" style="text-align:right;height: 60%; flex-grow: 2;direction:rtl" placeholder="جستجو در محصولات" />
    <img style="height: 60%; margin-left: 0.5em; margin-right: 0.5em" src="https://s6.uupload.ir/files/mag_91qh.png" />
  </div>

  <div style="
      opacity: 0.5;
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      background-color: black;
      height: 100%;
      z-index: 1000;
      display: none;
    " class="dim"></div>



<!--
  <div class="basket_sus" style="display:none;display:flex;align-items:center;flex-direction: column;justify-content:center;">



    <img src="/icons/sabad.png" style="width:5em;position: relative;z-index:1;" />


    <div style="direction:rtl;display:flex;align-items:center"><span id="totalcart"></span> <span
        style="font-size: 70%">تومان</span></div>


  </div> -->



  <div class="bottom">
    <div class="min">


      <script>
        function renderbigcartview() {


  $("#bigcartview").empty();
      var tot = xcart.total();

      if (tot.count > 0) {

   

      var cartlistcont = $('<div  style="display:flex;flex-direction:column;height:100%"></div>');
        var cartlist = $('<div style="direction:rtl;display:flex;flex-direction: column;align-items: center;overflow: auto;padding-top:2rem;"></div>');
      xcart.eech(function(prod) {

        var bez = $('<button style="border-radius:0px 0.3rem 0.3rem 0px">+</button>');
        var men = $('<button style="border-radius:0.3rem 0px 0px 0.3rem ">-</button>');

        men.click(function() {
            xcart.changeCount(prod.id, prod.count - 1);
        });

        bez.click(function() {
            xcart.changeCount(prod.id, prod.count + 1);
        });

        var xtitle = $('<div style="font-size:80%;flex-grow:1;text-align: right;">'+prod.tinytitle+'</div>');
        var xprice = $('<div style="text-align: right;margin-left:1rem">'+farsi_price(prod.price*prod.count)+' <span style="font-size:60%">تومان</span></div>');
        var itm = $('<div style="display:flex;width:90%;justify-content: right; margin:0.3rem;max-width:400px"></div>');


     

       var counbox = $('<div class="counbtox" style="flex-direction:row;display: flex;align-items: center;"></div>');
       counbox.append(bez);
       counbox.append('<div style="width:1rem;font-size:80%">'+prod.count+'</div>');
       counbox.append(men);

       itm.append(counbox);

       itm.prepend(xprice);
       itm.prepend(xtitle);
      

        cartlist.append(itm);
      });

   
      cartlistcont.append(cartlist);


      var checkoutbtn = $('<button class="checkoubtn">تایید و ثبت سفارش</button>');

      checkoutbtn.click(function() {


        


        /**/
        toyou("preorder", xcart.items(), function(res) {
         console.log(res.data.id);
      
         

         hpu({ act: "getnumber",orderid:res.data.id});

         myorder.orderid = res.data.id;
         myorder.shipping = res.data.shipping;
         $("#shippingx").empty();
         for (var i = 0; i < myorder.shipping.length; i++) {
            var maindiv = $("<div></div>");
            var labelx = $('<label></label>');

            labelx.click(function() {
             // return true;
            });
            if (i === 0) {
               var inputx = $('<input checked type="radio"  name="shiptype" value="' + i + '">');
            } else {
               var inputx = $('<input type="radio"  name="shiptype" value="' + i + '">');
            }
            var textx = $('<span style="font-size:90%;margin-right:0.2rem">' + myorder.shipping[i].text + '</span>');
            labelx.append(inputx);


            
            labelx.append(textx);
            maindiv.append(labelx);
            $("#shippingx").append(maindiv);
         }



        $.ajax({
        url: "/api/xnotif",
        type: "post",
        data: "ok" ,
        success: function (response) {

         
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    



      });
        /**/
          opendialog("dialog1");
         
          return false;


      });

      var endofcart = $('<div style="flex-grow:1;padding:1rem"></div>');
      cartlistcont.append(endofcart);


      var tot = xcart.total();

      endofcart.append('<div style="margin:1rem">مجموع : '+farsi_price(tot.amount)+' تومان'+'</div>');


      endofcart.append(checkoutbtn);

        $("#bigcartview").append(cartlistcont);

    //    $("#bigcartview").append("<hr>"+tot.count+"  , "+tot.amount);
        } else {
          var cartisempty = $('<div style="display:flex;height:100%;width:100%;justify-content:center;align-items:center">✋🙂 سبد خریدتون خالیه </div>');

          $("#bigcartview").append(cartisempty);

        }
}

var visualBasketfunc = function(delay) {

var tot = xcart.total();

$("#totalcart").text(farsi_price(tot.amount));

 if (tot.count < 1) {
  $("div[data-productid]").remove();
 } 
 

 xcart.eech(function(itm) {

var notinbasket = itm.count - checkinbasket(itm.id);

//error is here
console.log(JSON.parse(itm.photos)[0]['medium']);

if (notinbasket > 0) {
for (var i = 0 ; i<notinbasket;i++) {
var ff = flymaker("https://trns-bbn.apps.ir-thr-at1.arvan.run/?name=https://www.behkiana.ir/"+JSON.parse(itm.photos)[0]['medium']);
ff.attr("data-productid",itm.id);
addtobasket(ff,delay);
}
}


if (notinbasket < 0) {

for (var i = 0 ; i<notinbasket*-1;i++) {
console.log("remove "+itm.id+" ");
$("div[data-productid='"+itm.id+"']")[0].remove();
}
}


});








};

xcart.onLoad = function() {
 console.log("loaded");
 visualBasketfunc(0);
 renderbigcartview();
};


xcart.addOnItemDeletedListener(function(prodid) {
   console.log("deleted",prodid);
   $("div[data-productid='"+prodid+"']").remove();
});


xcart.addChangeListener(function () {
  visualBasketfunc(1000);
});

      </script>



<div class="itm" style="align-items: center;justify-content: center;direction:rtl;font-size:0.8rem;font-weight:bold" >
  <div style="white-space: nowrap;" id="bottomtotalcart"></div>
 
<div class="" style="background-color: #dc3545;border-color: #dc3545;color: white;font-size:0.8rem; border-radius: 0.3rem;  padding :0.3rem 0.4rem;display:flex;align-items: center;justify-content: center;">
 
  
 <div style="width:1rem;">
  <img src="https://www.behkiana.ir/icons/cart.png" style="width:100%"/>
</div> 
 <div id="sabadbottontext">سبد‌خرید </div> 

 <script>

  xcartfnc = function () {
  
  var tot = xcart.total();
  if (tot.count>0) {
    $("#bottomtotalcart").show();
  $("#bottomtotalcart").html(farsi_price(tot.amount)+" تومان");

  $("#sabadbottontext").html("اتمام‌خرید");

  }  else {
    $("#bottomtotalcart").hide();
    $("#sabadbottontext").html("سبد‌خرید");
  }
  };
  
  
  xcart.addChangeListener(xcartfnc);
  
  $(document).ready(function() {
    xcartfnc();
  });
  
      </script>

</div>
</div>

<div  id="itmspliter" style="width:1px;height:1px;"></div>

      <div class="itm" id="oorder" style="display:none">
        <div class="icon" style="background-image:url('https://www.behkiana.ir/icons/orders.png');"></div>
        <div class="txt">سفارشات‌من</div>
      </div>


      <script>
        $('#oorder').click(function(e) {
          e.stopPropagation();
          loadmyorders();hpu({act:"showmyorders"});       
        });

        setTransFormAnim($('#oorder'));

      </script>



      <div class="itm" id="contact">
        <div class="icon" style="background-image:url('https://www.behkiana.ir/icons/phone.png');"></div>
        <div class="txt">تماس‌باما</div>
      </div>


      <div class="itm" id="mainpage">
        <div class="icon" style="background-image:url('https://www.behkiana.ir/icons/home.png');"></div>
        <div class="txt">صفحه‌اول</div>
      </div>











      <script>
        $('#mainpage').click(function(e) {
          e.stopPropagation();
          llist("index");
          hpu({act:"list",path:'index'});       
        });


        $('#contact').click(function(e) {
          e.stopPropagation();
          customepage("contactus");
          hpu({act:"customepage",id:'contactus'});       
        });

        setTransFormAnim($('#mainpage'));

      </script>


    </div>

    <div class="big">



      <div id="bigcartview" style="height:100%;"></div>





    </div>

    <div class="bighalf" style="height:100%;display:none">

      <div id="" style="height:100%;display:flex;justify-content: center;align-items: end;">
         <div style="width: 200px;position:relative" id="basketv2">
         <img src="icons/sabad.png" style="width:100%;position:relative;z-index:999999"/>
        </div>
      </div>

    </div>

    

    

    <script>
      $("#checkout").click(function() {
       
        


        /**/
        toyou("preorder", xcart.items(), function(res) {
  
         
      
         hpu({ act: "getnumber",orderid:res.data.id});

         myorder.orderid = res.data.id;
         myorder.shipping = res.data.shipping;
         $("#shippingx").empty();
         for (var i = 0; i < myorder.shipping.length; i++) {
            var maindiv = $("<div></div>");
            var labelx = $('<label ></label>');

            labelx.click(function() {
             // return true;
            });
            if (i === 0) {
               var inputx = $('<input checked type="radio"  name="shiptype" value="' + i + '">');
            } else {
               var inputx = $('<input type="radio"  name="shiptype" value="' + i + '">');
            }
            var textx = $('<span>' + myorder.shipping[i].text + '</span>');
            labelx.append(inputx);

          

            
            labelx.append(textx);
            maindiv.append(labelx);
            $("#shippingx").append(maindiv);
         }



        $.ajax({
        url: "/api/xnotif",
        type: "post",
        data: "ok" ,
        success: function (response) {

         
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    



      });
        /**/
          opendialog("dialog1");
         
          return false;
        });


      xcart.addChangeListener(function() {
        
        renderbigcartview();

      });
    </script>


  </div>




  <script>
    mmenu.open = false;



 






    function openmenu() {

      closealldialogs();

      $('.dim').fadeIn();
      $('.min').hide();
      //$('.basket').hide();
      $('.big').show();

      
      mmenu.open = true;
      if (island()) {
        $('.bottom').css({
          'max-width': '100vw',
          'min-width': 'auto',
          width: '80vw',
        });
      } else {
        $('.bottom').css({
          'max-height': '100vh',
          'min-height': 'auto',
          height: '80vh',
        });
      }
    }


    function halfopenmenu() {

      console.log("halfopenmenu called");
closealldialogs();

//$('.dim').fadeIn();
$('.min').hide();
//$('.basket').hide();
$('.bighalf').show();


mmenu.halfopen = true;
if (island()) {
  $('.bottom').css({
    'max-width': '40vw',
    'min-width': 'auto',
    width: '80vw',
  });
} else {
  $('.bottom').css({
    'max-height': '40vh',
    'min-height': 'auto',
    height: '80vh',
  });
}
}

    function closemenu2() {
      if (island()) {
        $('.bottom').css({
          'max-width': '10rem',
          'min-width': '5rem',
          width: '11vw',
        });
      } else {
        $('.bottom').css({
          'max-height': '4rem',
          'min-height': '3rem',
          height: '11vh',
        });
      }
    }

    window.addEventListener(
      'resize',
      function (event) {
        marginize();
        setTimeout(function () {
          marginize();
        }, 400);
      },
      true
    );

    marginize();

    $('.dim').click(function () {
     
      history.back();
   
    });

    $('.bottom').click(function () {
      if (!mmenu.open) {
      openmenu();
      console.log("bottom clicked");
      hpu({ act: "cartup"});
      }
    });



    window.addEventListener('popstate', (event) => {

  
  








      // if any back

      if (xcart.total().count < 1) {

           // closedialog("dialog3");
            
            
      }
      //closedialog("onlinepaydialog");
     // 
     
     
      

     
     
      if (event.state == null) {
       llist("index");      
      } else {



        

        if (event.state.act == 'singleorderview') {

          closedialog("onlinepaydialog");
          opendialog("singleorderview");

        }


        if (event.state.act == 'product') {
          oproduct(event.state.prod);
        }

        if (event.state.act == 'customepage') {
          customepage(event.state.id);
        }
       


        if (event.state.act == 'list') {
          llist(event.state.path);
        }




        if (event.state.act == 'cartup') {
           openmenu();       
        }

        if (event.state.act == 'getnumber') {

          closedialog("dialog2");
          opendialog("dialog1");
        
        }


        if (event.state.act == 'getaddress') {
          
          closedialog("dialog3");
          opendialog("dialog2");

        }

        if (event.state.act == 'showmyorders') {

       loadmyorders();

        }


        if (event.state.act == 'searchbox') {
          ssearchbox()
        }

      }










      if (event.state != null) {
         console.log("back called "+event.state.act);
      } else {
        console.log("back called null");
      }
    });
  </script>








  <div class="dialog" id="dialog1" style="">



    <div style="display:flex;align-items: center;justify-content: center;">

      <div style="text-align:center;padding-top:2rem;padding-bottom:2rem;width: 100%;">

        <div style="font-size: 90%;color:grey;line-height: 2rem;"> شماره تماستونُ وارد کنید
          <br>
          موبایل یا ثابت فرقی نداره
        </div>

        <br>

        <form id="usernumber_form" action="/" method="post">


          <div style="display: flex;flex-direction:column;align-items:center;">
            <input id="usernumber" type="number" class="minpt" style="width:100%;flex-grow:1; "
              placeholder="شماره تماس" />

            <div style="display:flex;width: 100%;justify-content: space-between;">
              <div id="backnumber" class="dialogbtn dialogbtngrey" style="margin-top:1rem"> قبلی </div>
              <div id="submitnumber" class="dialogbtn dialogbtnblue" style="margin-top:1rem">ادامه 

                
                </div>
            </div>

          </div>

        </form>
      </div>

    </div>


  </div>
  <script>
    dialog_do['dialog1'] = function() {

      if (!$("#usernumber").is(":focus")) {
      $("#usernumber").focus();
      }
    } 
  </script>

  <script>
    $("#submitnumber").click(function () {
  $("#usernumber_form").submit();
});

$("#backnumber").click(function () {
  history.back();
});

    $("#usernumber_form").on('submit',function () {



if ($('#usernumber').val() == 0) {



  shakeAnim($('#usernumber'));

} else {

hpu({ act: "getaddress",orderid:myorder.orderid});
closedialog("dialog1");
opendialog("dialog2");
 
 toyou("reguserdata",{orderid:myorder.orderid,type:"phone",data:$('#usernumber').val()},function() {
  $("#oorder").show();
 });
}

return false;
});

  </script>




  <div class="dialog" id="dialog2">


    <div style="display:flex;align-items: center;justify-content: center;">

      <div style="text-align:center;padding-top:2rem;padding-bottom:2rem;width: 100%;">


 


      <form style="direction:rtl;text-align:right" id="useraddress_form" action="/" method="post">


    

          <input id="useraddress" style="width:100%;flex-grow:1; " class="minpt" type="text" placeholder="آدرس" />


          <div style="font-size: 90%;color:grey;line-height: 2rem;margin-top:1rem"> 
            زمان تحویل : 
          </div>

          <div id="shippingx" style=""></div>
      

      </form> 


        <div style="display:flex;width: 100%;justify-content: space-between;">
          <div id="backaddress" class="dialogbtn dialogbtngrey" style="margin-top:1rem"> قبلی </div>
          <div id="submitaddress" class="dialogbtn dialogbtnblue" style="margin-top:1rem">ادامه</div>
        </div>

      </div>
    </div>

  </div>


  <script>
    dialog_do['dialog2'] = function() {
      
      if (!$("#useraddress").is(":focus")) {
        $("#useraddress").focus();
      }

    } 

    
$("#submitaddress").click(function () {
 // $("#useraddress_form").submit();
 sndaddress();
});

$("#backaddress").click(function () {
  history.back();
});

var sndaddress = function () {



if ($('#useraddress').val() == "") {
   shakeAnim($('#useraddress'));
} else {

  hpu({ act: "payment",orderid:myorder.orderid});
  closedialog("dialog2");
  opendialog("dialog3");


var selectedshipping = $('input[name=shiptype]:checked').val();

toyou("setshipping",{orderid:myorder.orderid,shipping:selectedshipping});
toyou("reguserdata",{orderid:myorder.orderid,type:"address",data:$('#useraddress').val()});

var shippingcost = myorder.shipping[selectedshipping].cost;

/*$("#orderfinalx").empty();
$("#orderfinalx").append('<div class=""> کد سفارش : '+myorder.orderid+'</div>'); 
var tot = xcart.total();
$("#orderfinalx").append('<div class="mb-2">مبلغ فاکتور : '+farsi_price(tot.amount+shippingcost)+' تومان <br> <small class="text-secondary">( '+Num2persian(tot.amount+shippingcost)+' )</small></div>'); 
*/
//xcart.empty();



}


return false;
}

   $("#useraddress_form").on('submit', function() { 
    
    $("input[type='radio']")[0].focus();

    return false;
    
    });


 $("#useraddress_btn").click(function() {
   sndaddress();
 });


  </script>





  <div class="dialog" id="dialog3">

    <div style="display: flex;flex-direction:column;align-items:center;justify-content:center">
    
      <div id="myordsnow" style="width: 100%;direction:rtl"></div>

        <div id="shipingcostnow" style="margin-bottom:0.1rem;margin-top:0.2rem"></div>
        
        <div id="totalfactornow" style="margin-bottom:1rem"></div>

        <div style="display: flex;    justify-content: space-around;width: 100%;flex-direction:column">
          <button class="dialogbtn dialogbtnblue" style="margin-bottom:1rem" onclick="onlinepay(myorder.orderid)">پرداخت آنلاین</button>

          <button class="dialogbtn dialogbtnblue" onclick="offlinepay()">پرداخت درمحل</button>
        </div>

    </div>


    <script>
    dialog_do['dialog3'] = function() {
      
var ordc = $("#myordsnow");

ordc.empty();

      xcart.eech(function(prod) {


     /* if (i != vals.items.length-1 ) {
             bbtm = 'border-bottom:1px solid black;';
            } else {
                bbtm = "";
            }
            */
           var bbtm= "";
            var itm = $('<div style="display:flex;align-items: center; justify-content: space-around;padding-bottom:0.5rem;padding-top:0.5rem; '+bbtm+'"></div>');

            itm.append('<div style="font-size:80%;width:70%;text-align:right">'+prod.tinytitle+' ('+topersiannumber(prod.count)+' عدد)</div>');
       
            itm.append('<div style="font-size:80%;">'+topersiannumber(prod.price*prod.count)+' تومان</div>');

            ordc.append(itm);

      });




    var shipiingcost =  myorder.shipping[$('input[name="shiptype"]:checked').val()].cost;

    if (shipiingcost > 0) {
     $("#shipingcostnow").html("هزینه ارسال : "+farsi_price(shipiingcost)+" تومان");
    } else {
      $("#shipingcostnow").html("هزینه ارسال : رایگان");
    }


      var totala = xcart.total();
      $("#totalfactornow").html("مجموع فاکتور : "+farsi_price(totala.amount+shipiingcost)+" تومان");


            



    } 
    </script>


  </div>




  <div class="dialog" id="singleorderview">





  </div>







  <div class="dialog" id="onlinepaydialog">
    پرداخت آنلاین ....
  </div>



</body>

</html>