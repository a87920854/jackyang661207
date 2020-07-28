window.width = jQuery(window).width();
var plugin_path = 'assets/plugins/';
var _arr 	= {};
jQuery(window).ready(function () {
  // Load Bootstrap JS
  loadScript(plugin_path + 'bootstrap/bootstrap.min.js', function() {
      Init(false);
  });
});
function loadScript(scriptName, callback) {
    if (!_arr[scriptName]) {
        _arr[scriptName] = true;

        var body 		= document.getElementsByTagName('body')[0];
        var script 		= document.createElement('script');
        script.type 	= 'text/javascript';
        script.src 		= scriptName;
        script.onload = callback;
        body.appendChild(script);

    } else if (callback) {
        callback();
    }
};
function Init(is_ajax) {
    // if(is_ajax != true) {		
        
    // }
    _owl_carousel();
    _topNav();
    _scrollTo(false, 0);
    _flexslider();
    _lightbox();
    _indexRegisterToggle();
    _imgAspectRatio(0.65);
    _subscribeNewsLetter();
}

/** 00. Top Nav  **/
function _topNav() {
  window.scrollTop 	= 0;
  var _header_el 		= jQuery("#header");

  jQuery(window).scroll(function() {
    _toTop();
  });

  /* Scroll To Top */
  function _toTop() {
    _scrollTop = jQuery(document).scrollTop();
    
    if(_scrollTop > 100) {

      if(jQuery("#toTop").is(":hidden")) {
        jQuery("#toTop").show();
      }

    } else {

      if(jQuery("#toTop").is(":visible")) {
        jQuery("#toTop").hide();
      }

    }

  }


  // STICKY
  if(_header_el.hasClass('sticky')) {

    jQuery(window).scroll(function() {
      if(window.width > 768) {

        var _scrollTop 	= jQuery(document).scrollTop();
          _topBar_H 	= jQuery("#topBar").outerHeight() || 0;

        if(_scrollTop > _topBar_H) {
          _header_el.addClass('fixed');

          _header_H = _header_el.outerHeight() || 0;

          if(!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
            jQuery('body').css({"padding-top":_header_H+"px"});
          }

        } else {
          if(!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
            jQuery('body').css({"padding-top":"0px"});
          }

          _header_el.removeClass('fixed');
        }

      }
    });

  } 
  
}


