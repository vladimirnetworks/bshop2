@extends('main3')

@section('main')






     <div id="router1" style="padding:0.5rem"></div>
     
      
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