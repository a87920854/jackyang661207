// 留言次數判斷
(function($){
    if($('.counter-num').length > 0){
        var num = parseInt($('.counter-num').text());
        if( num <= 2){
            setTimeout(function(){
                $('.modal-counter').modal('toggle');
            },500);					
        }				
    }
    $('#modal-counter-service').click(function(){
        $(this).attr("disabled","true").text("已為您通知專人服務").removeClass("btn-main, btn-3d").addClass("btn-disabled");
        alert("已為您通知專人服務");
    })
})(jQuery);


// 想更了解妳
(function($){
    if($('.modal-photo-update').length > 0){
        setTimeout(function(){
            $('.modal-photo-update').modal('toggle');
        },500);	
    }
})(jQuery);