/** 01. OWL Carousel  **/
function _owl_carousel() {
    var _container = jQuery("div.owl-carousel");

    if(_container.length > 0) {

        loadScript(plugin_path + 'owl-carousel/owl.carousel.min.js', function() {

            _container.each(function() {                
                var slider 		= jQuery(this);
                var options 	= slider.attr('data-plugin-options');
                // Progress Bar
                var $opt = eval('(' + options + ')');  // convert text to json
                
                if($opt.progressBar == 'true') {
                    var afterInit = progressBar;
                } else {
                    var afterInit = false;
                }

                if($opt.addTitle == 'true') {
                  var afterInit = addTitle;
                }else {
                  var afterInit = false;
                }

                var defaults = {
                    items: 					5,
                    itemsCustom: 			false,
                    itemsDesktop: 			[1199,4],
                    itemsDesktopSmall: 		[980,3],
                    itemsTablet: 			[768,2],
                    itemsTabletSmall: 		false,
                    itemsMobile: 			[479,1],
                    singleItem: 			true,
                    itemsScaleUp: 			false,

                    slideSpeed: 			200,
                    paginationSpeed: 		800,
                    rewindSpeed: 			1000,

                    autoPlay: 				false,
                    stopOnHover: 			false,

                    navigation: 			false,
                    navigationText: [
                                        '<i class="fa fa-angle-left"></i>',
                                        '<i class="fa fa-angle-right"></i>'
                                    ],
                    rewindNav: 				true,
                    scrollPerPage: 			false,

                    pagination: 			true,
                    paginationNumbers: 		false,

                    responsive: 			true,
                    responsiveRefreshRate: 	200,
                    responsiveBaseWidth: 	window,

                    baseClass: 				"owl-carousel",
                    theme: 					"owl-theme",

                    lazyLoad: 				false,
                    lazyFollow: 			true,
                    lazyEffect: 			"fade",

                    autoHeight: 			false,

                    jsonPath: 				false,
                    jsonSuccess: 			false,

                    dragBeforeAnimFinish: 	true,
                    mouseDrag: 				true,
                    touchDrag: 				true,

                    transitionStyle: 		false,
 
                    addClassActive: 		false,

                    beforeUpdate: 			false,
                    afterUpdate: 			false,
                    beforeInit: 			false,
                    afterInit: 				(afterInit == false) ? false : afterInit,
                    beforeMove: 			false,
                    afterMove: 				(afterInit == false) ? false : afterInit,
                    afterAction: 			false,
                    startDragging: 			false,
                    afterLazyLoad: 			false
                }                

                var config = jQuery.extend({}, defaults, options, slider.data("plugin-options"));
                slider.owlCarousel(config).addClass("owl-carousel-init");
                
                function addTitle(){
                  if( slider.find(".owl-pagination").length > 0){                 
                    var current = slider.find(".owl-pagination .active").index();
                    $("#index-promo-title").text(slider.find(".owl-item").eq(current).find("img").attr('alt'));
                  }else{
                    $("#index-promo-title").remove();
                  }
                }

                // Progress Bar
                var elem = jQuery(this);

                //Init progressBar where elem is $("#owl-demo")
                function progressBar(elem){
                  $elem = elem;
                  //build progress bar elements
                  buildProgressBar();
                  //start counting
                  start();
                }
             
                //create div#progressBar and div#bar then prepend to $("#owl-demo")
                function buildProgressBar(){
                  $progressBar = jQuery("<div>",{
                    id:"progressBar"
                  });
                  $bar = jQuery("<div>",{
                    id:"bar"
                  });
                  $progressBar.append($bar).prependTo($elem);
                }

                function start() {
                  //reset timer
                  percentTime = 0;
                  isPause = false;
                  //run interval every 0.01 second
                  tick = setInterval(interval, 10);
                };

         
                var time = 7; // time in seconds
                function interval() {
                  if(isPause === false){
                    percentTime += 1 / time;
                    $bar.css({
                       width: percentTime+"%"
                     });
                    //if percentTime is equal or greater than 100
                    if(percentTime >= 100){
                      //slide to next item 
                      $elem.trigger('owl.next')
                    }
                  }
                }
             
                //pause while dragging 
                function pauseOnDragging(){
                  isPause = true;
                }
             
                //moved callback
                function moved(){
                  //clear interval
                  clearTimeout(tick);
                  //start again
                  start();
                }                

            });

        });
    }

}

/** 02. ScrollTo **/
function _scrollTo(to, offset) {

  if(to == false) {

    jQuery("a.scrollTo").bind("click", function(e) {
      e.preventDefault();

      var href 	= jQuery(this).attr('href'),
        _offset	= jQuery(this).attr('data-offset') || 0;

      if(href != '#' && href != '#top') {
        jQuery('html,body').animate({scrollTop: jQuery(href).offset().top - parseInt(_offset)});
      }

      if(href == '#top') {
        jQuery('html,body').animate({scrollTop: 0});
      }
    });

    jQuery("#toTop").bind("click", function(e) {
      e.preventDefault();
      jQuery('html,body').animate({scrollTop: 0});
    });
  
  } else {

    // USAGE: _scrollTo("#footer", 150);
    jQuery('html,body').animate({scrollTop: jQuery(to).offset().top - offset});

  }
}

/** 03. Flexslider **/
function _flexslider() {
  var _container = jQuery(".flexslider");
  
  if(_container.length > 0) {

    loadScript(plugin_path + 'slider.flexslider/jquery.flexslider-min.js', function() {

      if(jQuery().flexslider) {
        var	_controlNav 	= _container.attr('data-controlNav'),
          _slideshowSpeed = _container.attr('data-slideshowSpeed') || 7000,
          _pauseOnHover	= _container.attr('data-pauseOnHover') || false;

        if(_pauseOnHover == "true") {
          _pauseOnHover = true;
        } else{
          _pauseOnHover = false;
        }

        if(_controlNav == 'thumbnails') {
          _controlNav = 'thumbnails';
        } else
        if(_controlNav == 'true') {
          _controlNav = true;
        } else
        if(_controlNav == 'false') {
          _controlNav = false;
        } else {
          _controlNav = true;
        }
        
        if(_controlNav == 'thumbnails' || _controlNav == false) {
          _directionNav = false;
        } else {
          _directionNav = true;
        }

        jQuery(_container).flexslider({
          animation		: "slide",
          controlNav		: _controlNav,
          slideshowSpeed	: parseInt(_slideshowSpeed) || 7000,
          directionNav 	: _directionNav,
          pauseOnHover	: _pauseOnHover,
          start: function(slider){
            jQuery('.flex-prev').html('<i class="fa fa-angle-left"></i>');
            jQuery('.flex-next').html('<i class="fa fa-angle-right"></i>');
          }
        });

        // Resize Flex Slider if exists!
        _container.resize();

      }

    });
  }
}

