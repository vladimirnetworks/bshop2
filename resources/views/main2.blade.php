<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="" />
  <meta charset="utf-8">
  <title>{{$pageTitle}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="">

  <script src="/jquery/jquery.min.js"></script>
  

  <style>
    body {
      transition: all 0.2s;

    }
    .top {
      z-index: 1000;
      position: fixed;
      background-color: red;
      top: 0px;
      left: 0px;
      text-align: center;
      width: 100%;
      height: 11vh;
      max-height: 4rem;
      min-height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.1s;
    }

    .bottom {
      z-index: 1001;
      position: fixed;
      background-color: blue;

      /*  bottom: 0px;
    left: 0px;
    width: 100%;
    height: 11vh;
    max-height: 4rem;
    min-height: 3rem;
    */

      text-align: center;
      transition: all 0.3s;
    }

    .bottom .min {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .bottom .big {
      display: flex;
      height: 100%;
      width: 100%;
      display:none;
      background-color:green
    }

    .bottom .min .itm {
      width: 50px;
      height: 50px;
      background-color: red;
      margin: 2px;
    }

    @media screen and (orientation: portrait) {
      .bottom {
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 11vh;
        max-height: 4rem;
        min-height: 3rem;
      }

      .bottom .min .cart {
        margin-right: auto;
        background-color: white;
      }

      .bottom .min {
        flex-direction: row;
        justify-content: right;
        align-items: center;
      }

      .top {
        width: 100%;
      }
    }
    @media screen and (orientation: landscape) {
      .bottom {
        right: 0px;
        top: 0px;
        width: 11vw;
        height: 100%;
        max-width: 10rem;
        min-width: 5rem;
      }

      .bottom .min {
        flex-direction: column-reverse;
        justify-content: end;
        align-items: center;
      }

      .bottom .min .cart {
        margin-top: auto;
        background-color: white;
      }

      .top {
        width: calc(100% - 11vw);
      }
    }
  </style>

</head>

<body>
  @yield('main')


 
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
      closemenu();
    });

    $('.bottom').click(function () {
      openmenu();
    });
  </script>
</body>

</html>