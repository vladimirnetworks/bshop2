function hpu(xact) {
    console.log("added " + xact.act);
    history.pushState(xact, xact.act, "?" + xact.act);
}

function oproduct(p) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    $(".product").empty();
    $(".product").show();

    $(".product").append(p.title);


    llist(".products", "relateto/186")




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