var actValue = ""; //選人按鈕的值
var step2Value = 0; //選擇2的值
var step3Value = 0; //選擇3的值
var step4Value = 0; //選擇4的值
var step5Value = 0; //選擇5的值
var step6Value = 0; //選擇6的值
var step7Value = 0; //選擇7的值
var total = 0; //總分
var sex = "" //男主或女主
var w = $(window).width(); //取得視窗寬度
var h = $(window).height(); //取得視窗高度
var maleImgSrc = document.querySelectorAll('.male-img'); //選圖
var nextBtn = new TweenMax('.nextBtn', 0.5, {y:10,repeat: -1, yoyo:true,});
var pMessage = new TweenMax('.p-message', 0.5, {y:20,repeat: -1, yoyo:true,});
var dialogText = '';
//手機尺寸 && 問題過長 dialog高度變高
function addHeight(selectorQ){
    if(w < 630 && $(selectorQ).css("display")=='block'){
        var mHeight = $('.dialog-story').height() + $(selectorQ).height() + 50 + "px";
        $('.dialog').animate({height:mHeight});
    }
}
//小手機增高
function addHeight_s(selectorQ){ 
    if(w < 350 && $(selectorQ).css("display")=='block'){
        var mHeight = $('.dialog-story').height() + $(selectorQ).height() + 50 + "px";
        $('.dialog').animate({height:mHeight});
    }
}
// 恢復高度
function restoreHeight(selectorQ){
    if(w < 630 && $(selectorQ).css("display")=='block'){
        $('.dialog').animate({height:"30%"});
    }
}
//填入警告訊息
function insertMessage(Messag){
    $('.message').html(Messag);
};

//首頁LOGO動畫
function loadLogo() {
    TweenMax.set('.logo-first', { autoAlpha: 1 });
    var logoTL = new TimelineMax();
    logoTL.staggerFromTo('.logo-word-rose', 0.6, { opacity:0 }, { opacity:1, ease: Power2.easeOut }, 0.1, "+=0")
    .staggerFromTo('.logo-word-petal', 0.2, { opacity:0 }, { opacity:1, ease: Power2.easeOut }, 0.05, "-=0.6")
    .staggerFromTo('.logo-fill', 0.8, { y: 50 }, { y: 0, ease: Power2.easeOut }, 0.03, "-=1.1")
    .staggerFromTo('.logo-word-cn', 0.8, { y: 50 }, { y: 0, ease: Power2.easeOut }, 0.03, "-=1.1")
};

//左上角LOGO進入畫面動畫
function showLogo() {
    TweenMax.set('.logo-link', { autoAlpha: 1 });
    var logoShow = new TimelineMax();
    logoShow.fromTo('.logo-link', 1, { opacity:0, y: -150 }, { opacity:1, y: 0, ease: Power2.easeOut })
};

//首頁STAGE
function indexStage() {
    TweenMax.set('.index-main', { autoAlpha: 1 });
    var stageA = new TimelineMax();
    stageA.add(loadLogo, "+=0")
    .add(showLogo, "+=1.5")
    .fromTo('.index-bg', 0.1, { "backgroundColor":"#fff" }, { "backgroundColor":"#eac1d7", ease: Power2.easeOut }, "-=0")
    .fromTo('.index-main', 0.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut }, "-=0")
    .fromTo('.title-svg-line', 0.8, { scale: 0.1, opacity: 0}, { scale: 1, opacity: 1, ease: Power2.easeOut }, "-=0")
    .staggerFromTo('.title-svg', 0.5, { scale: 0.1, opacity: 0, y: -80  }, {scale: 1, opacity: 100, y: 0 , ease: Power2.easeOut }, 0.01,"-=0.8")
    .fromTo('.actors', 0.5, {opacity: 0, y: 80 }, {opacity: 1, y: 0, ease: Power2.easeOut }, "-=0.9")
    .fromTo('.index-btn-red', 0.2, {opacity: 0}, {opacity: 1, ease: Power2.easeOut }, "-=1")
    .fromTo('.index-btn-blue', 0.2, {opacity: 0 }, {opacity: 1, ease: Power2.easeOut }, "-=1.1");
    registerWindowOpen();
    registerWindowClose();
};

