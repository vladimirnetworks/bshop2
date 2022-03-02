mmenu = {};
mmenu.xtimeout = null;

dialog_do = {};

function androidfirebasetoken(inp) {

}

function apptype() {
 if (navigator.userAgent.match(/androidwvapp/)) {
   return "androidapp";
 } else {
    return "web";  
 }
}


function debb(inp) {
  $("#searchinputtext").val(inp);
}

//begin
/*
orderloadRunned = false;

function orderloadFunc() {
    loadmyorders();
    hpu({act:"showmyorders"});   
}

function orderloadOnLoad() {
    orderloadRunned = true;
    orderloadFunc();
}

function orderloadEvl() {
    if (!orderloadRunned) {
     orderloadFunc();
    }
}
*/
//end

function addtocart(p) {
    var itm = xcart.getItem(p.id);


    if (!itm) {
        xcart.add({
            id: p.id,
            title: p.title,
            tinytitle: p.tinytitle,
            price: parseInt(p.price),
            photos:p.photos
        });
    } else {
        xcart.changeCount(p.id, parseInt(itm.count) + 1);
    }
}
function TransFormAnim(elem) {
    elem.css({ "transition": "all 0.100s", "transform": 'scale(0.8)' });
    setTimeout(function() {
        elem.css({ "transition": "all 0.700s","transform": 'scale(1.0)' });
    }, 100);
}

function setTransFormAnim(elem) {
    elem.on("click", function() {

        TransFormAnim(elem);

    });
}





function topersiannumber(str) {
    var numbers = [/[0۰٠]/g, /[1۱١]/g, /[2۲٢]/g, /[3۳٣]/g, /[4۴٤]/g, /[5۵٥]/g, /[6۶٦]/g, /[7۷٧]/g, /[8۸٨]/g, /[9۹٩]/g];
    var persiannumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];


    for (var i = 0; i < numbers.length; i++) {
        str = str.toString().replace(numbers[i], persiannumbers[i]);
    }
    return str;

}

function farsi_price(inp) {
    
    var inpc = inp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return topersiannumber(inpc);
}

function SwiperBox(fields) {
    var self = this;

    this.HTMLElement = document.createElement("div");

    this.HTMLElement.style.width = "100%";

    this.HTMLElement.style.overflow = "hidden";
    this.HTMLElement.style.position = "relative";
    this.HTMLElement.style.direction = "ltr";



    var container = document.createElement("div");

    container.style.position = "absolute";
    container.style.left = "0px";
    container.style.top = "0px";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.whiteSpace = "nowrap";

    var ratio = document.createElement("img");
    //this is 1X1 png image so you can change it to any ratio you want
    ratio.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=';
    if (typeof fields.ratio !== 'undefined') {
        ratio.src = fields.ratio;
    }
    ratio.style.width = "100%";
    ratio.style.visibility = "hidden";

    this.HTMLElement.appendChild(ratio);
    this.HTMLElement.appendChild(container);

    var elem_conts = [];

    for (var i = 0; i < fields.items.length; i++) {

        var itm = document.createElement("div");
        itm.style.width = "100%";
        itm.style.height = "100%";
        itm.style.display = "inline-block";
        itm.style.position = "relative";

        var itmcont = document.createElement("div");
        itmcont.style.position = "absolute";
        itmcont.style.left = "0px";
        itmcont.style.top = "0px";
        itmcont.style.width = "100%";
        itmcont.style.height = "100%";

        if (typeof fields.items[i] == 'object') {
            itmcont.appendChild(fields.items[i])
        } else {
            var titm = document.createElement("div");
            titm.innerHTML = fields.items[i];
            titm.style.width = "inherit";
            titm.style.height = "inherit";
            itmcont.appendChild(titm);
            fields.items[i] = titm;
        }

        itm.appendChild(itmcont);

        elem_conts.push(itm)
        container.appendChild(itm);

    }

    this.start = 0;
    this.mainpos = 0;
    this.stpx = 0;
    this.numx = 0;
    this.movied = true;
    this.mousedown = false;

    this.swipStart = function(e) {
        e.preventDefault();
        self.mousedown = true;
        if (typeof e.changedTouches !== 'undefined') {
            self.start = e.changedTouches[0].pageX;
        } else {
            self.start = e.pageX;
        }

    }

    this.swiping = function(e) {

        if (self.mousedown) {

            e.preventDefault();
            e.stopPropagation();
            if (typeof e.changedTouches !== 'undefined') {
                var dif = e.changedTouches[0].pageX - self.start;

            } else {
                var dif = e.pageX - self.start;

            }
            container.style.transition = 'none';
            container.style.left = self.mainpos + dif + "px";

        }
    }

    this.GoTo = function(gotox) {

        container.style.transition = 'all 0.1s';
        if (gotox > 0 && gotox <= container.children.length) {

            self.numx = gotox - 1;
            self.stpx = elem_conts[self.numx].offsetLeft * -1;
            self.mainpos = self.stpx;
            container.style.left = self.mainpos + "px";

        }
    }

    this.swiptoLeft = function() {
        if (self.numx < (container.children.length) - 1) {
            self.numx++;
            self.stpx = elem_conts[self.numx].offsetLeft * -1;
        }
        self.swipp();
    }


    this.swiptoRight = function() {
        if (self.numx > 0) {
            self.numx--;
            self.stpx = elem_conts[self.numx].offsetLeft * -1;
        }
        self.swipp();
    }

    this.swipp = function() {
        self.mainpos = self.stpx;
        container.style.left = self.mainpos + "px";
        if (typeof self.onSwipe !== 'undefined') {
            self.onSwipe(self.numx, fields.items[self.numx]);
        }

    }

    this.swipEnd = function(e) {
        self.mousedown = false;
        if (typeof e.changedTouches !== 'undefined') {
            var dif = e.changedTouches[0].pageX - self.start;
        } else {
            var dif = e.pageX - self.start;
        }
        self.mainpos = self.mainpos + dif;
        container.style.transition = 'all 0.1s';
        var maxallowed = container.children.length - 1;
        var minallowed = 0;
        var elemoffset = 0;

        if (dif < 0) {
            self.swiptoLeft();
        } else if (dif > 0) {
            self.swiptoRight();
        } else if (dif == 0) {
            if (typeof self.onClick !== 'undefined') {
                self.onClick(self.numx, fields.items[self.numx]);
            }
        }

    }

    this.mouseout = function(e) {

        if (self.mousedown) {
            self.swipEnd(e);
        }

    }

    this.resizeFix = function() {
        self.start = 0;
        self.stpx = elem_conts[self.numx].offsetLeft * -1;
        self.mainpos = self.stpx;
        container.style.left = self.stpx + "px";
    }



    //mouse	
    this.HTMLElement.addEventListener("mousedown", this.swipStart, true)
    this.HTMLElement.addEventListener("mousemove", this.swiping, true)
    this.HTMLElement.addEventListener("mouseup", this.swipEnd, true)
    this.HTMLElement.addEventListener("mouseout", this.mouseout, true)

    //touch	
    this.HTMLElement.addEventListener("touchstart", this.swipStart, true)
    this.HTMLElement.addEventListener("touchmove", this.swiping, true)
    this.HTMLElement.addEventListener("touchend", this.swipEnd, true)

    window.addEventListener("resize", function(e) {
        if (typeof self !== 'undefined') {
            self.resizeFix()
        }
    });

    return this;
}