/** 04. LightBox **/
function _lightbox() {
  var _el = jQuery(".lightbox");

  if(_el.length > 0) {

    loadScript(plugin_path + 'magnific-popup/jquery.magnific-popup.min.js', function() {

      if(typeof(jQuery.magnificPopup) == "undefined") {
        return false;
      }

      jQuery.extend(true, jQuery.magnificPopup.defaults, {
        tClose: 		'Close',
        tLoading: 		'Loading...',

        gallery: {
          tPrev: 		'Previous',
          tNext: 		'Next',
          tCounter: 	'%curr% / %total%'
        },

        image: 	{ 
          tError: 	'Image not loaded!' 
        },

        ajax: 	{ 
          tError: 	'Content not loaded!' 
        }
      });

      _el.each(function() {

        var _t 			= jQuery(this),
          options 	= _t.attr('data-plugin-options'),
          config		= {},
          defaults 	= {
            type: 				'image',
            fixedContentPos: 	false,
            fixedBgPos: 		false,
            mainClass: 			'mfp-no-margins mfp-with-zoom',
            closeOnContentClick: true,
            closeOnBgClick: 	true,
            image: {
              verticalFit: 	true
            },

            zoom: {
              enabled: 		false,
              duration: 		300
            },

            gallery: {
              enabled: false,
              navigateByImgClick: true,
              preload: 			[0,1],
              arrowMarkup: 		'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
              tPrev: 				'Previous',
              tNext: 				'Next',
              tCounter: 			'<span class="mfp-counter">%curr% / %total%</span>'
            },
          };

        if(_t.data("plugin-options")) {
          config = jQuery.extend({}, defaults, options, _t.data("plugin-options"));
        }

        jQuery(this).magnificPopup(config);

      });

    });

  }

}

/** 05. 手機版-首頁-主視覺-註冊按鈕視窗TOGGLE **/
function _indexRegisterToggle(){
  $(".btn-toggle").bind("click", function() {
    var width = $(window).width();
    if( width < 767){
      if( $(".index-kv-box .toggle").css("display") == "none" ){
        var offset = $(".index-kv-register").offset().top;
        $('html,body').animate({scrollTop: offset});
        $(".index-kv-box .toggle").slideDown(400);
        $(".index-kv-box").addClass("active");
      }else{
        $(".index-kv-box .toggle").slideUp(400, function(){
          $(this).attr("style","");
        });      
        $(".index-kv-box").removeClass("active");
      }
      
    }
  })
};

/** 06. 計算圖片長寬比 **/
function _imgAspectRatio(percent){  
  var $imgRatio = $(".img-ratio");
  if( $imgRatio.length > 0){
    window.addEventListener("load", function(event) {
      $(window).resize(function(){  
        setTimeout(function(){
          $imgRatio.each(function(){
            var ratio = $(this).attr("data-ratio");    
            var w = $(this).width();      
            var h = w * ( ratio || percent );           
            $(this).height(h);
          }) 
        },300) 
      }).resize();    
    })
  }  
}

/** 07. 跳出訂閱電子報 **/
function _subscribeNewsLetter(){
  var $newsLetter = $("#news-letter");
  if( $newsLetter.length > 0 ){
    $(window).scroll(function(){		
      var distanceTop = 350;		
      if($(window).scrollTop() > distanceTop)
        $newsLetter.animate({"right":"0px"},500);
      else 
        $newsLetter.stop(true).animate({"right":"-103%"},300);	
    });
    $("#news-letter .close").bind("click",function(){
      $newsLetter.remove();
    });
  }   
}


/** Modernizr 2.7.1
	http://modernizr.com/download/#-csstransforms3d-csstransitions-video-touch-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 **************************************************************** **/
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.csstransforms3d=function(){var a=!!G("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return G("transition")},q.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,e.prefixed=function(a,b,c){return b?G(a,b,c):G(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