//跳出視窗填資料-開啟
function registerWindowOpen(){
    var popupBtnOpen = $('#popupBtn');
    var popupAniOpen = new TimelineMax();
    popupBtnOpen.on("click",function(){
        popupAniOpen.fromTo('.register', 0.3, {"visibility":"hidden", opacity: 0}, {"visibility":"visible", opacity: 1, ease: Power2.easeOut }, "-=0.1")
        .fromTo('.register-box', 0.3, { opacity:0, y:-150 }, {opacity:1, y:0, ease: Power2.easeOut}, "-=0.1")
    });
}
//跳出視窗填資料-關閉
function registerWindowClose(){
    var popupBtnClose = $('.btn-close');
    var popupAniClose = new TimelineMax();
    popupBtnClose.on("click",function(){
        popupAniClose.fromTo('.register-box', 0.2, { opacity:1, y:0 }, {opacity:0, y:-150, ease: Power2.easeOut}, "=0")
        .fromTo('.register', 0.2, {"visibility":"visible", opacity: 1}, {"visibility":"hidden", opacity: 0, ease: Power2.easeOut }, "-=0.1");        
    });
    $('.register').on("click",function(){
        popupAniClose.fromTo('.register-box', 0.2, { opacity:1, y:0 }, {opacity:0, y:-150, ease: Power2.easeOut}, "=0")
        .fromTo('.register', 0.2, {"visibility":"visible", opacity: 1}, {"visibility":"hidden", opacity: 0, ease: Power2.easeOut }, "-=0.1"); 
    });
    $('.register-box').on("click",function(e){
        e.stopPropagation();
    })
}

//遊戲開始 (start)
function start(){
    TweenMax.set('.play-select', { autoAlpha: 1 });
    var stage_A = new TimelineMax();
    stage_A.to('.stageSP', 0.8, {opacity:1},"+=0")
    .add(showLogo, "+=0")
    .fromTo('.dialog', 0.3, {opacity:0},{opacity:1, ease: Power2.easeInOut},"-=0")
    .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")    
    .to('.dialog-story', 3, {text:"你進入到約會專家網站，看起來好像不錯！在眾多會員裡面，你看見了三位會員，你對哪位有興趣呢？", ease:Linear.easeNone})
    .staggerFromTo('.select', 0.6, {opacity:0, rotationY:90}, {opacity:1, rotationY:0, ease: Power2.easeOut}, 0.2, "-=0")
    .to('.stageSP', 0, {"display":"none"},"+=0")
    .add(choose, "+=0");
}

//選人及下一步
function choose(){   
    $(".btn-choose").each(function() {
        $(this).click(function(){
            $(".btn-choose").off("click");
            actValue =  $(this).val();
            var step2 = new TimelineMax();
            step2.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
            .to('.dialog-story', 0.3, {text:" ", ease:Linear.easeNone})
            .to('.dialog-story', 1.5, {text:"你選擇了"+actValue+"，恭喜您，真是不錯的選擇。", ease:Linear.easeNone})                     
            .set('.stageB', {opacity:1, "display":"block"},"+=1.2")
            .to('.play-select', 0.5, {opacity:0},"-=0")
            .set('.play-select', {"display":"none"},"-=0")
            .to('.dialog-story', 0.2, {text:" ", ease:Linear.easeNone},"+=0.3")
            .to('.dialog-story', 1.2, {text:"利用約會專家功能，向對方發出邀約！", ease:Linear.easeNone})
            .to('.nextBtn', 0.2, {opacity:1, "display":"block"},"+=0")
            .add(nextBtnPlay, "+=0")
           });
    });       
}

