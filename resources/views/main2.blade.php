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
    .top {
      z-index: 1003;
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

    }

    .bottom {
      z-index: 1003;
      position: fixed;
      background-color: blue;

    /*  bottom: 0px;
      left: 0px;
      width: 100%;
      height: 11vh;
      max-height: 4rem;
      min-height: 3rem;
      */

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

    }


@media screen and (orientation:portrait) {
  .bottom {
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 11vh;
      max-height: 4rem;
      min-height: 3rem;
  }
 }
 @media screen and (orientation:landscape) { 
  
.bottom {
      right: 0px;
      top: 11vh;
      width: 5vw;
      height: 100%;
      max-width: 4rem;
      min-width: 3rem;
}

  }

  </style>
</head>

<body>
  @yield('main')


  <script>

function island() {
  if(window.innerHeight > window.innerWidth){
    return false;
  } else {
    return true;
  }
}

    function marginize() {

      $("body").css({"padding-top":$(".top").height()+"px"});
      if (island()) {
       $(".bottom").css({"top":$(".top").height()+"px"});
      } else {
        $(".bottom").css({"top":"auto")};
      }
}

 window.addEventListener(
        'resize',
        function (event) {


          marginize();

           
        },
        true
      );

      marginize();     
  </script>
</body>

</html>