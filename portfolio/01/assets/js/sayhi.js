$(window).load(function() {
    (function(){
        if( $('.modal-message-slider').length > 0){          
            $('.modal-change-word-btn').bind('click',function(){       
                $('.modal-message').addClass('active');
                $('.modal-message-slider').animate({left: "-100%"});
                $('.modal-message-send').hide();
                $('.modal-change-word-btn').hide();
            });
            $('.modal-message-select a').each(function(){
                $(this).bind('click',function(){  
                   $('#modalMessage').text($(this).text());
                   $('#modalInput').val($(this).text());
                   $('.modal-message-slider').animate({left:"0px"});
                   $('.modal-message').removeClass('active');
                   $('.modal-message-wrap').scrollTop(0);
                   $('.modal-message-send').show();
                   $('.modal-change-word-btn').show();
                })
            })                
        } 
    })()    
})