//按鈕下一步劇情
function nextBtnPlay(){
    var toStep2 = function(){
        $("body").off("keyup");
        var nextDialog = new TimelineMax();
        nextDialog.to('.nextBtn', 0.1, {opacity: 0, "display":"none", ease: Power2.easeOut },"-=0")
        .to('.dialog-story', 0.2, {text:" ", ease:Linear.easeNone},"-=0")
        .to('.dialog-story', 1.2, {text:"對方答應邀約！你們將於下禮拜天進行一對一約會！", ease:Linear.easeNone},"-=0")
        .to('.dialog-story', 0.2, {text:" ", ease:Linear.easeNone},"+=1.2")
        .to('.dialog-story', 3, {text:"就要展開和對方的第一次約會了，你有些緊張又期待，想了想，是不是該在約會前做點什麼呢？", ease:Linear.easeNone},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.q2', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "+=0")
        .addCallback(addHeight,"-=0", [".q2"])
        .add(nextBtnStep3, "+=0")
    }
    $("body").keyup(function(){
        toStep2();
    });
    $(".nextBtn").click(function(){        
        toStep2();
    });
} 

//選擇2按鈕按下事件 (進入step3)
function nextBtnStep3(){
    $('.nextBtn').off("click");
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q2"); 
            $(".choose-block-btn").off("click");
            step2Value =  $(this).val();
            var step3 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step3.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3.3, {text:"前一天晚上，你想排除緊張心情，決定和朋友去喝一杯，雖然好像沒那麼緊張了，但因為不小心，喝多了，頭有點痛。", ease:Linear.easeNone},"+=0")
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.frown', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut },"+=0")
                .addCallback(insertMessage,"-=4", ["約會準備-1"])
                .to('.frown', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep4, "-=0.5")
            } else if($(this).attr("name") == "B"){
                step3.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3.5, {text:"約會專家諮商心理師 瑪那熊文章裡說到：外在形象包括：穿著、容貌、氣色、膚質等..最基礎也最有即時效果的，就是穿著！", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=1.2")
                .to('.dialog-story', 1.4, {text:"一套適合衣服，除了提升吸引力和自信，取得互動門票並持續展現優點唷！", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep3_1, "-=0.5")
            } else{
                step3.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3.2, {text:"準備充足後，保持良好心情放鬆也很重要！才能保有好氣色，精神良好，更能約會順利！你決定早早入睡休息。", ease:Linear.easeNone},"+=0")
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.8")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut },"+=0")
                .addCallback(insertMessage,"-=4", ["約會準備充足度+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep4, "-=0.5")
            }
        });
    });
}

//進入step3_1
function nextBtnStep3_1(){    
    $('.main-actor').attr("src","img/" + sex + "-" + actValue + ".png");
    $('.nextBtn').click(function(){       
        toStep3_1();
    });
    $("body").keyup(function(){
        toStep3_1();
    });
    function toStep3_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step3_1 = new TimelineMax();
        step3_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.1, {text:"你打開衣櫃，挑選到了一套適合自己的衣服。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut },"+=0")
        .addCallback(insertMessage,"-=4", ["約會準備充足度+1"])
        .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")                
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep4, "-=0.5")
    }
}

//進入step4
function nextBtnStep4(){    
    $('.main-actor').attr("src","img/" + sex + "-" + actValue + ".png");
    $('.nextBtn').click(function(){       
        toStep4();
    });
    $("body").keyup(function(){
        toStep4();
    });
    function toStep4(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step4 = new TimelineMax();
        step4.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .set('.main-actor', {opacity:0},"-=1")
        .set('.overlay', {opacity:0},"-=1")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"終於來到約會這天！你走進顧問們安排的排約室", ease:Linear.easeNone},"+=0")
        .to('.stageC', 0.9, {opacity:1, "display":"block", ease: Power1.easeInOut},"+=1")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep5, "-=0.5")
    }
}

//進入step5
function nextBtnStep5(){
    $(".nextBtn").click(function(){
        toStep5();
    });
    $("body").keyup(function(){
        toStep5();
    });
    function toStep5(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step5 = new TimelineMax();
        step5.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 0.6, {text:"對方已經來了。", ease:Linear.easeNone},"+=0")
        .fromTo('.main-actor', 0.5, {opacity:0, y:100}, {opacity:1, y:0, ease: Power1.easeInOut},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep6, "-=0.5")
    }
}

//進入step6
function nextBtnStep6(){
    $(".nextBtn").click(function(){
        toStep6();
    });
    $("body").keyup(function(){
        toStep6();
    });
    function toStep6(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step5 = new TimelineMax();
        step5.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"你們和雙方簡單的打了個招呼和介紹，感覺一切都滿不錯的。", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep7, "-=0.5")
    }
}