chpu = "";

myhistor = {};
myhistor.state = [];
myhistor.curs = false;
myhistor.pushstate = function (v,t) {
    
    var pp = {};
    pp.state = v;
    pp.state.act = t;

    myhistor.state.push(pp);
    myhistor.ended = "false";

   
}

myhistor.onpop = function(act) {
  ////console.log(act);
}

myhistor.ended = "true";

myhistor.back = function(tot) {

    if (tot > myhistor.state.length) {

        tot = myhistor.state.length;
       
    }
    
    console.log("tot :"+tot);


   for (var i = 0 ; i < tot ;i++) {

    console.log("i :"+i);
        var poped = myhistor.state.pop();  
        myhistor.onpop(myhistor.state[myhistor.state.length-1]);

   }
   
   if (tot ==0 ) {
    myhistor.ended = "true";
   }

   return myhistor.ended;



}



function hpu(xact) {
    //console.log("added " + xact.act);
    chpu = xact.act;
    // history.pushState(xact, xact.act, "?" + xact.act);
    history.pushState(xact, xact.act,window.location);
    myhistor.pushstate(xact, xact.act);
}



function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function flymaker(photo) {

    var fly = $('<div class="fly" style="position: fixed; bottom: 0px; left: 0px;width:1px;heigh:1px;z-index:2000"></div>');
    fly.append('<img style="width:100%;height:100%" src="'+photo+'" />');
 
    return fly;
}

