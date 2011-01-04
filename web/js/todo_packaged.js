
movingDistance = 160;
movingElement = 30;
removElement = 35;
currentDate = undefined;


$(document).ready(function(h){
    var left = h(".left").attr("href");
    var right = h(".right").attr("href");
    var premonth = h(".premonth").attr("href");
    var nextmonth = h(".nextmonth").attr("href");    


    var l = function(){
        return h("#user_controls li:first span").text();
    };
    var r = function(H){
        H.droppable({
            drop: function(I, J){
                var K = J.draggable.find(".todo");
                var L = K.data("originalText") || K.text();
                h(this).val(L).focus().select();
                var M = h(J.draggable).find("a").attr("href");
                h(J.draggable).remove();
                jQuery.post(M, "NULL", function(N, O){
                    w()
                })
            }
        })
    };

    r(h(".todo_item_entry:not(:disabled)"));
    r(h("#someday input:text"));
    
    var y = function(K){
        var L = navigator.appName;
        var H = navigator.appName === "Microsoft Internet Explorer";
        var J;
        if (H) {
            J = K.offsetHeight
        }
        else {
            var I = document.defaultView.getComputedStyle(K, "").getPropertyValue("height");
            J = I.split("px");
            J = J[0]
        }
        return parseInt(J, 10)
    };
    
    var s = function(H, I){
        I = I || 20;
        if (y(H) > 20) {
            h(H).parents(".todo_item").addClass("overflow");
            var J = h(H).data("originalText") || h(H).text();
            h(H).data("originalText", J);
            h(H).text(J.substr(0, I));
            s(H, I - 1)
        }
    };
    
    h(".todo").each(function(){
        s(this)
    });
    var m = function(H){
        h(H).mouseenter(function(){
            var J = h(this).siblings(".todo");
            var K = J.data("originalText");
            h(this).parents(".todo_item").removeClass("overflow").addClass("overfloweth");
            J.text(K);
            var I = this;
            h(I).parent().mouseleave(function(){
                h(this).parents(".todo_item").removeClass("overfloweth").addClass("overflow");
                s(J.get(0));
                h(".overflow_abs").unbind("mouseleave")
            })
        })
    };
    m(h(".ellipsis"));
    var o = function(H){
        if (H.length === 0) {
            return null
        }
        return H[H.length - 1]
    };
    var j = function(){
        Cufon.replace("h3");
        Cufon.replace("h1");
        Cufon.replace("#someday .header h2");
        Cufon.replace("#users_settings h2");
        Cufon.now()
    };
    var A = function(){
        h(".list_items li").removeClass("fifth");
        h(".list_items li:nth-child(5n)").addClass("fifth");
        h(".list_items li").removeClass("ten");
        h(".list_items li:nth-child(10n)").addClass("ten");
        h(".list_items li").removeClass("twentyfive");
        h(".list_items li:nth-child(25n)").addClass("twentyfive")
    };
    var C = function(H){
        return h(H).sortable({
            connectWith: ".list_items",
            cursor: "hand",
            delay: 50,
            tolerance: "pointer",
            placeholder: "",
            cancel: "a",
            start: function(I, J){
                J.item.unbind("click")
            },
            stop: function(I, J){
                setTimeout(function(){
                    x(J.item);
                    A();
                    d()
                }, 100)
            },
            update: function(I, J){
                var L = o(J.item.attr("id").split("_"));
                var K = o(this.id.split("_"));
                jQuery.post("user/update_order.php?date=" + K, h(this).sortable("serialize"), function(M){
                    w()
                });
                h(this).find(".overflow_abs").mouseleave()
            },
            remove: function(I, J){
                if (h(this).children().size() === 1) {
                    var K = o(this.id.split("_"));
                    jQuery.post("user/update_order.php?date=" + K, "NULL", function(L){
                        w()
                    })
                }
            }
        })
    };
    var w = function(){
        var H = h(".someday li").length - 5;
        h(".header h2").text("someday (" + H + ")");
        j()
    };
    var x = function(H){
        h(H).click(function(I){
            var K = o(this.id.split("_"));
            jQuery.post("user/toggle_todo.php?id=" + K, "NULL", function(){
            });
            var J = h(this);
            if (J.hasClass("done")) {
                J.removeClass("done");
                J.find("a").hide();
                _gaq.push(["_trackEvent", "Todo List", "Mark Item Not Finished", l()])
            }
            else {
                J.addClass("done");
                J.find("a").show();
                _gaq.push(["_trackEvent", "Todo List", "Mark Item Finished", l()])
            }
        }).find(".delete").click(function(I){
            h(this).parent().parent().remove();
            A();
            d();
            jQuery.post(this.href, "NULL", function(J, K){
                w()
            });
            _gaq.push(["_trackEvent", "Todo List", "Delete Item", l()]);
            return false
        }, true)
    };
    var e = function(H){
        jQuery.post(H.form.action, h(H.form).serialize(), function(J){
            var I = h(H).parent().parent().find(".list_items");
            I.append(J);
            x(I.find("li:last"));
            s(I.find("li:last").find(".todo").get(0));
            m(I.find("li:last").find(".ellipsis"));
            k(I.find("li:last"));
            A();
            d();
            _gaq.push(["_trackEvent", "Todo List", "Create Todo Item", l()])
        })
    };
    var t = function(H){
        h(H).keypress(function(I){        	
            if (I.keyCode === 13) {
                if(h(this).val().length > 255) {
                    alert("Task Length must be Lessthen 255 Characters.");
                    return false;
                }
                if(h(this).val().replace(/^\s+|\s+$/g,"") != "") {
                    e(this);
                    h(this).val("")
                }
                else {
                    h(this).val("");
                    return false;
                }

                return false;
            }         
        })
        return false;
    };
    var k = function(H){
        h(H).mouseenter(function(I){
            var J = h(this);
            if (J.hasClass("done")) {
                J.find("a").show()
            }
        }).mouseleave(function(I){
            var J = h(this);
            J.find("a").hide()
        })        
    };
   
    C(h(".list_items"));
    x(h(".todo_item"));
    t(h(".todo_item_entry"));
    k(h(".todo_item"));
    h(".daily_list:eq(4)").addClass("last");
    h(".red input:text").focus();
    h("input:text").attr("autocomplete", "off");
    j();
    A();

    // ----------- start navigation days //

    // create and return date object from string yyyy-mm-dd
    var dd = function(H){
        var J = H.split("-");
        var K = parseInt(J[0], 10);
        var L = parseInt(J[1], 10);
        var I = parseInt(J[2], 10);
        return new Date(K, L-1, I);
    };



    // create and return date object from string yyyy-mm-dd
    var c = function(H){
        var J = H.href.split("?")[1].split("=")[1].split("-");
        var K = parseInt(J[0], 10);
        var L = parseInt(J[1], 10);
        var I = parseInt(J[2], 10);
        return new Date(K, L-1, I);
    };

    // minus days and return Date Object from Date Object default is 1
    var u = function(H,d){
        if(!d) {
            d = 1
        }
        var I = new Date(H);
        I.setDate(I.getDate() - d);
        return I
    };

    // Plus days and return Date Object from Date Object default is 1
    var B = function(H,d){
        if(!d) {
            d = 1
        }
        var I = new Date(H);
        I.setDate(I.getDate() + d);
        return I;
    };

    // create and return date string from date object yyyy-mm-dd
    var v = function(H){
        return H.getFullYear() + "-" + (H.getMonth()+1) + "-" + (H.getDate());
    };
        
    var G = function(H, J){
        var I = H.href.split("?");
        H.href = I[0] + "?date=" + v(J);
    };

    var D = 0;
    
    var i = function(){
        return false;
    };
    var g = function(){
        h(".left, .right").unbind("click").click(i);
    };

    var b = function(){
        h(".left, .right").unbind("click");
        h(".left").click(F);
        h(".right").click(a);
    };

    var F = function(J){
        g();
        if (D !== 0) {
            q(false);
            h(".someday:eq(4)").addClass("last");
        }
        else {
            var I = c(this);
            var H = this;
            E(I, false, function(){
                D += 1;
                var K = parseInt(h("#scrollContainer").css("left"), 10);
                h("#scrollContainer").css("left", K - movingDistance);
                G(H, u(I));
                q(false);
                h(".someday:eq(4)").addClass("last");
            })
        }
        return false;
    };

    var a = function(J){
        g();
        if (D + 5 < h("#scrollContainer").children().size()) {
            q(true);
            h(".someday:eq(4)").addClass("last");
        }
        else {
            var I = c(this);
            var H = this;
            E(I, true, function(){
                G(H, B(I));
                q(true);
                h(".someday:eq(4)").addClass("last");
            })
        }
        return false;
    };

    b();

    h("#scrollContainer").css("width", movingDistance * 7).data("currentlyMoving", false);
    var q = function(L){
        if (h("#scrollContainer").data("currentlyMoving") == false) {
            h("#scrollContainer").data("currentlyMoving", true);
            var I = L ? D + 1 : D - 1;
            var N = undefined;
            
            if(!L){
                N = h("#scrollContainer div.daily_list:nth-child("+(D)+")");
                if(!N.find(".todo_item_entry").attr("autocomplete"))
                    dev(N);
            }

            var M = h("#scrollContainer").css("left");
            var H = L ? parseFloat(M, 10) - movingDistance : parseFloat(M, 10) + movingDistance;
            D = I;
            h("#scrollContainer .last").removeClass("last");
            var K = D + 4;
            var J = ".daily_list:eq(" + K + ")";
            h(J).addClass("last");
            
            if(L) {
                N = h("#scrollContainer div.last");
                if(!N.find(".todo_item_entry").attr("autocomplete"))
                    dev(N);
            }
            
            h("#scrollContainer").stop().animate({
                left: H
            }, function(){
                h("#scrollContainer").data("currentlyMoving", false);
                A();
                b();
            })
        }
    };
    var E = function(J, I, H){
        var K = v(J);
        jQuery.get("user/load_day.php", {
            date: K
        }, function(L, O){
            var N = undefined;
            if (I) {
                h("#scrollContainer").append(L);
                N = h("#scrollContainer > div:last");
            }
            else {
                h("#scrollContainer").prepend(L);
                N = h("#scrollContainer > div:first");
            }
            dev(N);
            var M = h("#scrollContainer").children().size();
            h("#scrollContainer").css("width", ((M + 2) * movingDistance) + "px");
            j();
            H();
            var zz = "";
            var oo = "";
            if (I) {
                zz = h('.right').attr('href').split("?");
                oo = h('.nextmonth').attr('href').split("?");
                h('.nextmonth').attr('href',oo[0] + "?" + zz[1]);
            }
            else {
                zz = h('.left').attr('href').split("?");
                oo = h('.premonth').attr('href').split("?");
                h('.premonth').attr('href',oo[0] + "?" + zz[1]);
            }
        })
    };

    // ----------- end navigation days //

    // ----------- start navigation months //
    
    var gg = function(){
        h(".premonth, .nextmonth").unbind("click").click(i);
    };

    var bb = function(){
        h(".premonth, .nextmonth").unbind("click");
        h(".premonth").click(FF);
        h(".nextmonth").click(aa);
    };

    var FF = function(J){
        gg();
        if (D !== 0) {
            qq(false);
            h(".someday:eq(4)").addClass("last");
        }
        else {
            var I = c(this);
            var H = this;
            EE(I, false, function(){
                D += 30;
                var K = parseInt(h("#scrollContainer").css("left"), 10);
                h("#scrollContainer").css("left", K - movingDistance);
                G(H, u(I, 30));
                qq(false);
                h(".someday:eq(4)").addClass("last");
            })
        }
        return false;
    };

    var aa = function(J){
        gg();
        if (D + 30 + 4 < h("#scrollContainer").children().size()) {
            qq(true);
            h(".someday:eq(4)").addClass("last");
        }
        else {
            var I = c(this);
            var H = this;
            EE(I, true, function(){
                G(H, B(I, 30));
                qq(true);
                h(".someday:eq(4)").addClass("last");
            })
        }
        return false
    };

    bb();

    h("#scrollContainer").css("width", movingDistance * 7).data("currentlyMoving", false);
    var qq = function(L){
        if (h("#scrollContainer").data("currentlyMoving") == false) {
            h("#scrollContainer").data("currentlyMoving", true);
            
            var I = L ? D + 30 : D - 30;
            
            var M = h("#scrollContainer").css("left");
            var H = L ? parseFloat(M, 10) - (movingDistance * 30) : parseFloat(M, 10) + (movingDistance * 30);
            
            H = H > 0 ? 0 : H;
            
            D = I;

            h("#scrollContainer .last").removeClass("last");
            var K = D + 4;
            var J = ".daily_list:eq(" + K + ")";
            h(J).addClass("last");

            for (var i = D + 1; i <= D + 5 ; i++) {
                N = h("#scrollContainer div.daily_list:nth-child("+i+")");
                dev(N);
            }

            if(D < 0) {
                D = 0;
            }


            h("#scrollContainer").stop().animate({
                left: H
            }, function(){
                h("#scrollContainer").data("currentlyMoving", false);
                A();
                bb();
            })
        }
    };
    
    var EE = function(J, I, H){
        var K = v(J);
        jQuery.get("user/load_month.php", {
            date: K,
            status: I
        }, function(L, O){
            var M = undefined;
            var zz = undefined;

            if (I)
                h("#scrollContainer").append(L);
            else
                h("#scrollContainer").prepend(L);

            M = h("#scrollContainer").children().size();

            if(M > 65) {
                if(I) {
                    
                    // set up left scroll

                    // removing first 30  day
                    h("#scrollContainer").children().slice(0,30).remove();
                    D -= 30;

                    var cs = h("#scrollContainer").css("left");
                    cs = parseFloat(cs,10);
                    cs = cs + (30 * movingDistance);
                    cs = 0 - ((D) * movingDistance);
                    h("#scrollContainer").css("left", cs + "px");
                    

                    cs = v(u(dd(h("#scrollContainer").find("[name=do_on]:first").val())));
                    // set up previous month day date
                    zz = h('.premonth').attr('href').split("?");
                    h('.premonth').attr('href',zz[0] + "?date=" + cs);
                    h('.left').attr('href',zz[0] + "?date=" + cs);
                    

                }
                else {

                    
                    // removing last 30  day
                    h("#scrollContainer").children().slice(M-30).remove();
                    //D += 30;

                    // set up left scroll
                    h("#scrollContainer").css("left", "0px");

                    // set up next month day date
                    cs = v(B(dd(h("#scrollContainer").find("[name=do_on]:last").val())));
                    zz = h('.nextmonth').attr('href').split("?");
                    h('.nextmonth').attr('href',zz[0] + "?date=" + cs);
                    h('.right').attr('href',zz[0] + "?date=" + cs);
                    
                }
            }
            
            M = h("#scrollContainer").children().size();
            
            h("#scrollContainer").css("width", ((M + 2) * movingDistance) + "px");
            j();
            H();
            
            if (I) {
                zz = h('.nextmonth').attr('href').split("?");
                oo = h('.right').attr('href').split("?");
                h('.right').attr('href',oo[0] + "?" + zz[1]);
            }
            else {
                zz = h('.premonth').attr('href').split("?");
                oo = h('.left').attr('href').split("?");
                h('.left').attr('href',oo[0] + "?" + zz[1]);
            }
        })
    };

    // bind all events
    var dev = function(N) {
        r(N.find(".todo_item_entry:not(:disabled)"));
        C(N.find(".list_items"));
        x(N.find(".todo_item"));
        t(N.find("input:text"));
        k(N.find(".todo_item"));
        N.find(".todo").each(function(){
            s(this)
        });
        m(N.find(".ellipsis"));
        N.find(".todo_item_entry").attr("autocomplete", "off");
    }


    h(".today").click(function(){
        jQuery.get("list.php",{
            today: true
        },function(L, O){
            D = 0;
            h("#scrollContainer").children().remove();
            h("#scrollContainer").append(L);
            M = h("#scrollContainer").children().size();
            h("#scrollContainer").css("width", ((M + 2) * movingDistance) + "px");
            h("#scrollContainer").css("left", "0px");
            var J = ".daily_list:eq(4)";
            h(J).addClass("last");

            // bind all events
            r(h(".todo_item_entry:not(:disabled)"));
            r(h("#someday input:text"));

            h(".todo").each(function(){
                s(this)
            });
            m(h(".ellipsis"));

            C(h(".list_items"));
            x(h(".todo_item"));
            t(h(".todo_item_entry"));
            k(h(".todo_item"));
            h(".daily_list:eq(4)").addClass("last");
            h(".red input:text").focus();
            h("input:text").attr("autocomplete", "off");
            j();
            A();

            // setup next previous date
            h(".left").attr("href",left);
            h(".right").attr("href",right);
            h(".premonth").attr("href",premonth);
            h(".nextmonth").attr("href",nextmonth);

        });
        return false;
    });

    // ----------- end navigation months //

    var d = function(){
        var I = 0;
        var J = 400;
        var H = 25;
        h("#scrollContainer .list_items").each(function(){
            var L = h(this);
            var K = L.children().size();
            if (K > I) {
                I = K
            }
        });
        if (I > (J / H)) {
            J = I * H
        }
        h("#scrollContainer .list_items").css({
            "min-height": J + "px"
        })
    };
    d();
    var z = function(){
        h(".triangle").removeClass("open");
        h("#someday_list").hide("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Hide Someday List", l()]);
            h(".header a").unbind("click").click(function(){
                f();
                return false
            })
        });
        return false
    };
    var f = function(){
        h(".triangle").addClass("open");
        h("#someday_list").show("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Show Someday List", l()]);
            h(".header a").unbind("click").click(function(){
                z();
                return false
            })
        });
        return false
    };

     
    var osl = function(){
        h(".sheaderl a").removeClass("open");
        h("#pplist").hide("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Hide pplist", l()]);
            h(".sheaderl a").unbind("click").click(function(){
                csl();
                return false
            })
        });
        return false
    };
    var csl = function(){
        h(".sheaderl a").addClass("open");
        h("#pplist").show("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Show pplist", l()]);
            h(".sheaderl a").unbind("click").click(function(){
                osl();
                return false
            })
        });
        return false
    };
    h(".sheaderl a").click(osl);


    var osr = function(){
        h(".sheaderr a").removeClass("open");
        h("#tlist").hide("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Hide tlist", l()]);
            h(".sheaderr a").unbind("click").click(function(){
                csr();
                return false
            })
        });
        return false
    };
    var csr = function(){
        h(".sheaderr a").addClass("open");
        h("#tlist").show("blind", {}, 750, function(){
            _gaq.push(["_trackEvent", "Todo List", "Show tlist", l()]);
            h(".sheaderr a").unbind("click").click(function(){
                osr();
                return false
            })
        });
        return false
    };
    h(".sheaderr a").click(osr);




    var p = function(){
        var I = null;
        var H = null;
        h(".someday").each(function(){
            if (I == null) {
                I = this
            }
            var J = h(this).children().length;
            if (J < 10 && H == null) {
                H = this
            }
        });
        return H || I
    };
    
    h(".header input:text").keypress(function(K){
        
        if (K.keyCode === 13) {
            if(h(this).val().length > 255) {
                alert("Task Length must be Lessthen 255 Characters.");
                return false;
            }
            if (h(this).val().replace(/^\s+|\s+$/g,"") == "") {
                h(this).val("");
                return false;
            }
            var H = this;
            var J = this.form;
            var I = h(p());
            h(J).find("input:hidden").val(I.attr("id"));
            jQuery.post(J.action, h(J).serialize(), function(L){
                I.append(L);
                x(I.find("li:last"));
                k(I.find("li:last"));
                s(I.find("li:last").find(".todo").get(0));
                m(I.find("li:last").find(".ellipsis"));
                h(H).val("");
                w();
                _gaq.push(["_trackEvent", "Todo List", "Create Someday Item", l()])
            });
            return false;
        }
    });
    w();
    h(".header a").click(z);
    h(".save").click(function(){
        var H = h(this).parents("form");
        H.submit();
        return false
    });
    var n = function(){
        if (h("#scrollContainer").data("currentlyMoving") == false) {
            h("#scrollContainer").data("currentlyMoving", true);
            var H = h(".daily_list").length;
            if (H == 5) {
                h("#scrollContainer").data("currentlyMoving", false);
                A();
                b();
                return
            }
            var I = h(".daily_list").index(h("#today"));
            var J = I + 5 > H ? H - 5 : I;
            var M = -movingDistance * J;
            D = J;
            h("#scrollContainer .last").removeClass("last");
            var L = D + 4;
            var K = ".daily_list:eq(" + L + ")";
            h(K).addClass("last");
            h("#scrollContainer").stop().animate({
                left: M
            }, function(){
                h("#scrollContainer").data("currentlyMoving", false);
                A();
                b()
            })
        }
    };
    h("#reset").click(function(){
        g();
        n();
        return false
    })

    currentDate = h("#scrollContainer #today").find("[name=do_on]").val();
    updateTodayList();

    function updateTodayList() {

        jQuery.get("user/load_today.php",'NULL',function(L, O){
            h("#tlist").html(L);
            h("#tlist .todo").each(function(){
                s(this)
            });
            m(h("#tlist .ellipsis"));
        });
        setTimeout(updateTodayList, 5000);
    }
});

