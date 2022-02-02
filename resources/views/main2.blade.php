<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="" />
  <meta charset="utf-8">
  <title>{{$pageTitle}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="">

  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
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
      display: inline;
    }
  </style>
</head>

<body>
  @yield('main')
</body>

</html>