function oproduct(p) {


    //androidinterface.openintent("com.farsitel.bazaar","bazaar://details?id=com.instagram.android");

    var rt = r('oproduct');
    var product = $('<div class="product"></div>');
    rt.append(product);



      var products = $('<div class="products"></div>');
    
        rt.append(products);
         olist("relateto/"+p.id,function(prod) {
          products.append(prod);
        },null); 


    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;



    var prd = $('<div></div>');

    var prdtop = $('<div style="display:flex;align-items: start;"></div>');

    var back = $('<div style="text-align:center;padding: 0.9rem;"><img style="width:100%;height:auto" src="https://www.behkiana.ir/icons/back.png?"/></div>');
    var srch = $('<div style="text-align:center;padding: 0.9rem ;"><img style="width:100%;height:auto" src="https://www.behkiana.ir/icons/mag.png?"/></div>');
   
    setTransFormAnim(back);
    setTransFormAnim(srch);
   
   
    back.click(function() {
        //history.back();
        appback(-1);
    });

    srch.click(function() {
        $("#searchinputtext").val("");
        ssearchbox();
        hpu({ act: "searchbox" });
        $("#searchinputtext").focus();
    });

    

    prd.append(prdtop);


    /**/
    var photgals = JSON.parse(p.photos);

    var photoitems = [];
    var photoitems2 = [];
   
    var fisrtimage = "https://trns-bbn.apps.ir-thr-at1.arvan.run/?name=https://www.behkiana.ir/"+photgals[0].medium;
    
    for (var i = 0; i < photgals.length; i++) {
        photoitems.push('<div class="myitem"><img style="width:100%" src="https://www.behkiana.ir/' + photgals[i].medium + '"  /></div>');  
        photoitems2.push('<div class="myitem"><img style="width:100%" src="https://www.behkiana.ir/' + photgals[i].medium + '"  /></div>');
    }

    var mySwipe_portrate = new SwiperBox({
        items: photoitems
    });

    var photos_portrate = $('<div class="prodgalport"></div>');
    photos_portrate.append($(mySwipe_portrate.HTMLElement));
    var mySwipe_landscape = new SwiperBox({
        items: photoitems2
    });



    var photos_lanscape = $(mySwipe_landscape.HTMLElement);


    var price = $('<div class="pt-1 text-success" style="font-size:150%;font-weight:bold">' + farsi_price(p.price) + ' تومان </div>');

    var caption = $('<ul style="text-align: right;font-size:80%">' + p.licaption + '</ul>');




    //

    var vasat = $('<div class="prodtopvasat" style="flex-grow:1"></div>');

   

    vasat.append(photos_portrate);

    prdtop.append(back);
    
    prdtop.append(vasat);

    prdtop.append(srch);


    var porttitle = $('<div class="portprodtitle" style="text-align: center;direction:rtl">'+p.title+'</div>');
    prd.append(porttitle);

    porttitle.append(price);

    porttitle.append(caption);
    


    vasat.append('<div class="landprodtitle" style="text-align: center;">'+p.title+'</div>');
    var landbox = $('<div class="prodlandbox" style="text-align: center;padding-right:2rem"></div>');
    var leftlandbox = $('<div style="flex-grow:1;text-align: right;direction:rtl;    padding-right: 1rem"></div>');
    var rightlandbox = $('<div style="flex-grow:1;max-width:150px"></div>');


    var priceAndAddtoCart_landscape = $('<div style="display:flex;padding:1rem"></div>');
    priceAndAddtoCart_landscape.append(price.clone());

    var addtocartland = $('<button class="cartBtn" style="margin-right:1rem" >خرید</button>');


   var fly = flymaker(fisrtimage);

   priceAndAddtoCart_landscape.append(addtocartland);
    setTransFormAnim(addtocartland);

    addtocartland.click(function() {
        addtocart(p);

    


        setTimeout(function() {
            halfopenmenu();
        },700);

        
        setTimeout(function() {
        closemenu();
        },2000);


        photos_lanscape.css({"visibility":"hidden"});

        var myfly = fly.clone();
        $('body').append(myfly);

        var position_from_top = photos_lanscape.offset().top - $(window).scrollTop();
        xofsset = photos_lanscape.offset();
        var btm = $(window).height() - (position_from_top + photos_lanscape.height());

        myfly.css({
            width: photos_lanscape.width() + "px",
            bottom: btm + "px",
            height: photos_lanscape.height() + "px",
            left: xofsset.left + "px",
        });

     
        setTimeout(function() {
          
         var rrr = ($(window).width()-xofsset.left);
         rrr = rrr - photos_lanscape.width() ; 
         rrr = rrr/2;
        

         var elemfromright = $(window).width()-xofsset.left;
         elemfromright = elemfromright-photos_lanscape.width()/2

        
         var sabadvasat = ($(window).width()*0.4)/2;
        

        rrr =  elemfromright-sabadvasat;

   
        rrr = rrr/2;

       
      

               jumping(myfly, 50, rrr, 180, 360, 90, 1,p.id);
               myfly.remove();

       setTimeout(function() {
        photos_lanscape.css({"visibility":"visible"});
       },800);


        },100);


    });

    leftlandbox.append(priceAndAddtoCart_landscape);
    leftlandbox.append(caption.clone());
    rightlandbox.append(photos_lanscape);
    landbox.append(leftlandbox);
    landbox.append(rightlandbox);
    prd.append(landbox);

    /**/


    var addtocartButtoncontPort = $('<div class="portaddtocart" style="text-align: center;"></div>');


    var addtocartport= $('<button class="cartBtn" style="" >خرید</button>');
    addtocartButtoncontPort.append(addtocartport);
    setTransFormAnim(addtocartport);
    

    addtocartport.click(function() {

          
        addtocart(p);

        halfopenmenu();
        setTimeout(function() {
        closemenu();
        },2000);


        photos_portrate.css({"visibility":"hidden"});

        var myfly = fly.clone();
        $('body').append(myfly);

        var position_from_top = photos_portrate.offset().top - $(window).scrollTop();
        xofsset = photos_portrate.offset();
        var btm = $(window).height() - (position_from_top + photos_portrate.height());

        myfly.css({
            width: photos_portrate.width() + "px",
            bottom: btm + "px",
            height: photos_portrate.height() + "px",
            left: xofsset.left + "px",
        });

     
        setTimeout(function() {
          
         var rrr = ($(window).width()-xofsset.left);
         rrr = rrr - photos_portrate.width() ; 
         rrr = rrr/2;

               jumping(myfly, 50, rrr, 180, 360, 90, -1,p.id);
               myfly.remove();

       setTimeout(function() {
        photos_portrate.css({"visibility":"visible"});
       },800);


        },100);




    });

    prd.append(addtocartButtoncontPort);

    product.append(prd);


    if (p.hasOwnProperty('dval2')) {
      //eval(p.dval2);
      // console.log(p.dval2);
    }







}


