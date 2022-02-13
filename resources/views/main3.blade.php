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

  <div class="bottom">
    <div class="min">
      <div class="itm cart"></div>
      <script>
        xcart.addChangeListener(function() {

        var tot = xcart.total();

        $(".cart").text(tot.count);



        });

  
      

      </script>
      <div class="itm"></div>
      <div class="itm"></div>
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
        

      });
    </script>


  </div>



  <script>
    mmenu = {};

    mmenu.open = false;
    function island() {
      if (window.innerHeight > window.innerWidth) {
        return false;
      } else {
        return true;
      }
    }

    function marginize() {
      $('body').css({ 'padding-top': $('.top').height() + 'px' });
      if (island()) {
        if (mmenu.open) {
          console.log('ok');
          $('.bottom').attr('style', '');
          $('.bottom').css({
            'max-width': '100vw',
            'min-width': 'auto',
            width: '80vw',
          });
        }

        if (!mmenu.open) {
          $('.top').css({
            width: 'calc(100% - ' + $('.bottom').width() + 'px)',
          });

          $('body').css({ 'padding-right': $('.bottom').width() + 'px' });
        }
        $('body').css({ 'padding-bottom': '0px' });
      } else {
        $('.top').css({ width: '100%' });
        $('body').css({ 'padding-right': '0px' });
        $('body').css({ 'padding-bottom': $('.bottom').height() + 'px' });

        if (mmenu.open) {
          console.log('ok');
          $('.bottom').attr('style', '');
          $('.bottom').css({
            'max-height': '100vh',
            'min-height': 'auto',
            height: '80vh',
          });
        }
      }
    }


    closemenulistener = [];
    function addOnCloseMenuListener(f) {
      closemenulistener.push(f);
    }

    function removeOnCloseMenuListener(f) {
         const index = closemenulistener.indexOf(f);
        if (index > -1) {
          closemenulistener.splice(index, 1); 
        }
    }

    function openmenu() {

      

      $('.dim').fadeIn();
      $('.min').hide();
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

    function closemenu() {
      $('.min').show();
      $('.big').hide();
      $('.dim').hide();
      mmenu.open = false;
      $('.bottom').attr('style', '');
      // marginize();
      setTimeout(function () {
        marginize();
      }, 350);

      for (var i = 0;i<closemenulistener.length;i++) {
        //closemenulistener[i]();
        console.log("sdf");
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
      //closedialog('onlinepaydialog');
      //$('.myorders').empty();
     
      if (event.state == null) {
       llist(".products", "index");
       $(".product").empty();
       $(".product").hide();
       closemenu();
      
      } else {



        if (event.state.act == 'product') {

          closemenu();
          oproduct(event.state.prod);

       


        }

        if (event.state.act == 'cartup') {
         

         if (xcart.total().count < 1) {
            closemenu();
            history.back();
         }
          closedialog("dialog1");
          
        }


        if (event.state.act == 'getnumber') {
       

          if (myorder.orderid != event.state.orderid) {
               history.back();
          } 
          
          closedialog("dialog2");
          opendialog("dialog1");
          


        }


        //if (event.state.act == 'getnumber') {

       // }


        if (event.state.act == 'getaddress') {


          if (myorder.orderid != event.state.orderid) {
              history.back();
          } 
          
          closedialog("dialog3");
          opendialog("dialog2");


          



        }




        


        if (event.state.act == 'list') {
          $(".product").empty();
          $(".product").hide();
         
        }



      }

    });
  </script>








  <div class="dialog" id="dialog1">

    <br>
    enter number
    <form id="usernumber_form"   action="/" method="post">
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

    <form id="useraddress_form"   action="/" method="post">
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

    payment <button onclick="offlinepay()" >offlinepayment</button>


    <button onclick="onlinepay()" >onlinePayment</button>

  </div>



  <div class="dialog" id="onlinepaydialog">
پرداخت آنلاین ....
  </div>



</body>

</html>