movingDistance=160;

$(document).ready(function(h){
    var l=function(){
        return h("#user_controls li:first span").text()
    };var r=function(H){
        H.droppable({
            drop:function(I,J){
                var K=J.draggable.find(".todo");var L=K.data("originalText")||K.text();h(this).val(L).focus().select();var M=h(J.draggable).find("a").attr("href");h(J.draggable).remove();jQuery.post(M,"",function(N,O){
                    w()
                })
            }
        })
    };
    r(h(".todo_item_entry:not(:disabled)"));r(h("#someday input:text"));var y=function(K){
        var L=navigator.appName;var H=navigator.appName==="Microsoft Internet Explorer";var J;if(H){
            J=K.offsetHeight
        }else{
            var I=document.defaultView.getComputedStyle(K,"").getPropertyValue("height");var J=I.split("px");J=J[0]
        }return parseInt(J,10)
    };
    var s=function(H,I){
        I=I||20;if(y(H)>20){
            h(H).parents(".todo_item").addClass("overflow");var J=h(H).data("originalText")||h(H).text();h(H).data("originalText",J);h(H).text(J.substr(0,I));s(H,I-1)
        }
    };
    h(".todo").each(function(){
        s(this)
    });
    var m=function(H){
        h(H).mouseenter(function(){
            var J=h(this).siblings(".todo");var K=J.data("originalText");h(this).parents(".todo_item").removeClass("overflow").addClass("overfloweth");J.text(K);var I=this;h(I).parent().mouseleave(function(){
                h(this).parents(".todo_item").removeClass("overfloweth").addClass("overflow");s(J.get(0));h(".overflow_abs").unbind("mouseleave")
            })
        })
    };
    m(h(".ellipsis"));var o=function(H){
        if(H.length===0){
            return null
        }return H[H.length-1]
    };
    var j=function(){
        Cufon.replace("h3");Cufon.replace("h1");Cufon.replace("#someday .header h2");Cufon.replace("#users_settings h2");Cufon.now()
    };
    var A=function(){
        h(".list_items li").removeClass("fifth");h(".list_items li:nth-child(5n)").addClass("fifth");h(".list_items li").removeClass("ten");h(".list_items li:nth-child(10n)").addClass("ten");h(".list_items li").removeClass("twentyfive");h(".list_items li:nth-child(25n)").addClass("twentyfive")
    };
    var C=function(H){
        return h(H).sortable({
            connectWith:".list_items",
            cursor:"hand",
            delay:50,
            tolerance:"pointer",
            placeholder:"",
            cancel:"a",
            start:function(I,J){
                J.item.unbind("click")
            },
            stop:function(I,J){
                setTimeout(function(){
                    x(J.item);A();d()
                },100)
            },
            update:function(I,J){
                var L=o(J.item.attr("id").split("_"));var K=o(this.id.split("_"));jQuery.post("/user/update_order/"+K,h(this).sortable("serialize"),function(M){
                    w()
                });h(this).find(".overflow_abs").mouseleave()
            },
            remove:function(I,J){
                if(h(this).children().size()===1){
                    var K=o(this.id.split("_"));jQuery.post("/user/update_order/"+K,"",function(L){
                        w()
                    })
                }
            }
        })
    };
    var w=function(){
        var H=h(".someday li").length-5;h(".header h2").text("someday ("+H+")");j()
    };
    var x=function(H){
        h(H).click(function(I){
            var K=o(this.id.split("_"));jQuery.post("/user/toggle_todo/"+K,"",function(){});var J=h(this);if(J.hasClass("done")){
                J.removeClass("done");J.find("a").hide();_gaq.push(["_trackEvent","Todo List","Mark Item Not Finished",l()])
            }else{
                J.addClass("done");J.find("a").show();_gaq.push(["_trackEvent","Todo List","Mark Item Finished",l()])
            }
        }).find(".delete").click(function(I){
            h(this).parent().parent().remove();A();d();jQuery.post(this.href,"",function(J,K){
                w()
            });_gaq.push(["_trackEvent","Todo List","Delete Item",l()]);return false
        },true)
    };var e=function(H){
        jQuery.post(H.form.action,h(H.form).serialize(),function(J){
            var I=h(H).parent().parent().find(".list_items");I.append(J);x(I.find("li:last"));s(I.find("li:last").find(".todo").get(0));m(I.find("li:last").find(".ellipsis"));k(I.find("li:last"));A();d();_gaq.push(["_trackEvent","Todo List","Create Todo Item",l()])
        })
    };var t=function(H){
        h(H).keypress(function(I){
            if(I.keyCode===13){
                if(h(this).val()!==""){
                    e(this);h(this).val("")
                }return false
            }
        })
    };var k=function(H){
        h(H).mouseenter(function(I){
            var J=h(this);if(J.hasClass("done")){
                J.find("a").show()
            }
        }).mouseleave(function(I){
            var J=h(this);J.find("a").hide()
        })
    };C(h(".list_items"));x(h(".todo_item"));t(h(".todo_item_entry"));k(h(".todo_item"));h(".daily_list:eq(4)").addClass("last");h(".red input:text").focus();h("input:text").attr("autocomplete","off");j();A();var c=function(H){
        var J=H.href.split("?")[1].split("=")[1].split("-");var K=parseInt(J[0],10);var L=parseInt(J[1],10);var I=parseInt(J[2],10);return new Date(K,L-1,I)
    };var u=function(H){
        var I=new Date(H);I.setDate(I.getDate()-1);return I
    };var B=function(H){
        var I=new Date(H);I.setDate(I.getDate()+1);return I
    };var G=function(H,J){
        var I=H.href.split("?");H.href=I[0]+"?date="+v(J)
    };var D=0;var i=function(){
        return false
    };var g=function(){
        h(".left, .right").unbind("click").click(i)
    };var b=function(){
        h(".left, .right").unbind("click");h(".left").click(F);h(".right").click(a)
    };var F=function(J){
        g();if(D!==0){
            q(false);h(".someday:eq(4)").addClass("last")
        }else{
            var I=c(this);var H=this;E(I,false,function(){
                D+=1;var K=parseInt(h("#scrollContainer").css("left"),10);h("#scrollContainer").css("left",K-movingDistance);G(H,u(I));q(false);h(".someday:eq(4)").addClass("last")
            })
        }return false
    };var a=function(J){
        g();if(D+5<h("#scrollContainer").children().size()){
            q(true);h(".someday:eq(4)").addClass("last")
        }else{
            var I=c(this);var H=this;E(I,true,function(){
                G(H,B(I));q(true);h(".someday:eq(4)").addClass("last")
            })
        }return false
    };b();h("#scrollContainer").css("width",movingDistance*7).data("currentlyMoving",false);var q=function(L){
        if(h("#scrollContainer").data("currentlyMoving")==false){
            h("#scrollContainer").data("currentlyMoving",true);var I=L?D+1:D-1;var M=h("#scrollContainer").css("left");var H=L?parseFloat(M,10)-movingDistance:parseFloat(M,10)+movingDistance;D=I;h("#scrollContainer .last").removeClass("last");var K=D+4;var J=".daily_list:eq("+K+")";h(J).addClass("last");h("#scrollContainer").stop().animate({
                left:H
            },function(){
                h("#scrollContainer").data("currentlyMoving",false);A();b()
            })
        }
    };var v=function(H){
        return H.getFullYear()+"-"+(H.getMonth()+1)+"-"+(H.getDate())
    };var E=function(J,I,H){
        var K=v(J);jQuery.get("/user/load_day",{
            date:K
        },function(L,O){
            var N=undefined;if(I){
                h("#scrollContainer").append(L);N=h("#scrollContainer > div:last")
            }else{
                h("#scrollContainer").prepend(L);N=h("#scrollContainer > div:first")
            }r(N.find(".todo_item_entry:not(:disabled)"));C(N.find(".list_items"));x(N.find(".todo_item"));t(N.find("input:text"));k(N.find(".todo_item"));N.find(".todo").each(function(){
                s(this)
            });m(N.find(".ellipsis"));var M=h("#scrollContainer").children().size();h("#scrollContainer").css("width",((M+2)*movingDistance)+"px");j();H()
        })
    };var d=function(){
        var I=0;var J=400;var H=25;h("#scrollContainer .list_items").each(function(){
            var L=h(this);var K=L.children().size();if(K>I){
                I=K
            }
        });if(I>(J/H)){
            J=I*H
        }h("#scrollContainer .list_items").css({
            "min-height":J+"px"
        })
    };d();var z=function(){
        h(".triangle").removeClass("open");h("#someday_list").hide("blind",{},750,function(){
            _gaq.push(["_trackEvent","Todo List","Hide Someday List",l()]);h(".header a").unbind("click").click(function(){
                f();return false
            })
        });return false
    };var f=function(){
        h(".triangle").addClass("open");h("#someday_list").show("blind",{},750,function(){
            _gaq.push(["_trackEvent","Todo List","Show Someday List",l()]);h(".header a").unbind("click").click(function(){
                z();return false
            })
        });return false
    };var p=function(){
        var I=null;var H=null;h(".someday").each(function(){
            if(I==null){
                I=this
            }var J=h(this).children().length;if(J<10&&H==null){
                H=this
            }
        });return H||I
    };h(".header input:text").keypress(function(K){
        if(K.keyCode===13){
            var H=this;var J=this.form;var I=h(p());h(J).find("input:hidden").val(I.attr("id"));jQuery.post(J.action,h(J).serialize(),function(L){
                I.append(L);x(I.find("li:last"));k(I.find("li:last"));s(I.find("li:last").find(".todo").get(0));m(I.find("li:last").find(".ellipsis"));h(H).val("");w();_gaq.push(["_trackEvent","Todo List","Create Someday Item",l()])
            });return false
        }
    });w();h(".header a").click(z);h(".save").click(function(){
        var H=h(this).parents("form");H.submit();return false
    });var n=function(){
        if(h("#scrollContainer").data("currentlyMoving")==false){
            h("#scrollContainer").data("currentlyMoving",true);var H=h(".daily_list").length;if(H==5){
                h("#scrollContainer").data("currentlyMoving",false);A();b();return
            }var I=h(".daily_list").index(h("#today"));var J=I+5>H?H-5:I;var M=-movingDistance*J;D=J;h("#scrollContainer .last").removeClass("last");var L=D+4;var K=".daily_list:eq("+L+")";h(K).addClass("last");h("#scrollContainer").stop().animate({
                left:M
            },function(){
                h("#scrollContainer").data("currentlyMoving",false);A();b()
            })
        }
    };h("#reset").click(function(){
        g();n();return false
    })
});$(document).ready(function(a){
    a("#feedback_form").submit(function(){
        var b=a(this);a.ajax({
            data:b.serialize(),
            type:"POST",
            url:b.attr("action"),
            error:function(d,e,c){},
            success:function(c,d){
                a("#feedback_slider p").fadeIn("slow",function(){
                    a("#feedback_slider").slideUp(function(){
                        a("#feedback_slider p").hide();a("#feedback_slider textarea").val("")
                    })
                })
            },
            complete:function(c,d){}
        });return false
    });a("#feedback_nib a").click(function(){
        if(a("#feedback_slider").is(":hidden")){
            a("#feedback_slider").slideDown();a("#feedback_slider textarea").focus()
        }else{
            a("#feedback_slider").slideUp()
        }return false
    })
});