function closemenu() {


   // $('.basket').show();
    $('.min').show();
    $('.big').hide();
    $('.bighalf').hide();
    $('.dim').hide();
    
    $('.bottom').attr('style', '');
    // marginize();

    mmenu.open = false;
    mmenu.halfopen = false;


    clearTimeout(mmenu.xtimeout);
    mmenu.xtimeout = setTimeout(function () {
       
      marginize();
    }, 550);


  }

function closealldialogs() {
closedialog("dialog1");
closedialog("dialog2");
closedialog("dialog3");
closedialog("singleorderview");
closedialog("onlinepaydialog");
}

function island_sus() {
    if (window.innerHeight > window.innerWidth) {
      return false;
    } else {
      return true;
    }
  }


  function island_sus2() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return false;
}

if (window.matchMedia("(orientation: landscape)").matches) {
return true;
}
  }


  function island() {
    if (window.innerWidth/window.innerHeight < (13/9)) {
        return false;
      } else {
       return true;
      }
  }

function marginize() {

    if ($('.top').is(":visible")) {
        $('body').css({ 'padding-top': $('.top').height() + 'px' });
    } else {
        $('body').css({ 'padding-top': '0px' });
    }

  
    if (island()) {
      if (mmenu.open) {
       
        $('.bottom').attr('style', '');
        $('.bottom').css({
          'max-width': '100vw',
          'min-width': 'auto',
          width: '80vw',
        });
      }

      if (mmenu.halfopen) {
       
        $('.bottom').attr('style', '');
        $('.bottom').css({
          'max-width': '40vw',
          'min-width': 'auto',
          width: '80vw',
        });
      }

      if (!mmenu.open && !mmenu.halfopen) {

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

        $('.bottom').attr('style', '');
        $('.bottom').css({
          'max-height': '100vh',
          'min-height': 'auto',
          height: '80vh',
        });
      }

      if (mmenu.halfopen) {

        $('.bottom').attr('style', '');
        $('.bottom').css({
          'max-height': '40vh',
          'min-height': 'auto',
          height: '80vh',
        });
      }

    }
  }

function r(tag) {

    if (tag == 'oproduct') {
        $(".top").hide();
    } else {
        $(".top").show();
    }

  

    marginize();

    closealldialogs();

    closemenu();
    $("#router1").empty();

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    return $("#router1");
}

function olist(path,dox,onnothing) {

    var apionnothing = null;

    if (onnothing != null) {
        apionnothing = function(res) {
 
                onnothing(res);
          
        };
    }

    apix.get(path, function(vals) {

        var product = $("<div></div>");


        product.append('<img src="https://www.behkiana.ir/'+vals.photo.small+'" />');

        product.append('<div style="font-size:80%">'+vals.tinytitle+"</div>");

        product.append('<div style="display:flex;align-items:center;justify-content:center"><span>'+farsi_price(vals.price)+'</span> <span style="font-size:65%" >تومان</span></div>');

        setTransFormAnim(product);

        product.click(function() {
            oproduct(vals);
            hpu({ act: "product", prod: vals });
        });

        dox(product);
       
    },null,apionnothing)
}

function customepage(id) {



    var rt = r();
    var page = $('<div class="customepage"></div>');
    rt.append(page);
    var apnd = $("#custompage_"+id).clone(true,true);
    apnd.css({"display":"block"});
    page.append(apnd);
}
function llist(path) {

    $("#searchinputtext").val("");
  var rt = r();
  var products = $('<div class="products"></div>');
  rt.append(products);
  olist(path,function(prod) {
    products.append(prod);
  },null);

    
}


function ssearchbox() {
   // console.log("ssearchboxssearchbox");

    var rt = r();
    var srch = $('<div class="srchbox products"></div>');
    rt.append(srch);


    srch.empty();
    if ($("#searchinputtext").val() != "" && $("#searchinputtext").val().length > 2) {

    olist("search/"+$("#searchinputtext").val(),function(prod) {
     
        srch.append(prod);
      },function(res) {
      srch.append('<div style="text-align:center;direction:rtl">'+"هیچی برای \""+$("#searchinputtext").val() + "\" پیدا نشد <br>😔😔😔"+'</div>');

      });
    } else {
      
    }
    


  
      
  }


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function rnd(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function me() {
    return readCookie('base_address') + ":" + readCookie('x_address');
}

function toyou(path, data, onloadx) {
    var xhttp = new XMLHttpRequest();


    xhttp.onload = function() {
        if (onloadx != null) {


            if (this.responseText != null && this.responseText != "") {
                onloadx(JSON.parse(this.responseText));
            } else {
                onloadx();
            }
           
        }
    }


    xhttp.open("POST", "/api/" + path + "?session=" + makeid(7));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ "me": me(), "data": data }));
}

