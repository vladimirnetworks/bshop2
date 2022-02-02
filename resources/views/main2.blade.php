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
      background-color: red;
      bottom: 0px;
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
  </style>
</head>

<body>
  @yield('main')

  <script>
    function marginize() {
  $("body").css({"padding-top":$(".top").height()+"px"});
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