(function ($) {
  "use strict";

  var review = $('.review_part_text');
  if (review.length) {
    review.owlCarousel({
      items: 2,
      loop: true,
      dots: true,
      autoplay: true,
      margin: 40,
      autoplayHoverPause: true,
      autoplayTimeout:5000,
      nav: false,
      responsive: {
        0:{
          items: 1
        },
        480:{
          items: 1
        },
        769:{
          items: 2
        }
    }
    });
  }
  
  var slide = $('.ce-slide');
  if (slide.length) {
    slide.owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      autoplay: true,
      margin: 40,
      autoplayHoverPause: true,
      autoplayTimeout:5000,
      nav: false,
      responsive: {
        0:{
          items: 1
        },
        480:{
          items: 1
        },
        769:{
          items: 2
        }
    }
    });
  }
  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });
  if (document.getElementById('default-select')) {
		$('select').niceSelect();
	}

  // page-scroll
  $('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    var headerH = '80';
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
 });

}(jQuery));


/** COUNT TO
	https://github.com/mhuggins/jquery-countTo
 **************************************************************** **/
(function($) {
  $.fn.countTo = function(options) {
    return this.each(function() {
      //-- Arrange
      var FRAME_RATE = 60; // Predefine default frame rate to be 60fps
      var $el = $(this);
      var countFrom = parseInt($el.attr('data-count-from'));
      var countTo = parseInt($el.attr('data-count-to'));
      var countSpeed = $el.attr('data-count-speed'); // Number increment per second

      //-- Action
      var rafId;
      var increment;
      var currentCount = countFrom;
      var countAction = function() {              // Self looping local function via requestAnimationFrame
        if(currentCount < countTo) {              // Perform number incremeant
          $el.text(Math.floor(currentCount));     // Update HTML display
          increment = countSpeed / FRAME_RATE;    // Calculate increment step
          currentCount += increment;              // Increment counter
          rafId = requestAnimationFrame(countAction);
        } else {                                  // Terminate animation once it reaches the target count number
          $el.text(countTo);                      // Set to the final value before everything stops
          //cancelAnimationFrame(rafId);
        }
      };
      rafId = requestAnimationFrame(countAction); // Initiates the looping function
    });
  };
}(jQuery));
(function(a){a.fn.appear=function(d,b){var c=a.extend({data:undefined,one:true,accX:0,accY:0},b);return this.each(function(){var g=a(this);g.appeared=false;if(!d){g.trigger("appear",c.data);return}var f=a(window);var e=function(){if(!g.is(":visible")){g.appeared=false;return}var r=f.scrollLeft();var q=f.scrollTop();var l=g.offset();var s=l.left;var p=l.top;var i=c.accX;var t=c.accY;var k=g.height();var j=f.height();var n=g.width();var m=f.width();if(p+k+t>=q&&p<=q+j+t&&s+n+i>=r&&s<=r+m+i){if(!g.appeared){g.trigger("appear",c.data)}}else{g.appeared=false}};var h=function(){g.appeared=true;if(c.one){f.unbind("scroll",e);var j=a.inArray(e,a.fn.appear.checks);if(j>=0){a.fn.appear.checks.splice(j,1)}}d.apply(this,arguments)};if(c.one){g.one("appear",c.data,h)}else{g.bind("appear",c.data,h)}f.scroll(e);a.fn.appear.checks.push(e);(e)()})};a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var b=a.fn.appear.checks.length;if(b>0){while(b--){(a.fn.appear.checks[b])()}}},run:function(){if(a.fn.appear.timeout){clearTimeout(a.fn.appear.timeout)}a.fn.appear.timeout=setTimeout(a.fn.appear.checkAll,20)}});a.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(c,d){var b=a.fn[d];if(b){a.fn[d]=function(){var e=b.apply(this,arguments);a.fn.appear.run();return e}}})})(jQuery);
jQuery(".number-counter").appear(function(){
  $(this).countTo();
});


// scrollTo
//**************************************************************** **/
function _scrollTo(to, offset) {

  if(to == false) {

    jQuery("a.scrollTo").bind("click", function(e) {
      e.preventDefault();

      var href 	= jQuery(this).attr('href'),
        _offset	= jQuery('header').height() || 0;

      if(href != '#' && href != '#top') {
        jQuery('html,body').animate({scrollTop: jQuery(href).offset().top - parseInt(_offset)}, 800, 'easeInOutExpo');
      }

      if(href == '#top') {
        jQuery('html,body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
      }
    });

    jQuery("#toTop").bind("click", function(e) {
      e.preventDefault();
      jQuery('html,body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
    });
  
  } else {

    // USAGE: _scrollTo("#footer", 150);
    jQuery('html,body').animate({scrollTop: jQuery(to).offset().top - offset}, 800, 'easeInOutExpo');

  }
}

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
jQuery(window).scroll(function() {
  _toTop();
});
_scrollTo(false, 0);