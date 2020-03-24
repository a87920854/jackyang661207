(function($){
    //side-panel下拉選單功能
    var w = $(window).width(); //取得視窗寬度
    var sdMenu = $(".s-dropdown-menu");
    var sh = sdMenu.height();
    var sdToggle = $(".s-dropdown-toggle"); 
    function sDropDown(){        
        sdToggle.on("mouseenter",function(){        
            sdMenu.toggle();
            $(".s-dropdown").next().css("margin-top",sh);  
        });
        sdToggle.on("mouseleave",function(){
            sdMenu.toggle();
            $(".s-dropdown").next().css("margin-top", "0px");
        });
        sdMenu.on("mouseenter",function(){
            $(this).toggle();
            $(".s-dropdown").next().css("margin-top",sh);       
        });
        sdMenu.on("mouseleave",function(){
            $(this).toggle();
            $(".s-dropdown").next().animate({marginTop:"0px"},"fast"); 
        });        
    }
    function ssDropDown(){
        sdToggle.on("mouseenter",function(){        
            sdMenu.toggle();
        });
        sdToggle.on("mouseleave",function(){
            sdMenu.toggle();
        });
        sdMenu.on("mouseenter",function(){
            $(this).toggle();
        });
        sdMenu.on("mouseleave",function(){
            $(this).toggle();
        }); 
    }
    if(w > 630){        
        sDropDown();
    }else if(w < 630){        
        ssDropDown();
    };
    //手機尺寸可slide panel  
    var sContainerWidth =  $('.side-slide-container').width();
    var singleWidth =  Math.floor(sContainerWidth/3 -1);     
    var sidePanel = $('.side-panel');
    var sNextBtn = $('.s-next-btn');
    var sPrevBtn = $('.s-prev-btn');
    var sPanelLi = $('.side-panel > li');
    //監聽視窗尺寸變化時
    $(window).resize(function(){
        w = $(window).width();
        sContainerWidth = $('.side-slide-container').width();
        singleWidth = sContainerWidth/3;        
        allWidth = singleWidth * sPanelLi.length;  
        if(w < 630){
            sdToggle.off("mouseenter mouseleave");
            sdMenu.off("mouseenter mouseleave");     
            sPanelLi.width(singleWidth);
            sidePanel.width(allWidth);
            ssDropDown();
        }else if(w > 630){
            sdToggle.off("mouseenter mouseleave");
            sdMenu.off("mouseenter mouseleave");   
            sPanelLi.css("width","");
            sidePanel.css("width","");
            sidePanel.css("left","");
            sPrevBtn.css("display","");
            sNextBtn.css("display","");
            sDropDown();
        };         
    });
    sNextBtn.on("click",function(){
        let max = parseInt("-"+(singleWidth * (sPanelLi.length - 3))); 
        let max2 = parseInt("-"+(singleWidth * (sPanelLi.length - 4))); 
        let leftVal = parseInt(sidePanel.css("left"));
        sPrevBtn.css("display","block");
        if( leftVal > max ){
            sidePanel.animate({left:'-='+singleWidth},"fast");       
        }
        if( leftVal == max2 ){    
            sNextBtn.css("display","none");
        }           
    });
    sPrevBtn.on("click",function(){  
        let leftVal = parseInt(sidePanel.css("left"));
        let max3 = parseInt("-"+ singleWidth);
        if( leftVal < 0 ){
            sidePanel.animate({left:'+='+singleWidth},"fast");
            sNextBtn.css("display","block");                   
        }
        if( leftVal == max3 ){
            sPrevBtn.css("display","none");
        }
    });
    if(w < 630){
        allWidth = singleWidth * sPanelLi.length;  
        sPanelLi.width(singleWidth);
        sidePanel.width(allWidth);
    };
})($);