//進入step7 + 選擇3
function nextBtnStep7(){    
    $(".nextBtn").click(function(){
        toStep7();
    });
    $("body").keyup(function(){
        toStep7();
    });
    function toStep7(){        
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step7 = new TimelineMax();
        step7.set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q2', { "display":"none", opacity:0}, "-=0")
        .to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"你們兩個人剛見面，你打算用什麼來開場？", ease:Linear.easeNone},"+=0")
        .to('.q3', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "-=0")
        .addCallback(addHeight,"-=0", [".q3"])
        .add(nextBtnStep8, "+=0")
    }
}

//進入step8
function nextBtnStep8(){
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q3"); 
            $(".choose-block-btn").off("click");
            step3Value =  $(this).val();
            var step8 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step8.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.2, {text:"你：「你一個月薪水多少？」", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=1.2")
                .to('.dialog-story', 1.5, {text:"「.......」", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=1.5")
                .to('.dialog-story', 1, {text:"突然，有點尷尬", ease:Linear.easeNone},"+=0")           
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.frown', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["約會對象怒氣值+1"])
                .to('.frown', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep9, "+=0")
            } else if($(this).attr("name") == "B"){
                step8.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.2, {text:"你：「你平常假日會做些什麼呢？我喜歡攝影，沒事拍拍照..」", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=1")
                .to('.dialog-story', 1.2, {text:"對方：「你喜歡攝影嗎？我也是耶..」", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=1")
                .to('.dialog-story', 2, {text:"沒想到對方對攝影也滿有興趣的，你們聊到了之前拍照的經驗，覺得很愉快。", ease:Linear.easeNone},"+=0")           
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["彼此親近感+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep9, "+=0")
            } else{
                step8.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3.2, {text:"從進來的時候，你就覺得對方的打扮很用心，似乎也很重視這次的約會，你適度的表達了你的讚美，對方看起來滿開心的。", ease:Linear.easeNone},"+=0")        
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["對方好感+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep9, "+=0")
            }
        });
    });
}

//進入step9
function nextBtnStep9(){    
    $(".nextBtn").click(function(){
        toStep9();
    });
    $("body").keyup(function(){
        toStep9();
    });
    function toStep9(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step9 = new TimelineMax();
        step9.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .set('.overlay', {opacity:0},"-=0.1")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"叩叩！突然，門輕輕敲了一下", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep10, "+=0")
    }
}

//進入step10
function nextBtnStep10(){
    $('.nextBtn').click(function(){
        toStep10();
    });
    $("body").keyup(function(){
        toStep10();
    });
    function toStep10(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step10 = new TimelineMax();
        step10.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"原來是顧問姊姊送來了進來時點的飲料。", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep11, "+=0")
    }
}

//進入step11
function nextBtnStep11(){
    $(".nextBtn").click(function(){
        toStep11();
    });
    $("body").keyup(function(){
        toStep11();
    });
    function toStep11(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step11 = new TimelineMax();
        step11.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"對方點了一杯拿鐵，你自己點了一杯奶茶。", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep12, "+=0")
    }
}

//進入step12 + 選擇4
function nextBtnStep12(){   
    $(".nextBtn").click(function(){
        toStep12();
    });
    $("body").keyup(function(){
        toStep12();
    });
    function toStep12(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step12 = new TimelineMax();
        step12.set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q3', { "display":"none", opacity:0}, "-=0")
        .to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"顧問姐姐替你把飲料放在桌上，此時你會？", ease:Linear.easeNone},"+=0")
        .to('.q4', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "-=0")
        .addCallback(addHeight_s,"-=0", [".q4"])
        .add(nextBtnStep13, "+=0")
    }
}

//進入step13
function nextBtnStep13(){
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q4"); 
            $(".choose-block-btn").off("click");
            step4Value =  $(this).val();
            var step13 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step13.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.1, {text:"你和顧問姐姐簡單地說聲謝謝。", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0.6")
                .to('.dialog-story', 0.8, {text:"對方：「：)」", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0.6")
                .to('.dialog-story', 1, {text:"對方覺得你似乎是個不錯的人。", ease:Linear.easeNone},"+=0")           
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["對方好感+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep13_1, "+=0")
            } else{
                step13.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.5, {text:"你持續和對方聊天，什麼事也沒發生。", ease:Linear.easeNone},"+=0")        
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep13_1, "+=0")
            }
        });
    });
}

