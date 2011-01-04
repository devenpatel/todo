var Cufon=(function(){
    var L=function(){
        return L.replace.apply(null,arguments)
    };var B=L.DOM={
        ready:(function(){
            var b=false,d={
                loaded:1,
                complete:1
            };var c=[],a=function(){
                if(b){
                    return
                }b=true;for(var e;e=c.shift();e()){}
            };if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",a,false);window.addEventListener("pageshow",a,false)
            }if(!window.opera&&document.readyState){
                (function(){
                    d[document.readyState]?a():setTimeout(arguments.callee,10)
                })()
            }if(document.readyState&&document.createStyleSheet){
                (function(){
                    try{
                        document.body.doScroll("left");a()
                    }catch(e){
                        setTimeout(arguments.callee,1)
                    }
                })()
            }H(window,"load",a);return function(e){
                if(!arguments.length){
                    a()
                }else{
                    b?e():c.push(e)
                }
            }
        })()
    };var K=L.CSS={
        Size:function(a,b){
            this.value=parseFloat(a);this.unit=String(a).match(/[a-z%]*$/)[0]||"px";this.convert=function(c){
                return c/b*this.value
            };this.convertFrom=function(c){
                return c/this.value*b
            };this.toString=function(){
                return this.value+this.unit
            }
        },
        getStyle:function(a){
            var b=document.defaultView;if(b&&b.getComputedStyle){
                return new V(b.getComputedStyle(a,null))
            }if(a.currentStyle){
                return new V(a.currentStyle)
            }return new V(a.style)
        },
        ready:(function(){
            var a=false;var c=[],e=function(){
                a=true;for(var f;f=c.shift();f()){}
            };var d=Object.prototype.propertyIsEnumerable?Q("style"):{
                length:0
            };var b=Q("link");B.ready(function(){
                var f=0,g;for(var h=0,i=b.length;g=b[h],h<i;++h){
                    if(!g.disabled&&g.rel.toLowerCase()=="stylesheet"){
                        ++f
                    }
                }if(document.styleSheets.length>=d.length+f){
                    e()
                }else{
                    setTimeout(arguments.callee,10)
                }
            });return function(f){
                if(a){
                    f()
                }else{
                    c.push(f)
                }
            }
        })(),
        supports:function(a,b){
            var c=document.createElement("span").style;if(c[a]===undefined){
                return false
            }c[a]=b;return c[a]===b
        },
        textAlign:function(d,a,c,b){
            if(a.get("textAlign")=="right"){
                if(c>0){
                    d=" "+d
                }
            }else{
                if(c<b-1){
                    d+=" "
                }
            }return d
        },
        textDecoration:function(b,d){
            if(!d){
                d=this.getStyle(b)
            }var c={
                underline:null,
                overline:null,
                "line-through":null
            };for(var f=b;f.parentNode&&f.parentNode.nodeType==1;){
                var e=true;for(var a in c){
                    if(c[a]){
                        continue
                    }if(d.get("textDecoration").indexOf(a)!=-1){
                        c[a]=d.get("color")
                    }e=false
                }if(e){
                    break
                }d=this.getStyle(f=f.parentNode)
            }return c
        },
        textShadow:N(function(d){
            if(d=="none"){
                return null
            }var f=[],b={},e,c=0;var a=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(e=a.exec(d)){
                if(e[0]==","){
                    f.push(b);b={},c=0
                }else{
                    if(e[1]){
                        b.color=e[1]
                    }else{
                        b[["offX","offY","blur"][c++]]=e[2]
                    }
                }
            }f.push(b);return f
        }),
        color:N(function(a){
            var b={};b.color=a.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(e,c,d){
                b.opacity=parseFloat(d);return"rgb("+c+")"
            });return b
        }),
        textTransform:function(a,b){
            return a[{
                uppercase:"toUpperCase",
                lowercase:"toLowerCase"
            }[b.get("textTransform")]||"toString"]()
        }
    };function F(a){
        var b=this.face=a.face;this.glyphs=a.glyphs;this.w=a.w;this.baseSize=parseInt(b["units-per-em"],10);this.family=b["font-family"].toLowerCase();this.weight=b["font-weight"];this.style=b["font-style"]||"normal";this.viewBox=(function(){
            var d=b.bbox.split(/\s+/);var c={
                minX:parseInt(d[0],10),
                minY:parseInt(d[1],10),
                maxX:parseInt(d[2],10),
                maxY:parseInt(d[3],10)
            };c.width=c.maxX-c.minX,c.height=c.maxY-c.minY;c.toString=function(){
                return[this.minX,this.minY,this.width,this.height].join(" ")
            };return c
        })();this.ascent=-parseInt(b.ascent,10);this.descent=-parseInt(b.descent,10);this.height=-this.ascent+this.descent
    }function R(){
        var a={},b={
            oblique:"italic",
            italic:"oblique"
        };this.add=function(c){
            (a[c.style]||(a[c.style]={}))[c.weight]=c
        };this.get=function(g,f){
            var h=a[g]||a[b[g]]||a.normal||a.italic||a.oblique;if(!h){
                return null
            }f={
                normal:400,
                bold:700
            }[f]||parseInt(f,10);if(h[f]){
                return h[f]
            }var j={
                1:1,
                99:0
            }[f%100],d=[],i,c;if(j===undefined){
                j=f>400
            }if(f==500){
                f=400
            }for(var e in h){
                e=parseInt(e,10);if(!i||e<i){
                    i=e
                }if(!c||e>c){
                    c=e
                }d.push(e)
            }if(f<i){
                f=i
            }if(f>c){
                f=c
            }d.sort(function(k,l){
                return(j?(k>f&&l>f)?k<l:k>l:(k<f&&l<f)?k>l:k<l)?-1:1
            });return h[d[0]]
        }
    }function G(){
        function a(f,e){
            if(f.contains){
                return f.contains(e)
            }return f.compareDocumentPosition(e)&16
        }function d(e){
            var f=e.relatedTarget;if(!f||a(this,f)){
                return
            }b(this)
        }function c(e){
            b(this)
        }function b(e){
            setTimeout(function(){
                L.replace(e,S.get(e).options,true)
            },10)
        }this.attach=function(e){
            if(e.onmouseenter===undefined){
                H(e,"mouseover",d);H(e,"mouseout",d)
            }else{
                H(e,"mouseenter",c);H(e,"mouseleave",c)
            }
        }
    }function y(){
        var a={},c=0;function b(d){
            return d.cufid||(d.cufid=++c)
        }this.get=function(e){
            var d=b(e);return a[d]||(a[d]={})
        }
    }function V(c){
        var a={},b={};this.get=function(d){
            return a[d]!=undefined?a[d]:c[d]
        };this.getSize=function(d,e){
            return b[d]||(b[d]=new K.Size(this.get(d),e))
        };this.extend=function(e){
            for(var d in e){
                a[d]=e[d]
            }return this
        }
    }function H(b,c,a){
        if(b.addEventListener){
            b.addEventListener(c,a,false)
        }else{
            if(b.attachEvent){
                b.attachEvent("on"+c,function(){
                    return a.call(b,window.event)
                })
            }
        }
    }function E(b,c){
        var a=S.get(b);if(a.options){
            return b
        }if(c.hover&&c.hoverables[b.nodeName.toLowerCase()]){
            U.attach(b)
        }a.options=c;return b
    }function N(b){
        var a={};return function(c){
            if(!a.hasOwnProperty(c)){
                a[c]=b.apply(null,arguments)
            }return a[c]
        }
    }function T(b,d){
        if(!d){
            d=K.getStyle(b)
        }var c=d.get("fontFamily").split(/\s*,\s*/),f;for(var a=0,e=c.length;a<e;++a){
            f=c[a].replace(/^(["'])(.*?)\1$/,"$2").toLowerCase();if(O[f]){
                return O[f].get(d.get("fontStyle"),d.get("fontWeight"))
            }
        }return null
    }function Q(a){
        return document.getElementsByTagName(a)
    }function P(){
        var d={},c;for(var a=0,b=arguments.length;a<b;++a){
            for(c in arguments[a]){
                d[c]=arguments[a][c]
            }
        }return d
    }function J(c,h,e,g,b,d){
        var i=g.separate;if(i=="none"){
            return z[g.engine].apply(null,arguments)
        }var j=document.createDocumentFragment(),m;var l=h.split(I[i]),f=(i=="words");if(f&&D){
            if(/^\s/.test(h)){
                l.unshift("")
            }if(/\s$/.test(h)){
                l.push("")
            }
        }for(var k=0,a=l.length;k<a;++k){
            m=z[g.engine](c,f?K.textAlign(l[k],e,k,a):l[k],e,g,b,d,k<a-1);if(m){
                j.appendChild(m)
            }
        }return j
    }function M(e,g){
        var d,f,a,h;for(var c=E(e,g).firstChild;c;c=a){
            a=c.nextSibling;h=false;if(c.nodeType==1){
                if(!c.firstChild){
                    continue
                }if(!/cufon/.test(c.className)){
                    arguments.callee(c,g);continue
                }else{
                    h=true
                }
            }if(!f){
                f=K.getStyle(e).extend(g)
            }if(!d){
                d=T(e,f)
            }if(!d){
                continue
            }if(h){
                z[g.engine](d,null,f,g,c,e);continue
            }var i=c.data;if(i===""){
                continue
            }var b=J(d,i,f,g,c,e);if(b){
                c.parentNode.replaceChild(b,c)
            }else{
                c.parentNode.removeChild(c)
            }
        }
    }var D=" ".split(/\s+/).length==0;var S=new y();var U=new G();var A=[];var z={},O={},C={
        enableTextDecoration:false,
        engine:null,
        hover:false,
        hoverables:{
            a:true
        },
        printable:true,
        selector:(window.Sizzle||window.jQuery||(window.dojo&&dojo.query)||(window.$$&&function(a){
            return $$(a)
        })||(window.$&&function(a){
            return $(a)
        })||(document.querySelectorAll&&function(a){
            return document.querySelectorAll(a)
        })||Q),
        separate:"words",
        textShadow:"none"
    };var I={
        words:/\s+/,
        characters:""
    };L.now=function(){
        B.ready();return L
    };L.refresh=function(){
        var a=A.splice(0,A.length);for(var b=0,c=a.length;b<c;++b){
            L.replace.apply(null,a[b])
        }return L
    };L.registerEngine=function(a,b){
        if(!b){
            return L
        }z[a]=b;return L.set("engine",a)
    };L.registerFont=function(a){
        var c=new F(a),b=c.family;if(!O[b]){
            O[b]=new R()
        }O[b].add(c);return L.set("fontFamily",b)
    };L.replace=function(a,b,c){
        b=P(C,b);if(!b.engine){
            return L
        }if(typeof b.textShadow=="string"){
            b.textShadow=K.textShadow(b.textShadow)
        }if(!c){
            A.push(arguments)
        }if(a.nodeType||typeof a=="string"){
            a=[a]
        }K.ready(function(){
            for(var e=0,f=a.length;e<f;++e){
                var d=a[e];if(typeof d=="string"){
                    L.replace(b.selector(d),b,true)
                }else{
                    M(d,b)
                }
            }
        });return L
    };L.set=function(b,a){
        C[b]=a;return L
    };return L
})();Cufon.registerEngine("canvas",(function(){
    var g=document.createElement("canvas");if(!g||!g.getContext||!g.getContext.apply){
        return null
    }g=null;var h=Cufon.CSS.supports("display","inline-block");var j=!h&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var i=document.createElement("style");i.type="text/css";i.appendChild(document.createTextNode("@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle"+(j?"":";font-size:1px;line-height:1px")+"}.cufon-canvas .cufon-alt{position:absolute;left:-10000in;font-size:1px}"+(h?".cufon-canvas canvas{position:relative}":".cufon-canvas canvas{position:absolute}")+"}@media print{.cufon-canvas{padding:0 !important}.cufon-canvas canvas{display:none}.cufon-canvas .cufon-alt{display:inline}}"));document.getElementsByTagName("head")[0].appendChild(i);function k(a,r){
        var c=0,d=0;var s=[],b=/([mrvxe])([^a-z]*)/g,f;generate:for(var q=0;f=b.exec(a);++q){
            var e=f[2].split(",");switch(f[1]){
                case"v":s[q]={
                    m:"bezierCurveTo",
                    a:[c+~~e[0],d+~~e[1],c+~~e[2],d+~~e[3],c+=~~e[4],d+=~~e[5]]
                };break;case"r":s[q]={
                    m:"lineTo",
                    a:[c+=~~e[0],d+=~~e[1]]
                };break;case"m":s[q]={
                    m:"moveTo",
                    a:[c=~~e[0],d=~~e[1]]
                };break;case"x":s[q]={
                    m:"closePath"
                };break;case"e":break generate
            }r[s[q].m].apply(r,s[q].a)
        }return s
    }function l(a,b){
        for(var c=0,d=a.length;c<d;++c){
            var e=a[c];b[e.m].apply(b,e.a)
        }
    }return function(f,ap,aa,au,al,e){
        var aB=(ap===null);var an=f.viewBox;var aA=aa.getSize("fontSize",f.baseSize);var ac=aa.get("letterSpacing");ac=(ac=="normal")?0:aA.convertFrom(parseInt(ac,10));var am=0,ab=0,ad=0,ar=0;var ao=au.textShadow,af=[];if(ao){
            for(var x=0,Z=ao.length;x<Z;++x){
                var aj=ao[x];var ag=aA.convertFrom(parseFloat(aj.offX));var ah=aA.convertFrom(parseFloat(aj.offY));af[x]=[ag,ah];if(ah<am){
                    am=ah
                }if(ag>ab){
                    ab=ag
                }if(ah>ad){
                    ad=ah
                }if(ag<ar){
                    ar=ag
                }
            }
        }var b=Cufon.CSS.textTransform(aB?al.alt:ap,aa).split("");var aD=0,aq=null;for(var x=0,Z=b.length;x<Z;++x){
            var at=f.glyphs[b[x]]||f.missingGlyph;if(!at){
                continue
            }aD+=aq=Number(at.w||f.w)+ac
        }if(aq===null){
            return null
        }ab+=(an.width-aq);ar+=an.minX;var av,az;if(aB){
            av=al;az=al.firstChild
        }else{
            av=document.createElement("span");av.className="cufon cufon-canvas";av.alt=ap;az=document.createElement("canvas");av.appendChild(az);if(au.printable){
                var Y=document.createElement("span");Y.className="cufon-alt";Y.appendChild(document.createTextNode(ap));av.appendChild(Y)
            }
        }var a=av.style;var ai=az.style;var aC=aA.convert(an.height-am+ad);var c=Math.ceil(aC);var ae=c/aC;az.width=Math.ceil(aA.convert(aD+ab-ar)*ae);az.height=c;am+=an.minY;ai.top=Math.round(aA.convert(am-f.ascent))+"px";ai.left=Math.round(aA.convert(ar))+"px";var aw=Math.ceil(aA.convert(aD*ae))+"px";if(h){
            a.width=aw;a.height=aA.convert(f.height)+"px"
        }else{
            a.paddingLeft=aw;a.paddingBottom=(aA.convert(f.height)-1)+"px"
        }var d=az.getContext("2d"),ak=c/an.height;d.scale(ak,ak);d.translate(-ar,-am);d.lineWidth=f.face["underline-thickness"];d.save();function ay(m,n){
            d.strokeStyle=n;d.beginPath();d.moveTo(0,m);d.lineTo(aD,m);d.stroke()
        }var ax=au.enableTextDecoration?Cufon.CSS.textDecoration(e,aa):{};if(ax.underline){
            ay(-f.face["underline-position"],ax.underline)
        }if(ax.overline){
            ay(f.ascent,ax.overline)
        }d.fillStyle=aa.get("color");function y(){
            for(var m=0,n=b.length;m<n;++m){
                var o=f.glyphs[b[m]]||f.missingGlyph;if(!o){
                    continue
                }d.beginPath();if(o.d){
                    if(o.code){
                        l(o.code,d)
                    }else{
                        o.code=k("m"+o.d,d)
                    }
                }d.fill();d.translate(Number(o.w||f.w)+ac,0)
            }
        }if(ao){
            for(var x=0,Z=ao.length;x<Z;++x){
                var aj=ao[x];d.save();d.fillStyle=aj.color;d.translate.apply(d,af[x]);y();d.restore()
            }
        }y();d.restore();if(ax["line-through"]){
            ay(-f.descent,ax["line-through"])
        }return av
    }
})());Cufon.registerEngine("vml",(function(){
    if(!document.namespaces){
        return
    }document.write('<!--[if vml]><script type="text/javascript">Cufon.vmlEnabled=true;<\/script><![endif]-->');if(!Cufon.vmlEnabled){
        return
    }if(document.namespaces.cvml==null){
        document.namespaces.add("cvml","urn:schemas-microsoft-com:vml");document.write('<style type="text/css">@media screen{cvml\\:shape,cvml\\:group,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}.cufon-vml-canvas{position:absolute;text-align:left}.cufon-vml{display:inline-block;position:relative;vertical-align:middle}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none}.cufon-vml .cufon-alt{display:inline}}</style>')
    }function c(b,a){
        return d(b,/(?:em|ex|%)$/i.test(a)?"1em":a)
    }function d(b,a){
        if(/px$/i.test(a)){
            return parseFloat(a)
        }var h=b.style.left,i=b.runtimeStyle.left;b.runtimeStyle.left=b.currentStyle.left;b.style.left=a;var j=b.style.pixelLeft;b.style.left=h;b.runtimeStyle.left=i;return j
    }return function(Z,au,ae,ax,ap,Y,ag){
        var aJ=(au===null);if(aJ){
            au=ap.alt
        }var ar=Z.viewBox;var aI=ae.computedFontSize||(ae.computedFontSize=new Cufon.CSS.Size(c(Y,ae.get("fontSize"))+"px",Z.baseSize));var ah=ae.computedLSpacing;if(ah==undefined){
            ah=ae.get("letterSpacing");ae.computedLSpacing=ah=(ah=="normal")?0:~~aI.convertFrom(d(Y,ah))
        }var aA,aH;if(aJ){
            aA=ap;aH=ap.firstChild
        }else{
            aA=document.createElement("span");aA.className="cufon cufon-vml";aA.alt=au;aH=document.createElement("span");aH.className="cufon-vml-canvas";aA.appendChild(aH);if(ax.printable){
                var ab=document.createElement("span");ab.className="cufon-alt";ab.appendChild(document.createTextNode(au));aA.appendChild(ab)
            }if(!ag){
                aA.appendChild(document.createElement("cvml:group"))
            }
        }var a=aA.style;var am=aH.style;var aL=aI.convert(ar.height),k=Math.ceil(aL);var ai=k/aL;var aj=ar.minX,ak=ar.minY;am.height=k;am.top=Math.round(aI.convert(ak-Z.ascent));am.left=Math.round(aI.convert(aj));a.height=aI.convert(Z.height)+"px";var aE=ax.enableTextDecoration?Cufon.CSS.textDecoration(Y,ae):{};var av=ae.get("color");var i=Cufon.CSS.textTransform(au,ae).split("");var aM=0,al=0,aD=null;var aw,aC,at=ax.textShadow;for(var aa=0,ac=0,ad=i.length;aa<ad;++aa){
            aw=Z.glyphs[i[aa]]||Z.missingGlyph;if(aw){
                aM+=aD=~~(aw.w||Z.w)+ah
            }
        }if(aD===null){
            return null
        }var aB=-aj+aM+(ar.width-aD);var b=aI.convert(aB*ai),af=Math.round(b);var an=aB+","+ar.height,aK;var aq="r"+an+"nsnf";for(aa=0;aa<ad;++aa){
            aw=Z.glyphs[i[aa]]||Z.missingGlyph;if(!aw){
                continue
            }if(aJ){
                aC=aH.childNodes[ac];if(aC.firstChild){
                    aC.removeChild(aC.firstChild)
                }
            }else{
                aC=document.createElement("cvml:shape");aH.appendChild(aC)
            }aC.stroked="f";aC.coordsize=an;aC.coordorigin=aK=(aj-al)+","+ak;aC.path=(aw.d?"m"+aw.d+"xe":"")+"m"+aK+aq;aC.fillcolor=av;var l=aC.style;l.width=af;l.height=k;if(at){
                var aF=at[0],aG=at[1];var ay=Cufon.CSS.color(aF.color),az;var ao=document.createElement("cvml:shadow");ao.on="t";ao.color=ay.color;ao.offset=aF.offX+","+aF.offY;if(aG){
                    az=Cufon.CSS.color(aG.color);ao.type="double";ao.color2=az.color;ao.offset2=aG.offX+","+aG.offY
                }ao.opacity=ay.opacity||(az&&az.opacity)||1;aC.appendChild(ao)
            }al+=~~(aw.w||Z.w)+ah;++ac
        }a.width=Math.max(Math.ceil(aI.convert(aM*ai)),0);return aA
    }
})());Cufon.registerFont({
    w:77,
    face:{
        "font-family":"AlternateGothic2 BT",
        "font-weight":400,
        "font-stretch":"condensed",
        "units-per-em":"360",
        "panose-1":"2 11 6 8 2 2 2 5 2 4",
        ascent:"288",
        descent:"-72",
        "x-height":"5",
        bbox:"-27 -290 343 85",
        "underline-thickness":"23.3789",
        "underline-position":"-17.9297",
        "unicode-range":"U+0020-U+007E"
    },
    glyphs:{
        " ":{
            w:73
        },
        "!":{
            d:"27,-73r-9,-181r41,0r-9,181r-23,0xm20,0r0,-40r37,0r0,40r-37,0"
        },
        '"':{
            d:"69,-252r29,0r0,97r-29,0r0,-97xm15,-252r29,0r0,97r-29,0r0,-97",
            w:113
        },
        "#":{
            d:"125,-150r-16,45r45,0r16,-45r-45,0xm129,-257r34,0r-27,77r44,0r27,-77r33,0r-27,77r52,0r-11,30r-51,0r-16,45r54,0r-11,30r-54,0r-27,76r-34,0r28,-76r-44,0r-28,76r-34,0r28,-76r-53,0r11,-30r52,0r16,-45r-55,0r10,-30r56,0",
            w:276
        },
        "$":{
            d:"62,-223v-21,9,-16,47,0,59r0,-59xm83,-30v23,-9,19,-59,0,-70r0,70xm135,-62v1,36,-21,64,-52,68r0,30r-21,0r0,-31v-24,-4,-42,-17,-50,-37r26,-24v6,12,12,21,24,25r0,-84v-28,-20,-47,-40,-48,-77v-1,-33,20,-62,48,-67r0,-31r21,0r0,31v21,3,32,13,43,29r-23,23v-4,-9,-11,-14,-20,-17r0,77v31,24,51,40,52,85",
            w:146
        },
        "%":{
            d:"143,-18v23,-5,8,-50,12,-74v1,-7,-5,-15,-12,-14v-21,4,-7,49,-11,72v0,8,4,16,11,16xm144,-130v41,-1,38,46,38,89v0,29,-12,46,-39,46v-43,2,-40,-48,-39,-92v0,-26,16,-43,40,-43xm19,0r115,-254r31,0r-115,254r-31,0xm43,-148v22,-7,7,-50,11,-74v0,-7,-4,-13,-11,-13v-23,4,-8,47,-12,71v0,8,5,15,12,16xm44,-259v42,0,38,46,38,89v0,27,-13,46,-39,46v-45,0,-39,-49,-39,-93v0,-26,14,-42,40,-42",
            w:186
        },
        "&":{
            d:"69,-233v-25,9,-16,57,-5,77v11,-16,19,-30,20,-51v1,-13,-5,-25,-15,-26xm55,-92v-23,23,-1,81,29,48v-11,-15,-19,-28,-29,-48xm148,6v-19,-2,-30,-10,-41,-21v-28,40,-103,17,-98,-40v3,-32,14,-50,30,-71v-23,-44,-30,-133,32,-133v29,0,45,23,44,53v-1,39,-14,48,-36,81r26,48v7,-12,10,-27,14,-43r33,8v-4,25,-11,45,-23,65v5,7,11,11,19,15r0,38",
            w:158
        },
        "'":{
            d:"15,-252r29,0r0,97r-29,0r0,-97",
            w:58
        },
        "(":{
            d:"93,-259v-51,71,-50,211,1,282r-25,15v-61,-73,-67,-218,-10,-297r34,0",
            w:98
        },
        ")":{
            d:"40,-259v57,78,51,225,-10,297r-25,-15v50,-71,53,-210,1,-282r34,0",
            w:98
        },
        "*":{
            d:"69,-185r-22,43r-23,-17r35,-34r-48,-8r9,-27r43,23r-7,-49r26,0r-6,49r43,-23r9,27r-48,8r34,34r-22,17",
            w:138
        },
        "+":{
            d:"135,-215r30,0r0,93r90,0r0,29r-90,0r0,93r-30,0r0,-93r-90,0r0,-29r90,0r0,-93",
            w:299
        },
        ",":{
            d:"20,0r0,-40r38,0r0,40r-21,45r-17,0r13,-45r-13,0"
        },
        "-":{
            d:"14,-80r0,-27r84,0r0,27r-84,0",
            w:111,
            k:{
                Y:13,
                T:13
            }
        },
        ".":{
            d:"20,0r0,-40r38,0r0,40r-38,0"
        },
        "/":{
            d:"-27,33r103,-292r28,0r-103,292r-28,0",
            w:87
        },
        "0":{
            d:"73,-223v-13,0,-20,9,-20,20r0,149v0,13,8,23,21,23v13,0,20,-10,20,-23r0,-149v0,-12,-9,-20,-21,-20xm73,5v-84,1,-53,-121,-58,-200v-2,-40,22,-65,59,-65v83,0,54,117,58,196v2,42,-20,69,-59,69",
            w:146
        },
        "1":{
            d:"-2,-223v19,-6,33,-16,44,-31r26,0r0,254r-39,0r0,-197r-31,0r0,-26",
            w:93
        },
        "2":{
            d:"127,-198v0,70,-32,93,-74,161r71,0r0,37r-113,0r0,-37v38,-55,80,-96,80,-157v0,-16,-4,-31,-18,-31v-21,0,-19,23,-21,45r-38,0v-2,-46,17,-79,59,-79v35,0,54,26,54,61",
            w:142
        },
        "3":{
            d:"68,5v-42,-3,-60,-32,-58,-78r37,0v0,21,0,42,19,42v18,0,20,-15,20,-36v0,-34,-6,-48,-37,-47r0,-36v27,1,34,-12,34,-39v-1,-19,-2,-34,-17,-34v-18,0,-19,17,-18,38v-11,-2,-29,3,-37,-2v0,-41,17,-69,55,-72v59,-5,67,104,29,127v47,20,34,142,-27,137",
            w:133
        },
        "4":{
            d:"74,-95r0,-93r-31,93r31,0xm9,-62r0,-33r65,-159r37,0r0,159r24,0r0,33r-24,0r0,62r-37,0r0,-62r-65,0",
            w:143
        },
        "5":{
            d:"68,5v-41,0,-55,-32,-53,-76r35,0v-1,22,-1,42,20,42v31,0,16,-58,18,-90v3,-33,-35,-21,-38,-1r-32,-1r4,-133r96,0r2,37r-67,0r-3,59v26,-30,74,-14,74,37v0,62,5,126,-56,126",
            w:138
        },
        "6":{
            d:"95,-104v1,-27,-35,-21,-41,-3v2,30,-10,76,21,76v30,0,18,-45,20,-73xm54,-141v25,-30,79,-16,79,33v0,60,-3,113,-59,113v-84,0,-54,-121,-58,-200v-2,-40,21,-65,60,-65v38,0,60,30,57,73r-38,0v12,-37,-41,-49,-41,-16r0,62",
            w:146
        },
        "7":{
            d:"2,-217r0,-37r107,0r0,28r-48,226r-38,0r47,-217r-68,0",
            w:114
        },
        "8":{
            d:"49,-192v0,24,0,37,19,37v16,0,17,-15,17,-36v0,-22,0,-36,-18,-38v-17,2,-18,15,-18,37xm68,-114v-30,-3,-21,57,-16,74v21,21,38,0,35,-32v-1,-24,0,-41,-19,-42xm67,-259v60,-7,67,97,32,124v40,27,34,149,-32,140v-67,7,-73,-113,-31,-140v-37,-27,-29,-131,31,-124",
            w:133
        },
        "9":{
            d:"51,-162v-4,32,32,40,40,15v-3,-30,11,-77,-21,-76v-25,0,-16,36,-19,61xm70,5v-38,0,-60,-30,-57,-73r38,0v-1,20,1,37,20,37v33,0,16,-51,20,-82v-37,36,-80,-5,-80,-65v0,-49,16,-81,61,-82v85,0,54,122,58,201v2,39,-21,64,-60,64",
            w:146
        },
        ":":{
            d:"20,0r0,-40r38,0r0,40r-38,0xm20,-72r0,-40r38,0r0,40r-38,0"
        },
        ";":{
            d:"20,-72r0,-40r38,0r0,40r-38,0xm20,0r0,-40r38,0r0,40r-21,45r-17,0r13,-45r-13,0"
        },
        "<":{
            d:"253,-207r0,33r-164,67r164,67r0,32r-207,-85r0,-28",
            w:299
        },
        "=":{
            d:"45,-86r210,0r0,29r-210,0r0,-29xm45,-158r210,0r0,29r-210,0r0,-29",
            w:299
        },
        ">":{
            d:"46,-207r207,86r0,28r-207,85r0,-32r165,-67r-165,-67r0,-33",
            w:299
        },
        "?":{
            d:"106,-210v0,48,-48,76,-40,135r-30,0v-8,-55,23,-94,34,-133v0,-9,-5,-17,-14,-17v-15,0,-17,14,-24,27r-31,-13v9,-27,23,-47,54,-48v31,-1,51,19,51,49xm32,0r0,-42r38,0r0,42r-38,0",
            w:110
        },
        "@":{
            d:"243,-20v-23,1,-37,-8,-37,-30v-11,19,-26,29,-53,30v-37,0,-54,-22,-55,-59v-1,-51,35,-99,83,-98v22,0,35,9,43,25r10,-19r27,0r-27,112v0,9,7,14,16,14v42,-6,63,-44,64,-89v1,-62,-53,-101,-119,-100v-92,2,-146,55,-149,143v-2,74,57,122,135,120v44,0,80,-13,108,-33r12,17v-32,23,-69,40,-119,40v-98,0,-165,-49,-165,-145v0,-105,74,-167,179,-167v85,0,147,42,147,125v0,63,-36,111,-100,114xm130,-78v0,36,37,46,60,24v17,-16,20,-44,27,-70v-4,-18,-13,-31,-33,-31v-32,0,-54,41,-54,77",
            w:360
        },
        A:{
            d:"2,0r42,-254r51,0r42,254r-40,0r-8,-55r-40,0r-8,55r-39,0xm54,-91r30,0v-7,-34,-6,-76,-16,-106",
            w:139,
            k:{
                T:10,
                A:-7,
                ";":-7,
                ":":-7
            }
        },
        B:{
            d:"98,-183v0,-27,-12,-37,-39,-34r0,69v27,4,39,-9,39,-35xm100,-73v0,-31,-10,-42,-41,-39r0,75v29,3,41,-7,41,-36xm110,-130v49,24,41,141,-32,130r-58,0r0,-254v65,-4,117,3,117,66v0,29,-10,45,-27,58",
            w:152
        },
        C:{
            d:"76,5v-88,0,-57,-120,-61,-200v-2,-40,23,-65,62,-65v46,0,64,38,59,90r-40,0v0,-24,4,-55,-20,-54v-15,0,-21,10,-21,26r0,142v0,16,6,26,21,26v26,1,19,-35,20,-61r40,0v4,55,-10,96,-60,96",
            w:149
        },
        D:{
            d:"99,-187v1,-25,-15,-31,-40,-30r0,180v25,2,40,-1,40,-27r0,-123xm139,-184v-6,76,25,190,-61,184r-58,0r0,-254v67,-3,124,-1,119,70",
            w:154
        },
        E:{
            d:"20,0r0,-254r102,0r0,37r-63,0r0,66r46,0r0,37r-46,0r0,76r63,0r0,38r-102,0",
            w:132
        },
        F:{
            d:"20,0r0,-254r102,0r0,37r-63,0r0,66r46,0r0,37r-46,0r0,114r-39,0",
            w:120,
            k:{
                y:6,
                u:6,
                r:6,
                o:6,
                i:-7,
                e:6,
                a:6,
                T:-7,
                A:6,
                ";":13,
                ":":13,
                ".":31,
                ",":31
            }
        },
        G:{
            d:"107,-18v-29,48,-98,15,-92,-47v7,-80,-25,-196,62,-195v48,1,60,37,57,89r-38,0v0,0,4,-54,-20,-53v-15,0,-21,10,-21,26r0,142v0,16,6,26,21,26v28,1,19,-39,20,-66r-24,0r0,-32r62,0r0,128r-19,0",
            w:149,
            k:{
                T:-7
            }
        },
        H:{
            d:"20,-254r39,0r0,104r39,0r0,-104r39,0r0,254r-39,0r0,-114r-39,0r0,114r-39,0r0,-254",
            w:157
        },
        I:{
            d:"20,0r0,-254r40,0r0,254r-40,0",
            w:79
        },
        J:{
            d:"66,-67v0,49,-17,72,-68,67r0,-39v17,4,28,-5,28,-25r0,-190r40,0r0,187",
            w:83
        },
        K:{
            d:"20,0r0,-254r39,0r0,107r45,-107r39,0r-44,87r49,167r-41,0r-33,-128r-15,29r0,99r-39,0",
            w:147
        },
        L:{
            d:"20,0r0,-254r39,0r0,217r61,0r0,37r-100,0",
            w:121,
            k:{
                y:13,
                a:-7,
                Y:20,
                W:13,
                V:13,
                T:13,
                A:-7
            }
        },
        M:{
            d:"20,0r0,-254r52,0r28,159v1,6,1,13,1,20v5,-63,19,-119,28,-179r53,0r0,254r-37,0r3,-205r-38,205r-19,0r-37,-205v5,64,2,137,3,205r-37,0",
            w:201
        },
        N:{
            d:"20,0r0,-254r35,0r58,179v-9,-52,-3,-119,-5,-179r37,0r0,254r-37,0r-56,-168v9,49,4,112,5,168r-37,0",
            w:164
        },
        O:{
            d:"76,-30v14,0,20,-10,20,-26r0,-142v0,-16,-6,-26,-20,-26v-15,0,-21,10,-21,26r0,142v0,16,6,26,21,26xm76,5v-87,2,-57,-120,-61,-200v-2,-40,23,-65,62,-65v83,-1,55,117,59,196v2,41,-20,69,-60,69",
            w:151
        },
        P:{
            d:"99,-180v0,-31,-9,-40,-40,-37r0,77v32,2,40,-7,40,-40xm139,-181v0,52,-22,86,-80,78r0,103r-39,0r0,-254r57,0v47,0,62,25,62,73",
            w:145,
            k:{
                o:6,
                e:6,
                a:6,
                A:8,
                ";":13,
                ":":13,
                ".":53,
                ",":53
            }
        },
        Q:{
            d:"76,-30v14,0,20,-10,20,-26r0,-142v0,-16,-6,-26,-20,-26v-15,0,-21,10,-21,26r0,142v0,16,6,26,21,26xm136,-194v-2,54,6,120,-5,165v2,5,7,8,16,7r0,39v-22,1,-34,-6,-42,-20v-44,24,-94,-8,-90,-62v6,-80,-25,-197,62,-195v37,0,60,27,59,66",
            w:151
        },
        R:{
            d:"99,-182v0,-30,-11,-37,-40,-35r0,73v31,2,40,-5,40,-38xm77,-254v73,-11,78,107,37,136r29,118r-41,0r-24,-107r-19,0r0,107r-39,0r0,-254r57,0",
            w:150
        },
        S:{
            d:"134,-58v5,57,-71,84,-107,45v-11,-13,-18,-29,-19,-52r38,-5v-7,42,50,50,50,13v0,-46,-84,-82,-84,-138v0,-51,66,-85,101,-46v11,11,17,26,18,46r-38,5v5,-37,-42,-42,-42,-8v1,43,90,82,83,140",
            w:141
        },
        T:{
            d:"-2,-217r0,-37r120,0r0,37r-40,0r0,217r-40,0r0,-217r-40,0",
            w:116,
            k:{
                y:16,
                w:16,
                u:15,
                s:20,
                r:13,
                o:20,
                i:-7,
                e:20,
                c:20,
                a:20,
                A:10,
                ";":16,
                ":":16,
                ".":20,
                "-":13,
                ",":20
            }
        },
        U:{
            d:"78,5v-42,0,-61,-27,-61,-70r0,-189r40,0r0,197v0,13,9,24,21,24v12,0,20,-10,20,-24r0,-197r40,0r0,190v0,41,-20,69,-60,69",
            w:155
        },
        V:{
            d:"4,-254r38,0r26,177v1,9,1,18,1,26v6,-71,18,-136,28,-203r38,0r-45,254r-41,0",
            w:138,
            k:{
                u:6,
                o:10,
                e:10,
                a:13,
                ";":13,
                ":":13,
                ".":26,
                ",":26
            }
        },
        W:{
            d:"2,-254r38,0r19,195v4,-68,15,-130,23,-195r33,0r24,188r19,-188r37,0r-39,254r-33,0r-23,-168v-1,-7,-1,-16,-1,-25v-3,70,-16,129,-24,193r-33,0",
            w:197,
            k:{
                o:6,
                e:6,
                a:6,
                ";":10,
                ":":10,
                ".":20,
                ",":20
            }
        },
        X:{
            d:"-1,0r47,-129r-46,-125r41,0v9,24,15,52,25,75r25,-75r40,0r-44,121r48,133r-41,0v-10,-27,-14,-60,-27,-83r-27,83r-41,0",
            w:134
        },
        Y:{
            d:"-4,-254r39,0v11,32,14,72,28,101r25,-101r39,0r-45,149r0,105r-39,0r0,-101",
            w:123,
            k:{
                u:8,
                o:11,
                i:-7,
                e:11,
                a:13,
                ";":20,
                ":":20,
                ".":24,
                "-":13,
                ",":24
            }
        },
        Z:{
            d:"11,0r0,-39r70,-176r-64,0r0,-39r107,0r0,37r-71,178r71,0r0,39r-113,0",
            w:136
        },
        "[":{
            d:"25,33r0,-292r62,0r0,32r-27,0r0,227r27,0r0,33r-62,0",
            w:98
        },
        "\\":{
            d:"115,33r-29,0r-103,-292r29,0",
            w:87
        },
        "]":{
            d:"74,33r-62,0r0,-33r27,0r0,-227r-27,0r0,-32r62,0r0,292",
            w:98
        },
        "^":{
            d:"161,-257r38,0r87,99r-36,0r-70,-70r-70,70r-37,0",
            w:360
        },
        _:{
            d:"0,55r180,0r0,30r-180,0r0,-30",
            w:180
        },
        "`":{
            d:"82,-205r-33,-39r44,0r18,39r-29,0",
            w:180
        },
        a:{
            d:"55,-30v28,0,22,-37,22,-65v-20,14,-31,20,-33,47v0,10,3,18,11,18xm66,-192v78,1,34,117,50,192r-35,0v-2,-5,-3,-13,-3,-21v-16,31,-75,32,-70,-18v5,-48,28,-59,69,-83v0,-16,3,-38,-12,-38v-14,0,-17,11,-16,26r-35,0v-2,-34,21,-58,52,-58",
            w:128
        },
        b:{
            d:"81,-141v2,-19,-19,-24,-29,-12r0,117v8,12,29,13,29,-8r0,-97xm117,-39v6,44,-47,52,-65,25r0,14r-35,0r0,-254r35,0r0,82v19,-32,65,-18,65,29r0,104",
            w:130
        },
        c:{
            d:"64,5v-64,0,-50,-79,-51,-141v0,-33,21,-56,53,-56v38,0,53,28,50,70r-36,0v0,-17,2,-38,-15,-37v-14,0,-16,8,-16,22r0,83v1,17,1,25,16,26v18,2,15,-21,15,-40r36,0v3,44,-10,73,-52,73",
            w:128
        },
        d:{
            d:"49,-44v-3,21,22,20,29,8r0,-117v-9,-11,-29,-8,-29,12r0,97xm13,-143v-7,-46,46,-61,65,-29r0,-82r35,0r0,254r-35,0r0,-15v-18,28,-65,21,-65,-24r0,-104",
            w:130
        },
        e:{
            d:"65,-159v-20,0,-15,22,-16,41r31,0v0,-18,4,-41,-15,-41xm64,5v-64,0,-50,-80,-51,-142v-1,-31,22,-55,53,-55v52,0,53,50,50,103r-67,0v2,23,-8,61,16,61v18,0,15,-20,15,-39r36,0v2,44,-11,72,-52,72",
            w:128
        },
        f:{
            d:"82,-221v-22,-8,-28,9,-25,33r22,0r0,30r-22,0r0,158r-35,0r0,-158r-20,0r0,-30r20,0v-6,-46,15,-77,60,-63r0,30",
            w:83,
            k:{
                y:-7,
                w:-7,
                ";":6,
                ":":6,
                ".":6,
                ",":6
            }
        },
        g:{
            d:"58,-78v26,-1,14,-39,16,-63v1,-12,-5,-19,-16,-19v-25,1,-13,40,-15,63v-1,11,4,19,15,19xm40,19v1,21,54,20,56,0v0,-18,-53,-22,-56,0xm33,0v-31,-6,-24,-44,1,-55v-25,-11,-23,-45,-23,-82v0,-54,64,-73,89,-34v4,-11,14,-17,26,-19r0,30v-32,-6,-20,34,-20,61v0,34,-19,53,-54,50v-13,8,-13,21,12,21v37,0,64,9,64,44v0,34,-30,44,-68,44v-30,-1,-56,-6,-59,-30v3,-17,16,-25,32,-30",
            w:124
        },
        h:{
            d:"82,-142v0,-25,-23,-10,-30,0r0,142r-35,0r0,-254r35,0r0,87v15,-24,65,-37,65,10r0,157r-35,0r0,-142",
            w:132
        },
        i:{
            d:"17,-219r0,-35r35,0r0,35r-35,0xm17,0r0,-188r35,0r0,188r-35,0",
            w:69
        },
        j:{
            d:"18,-219r0,-35r35,0r0,35r-35,0xm-7,26v12,3,25,-1,25,-12r0,-202r35,0r0,202v3,36,-26,52,-60,42r0,-30",
            w:70
        },
        k:{
            d:"17,0r0,-254r35,0r0,135r32,-69r38,0r-35,63r37,125r-35,0r-25,-93v-17,18,-11,59,-12,93r-35,0",
            w:124,
            k:{
                y:-7
            }
        },
        l:{
            d:"17,0r0,-254r35,0r0,254r-35,0",
            w:69
        },
        m:{
            d:"52,-168v11,-21,60,-35,64,0v14,-24,65,-36,65,10r0,158r-35,0r0,-142v0,-25,-23,-10,-30,0r0,142r-32,0r0,-142v-1,-25,-24,-10,-32,0r0,142r-35,0r0,-188r35,0r0,20",
            w:197
        },
        n:{
            d:"82,-142v0,-25,-23,-10,-30,0r0,142r-35,0r0,-188r35,0r0,21v15,-24,65,-37,65,10r0,157r-35,0r0,-142",
            w:132
        },
        o:{
            d:"64,-160v-9,0,-14,6,-15,14r0,102v0,10,5,16,15,16v9,0,16,-6,15,-16r0,-102v1,-8,-7,-14,-15,-14xm64,5v-68,0,-49,-86,-51,-150v-1,-29,22,-47,52,-47v29,0,50,20,49,48v-3,63,18,149,-50,149",
            w:127
        },
        p:{
            d:"81,-144v2,-20,-21,-19,-29,-8r0,117v9,13,29,9,29,-12r0,-97xm117,-45v6,46,-44,61,-65,30r0,74r-35,0r0,-247r35,0r0,15v18,-28,65,-20,65,25r0,103",
            w:130
        },
        q:{
            d:"78,-152v-8,-11,-29,-12,-29,8r0,97v-2,21,20,25,29,12r0,-117xm78,-15v-20,30,-71,16,-65,-30v7,-52,-21,-145,32,-145v15,0,25,7,33,17r0,-15r35,0r0,247r-35,0r0,-74",
            w:130
        },
        r:{
            d:"93,-150v-21,-10,-41,6,-41,27r0,123r-35,0r0,-188r35,0r0,26v9,-16,18,-28,41,-28r0,40",
            w:94,
            k:{
                y:-7,
                x:-7,
                w:-7,
                v:-7,
                f:-10,
                ";":20,
                ":":20,
                ".":23,
                "-":20,
                ",":23
            }
        },
        s:{
            d:"105,-74v21,35,-2,81,-45,79v-32,-2,-52,-24,-55,-56r34,-7v3,18,6,29,23,30v10,1,17,-6,16,-16v1,-28,-76,-52,-69,-97v-4,-46,57,-66,86,-38v9,8,14,20,15,35r-33,8v3,-24,-33,-32,-33,-7v0,21,55,49,61,69",
            w:120
        },
        t:{
            d:"87,2v-34,10,-61,-5,-61,-42r0,-118r-21,0r0,-30r21,0r0,-54r35,0r0,54r26,0r0,30r-26,0r0,115v-1,15,12,18,26,15r0,30",
            w:95
        },
        u:{
            d:"51,-44v2,25,23,8,30,-1r0,-143r35,0r0,188r-35,0r0,-21v-9,13,-23,24,-40,24v-18,0,-25,-12,-25,-34r0,-157r35,0r0,144",
            w:132
        },
        v:{
            d:"0,-188r32,0v9,37,11,82,24,116r17,-116r35,0r-36,188r-32,0",
            w:107,
            k:{
                ".":8,
                ",":8
            }
        },
        w:{
            d:"0,-188r33,0v6,46,17,85,18,136v2,-49,13,-90,19,-136r27,0r20,129v1,-47,10,-87,16,-129r32,0r-32,188r-30,0v-6,-46,-19,-83,-20,-134v-2,48,-11,90,-17,134r-31,0",
            w:165,
            k:{
                ".":6,
                ",":6
            }
        },
        x:{
            d:"-1,0r36,-98r-33,-90r35,0v7,16,10,36,18,51r17,-51r36,0r-35,89r36,99r-34,0v-8,-19,-12,-41,-21,-58r-21,58r-34,0",
            w:109
        },
        y:{
            d:"3,-188r33,0r23,121r18,-121r35,0r-40,201v-6,35,-23,48,-65,46r0,-34v24,1,34,-6,35,-29",
            w:114,
            k:{
                ";":6,
                ":":6,
                ".":13,
                ",":13
            }
        },
        z:{
            d:"9,0r0,-31r58,-124r-53,0r0,-33r89,0r0,31r-55,124r55,0r0,33r-94,0",
            w:111
        },
        "{":{
            d:"77,-198v-3,-56,24,-63,77,-62r0,32v-80,-21,-4,131,-77,135v42,4,36,51,36,97v0,33,9,39,41,38r0,31v-51,1,-77,-6,-77,-61v0,-48,8,-98,-49,-90r0,-31v54,8,51,-39,49,-89",
            w:180
        },
        "|":{
            d:"75,-275r31,0r0,360r-31,0r0,-360",
            w:180
        },
        "}":{
            d:"103,-93v-75,-6,8,-151,-76,-135r0,-32v52,-1,78,7,76,62v-2,47,-7,97,49,89r0,31v-55,-8,-51,40,-49,90v3,54,-24,62,-76,61r0,-31v81,18,2,-130,76,-135",
            w:180
        },
        "~":{
            d:"202,-111v29,-1,46,-13,67,-27r0,33v-20,13,-40,23,-67,24v-34,1,-78,-25,-103,-23v-29,2,-45,13,-68,28r0,-33v21,-14,40,-24,68,-25v35,-2,75,24,103,23",
            w:299
        },
        "\u00a0":{
            w:73
        }
    }
});