<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="Webpage description goes here" />
  <meta charset="utf-8">
  <title>Change_me</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="">

  <script src="/jquery/jquery.min.js"></script>
</head>

<body>
  
<div class="container">
  
</div>

<script>
    $(".container").html("...");

    $.ajax({
        url: "/debb",
        type: 'GET',
       
        success: function(res) {
           
            $(".container").html(res);
           
        }
    });


</script>

</body>
</html>