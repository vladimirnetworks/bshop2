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

    </div>

    <script>

       $("#checkout").click(function() {

        hpu({ act: "getnumber"});

          opendialog("dialog1");
         
          return false;
        });


      xcart.addChangeListener(function() {

      var tot = xcart.total();

     // $(".big").text(tot.count+"<hr>"+tot.amount);

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

      if (event.state != null) {
            console.log(event.state);
      }


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
         
          closedialog("dialog1");
          
        }


        if (event.state.act == 'getnumber') {
          opendialog("dialog1");
        }


        if (event.state.act == 'getaddress') {
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
 <div id="close">close</div>
<br>
enter number
<input type="number" />
<button id="next">next</button>

</div>
<script>
$('#close').click(function() {

  history.back();
});


$('#next').click(function() {
hpu({ act: "getaddress"});
//closedialog("dialog1");
opendialog("dialog2");
return false;  
});

</script>




<div class="dialog" id="dialog2">
enter address
  <input type="text" />
  <button id="next2">next</button>
 </div>


 <script>
  
  $('#next2').click(function() {
  hpu({ act: "payment"});
  //closedialog("dialog1");
  opendialog("dialog3");
  return false;  
  });
  
  </script>





<div class="dialog" id="dialog3">
payment
</div>





</body>

</html>