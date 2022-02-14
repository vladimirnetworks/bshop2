mmenu = {};




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


    var rt = r();

    var product = $('<div class="product"></div>');

    rt.append(product);


    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;



    var prd = $("<div></div>");

    prd.append(p.title);

    var addtocartButton = $('<button>addTocart</button>');

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

function r() {

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
            hpu({act:"singleorderview"});
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

function onlinepay(oid) {
    xcart.empty();
    window.history.go(-4);

    setTimeout(function() {
        hpu({act:"waitforonlinepay"});  
        opendialog('onlinepaydialog');


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