// mirror update today task list //
/*function updateTodayList() {

    jQuery.get("user/load_element.php",'NULL',function(L, O){
        $("#tlist").html(L);
        m($("#tlist .ellipsis"));
    });
    setTimeout(updateTodayList, 5000);
}


$(document).ready(function(h){
    currentDate = h("#scrollContainer #today").find("[name=do_on]").val();
    updateTodayList();
});*/


$(document).ready(function(a){
    a("#feedback_form").submit(function(){
        var b = a(this);
        a.ajax({
            data: b.serialize(),
            type: "POST",
            url: b.attr("action"),
            error: function(d, e, c){
            },
            success: function(c, d){
                a("#feedback_slider p").fadeIn("slow", function(){
                    a("#feedback_slider").slideUp(function(){
                        a("#feedback_slider p").hide();
                        a("#feedback_slider textarea").val("")
                    })
                })
            },
            complete: function(c, d){
            }
        });
        return false;
    });
    a("#feedback_nib a").click(function(){
        if (a("#feedback_slider").is(":hidden")) {
            a("#feedback_slider").slideDown("normal");
            a("#feedback_slider").show().height();
            //a("#feedback_slider textarea").focus();
        }
        else {
            a("#feedback_slider").slideUp("normal");
            //a("#feedback_slider").hide().height();
        }
        return false;
    })
});


