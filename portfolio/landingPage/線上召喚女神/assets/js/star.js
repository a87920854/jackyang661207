			var cols = ['#fff5d2','#b4f0ee','#aaf8df','#ececec','#ecf0f1','#e6effd'];
			var stars = 250;

			for (var i = 0; i <= stars; i++) {

			  var size = Math.random()*3;
			  var color = cols[parseInt(Math.random()*4)];

				$('#starsBox').prepend('<span style=" width: ' + size + 'px; height: ' + size + 'px; top: ' + Math.random()*100 + '%; left: ' + Math.random()*100 + '%; background: ' + color + '; box-shadow: 0 0 '+ Math.random()*10 +'px' + color + ';"></span>') ;
			};

			setTimeout(function(){ 
				$('#starsBox span').each(function(){  
			 		$(this).css('top', Math.random()*95 + '%').css('left', Math.random()*95 + '%'); 
			  });
			}, 1);

			setInterval(function(){ 
				$('#starsBox span').each(function(){  	
			 		$(this).css('top', Math.random()*95 + '%').css('left', Math.random()*95 + '%'); 
			  });
			}, 100000);