//進入step13_1
function nextBtnStep13_1(){
    $(".nextBtn").click(function(){
        toStep13_1();
    });
    $("body").keyup(function(){
        toStep13_1();
    });
    function toStep13_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step13_1 = new TimelineMax();
        step13_1.set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q4', { "display":"none", opacity:0}, "-=0")
        .to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .set('.overlay', {opacity:0},"-=0.1")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 3, {text:"今天約會的時間也差不多了，你們對彼此有了初步了解，也加了line，相約改天可以再出去，你覺得好像不錯呢！", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep14, "+=0")
    }
}

//進入step14
function nextBtnStep14(){
    $(".nextBtn").click(function(){
        toStep14();
    });
    $("body").keyup(function(){
        toStep14();
    });
    function toStep14(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step14 = new TimelineMax();
        step14.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .set('.stageB', {opacity:1, "display":"block"},"-=0")
        .fromTo('.main-actor', 0.5, {opacity:1, y:0}, {opacity:0, y:50, ease: Power1.easeInOut},"+=0")
        .to('.overlay', 0.3, {opacity:1},"-=0")
        .to('.stageC', 0.5, {opacity:0, "display":"none"},"+=0.6")
        .to('.overlay', 0.3, {opacity:0},"+=0.6")
        .to('.dialog-story', 0.6, {text:"幾天後。", ease:Linear.easeNone},"+=0.3")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep15, "+=0")
    }
}

//進入step15
function nextBtnStep15(){
    $(".nextBtn").click(function(){
        toStep15();
    });
    $("body").keyup(function(){
        toStep15();
    });
    function toStep15(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step15 = new TimelineMax();
        step15.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.dialog-story', 2.4, {text:"這天你下班回家，打開了line，想想加line幾天了，卻感覺到對方回話越來越消極，此時你會？", ease:Linear.easeNone},"+=0")
        .set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q4', { "display":"none", opacity:0}, "-=0")        
        .to('.q5', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "-=0")
        .addCallback(addHeight,"-=0", [".q5"])
        .add(nextBtnStep16, "+=0")
    }
}

//進入step16
function nextBtnStep16(){
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q5"); 
            $(".choose-block-btn").off("click");
            step5Value =  $(this).val();
            var step16 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step16.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 4.5, {text:"你重新檢視了下自己和對方的對話，發現自己常常使用問答式對話，兩人的對話實在有點像快問快答。決定改變方式，在想要了解對方同時也加入自己經驗、感受的分享，漸漸地讓彼此更靠近。", ease:Linear.easeNone},"+=0")
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["戀愛溫度+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep17, "+=0")
            } else if($(this).attr("name") == "B"){
                step16.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 4.5, {text:"你實在搞不清楚為什麼？尋求他人協助，發現自己常常使用問答式對話，兩人的對話實在有點像快問快答。決定改變方式，在想要了解對方同時也加入自己經驗、感受的分享，漸漸地讓彼此更靠近。", ease:Linear.easeNone},"+=0")
                .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
                .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
                .addCallback(insertMessage,"-=4", ["戀愛溫度+1"])
                .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep17, "+=0")                       
            } else{
                step16.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 4.5, {text:"你看了下自己的對話，發現自己line對方的頻率似乎有點太高了，常常對方還沒回覆時，又忍不住多傳很多訊息及貼圖..你決定降低頻率，多給對方一點空間。", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep16_1, "+=0")  
            }
        });
    });
}

//分支step16-1
function nextBtnStep16_1(){
    $(".nextBtn").click(function(){
        toStep16_1();
    });
    $("body").keyup(function(){
        toStep16_1();
    });
    function toStep16_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step16_1 = new TimelineMax();
        step16_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 0.6, {text:"對方的回應變回積極一些了。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {"display":"block", opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
        .addCallback(insertMessage,"-=4", ["戀愛智慧+1"])
        .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep17, "+=0")
    }
}

//進入step17
function nextBtnStep17(){    
    $(".nextBtn").click(function(){
        toStep17();
    });
    $("body").keyup(function(){
        toStep17();
    });
    function toStep17(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step17 = new TimelineMax();
        step17.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .set('.overlay', {opacity:0},"-=0.1")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.dialog-story', 4.2, {text:"這經過上次改變之後，你們慢慢熱絡了起來！對方對你印象也許還可以？距離上次見面也有一陣子了！你們想約出來一起去看電影，你決定要看什麼電影呢？", ease:Linear.easeNone},"+=0")
        .set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q5', { "display":"none", opacity:0}, "-=0")        
        .to('.q6', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "-=0")
        .addCallback(addHeight,"-=0", [".q6"])
        .add(nextBtnStep18, "+=0")
    }
}

