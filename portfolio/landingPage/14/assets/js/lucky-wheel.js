function luckyWheel(setting){
    var angle = {
        aa : 1460, //安慰獎
        bb : 1532, //頭獎
        cc : 1604, //安慰獎
        dd : 1676, //貳獎 
        ee : 1748, //特等獎
        event : event(), //隨機        
    }
    var deg = 0; //輪盤角度
    var offOn = true; // 是否正在抽獎
    var speed = 0; //轉盤速度
    var timer = null; //計時器
    var $turntabl = $('.turntable'); //轉盤
    var $start = $(".start"); //開始按鈕
    var $stop = $(".stop"); //停止按鈕
    var $lights = $(".lights"); //燈泡

    // 設定lottie動畫庫
    var animItem = bodymovin.loadAnimation({
        wrapper: document.getElementById('svg'),
        animType: 'svg',
        loop: false,
        autoplay: false,        
        path: 'assets/images/event20210203/animator.json'
    });
    var animItem2 = bodymovin.loadAnimation({
        wrapper: document.getElementById('svg2'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/images/event20210203/animator.json'
    });  

    //隨機
    function event(){
        var chance = Math.random();
        if(chance < 0.3){
            return 1748; //特獎
        }else if(chance >= 0.3 && chance < 0.4){
            return 1676; //貳獎 		
        }else if(chance >= 0.4 && chance < 0.45){
            return 1604; //安慰獎	
        }else if(chance >= 0.45 && chance < 0.95){
            return 1532; //頭獎	
        }else{
            return 1460; //安慰獎
        }
    }

    //減速功能
    function speedDown(v){        
        clearInterval(timer);
        timer = setInterval(function(){
            if( angle[setting] == undefined){
                if(speed > 0){									
                    deg = deg + speed;
                    $turntabl.css( "transform", "rotate(" + deg + "deg)"); 
                    speed = speed - 0.05;	
                }else{
                    clearInterval(timer);
                    $lights.removeClass("on");							
                    popup(); //跳出視窗
                }
            }else{
                if(deg < v){									
                    deg = deg + speed;
                    $turntabl.css( "transform", "rotate(" + deg + "deg)"); 									
                    if(deg > ( v - 995 )){
                        speed > 0 ? speed = speed - 0.05 : speed = 0;
                        if(deg >= v){
                            clearInterval(timer);
                            $lights.removeClass("on");									
                            popup(); //跳出視窗
                        }
                    } 
                }else{
                    clearInterval(timer);
                    $lights.removeClass("on");							
                    popup(); //跳出視窗
                }
            }
            								                              
        }, 20)	
    }

    //跳出視窗
    function popup(){
        setTimeout(function(){
            $lights.removeClass("on"); //關燈
            getText();
            $('#myModal').modal(); //跳窗
            setTimeout(function(){
                animItem.goToAndPlay(0,true); //放動畫
                animItem2.goToAndPlay(0,true); //放動畫
            }, 500);						
        }, 500);		
    }

    //得獎文字
    function getText(){
        var num = deg % 360;
        var range = 360 / 5;
        if( num > range * 4 ){
            $(".modal-wheel-title").text("恭喜！你獲得特等獎啦！");
            $(".modal-wheel-prize").text("【贈送一場自選1對1約會】");
            $(".modal-wheel-txt").html("你真的很幸運！特等獎的機率只有５％而已哦！<br>填寫資料即可領取獎項！愛神來敲門別錯過啦！");
        }else if( num > (range*3) && num <= (range*4)){
            $(".modal-wheel-title").text("恭喜！你獲得貳獎啦！");
            $(".modal-wheel-prize").text("【免費體驗戀愛諮詢乙次】");
            $(".modal-wheel-txt").html("由最強愛情教練瑪那熊帶你起飛，從此愛情不卡關！<br>填寫資料即可領取獎項！愛神來敲門別錯過啦！");
        }else if(num > (range*2) && num <= (range*3)){
            $(".modal-wheel-title").text("你獲得超實用安慰獎!");
            $(".modal-wheel-prize").text("【免費開通線上交友】");
            $(".modal-wheel-txt").html("別沮喪，約會專家的線上交友資料庫有數千名優質單身會員！<br>填寫資料即可免費註冊！認識你的Mr/Ms.right！");
        }else if(num > (range) && num <= (range*3)){
            $(".modal-wheel-title").text("恭喜！你獲得頭獎啦！");
            $(".modal-wheel-prize").text("【贈送一場不指定1對1約會】");
            $(".modal-wheel-txt").html("讓戀愛顧問為你安排一場完美約會吧❤<br>填寫資料即可領取獎項！愛神來敲門別錯過啦！");
        }else{
            $(".modal-wheel-title").text("你獲得超實用安慰獎!");
            $(".modal-wheel-prize").text("【免費體驗戀愛諮詢乙次】");
            $(".modal-wheel-txt").html("別沮喪，約會專家的線上交友資料庫有數千名優質單身會員！<br>填寫資料即可免費註冊！認識你的Mr/Ms.right！");
        }	
    }

    // 開始按鈕function
    $start.click(function(){        
        if(offOn){
            clearInterval(timer);
            offOn = !offOn;
            $(this).find("img").removeClass("flash");
            $lights.addClass("on");
            $stop.addClass("show");
            $(".blank").addClass("show");
            timer = setInterval(function(){
                    if(speed < 10){
                        speed = speed + 0.2;
                    }else{
                        speed = 10;
                    }
                    if(deg < 360){
                        deg = deg + speed;
                        $turntabl.css( "transform", "rotate(" + deg + "deg)"); 									
                    }else{
                        deg = 0;
                    }								                              
            }, 20)	
        }											
    })

    // 停止按鈕function
    $stop.click(function(){
        if(speed === 10){            
            $(this).removeClass("show");					
            speedDown(angle[setting]);
        }					
    })
}