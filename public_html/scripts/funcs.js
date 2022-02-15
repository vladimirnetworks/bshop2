mmenu = {};


function TransFormAnim(elem) {
    elem.css({ "transition": "all 0.100s", "transform": 'scale(0.8)' });
    setTimeout(function() {
        elem.css({ "transform": 'scale(1.0)' });
    }, 101);
}

function setTransFormAnim(elem) {
    elem.on("click touchstart", function() {

        TransFormAnim(elem);

    });
}


function topersiannumber(str) {
    var numbers = [/[0۰٠]/g, /[1۱١]/g, /[2۲٢]/g, /[3۳٣]/g, /[4۴٤]/g, /[5۵٥]/g, /[6۶٦]/g, /[7۷٧]/g, /[8۸٨]/g, /[9۹٩]/g];
    var persiannumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];


    for (var i = 0; i < numbers.length; i++) {
        str = str.replace(numbers[i], persiannumbers[i]);
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





function hpu(xact) {
    console.log("added " + xact.act);
    history.pushState(xact, xact.act, "?" + xact.act);
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



function oproduct(p) {


   

    var rt = r('oproduct');

    var product = $('<div class="product"></div>');

    rt.append(product);


    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;



    var prd = $('<div></div>');

    var prdtop = $('<div style="display:flex;align-items: start;"></div>');

    var back = $('<div style="text-align:center;padding: 0.9rem;"><img style="width:70%;height:auto" src="https://www.behkiana.ir/icons/back.png"/></div>');
    var srch = $('<div style="text-align:center;padding: 0.9rem ;"><img style="width:70%;height:auto" src="https://www.behkiana.ir/icons/mag.png"/></div>');
   
   
    var title = $('<div style="flex-grow: 1;text-align:center">'+p.title+'</div>');
  



    back.click(function() {
        history.back();
    });


    prd.append(prdtop);


    /**/
    var photgals = JSON.parse(p.photos);

    var photoitems = [];
    var photoitems2 = [];
    console.log(photgals);
    for (var i = 0; i < photgals.length; i++) {
        photoitems.push('<div class="myitem"><img style="width:100%" src="https://www.behkiana.ir/' + photgals[i].medium + '"  /></div>');
    
        photoitems2.push('<div class="myitem"><img style="width:100%" src="https://www.behkiana.ir/' + photgals[i].medium + '"  /></div>');
    }

    var mySwipe = new SwiperBox({
        items: photoitems
    });

    var photos = $('<div class="prodgalport"></div>');
    photos.append($(mySwipe.HTMLElement));




    var mySwipe2 = new SwiperBox({
        items: photoitems2
    });

    var photos2 = $('<div style="flex-grow:1"></div>');
    photos2.append($(mySwipe2.HTMLElement));



    var price = $('<div class="pt-1 text-success" style="font-size:150%;font-weight:bold">' + farsi_price(p.price) + ' تومان </div>');

    var caption = $('<ul style="text-align: right;font-size:80%">' + p.licaption + '</ul>');




    //

    var vasat = $('<div class="prodtopvasat" style="flex-grow:1"></div>');

    vasat.append('<div class="landprodtitle" style="text-align: center;">'+p.title+'</div>');

    vasat.append(photos);

    prdtop.append(back);
    
    prdtop.append(vasat);

    prdtop.append(srch);


    var porttitle = $('<div class="portprodtitle" style="text-align: center;direction:rtl">'+p.title+'</div>');
    prd.append(porttitle);

    porttitle.append(price);

    porttitle.append(caption);
    


    var landbox = $('<div class="prodlandbox" style="text-align: center;padding-right:2rem"></div>');

    var leftlandbox = $('<div style="flex-grow:1;text-align: right;direction:rtl;    padding-right: 1rem"></div>');
    var rightlandbox = $('<div style="flex-grow:1;"></div>');


    var priceAndAddtoCart = $('<div style="display:flex;padding:1rem"></div>');

    priceAndAddtoCart.append(price.clone());

    var addtocartland = $('<button class="cartBtn" style="margin-right:1rem" >خرید</button>');
    priceAndAddtoCart.append(addtocartland);
    setTransFormAnim(addtocartland)

    leftlandbox.append(priceAndAddtoCart);



    leftlandbox.append(caption.clone());


    rightlandbox.append(photos2);

   

    landbox.append(leftlandbox);
    landbox.append(rightlandbox);

    prd.append(landbox);

    /**/


    var addtocartButton = $('<div class="portaddtocart" style="text-align: center;"><button>addTocart</button></div>');

    addtocartButton.click(function() {

        var itm = xcart.getItem(p.id);


        if (!itm) {
            xcart.add({
                id: p.id,
                title: p.title,
                tinytitle: p.tinytitle,
                price: parseInt(p.price)
            });
        } else {
            xcart.changeCount(p.id, parseInt(itm.count) + 1);
        }


    });

    prd.append(addtocartButton);

    product.append(prd);


    if (p.hasOwnProperty('dval2')) {
      //eval(p.dval2);
      // console.log(p.dval2);
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


  function island() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return false;
}

if (window.matchMedia("(orientation: landscape)").matches) {
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

function r(tag) {

    if (tag == 'oproduct') {
        $(".top").hide();
    } else {
        $(".top").show();
    }

    console.log( $(".top").height());

    marginize();

    closealldialogs();

    closemenu();
    $("#router1").empty();
    return $("#router1");
}

function llist(path) {


  var rt = r();

  var products = $('<div class="products"></div>');
  rt.append(products);
    apix.get(path, function(vals) {

        var product = $("<div>" + vals.tinytitle + "</div>");

        product.click(function() {
            oproduct(vals);
            hpu({ act: "product", prod: vals });
        });

        products.append(product);
    })
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

function me() {
    return readCookie('base_address') + ":" + readCookie('x_address');
}

function toyou(path, data, onloadx) {
    var xhttp = new XMLHttpRequest();


    xhttp.onload = function() {
        if (onloadx != null) {


            onloadx(JSON.parse(this.responseText))
        }
    }


    xhttp.open("POST", "/api/" + path + "?session=" + makeid(7));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ "me": me(), "data": data }));
}

function api() {
    self = this;
    this.api = "/api/";

    this.xcache = {};

    this.get = function(path, doin, onload = null) {

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

        } else {

            $.getJSON(this.api + path, function(data) {

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
        }


    }


    this.post = function(path, data, doin, onload = null) {


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


    this.empty = function() {

        self.prods = {};
        self.triggerAllChangeListeners();
    }

    this.loadfromjson = function(jsonx) {
        this.prods = JSON.parse(jsonx);



        $(document).ready(function() {
            self.triggerAllChangeListeners();
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

    this.addChangeListener = function(e) {


        self.changeListeners.push(e);
    }

    this.triggerAllChangeListeners = function() {
        const d = new Date();

        var exdays = 10;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();


        console.log("coockeset");
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
        }

        this.triggerAllChangeListeners();

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
function opendialog(i, w = "80%", h = "80%") {

$(".dialog_dim").remove();
var dim = $('<div class="dialog_dim" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1003;background-color:black;top:0px;left:0px;opacity:0.5"></div>');
$("body").append(dim);

    if (!$("#"+i+"_container")[0]) {

        var dialogent = $("#" + i).clone(true, true);
        $("#" + i).remove();

        var dialog_cont = $('<div id="' + i + '_container" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1016;top: 0px;left:0px;display: flex;justify-content: center;align-items: center;"></div>');
        var dialogbox = $('<div id="' + i + '_box" style="width:' + w + ';height:' + h + ';background-color:white;border-radius:1rem;border : 1px solid rgba(0,0,0,.2);padding: 1rem;"></div>');
        dialogbox.click(function (e) {
            e.stopPropagation();
        });

        dialogent.css({"display":"block"});
        dialogbox.append(dialogent);
        dialog_cont.append(dialogbox);

       dialog_cont.click(function(e) {
           
            history.back();
            return false;
        });
       
        $("body").append(dialog_cont);
        
    } else {
        $("#"+i+"_container").show();
    }

}

function opendialog_sus(i, w = "80%", h = "80%") {

    $(".dialog_container").hide();
    if (!$("#"+i+"_container")[0]) {
       
    
     console.log("make it");
  

    var ddialog = $("#" + i).clone(true, true);
  $("#" + i).remove();

    console.log(ddialog);
    ddialog.css({ "display": "block" });

    $(".dialog_container").hide();
    

    var dialog_cont = $('<div id="' + i + '_container" class="dialog_container" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1016;top: 0px;left:0px;display: flex;justify-content: center;align-items: center;"></div>');

    var dialogbox = $('<div  id="' + i + '_box" style="transform: scale(0.8);transition: all 0.2s  cubic-bezier(0.175, 0.885, 0.32, 1.275) ;width:' + w + ';height:' + h + ';background-color:white;border-radius:1rem;border : 1px solid rgba(0,0,0,.2);padding: 1rem;margin-top: 40%;opacity:0"></div>');

    dialogbox.click(function () {
        return false;
    });
    dialogbox.append(ddialog);

    setTimeout(function() {
        dialogbox.css({ "margin-top": "unset", "opacity": "1", "transform": "scale(1.2)" });
        setTimeout(function() {
            dialogbox.css({ "transform": "scale(1)" });
        }, 200)
    }, 150);

    dialog_cont.append(dialogbox);


    
    dialog_cont.click(function() {
        history.back();
        return false;
    });
    $("body").append(dialog_cont);
    
} else {

    console.log("reload"+i);
/**/
$("#" + i + "_container").show();
setTimeout(function() {
var dialogbox = $("#" + i + '_box');
dialogbox.css({ "margin-top": "unset", "transform": "scale(1)" });
$("#" + i + "_container").css({ "opacity": "1" });
},1000);
/**/

}
$(".dialog_dim").remove();
var dim = $('<div class="dialog_dim" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1003;background-color:black;top:0px;left:0px;opacity:0.5"></div>');
$("body").append(dim);

}

//function onFinishorder() {
//    console.log("finished order");
//}

function loadmyorders() {


    var rt = r();
    var myorders = $('<div class="myorders"  style="min-height:90vh"></div>');
    rt.append(myorders);


 apix.get("myorders", function(vals) {
     console.log(vals);

     var orderitem = $("<div>"+vals.encoded_id+"</div>");

     orderitem.click(function() {
            opendialog("singleorderview");
            hpu({act:"singleorderview",orderid:vals.encoded_id});
     });

     myorders.append(orderitem);
 });



 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;

}

function offlinepay2() {

    myorder.orderid=null;xcart.empty();history.back();

      //hpu({act:"showmyorders"});    
        loadmyorders();
     

}


function offlinepay() {
    xcart.empty();
    window.history.go(-4);

           
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
        url: "/api/onlinepay",
        type: "post",
        data: {orderid:oid} ,
        success: function (response) {

           if (response.res != "error") {
                  window.location = response.res;
           }
         
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function onlinepay(oid) {
    xcart.empty();
    window.history.go(-4);

    setTimeout(function() {
        hpu({act:"waitforonlinepay"});  
        opendialog('onlinepaydialog');


        gotopay(oid);
    
        

    },100);

    
}

function onlinepay2() {
    history.back();
    setTimeout(function() {
    hpu({act:"waitforonlinepay"});
    var oid = myorder.orderid;
    myorder.orderid=null;xcart.empty();history.back();

       setTimeout(function() {
        opendialog('onlinepaydialog');

           setTimeout(function() {
             window.location="/onlinepay/"+oid;
           }, 200); 

       }, 200); 
    },50);
}