function api() {
    self = this;
    this.api = "https://www.behkiana.ir/api/";

    this.xcache = {};

    this.get = function(path, doin, onload,onnothing) {

            
       
        if (self.xcache[self.api + path]) {

            if (onload) {
                onload(self.xcache[self.api + path].data);
                if (data.hasOwnProperty('dval2')) {
                    eval(data.hasOwnProperty('dval2'));
                }
            }

            for (var i = 0; i < self.xcache[self.api + path].data.length; i++) {
                doin(self.xcache[self.api + path].data[i]);
            }

            if (onnothing !=null && self.xcache[self.api + path].data.length == 0) {
              //  console.log("call on nothing api cache");
                onnothing(self.xcache[self.api + path].data);
            }

        } else {

          /*  $.getJSON(this.api + path, function(data) {

                self.xcache[self.api + path] = data;

                if (onload) {
                    onload(data.data);

                    if (data.hasOwnProperty('dval2')) {
                        eval(data.dval2);
                    }


                }

                for (var i = 0; i < data.data.length; i++) {
                    doin(data.data[i]);
                }
            });
*/

//console.log(this.api + path);

            $.ajax({
                type: "get",
                url: this.api + path,
                crossDomain: true,
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
               
                success: function(data, textStatus, xhr) {

                   
                   
                  //  self.xcache[self.api + path] = data;

                if (onload) {
                    onload(data.data);

                    if (data.hasOwnProperty('dval2')) {
                        eval(data.dval2);
                    }


                }

                var ihve = false;
                for (var i = 0; i < data.data.length; i++) {
                    doin(data.data[i]);
                    ihve = true;
                }


               
                if (onnothing !=null && !ihve) {
                   
                 onnothing(data.data);
                   
                }


                },
                error: function (xhr, textStatus, errorThrown) {
                    ///console.log(errorThrown);
                }});




        }


    }


    this.post = function(path, data, doin, onload) {


        /*
        $.post(this.api + path, JSON.stringify(data), function(data) {
            for (var i = 0; i < data.data.length; i++) {
                doin(data.data[i]);
            }
        }, 'json');
       */

        $.ajax({
            url: this.api + path,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data) {
                if (onload) {
                    onload(data.data);
                }
                for (var i = 0; i < data.data.length; i++) {
                    doin(data.data[i]);
                }

            }
        });


    }



    return this;
}



function Cart() {

    var self = this;
    this.prods = {};

    this.eech = function(e) {
        var self = this;
        Object.keys(this.prods).forEach(function(key) {
            e(self.prods[key])
        });

    }

this.onLoad = function() {
 //console.log("override me I am onload");
}
    this.empty = function() {

        self.prods = {};
        self.triggerAllChangeListeners();
    }

    this.loadfromjson = function(jsonx) {
        this.prods = JSON.parse(jsonx);



        $(document).ready(function() {
          //  self.triggerAllChangeListeners();
               self.onLoad();
        });

    }

    this.items = function() {
        var x = [];
        self.eech(function(i) {
            x.push(i);
        });
        return x;
    }

    this.total = function() {
        var tot = {
            amount: 0,
            count: 0
        }
        this.eech(function(prod) {
            tot.count += prod.count;
            tot.amount += prod.price * prod.count;
        });
        return tot;
    }


    this.getItem = function(id) {
        if (self.prods.hasOwnProperty(id)) {
            return self.prods[id];
        } else {
            return null;
        }

    }

    this.changeListeners = [];
    this.itemDeletedListeners = [];


    this.addChangeListener = function(e) {


        self.changeListeners.push(e);
    }

    this.triggerAllChangeListeners = function() {
        const d = new Date();

        var exdays = 10;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();


       // console.log("coockeset");
        document.cookie = "zcart=" + JSON.stringify(this.prods) + ';' + expires + '; path=/';

        for (i = 0; i < self.changeListeners.length; i++) {
            self.changeListeners[i]();
        }
    }

    this.add = function(prod) {
        if (!self.prods[prod.id]) {
            var newprod = prod;
            newprod.count = 1;
            self.prods[prod.id] = newprod;
        }

        this.triggerAllChangeListeners();

    }


    this.changeCount = function(prodid, num) {
        if (self.prods[prodid]) {
            self.prods[prodid].count = num;
        }
        if (num < 1) {
            delete self.prods[prodid];
         
           for (i = 0; i < self.itemDeletedListeners.length; i++) {
              self.itemDeletedListeners[i](prodid);
            }

        }

        this.triggerAllChangeListeners();

    }



    this.addOnItemDeletedListener = function(e) {
        self.itemDeletedListeners.push(e);
    }


    return this;
}

function closedialog_sus(i) {

    var dialogbox = $("#" + i + '_box');
    dialogbox.css({ "margin-top": "100%", "transform": "scale(0)" });

    setTimeout(function() {

        $("#" + i + "_container").css({ "opacity": "0" });
        $(".dialog_dim").css({ "opacity": "0" });

        setTimeout(function() {
            //$(".dialog_container").remove();
            $(".dialog_container").hide();
            $(".dialog_dim").remove();
        }, 500)

    }, 100);


}

function shakeAnim(elem) {
    elem.addClass("shakeAnim");
    setTimeout(function() {
        elem.removeClass("shakeAnim");
        elem.focus();
    }, 201 * 2);
}

