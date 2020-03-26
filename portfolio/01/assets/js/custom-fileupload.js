(function(){

    // 手機版縮照片寬度function
    function myPhotoSlide(){
        var $width = $(window).width();
        var $slider = $('.myphoto-upload');
        var $container = $('.myphoto-upload-box');        
        if($width <= 1000){
            // 視窗小於1000px，照片寬度自動調整
            var $w = $slider.width() / 3 + 20;
            var $h = $w * 1.15;
            $('.myphoto-upload-photo').each(function() {
                $(this).css({
                    "width": $w,
                    "height":$h
                });
            });
            $container.width( $w * $('.myphoto-upload-photo').length );       
        }else{
            $('.myphoto-upload-photo').each(function() {
                $(this).attr("style","");
                $container.attr("style","");
            });
        }    
    };

    // 視窗縮放監聽
    $(window).bind('resize', function(){
        resizeTimer = setTimeout(function(){
            myPhotoSlide();
        }, 300);    
    }).resize();

    //修改照片按鈕綁定fileupload
    $('.myphoto-hover-dark .btn-del').each(function() {
        $(this).bind("click", function(){
            $(this).closest(".myphoto-upload-photo").find(".fileupload").click();
        });
    });

    // 設為封面
    $('.myphoto-upload-photo .btn-cover').each(function() {
        $(this).bind('click', function(){
            var $width = $(window).width();
            var $obj = $(this).closest(".myphoto-upload-photo");
            $('.myphoto-upload-box').prepend($obj);
            if($width <= 1000) $('.myphoto-upload').animate({scrollLeft: 0}, 500);
        })
    });

    // 照片檔案上傳
    $(".fileupload").each(function() {
        var $this = $(this), $thisid = $this.attr("id"), $progress = $this.closest("div").find(".progress");
        var $imgs = $(this).closest("div").find("#cimg").val();

        $this.fileupload({
            url: "myphoto.asp?st=upload&img="+$imgs,
            type: "POST",
            dropZone: $this,
            dataType: 'html',
            done: function (e, data) {        	
                switch(data.jqXHR.responseText) {
                    case "nowidth":
                    $progress.find(".progress-bar").css("width", "0px").stop().parent().hide();
                    alert("上傳的照片寬度過小，請上傳大於 800 px 的照片。");        		
                    break;
                    case "max":
                    $progress.find(".progress-bar").css("width", "0px").stop().parent().hide();
                    alert("可上傳的照片數量超過限制，請和秘書聯絡。");
                    break;
                    default:        		
                    location.href="myphoto_crop.asp?a="+data.jqXHR.responseText;
                    break;
                }            
            },
            progressall: function (e, data) {        	
                var progress = parseInt(data.loaded / data.total * 100, 10);            
                $progress.show().find(".progress-bar").css(
                    'width',
                    progress + '%'
                );
            },
            add: function(e, data) {
                var uploadErrors = [];
                var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
                if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                    uploadErrors.push('目前僅開放上傳 gif, jpg, jpeg, png 檔案。');
                }
                if(data.originalFiles[0]['size'] > 5000000) {
                    uploadErrors.push('檔案大小超過限制。');
                }
                if(uploadErrors.length > 0) {
                    alert(uploadErrors.join("\n"));
                } else {
                    data.submit();
                }
            }
        }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
    });   
    
})();
