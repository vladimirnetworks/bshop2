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
    <a style="height: 90%" referrerpolicy="origin" target="_blank"
      href="https://trustseal.enamad.ir/?id=244136&Code=NAYvp5VDiHI1pstposy1" style="height: 95%"><img
        style="height: 100%" referrerpolicy="origin"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" /></a>

    <input style="height: 60%; flex-grow: 2" placeholder="جستجو در محصولات" />
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

   

<div class="basket" style="display:flex;align-items:center;flex-direction: column;justify-content:center;">
  


    <img src="/icons/sabad.png" style="width:5em;position: relative;z-index:1;"/>


 <div style="direction:rtl;display:flex;align-items:center"><span id="totalcart"></span> <span style="font-size: 70%">تومان</span></div>


</div>
  <div class="bottom">
    <div class="min">


      <script>


function renderbigcartview() {


  $("#bigcartview").empty();
      var tot = xcart.total();

        var cartlist = $("<div></div>")
      xcart.eech(function(prod) {

        var bez = $('<button>+</button>');
        var men = $('<button>-</button>');

        men.click(function() {
            xcart.changeCount(prod.id, prod.count - 1);
        });

        bez.click(function() {
            xcart.changeCount(prod.id, prod.count + 1);
        });

        var itm = $("<div>"+prod.tinytitle+"</div>");

        itm.prepend(bez);
        itm.prepend(prod.count);
        itm.prepend(men);

        cartlist.append(itm);
      });

   

        $("#bigcartview").append(cartlist);

        $("#bigcartview").append("<hr>"+tot.count+"  , "+tot.amount);
}

var visualBasketfunc = function(delay) {

var tot = xcart.total();

$("#totalcart").text(farsi_price(tot.amount));

 if (tot.count < 1) {
  $("div[data-productid]").remove();
 } 
 

 xcart.eech(function(itm) {

var notinbasket = itm.count - checkinbasket(itm.id);

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
      



      <div class="itm" id="oorder" style="">
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



<div class="itm" id="mainpage">
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

        setTransFormAnim($('#mainpage'));

        </script>


    </div>

    <div class="big">

      <button id="checkout">checkout</button>

      <div id="bigcartview"></div>


    </div>

    <script>
      $("#checkout").click(function() {
       
        


        /**/
        toyou("preorder", xcart.items(), function(res) {
         console.log(res.data.id);
      
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
      $('.basket').hide();
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

      }










      if (event.state != null) {
         console.log("back called "+event.state.act);
      } else {
        console.log("back called null");
      }
    });
  </script>








  <div class="dialog" id="dialog1">

    <br>
    enter number
    <form id="usernumber_form" action="/" method="post">
      <input id="usernumber" type="number" placeholder="phone number" />
      <input type="submit">
    </form>

  </div>
  <script>
    $("#usernumber_form").on('submit',function () {



if ($('#usernumber').val() == 0) {



  shakeAnim($('#usernumber'));

} else {

hpu({ act: "getaddress",orderid:myorder.orderid});
closedialog("dialog1");
opendialog("dialog2");
 
 toyou("reguserdata",{orderid:myorder.orderid,type:"phone",data:$('#usernumber').val()});
}

return false;
});

  </script>




  <div class="dialog" id="dialog2">
    enter address

    <form id="useraddress_form" action="/" method="post">
      <div id="shippingx"></div>


      <input id="useraddress" type="text" placeholder="address" />

      <input type="submit">

    </form>



  </div>


  <script>
    $("#useraddress_form").on('submit', function() {


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
});





  </script>





  <div class="dialog" id="dialog3">

    payment <button onclick="offlinepay()">offlinepayment</button>


    <button onclick="onlinepay(myorder.orderid)">onlinePayment</button>

  </div>




  <div class="dialog" id="singleorderview">

        this is your order

        <button onclick="onlinepaygo(6113)">online pay</button>

  </div>



  



  <div class="dialog" id="onlinepaydialog">
    پرداخت آنلاین ....
  </div>



</body>

</html>