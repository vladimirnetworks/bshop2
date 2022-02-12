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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    $(".product").empty();
    $(".product").show();

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

    $(".product").append(prd);


    if (p.hasOwnProperty('dval2')) {
        eval(p.dval2);
    }







}

function llist(target, path) {





    $(target).empty();

    apix.get(path, function(vals) {

        var product = $("<div>" + vals.tinytitle + "</div>");

        product.click(function() {
            oproduct(vals);
            hpu({ act: "product", prod: vals });
        });

        $(target).append(product);
    })
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

function closedialog(i) {

    var dialogbox = $("#" + i + '_box');
    dialogbox.css({ "margin-top": "100%", "transform": "scale(0)" });

    setTimeout(function() {

        $("#" + i + "_container").css({ "opacity": "0" });
        $(".dialog_dim").css({ "opacity": "0" });

        setTimeout(function() {
            $(".dialog_container").remove();
            $(".dialog_dim").remove();
        }, 500)

    }, 100);


}

function opendialog(i, w = "80%", h = "80%") {
    var ddialog = $("#" + i).clone(true, true);

    console.log(ddialog);
    ddialog.css({ "display": "block" });

    $(".dialog_container").remove();
    $(".dialog_dim").remove();

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


    var dim = $('<div class="dialog_dim" style="transition: all 0.2s;position: fixed;width:100%;height:100%;z-index: 1003;background-color:black;top:0px;left:0px;opacity:0.5"></div>');
    
    dialog_cont.click(function() {
        history.back();
    });

    $("body").append(dim);
    $("body").append(dialog_cont);
}