//進入step18
function nextBtnStep18(){    
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q6");          
            $(".choose-block-btn").off("click");
            step6Value =  $(this).val();
            var step18 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step18.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3, {text:"你選了最近廣告熱播的恐怖驚悚片，覺得這樣的緊張刺激能讓兩人靠的更近，並告訴對方你想看這部。", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep18_1, "+=0")
            } else if($(this).attr("name") == "B"){
                step18.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.6, {text:"你選了最近超火紅、熱度超高的電影大作，然後告訴對方你想看這部。", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep18_1, "+=0")                       
            } else{
                step18.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 3.2, {text:"你想了想，雖然有些名單，但還是想看看對方的喜好，你們選擇了似乎有點冷門，但意外兩人都很感興趣的電影！", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep18_2, "+=0")  
            }
        });
    });
}

//分支step18_1
function nextBtnStep18_1(){
    $(".nextBtn").click(function(){
        toStep18_1();
    });
    $("body").keyup(function(){
        toStep18_1();
    });
    function toStep18_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step18_1 = new TimelineMax();
        step18_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 2.9, {text:"對方訊息慢了一兩分鐘才回覆，似乎有些遲疑？但還是答應了，你們約好週末的時候一起去看電影。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.frown', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
        .addCallback(insertMessage,"-=4", ["愛情契合度-1"])
        .to('.frown', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep19, "+=0")
    }
}

//分支step18_2
function nextBtnStep18_2(){
    $(".nextBtn").click(function(){
        toStep18_2();
    });
    $("body").keyup(function(){
        toStep18_2();
    });
    function toStep18_2(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step18_2 = new TimelineMax();
        step18_2.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"你們約好週末的時候一起去看電影。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
        .addCallback(insertMessage,"-=4", ["愛情契合度+1"])
        .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep19, "+=0")
    }
}

//進入step19
function nextBtnStep19(){    
    $(".nextBtn").click(function(){
        toStep19();
    });
    $("body").keyup(function(){
        toStep19();
    });
    function toStep19(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step19 = new TimelineMax();
        step19.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")        
        .to('.stageD', 0.6, {opacity:1, "display":"block"},"+=0")        
        .to('.overlay', 0.3, {opacity: 0, ease: Power1.easeInOut },"+=0.6")      
        .fromTo('.main-actor', 0.5, {opacity:0, y:50}, {opacity:1, y:0, ease: Power1.easeInOut},"+=0")  
        .to('.dialog-story', 2.5, {text:"你終於來到約會這天啦，這是你們的第二次約會，但已更加熟悉親近了一點，你的心情也不錯。", ease:Linear.easeNone},"+=1")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep20, "+=0")
    }
}

//進入step20
function nextBtnStep20(){    
    $(".nextBtn").click(function(){
        toStep20();
    });
    $("body").keyup(function(){
        toStep20();
    });
    function toStep20(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step20 = new TimelineMax();
        step20.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 3.4, {text:"離電影開場還有一段時間，對方先去買票，你看了下周遭人群，有許多情侶來來往往，你真希望，有一天擁有一段穩定的關係…", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep21, "+=0")
    }
}

//進入step21
function nextBtnStep21(){    
    $(".nextBtn").click(function(){
        toStep21();
    });
    $("body").keyup(function(){
        toStep21();
    });
    function toStep21(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step21 = new TimelineMax();
        step21.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 0.7, {text:"對方：「我好了。」", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep22, "+=0")
    }
}

//進入step22
function nextBtnStep22(){    
    $(".nextBtn").click(function(){
        toStep22();
    });
    $("body").keyup(function(){
        toStep22();
    });
    function toStep22(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step22 = new TimelineMax();
        step22.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .fromTo('.popup', 0.25, {scale:0}, {scale:1, ease: Bounce.easeInOut},"-=0")
        .to('.dialog-story', 1.2, {text:"回過神來，對方已經買好票了回來了，你會？", ease:Linear.easeNone},"+=0")
        .set('.choose-block-btn', { opacity:1, "display":"block"},"-=0")
        .set('.q6', { "display":"none", opacity:0}, "-=0")        
        .to('.q7', 0.3, { "display":"block", opacity:1, ease: Power2.easeOut}, "-=0")
        .addCallback(addHeight_s,"-=0", [".q7"])
        .add(nextBtnStep23, "+=0")
    }
}