$(document).ready(function(a){
    a("#goto").click(function(){
        if(this.value == "yyyy-mm-dd")
            this.value = "";
    });
    a("#goto").focusout(function() {
        if(!this.value)
            this.value = "yyyy-mm-dd";
    });
});



function submitGoto() {
    if (isDate($("#goto").val()))
        return true;
    else
        alert('Invalid date format! it must be yyyy-mm-dd.');
    return false;
    
}


// check date JavaScript function
// if date is valid then function returns true, otherwise returns false
function isDate(txtDate){
    var objDate;  // date object initialized from the txtDate string
    var mSeconds; // milliseconds from txtDate

    // date length should be 10 characters - no more, no less
    if (txtDate.length != 10) return false;

    // extract day, month and year from the txtDate string
    // expected format is mm/dd/yyyy
    // subtraction will cast variables to integer implicitly
    var day   = txtDate.substring(8,10)  - 0;
    var month = txtDate.substring(5,7)  - 1; // because months in JS start with 0
    var year  = txtDate.substring(0,4) - 0;

    // third and sixth character should be /
    if (txtDate.substring(4,5) != '-') return false;
    if (txtDate.substring(7,8) != '-') return false;

    // test year range
    if (year < 999 || year > 3000) return false;

    // convert txtDate to the milliseconds
    mSeconds = (new Date(year, month, day)).getTime();

    // initialize Date() object from calculated milliseconds
    objDate = new Date();
    objDate.setTime(mSeconds);

    // compare input parameter date and created Date() object
    // if difference exists then date isn't valid
    if (objDate.getFullYear() != year)  return false;
    if (objDate.getMonth()    != month) return false;
    if (objDate.getDate()     != day)   return false;

    // otherwise return true
    return true;
}


