@extends('main3')

@section('main')




     <div class="myorders"></div>

     <div id="router1"></div>
     
      
      <script>
      appload();
      </script>
    
@if(isset($_GET['zpalvf']))
<script>
       loadmyorders();
       hpu({act:"showmyorders"});    
</script>
@endif




@stop