//進入step23
function nextBtnStep23(){
    $(".choose-block-btn").each(function(){
        $(this).click(function(){
            restoreHeight(".q7"); 
            $(".choose-block-btn").off("click");
            step7Value =  $(this).val();
            var step23 = new TimelineMax();
            if($(this).attr("name") == "A"){
                step23.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 0.9, {text:"你準備支付自己的電影票錢，", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep23_1, "+=0")                  
            } else{
                step23.to('.popup', 0.25, {scale:0, ease: Bounce.easeInOut},"-=0")
                .to('.choose-block-btn', 0.3, { opacity:0, "display":"none", ease: Power2.easeOut},"-=0")
                .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
                .to('.dialog-story', 1.5, {text:"你接下了對方買好了電影票，若無其事地準備和對方進影廳", ease:Linear.easeNone},"+=0")
                .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
                .add(nextBtnStep23_2, "+=0")  
            }
        });
    });
}

//分支step23_1
function nextBtnStep23_1(){
    $(".nextBtn").click(function(){
        toStep23_1();
    });
    $("body").keyup(function(){
        toStep23_1();
    });
    function toStep23_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step23_1 = new TimelineMax();
        step23_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"對方：「不用啦，你幫我選點吃的東西吧^^！」", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep23_1_1, "+=0")
    }
}

//分支step23_1_1
function nextBtnStep23_1_1(){
    $(".nextBtn").click(function(){
        toStep23_1_1();
    });
    $("body").keyup(function(){
        toStep23_1_1();
    });
    function toStep23_1_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step23_1_1 = new TimelineMax();
        step23_1_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 2.2, {text:"一直來來往往也很尷尬，於是你決定買兩人都喜歡吃的東西，一起進了電影院。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.smile', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
        .addCallback(insertMessage,"-=4", ["對方好感+1"])
        .to('.smile', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep24, "+=0")
    }
}

//分支step23_2
function nextBtnStep23_2(){
    $(".nextBtn").click(function(){
        toStep23_2();
    });
    $("body").keyup(function(){
        toStep23_2();
    });
    function toStep23_2(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step23_2 = new TimelineMax();
        step23_2.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.5, {text:"對方：「........」", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep23_2_1, "+=0")
    }
}

//分支step23_2_1
function nextBtnStep23_2_1(){
    $(".nextBtn").click(function(){
        toStep23_2_1();
    });
    $("body").keyup(function(){
        toStep23_2_1();
    });
    function toStep23_2_1(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step23_2_1 = new TimelineMax();
        step23_2_1.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"兩人一起進了影廳。", ease:Linear.easeNone},"+=0")
        .to('.overlay', 0.3, {opacity: 1, ease: Power1.easeInOut },"+=0.6")
        .to('.frown', 0.3, {"display":"block", opacity: 1, ease: Bounce.easeInOut},"+=0")
        .addCallback(insertMessage,"-=4", ["對方好感-1"])
        .to('.frown', 0.2, {"display":"none", opacity: 0, ease: Bounce.easeInOut},"+=2")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep24, "+=0")
    }
}

//進入step24
function nextBtnStep24(){    
    $(".nextBtn").click(function(){
        toStep24();
    });
    $("body").keyup(function(){
        toStep24();
    });
    function toStep24(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step24 = new TimelineMax();
        step24.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .set('.overlay', {opacity:0},"-=0.1")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.stageE', 0.6, {opacity:1, "display":"block"},"+=0") 
        .to('.dialog-story', 2.7, {text:"你們找到位子後坐了下來。劇情描述一對男女從相遇到分離，再遇見、結婚中間十餘年的日子…", ease:Linear.easeNone},"+=0.6")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep25, "+=0")
    }
}

//進入step25
function nextBtnStep25(){    
    $(".nextBtn").click(function(){
        toStep25();
    });
    $("body").keyup(function(){
        toStep25();
    });
    function toStep25(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step25 = new TimelineMax();
        step25.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"搖曳光影、溫暖氣氛中，你不禁覺得動容。", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep26, "+=0")
    }
}