$(document).ready(function(a){

    a('#task').keypress(function(I){
        if (I.keyCode === 13) {
            SS();
        }
    });
    
    a("a.thickboxlink").click(function(){
        SS();
        return false;
    });

    var SS = function(){
        var datef = a("#datef").val().replace(/^\s+|\s+$/g,"") == "yyyy-mm-dd" ? "" : a("#datef").val().replace(/^\s+|\s+$/g,"");
        var datet = a("#datet").val().replace(/^\s+|\s+$/g,"") == "yyyy-mm-dd" ? "" : a("#datet").val().replace(/^\s+|\s+$/g,"");
        if(a("#datef").val().replace(/^\s+|\s+$/g,"") !== "yyyy-mm-dd" && !isDate(a("#datef").val())) {
            alert('Invalid Date From format! it must be yyyy-mm-dd.');
            return false;
        }
        if(a("#datet").val().replace(/^\s+|\s+$/g,"") !== "yyyy-mm-dd" && !isDate(a("#datet").val())) {
            alert('Invalid Date To format! it must be yyyy-mm-dd.');
            return false;
        }
        if(!a("#task").val().replace(/^\s+|\s+$/g,"")){
            a("#task").val("");
            alert('Please Enter Task.');
            return false;
        }
        var ss__href = a('.thickboxlink').attr('href');
        ss__href += "?task=" + encodeURIComponent(a("#task").val().replace(/^\s+|\s+$/g,""));
        //        + "&sdate=" + datef + "&edate=" + datet;
        ss__href += datef ? "&sdate=" + datef : "";
        ss__href += datet ? "&edate=" + datet : "";
        tb_show('Search',ss__href);
        //this.blur();
        return false;
    }

    a("#datef").click(function(){
        if(this.value == "yyyy-mm-dd")
            this.value = "";
    });
    a("#datef").focusout(function() {
        if(!this.value)
            this.value = "yyyy-mm-dd";
    });

    a("#datet").click(function(){
        if(this.value == "yyyy-mm-dd")
            this.value = "";
    });
    a("#datet").focusout(function() {
        if(!this.value)
            this.value = "yyyy-mm-dd";
    });

});