function closedialog(i) {
    $("#"+i+"_container").hide();
    $(".dialog_dim").remove();
}
function opendialog(i) {

    var w = "80%";
    var h = "80%";

$(".dialog_dim").remove();
var dim = $('<div class="dialog_dim" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1003;background-color:black;top:0px;left:0px;opacity:0.8"></div>');
$("body").append(dim);

    if (!$("#"+i+"_container")[0]) {

        var dialogent = $("#" + i).clone(true, true);
        $("#" + i).remove();

        var dialog_cont = $('<div id="' + i + '_container" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1016;top: 0px;left:0px;display: flex;justify-content: center;align-items: flex-start;overflow:auto"></div>');
        var dialogbox = $('<div id="' + i + '_box" style="width:' + w + ';background-color:white;border-radius:1rem;border : 1px solid rgba(0,0,0,.2);padding: 1rem;margin-top:auto;margin-bottom:auto"></div>');
        dialogbox.click(function (e) {
            e.stopPropagation();
        });

        dialogent.css({"display":"block"});
        dialogbox.append(dialogent);
        dialog_cont.append(dialogbox);

       dialog_cont.click(function(e) {
           
            //history.back();
            appback(-1);
            return false;
        });
       
        $("body").append(dialog_cont);
        
    } else {
        $("#"+i+"_container").show();
    }

    if (dialog_do.hasOwnProperty(i)) {
       setTimeout(function() {
        dialog_do[i]();
       },100);
    }

}



//function onFinishorder() {
//    //console.log("finished order");
//}

shippingstatus = [];
shippingstatus[0] = "در حال بررسی";
shippingstatus[1] = "ارسال شده";
shippingstatus[2] = "کنسل";

payemntstatus = [];
payemntstatus[0] = "پرداخت نشده";
payemntstatus[1] = "پرداخت شده";

function loadmyorders() {


    var rt = r();
    var myorders = $('<div class="myorders"  style="display:flex;flex-direction:column;justify-content: center;"></div>');
    rt.append(myorders);


 apix.get("myorders", function(vals) {
     //console.log(vals);

     var orderitem = $('<div style="flex-basis:4.5rem;display:flex;direction:rtl;align-items: center;justify-content: space-around; background-color:#ffa400;margin:0.5rem;border-radius:1rem;padding-bottom:0.2rem;padding-top:0.2rem"></div>');

     setTransFormAnim(orderitem);
     //var orderitem = $("<div>"+vals.encoded_id+"</div>");

     var codee = $('<div style="font-size:80%;">'+vals.encoded_id+'</div>');

     var title = $('<div style="width:40%;text-align:right"></div>');


     for (var i =0 ; i < vals.items.length ; i++) {
         title.append('<div style="font-size:80%;">'+vals.items[i].tinytext+'</div>');
     }

     var payemntstat = $('<div style="font-size:90%;">'+payemntstatus[vals.payment_status]+'</div>');

     var shipping = $('<div style="font-size:90%;">'+shippingstatus[vals.shipping_status]+'</div>');


     //orderitem.append(codee);
     orderitem.append(title);
     orderitem.append(payemntstat);
     orderitem.append(shipping);

     orderitem.click(function() {


        var ov = $("#singleorderview");
        ov.empty();
        

        var orderview = $('<div style="text-align:center;direction:rtl"></div>');



        orderview.append('<div> کد سفارش : '+vals.encoded_id+'</div>');

        var items = $('<div style="max-height: 30vh;overflow:auto;"></div>');

        var bbtm;
        for (var i =0 ; i < vals.items.length ; i++) {

            if (i != vals.items.length-1 ) {
             bbtm = 'border-bottom:1px solid black;';
            } else {
                bbtm = "";
            }
            var itm = $('<div style="display:flex;align-items: center; justify-content: space-around;padding-bottom:0.5rem;padding-top:0.5rem; '+bbtm+'"></div>');

            itm.append('<div style="font-size:80%;width:70%;text-align:right">'+vals.items[i].text+' ('+topersiannumber(vals.items[i].count)+' عدد)</div>');
       
            itm.append('<div style="font-size:80%;">'+topersiannumber(vals.items[i].price*vals.items[i].count)+' تومان</div>');

            items.append(itm);

        }

        var shippindandtotal = $('<div style="border-top:1px solid black;padding-top:0.5rem;padding-bottom:0.5rem;margin-top:1rem;display:flex;flex-direction:column;justify-content: space-around;    line-height: 2rem;border-bottom:1px solid black"></div>');


        var rightshippingandtot = $('<div></div>');
        var leftshippingandtot = $('<div></div>');

        var shipingcost = "";

        if (vals.shipping_cost < 1) {
            shipingcost = "رایگان";
        } else {
            shipingcost = farsi_price(vals.shipping_cost)+" تومان";
        }



        rightshippingandtot.append('<div style="font-size:90%;">هزینه ارسال : '+shipingcost+'</div>');
        rightshippingandtot.append('<div style="font-size:90%;">مجموع : '+farsi_price(vals.amount)+' تومان</div>');

        leftshippingandtot.append('<div style="font-size:90%;">وضعیت : '+shippingstatus[vals.shipping_status]+'</div>');
        leftshippingandtot.append('<div style="font-size:90%;">'+payemntstatus[vals.payment_status]+'</div>');
       
        shippindandtotal.append(rightshippingandtot);
        shippindandtotal.append('<div style="width:2px;border-left:1px solid black"></div>');
        shippindandtotal.append(leftshippingandtot);

        orderview.append(items);

        orderview.append(shippindandtotal);

        orderview.append('<div style="text-align:right;font-size:80%; padding-top:0.5rem">'+vals.orderaddress+'</div>');


        var onlinepaybtn = $('<button class="dialogbtn dialogbtnblue" style="margin:auto;margin-top:1rem">پرداخت آنلاین</button>');

      onlinepaybtn.click(function() {
        onlinepaygo(vals.encoded_id)
      });

      if (vals.payment_status ==0) {
      orderview.append(onlinepaybtn);
    }
      ov.append(orderview);
     

            opendialog("singleorderview");
            hpu({act:"singleorderview",orderid:vals.encoded_id});

     });

     myorders.append(orderitem);
 },null,null);



 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;

}

