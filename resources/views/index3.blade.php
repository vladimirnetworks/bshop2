@extends('main3')

@section('main')




     <div class="myorders"></div>

     <div class="product"></div>
     <div class="products"></div>


     
      
      <script>
      llist(".products", "index")
      </script>
    
@if(isset($_GET['zpalvf']))
<script>
       loadmyorders();
       hpu({act:"showmyorders"});    
</script>
@endif




@stop