//進入step26
function nextBtnStep26(){    
    $(".nextBtn").click(function(){
        toStep26();
    });
    $("body").keyup(function(){
        toStep26();
    });
    function toStep26(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step26 = new TimelineMax();
        step26.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.2, {text:"隨著時間流逝，電影也緩緩結束了，你和對方道別。", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep27, "+=0")
    }
}

//進入step27
function nextBtnStep27(){    
    $(".nextBtn").click(function(){
        toStep27();
    });
    $("body").keyup(function(){
        toStep27();
    });
    function toStep27(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step27 = new TimelineMax();
        step27.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .fromTo('.main-actor', 1.2, {opacity:1, y:0}, {opacity:0, y:50, ease: Power1.easeInOut},"+=0") 
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.stageF', 0.6, {opacity:1, "display":"block"},"+=0") 
        .to('.dialog-story', 1.8, {text:"回憶今天的約會。你自己覺得和對方的發展還不錯，也希望能繼續下去……", ease:Linear.easeNone},"+=0.8")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep28, "+=0")
    }
}

//進入step28
function nextBtnStep28(){    
    $(".nextBtn").click(function(){
        toStep28();
    });
    $("body").keyup(function(){
        toStep28();
    });
    function toStep28(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step28 = new TimelineMax();
        step28.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 0.3, {text:"！！！", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep29, "+=0")
    }
}

//進入step29
function nextBtnStep29(){    
    $(".nextBtn").click(function(){
        toStep29();
    });
    $("body").keyup(function(){
        toStep29();
    });
    function toStep29(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step29 = new TimelineMax();
        step29.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 1.3, {text:"男男女女，戀愛約會情況百百種，你想的，真的和實際情況一樣嗎？", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep30, "+=0")
    }
}

//進入step30
function nextBtnStep30(){    
    $(".nextBtn").click(function(){
        toStep30();
    });
    $("body").keyup(function(){
        toStep30();
    });    
    function toStep30(){
        $('.nextBtn').off("click");
        $("body").off("keyup");
        var step30 = new TimelineMax();
        step30.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
        .to('.dialog-story', 0.2, {text:"", ease:Linear.easeNone},"+=0")
        .to('.dialog-story', 3, {text:"魔鬼出在細節裡！約會專家愛情實驗室，來幫你檢視看看，和他的認識，你的約會表現如何？", ease:Linear.easeNone},"+=0")
        .to('.nextBtn', 0.1, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
        .add(nextBtnStep31, "+=0")
    }
}

//計算總分跟評比
function calcTotal(){ 
    total = parseInt(step2Value) + parseInt(step3Value) + parseInt(step4Value) + parseInt(step5Value) + parseInt(step6Value) + parseInt(step7Value);
    return total;   
}
//再玩一次
(function(){
    $(".btn-again").click(function(){
        window.location.reload();
    });
}());

//結果頁
function nextBtnStep31(){
    calcTotal();
    $(".nextBtn").click(function(){
        toStep31();
    });
    $("body").keyup(function(){
        toStep31();
    });
    function toStep31(){
        $('.nextBtn').off("click");
        $("body").off("keyup"); 
        var step31 = new TimelineMax();
        if(total == 6){                      
            step31.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
            .to('.dialog', 0.2, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
            .to('.result', 0.2, {"display":"block", opacity:1, ease: Power1.easeInOut},"-=0.1")
            .set('.result-body-qualified',{"display":"block"},"+=0.1");
            // 呼叫 member_check 來紀錄統計數字
            $.ajax({ method: "POST", url: "index.asp", data: {st:"member_check", v: "1"} });
        } else{
            step31.to('.nextBtn', 0.1, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
            .to('.dialog', 0.2, {"display":"none", opacity:0, ease: Power1.easeInOut},"+=0")
            .to('.result', 0.2, {"display":"block", opacity:1, ease: Power1.easeInOut},"+=0")
            .set('.result-body-not-qualified',{"display":"block"},"-=0.1");
            // 呼叫 member_check 來紀錄統計數字
            $.ajax({ method: "POST", url: "index.asp", data: {st:"member_check", v: "0"} });
        }
    }
}