function offlinepay2() {

    myorder.orderid=null;xcart.empty();
    //history.back();
    appback(-1);

      //hpu({act:"showmyorders"});    
        loadmyorders();
     

}


function offlinepay() {
    xcart.empty();
    //window.history.go(-4);
    appback(-4);

           
    setTimeout(function() {
        loadmyorders();
        hpu({act:"showmyorders"});  
    },100);


}

function onlinepaygo(oid) {
    hpu({act:"waitforonlinepay"});  
    opendialog('onlinepaydialog');
    gotopay(oid);
}

function gotopay(oid) {
    $.ajax({
        url: "/api/onlinepay?apptype="+apptype(),
        type: "post",
        data: {orderid:oid} ,
        success: function (response) {

           if (response.res != "error") {
                
                 

                 if (apptype() == 'androidapp') {
                    androidinterface.openurl(response.res);
                 } else {
                    window.location = response.res;
                 }
                    

                 
           }
         
        },
        error: function(jqXHR, textStatus, errorThrown) {
           //console.log(textStatus, errorThrown);
        }
    });
}

function onlinepay(oid) {
    xcart.empty();
    //window.history.go(-4);
    appback(-4);

    setTimeout(function() {
      
       hpu({act:"waitforonlinepay"});  
        opendialog('onlinepaydialog');


        setTimeout(function() {
         gotopay(oid);
         },1000);
        

    },100);

    
}

function onlinepay2() {
    //history.back();
    appback(-1);
    setTimeout(function() {
    hpu({act:"waitforonlinepay"});
    var oid = myorder.orderid;
    myorder.orderid=null;xcart.empty();
    //history.back();
    appback(-1);

       setTimeout(function() {
        opendialog('onlinepaydialog');

           setTimeout(function() {
             window.location="/onlinepay/"+oid;
           }, 200); 

       }, 200); 
    },50);
}

function checkinbasket(pid) {
   return $("div[data-productid='"+pid+"']").length;
}

function addtobasket(inbasket,delay) {


    var rl = rnd(1,2);

    var newcss = {};
    var newcss2 = {};
    if (rl == 1) {
         newcss = {
           left:rnd(10,20)+"%",
           right:"unset",
           bottom:"60%",
           width:"6em",
           position:"absolute",
           "z-index":"0",
           height:"auto"
       };

       newcss2 = {
           transition: 'all 0.1s ease-in',
           transform: 'rotate(' + rnd(-20,0) + 'deg)',
         };
    } else {

       newcss = {
           right:rnd(10,20)+"%",
           left:"unset",
           bottom:"60%",
           width:"6em",
           position:"absolute",
           "z-index":"0",
           height:"auto"
       };

       newcss2 = {
           transition: 'all 0.1s ease-in',
           transform: 'rotate(' + rnd(0,20) + 'deg)',
         };

    }

    inbasket.css(newcss);

    inbasket.removeClass("fly");
    

    setTimeout(function(){
      
       $("#basketv2").append(inbasket);

       setTimeout(function(){
       inbasket.css(newcss2);
       },100);


       $("#basketv2").addClass("shakesabad");



       setTimeout(function() {
        if (apptype() == 'androidapp') {
            androidinterface.vibb("[0,80,100,50]");
            }
       },200);


       setTimeout(function() {
        $("#basketv2").removeClass("shakesabad");
       },400);

    },100+delay);
}


function jumping(
    telem,
    VertAhrom,
    HorizAhrom,
    fromDeg,
    toDeg,
    moreDeg,
    jahat,
    pid
  ) {

    
    var elem = telem.clone();
    telem.hide();

    var inbasket = elem.clone(); 

    inbasket.attr("data-productid",pid);

    setTimeout(function () {
      telem.show();
    }, 200);

    $('body').append(elem);

    var end = false;

    var xp = parseInt(elem[0].style.left.replace('px', ''));
    var yp = parseInt(elem[0].style.bottom.replace('px', ''));

    elem.removeClass('jump');
    setTimeout(function() {
      elem.addClass('jump');
    }, 10);

    setTimeout(function() {
      elem.removeClass('jump');


    }, 200);

    setTimeout(function() {
        elem.css({
            transition: 'transform 0.4s ease-in',
           transform: 'rotate(' + 170 * jahat + 'deg)',
          });

      }, 300);



    var xelem  = $("<div></div>")

    xelem.css({
      'font-size': fromDeg,
    });

    setTimeout(function() {

   



      xelem.animate(
        { 'font-size': toDeg + moreDeg },
        {
          duration: 1000,
          //     easing: 'swing',
          //  easing: "easein",

          step: function (t, fx) {
            var xx = xp + t;
            var yy = yp + t;

            var a = t / 57.296;

            if (t <= toDeg) {
              var a2 = t / 57.296;
            } else {
              var a2 = toDeg / 57.296;
            }

  //console.log("vertAhrom "+HorizAhrom);

            var ya = Math.sin(a) * VertAhrom;
            var xa = Math.cos(a2) * HorizAhrom;





          if (t < toDeg) {

            elem.css({
               
                bottom: yp - ya,
                left: xp + HorizAhrom * jahat + xa * jahat,
              });

              //console.log("rr");
          

          } else {

               if (!end) {
                    end = true;
                    //console.log("end");

                    var gotohell;


                    //console.log("jahat "+jahat);


                    if (jahat == 1 ) {

                        //gotohell = $(window).width()-(elem.width()/1.5);

                        gotohell = $(window).width() - ($(window).width()*0.4/2);

                        gotohell = gotohell-elem.width()/2;


                    } else {
                        gotohell = ($(window).width()-elem.width())/2;
                    }

                    

                    elem.css({
                        transition: 'all 0.2s ease-in',
                        bottom: '-' + elem.height() + 'px',
                        left: gotohell + 'px',
                        "transform": 'scale(0.4)'
                      //  width:"10vw",
                     //   height:"auto"
                       
                      });

                    

                     // addtobasket(inbasket);


               }


          }

       



          },
        }
      );
    }, 200);
  }

  
function jumping_sus(
    telem,
    VertAhrom,
    HorizAhrom,
    fromDeg,
    toDeg,
    moreDeg,
    jahat,
    pid
  ) {

    
    var elem = telem.clone();
    telem.hide();

    var inbasket = elem.clone(); 

    inbasket.attr("data-productid",pid);

    setTimeout(function () {
      telem.show();
    }, 200);

    $('body').append(elem);

    var end = false;

    var xp = parseInt(elem[0].style.left.replace('px', ''));
    var yp = parseInt(elem[0].style.bottom.replace('px', ''));

    elem.removeClass('jump');
    setTimeout(function() {
      elem.addClass('jump');
    }, 10);

    setTimeout(function() {
      elem.removeClass('jump');


    }, 200);

    setTimeout(function() {
        elem.css({
            transition: 'transform 0.4s ease-in',
            transform: 'rotate(' + 170 * jahat + 'deg)',
          });

      }, 300);



    var xelem  = $("<div></div>")

    xelem.css({
      'font-size': fromDeg,
    });

    setTimeout(function() {

   



      xelem.animate(
        { 'font-size': toDeg + moreDeg },
        {
          duration: 1000,
          //     easing: 'swing',
          //  easing: "easein",

          step: function (t, fx) {
            var xx = xp + t;
            var yy = yp + t;

            var a = t / 57.296;

            if (t <= toDeg) {
              var a2 = t / 57.296;
            } else {
              var a2 = toDeg / 57.296;
            }

  

            var ya = Math.sin(a) * VertAhrom;
            var xa = Math.cos(a2) * HorizAhrom;





          if (t < toDeg) {

            elem.css({
                bottom: yp - ya,
                left: xp + HorizAhrom * jahat + xa * jahat,
              });

              //console.log("rr");
          

          } else {

               if (!end) {
                    end = true;
                    //console.log("end");

                    var gotohell;

                    if (jahat == 1 ) {
                        gotohell = $(window).width()-(elem.width()/1.5);
                    } else {
                        gotohell = "-"+(elem.width()/2.5);
                    }
                    elem.css({
                        transition: 'all 0.2s ease-in',
                        bottom: '-' + elem.height() + 'px',
                        left: gotohell + 'px',
                      //  width:"10vw",
                     //   height:"auto"
                       
                      });

                    

                     // addtobasket(inbasket);


               }


          }

       



          },
        }
      );
    }, 200);
  }


  function androidfirebasetoken(inpp) {
    debb("aa: "+inpp);
  }
function appload() {
    llist("index");

    /*setTimeout(function () {
        debb("de"+androidinterface.getFMStoken2("d"));
    },2000);
    */

   // androidinterface.getFMStoken();




setInterval(function () {
    //debb("or : "+androidinterface.getor());
}, 1000);


}


$(document).ready(function() {

    apix.get("myorders?latest=true", function(vals) {
        $("#oorder").show();
    },null,null);


    if (apptype() == 'androidapp') {
        androidinterface.setliteauthid(me());
    }
    



  });

  isbrowser = true;
  if (apptype() != 'web') {
    isbrowser = false;
  }
  function appback(lvl) {
      console.log("appback called");
      if (isbrowser) {
        console.log("appback called is browser");
         if (lvl ==1) {
           history.back(1);
         } else {
            window.history.go(lvl);
         }
      } else {
        console.log("appback called is app");
          myhistor.back(lvl*-1);
      }
  }




  function setTransFormAnim_end(elem) {
    elem.on("click touchstart", function() {



    elem.css({
        "position":"relative",
        "overflow":"hidden"
    });
        createRipple(elem[0]);

    });
}


 
  function createRipple(button) {
   
  
    
    var circle = document.createElement("span");
    var diameter = Math.max(button.clientWidth, button.clientHeight);
    var radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    setTimeout(function() {
        $(".ripple").remove();
    },1000);
   
  
    button.appendChild(circle);
  }
