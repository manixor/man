(function($) {
	$('#sdt_menu > li').bind('mouseenter',function(){
		var $elem = $(this);
		$elem.find('img')
			 .stop(true)
			 .animate({
				'width':'170px', /*pic w*/
				'height':'100px', /*pic h*/
				'left':'0px'  /* picture place*/
			 },400,'easeOutBack') /*spead and form*/
			 .andSelf()
			 .find('.sdt_wrap')
		     .stop(true)
			 .animate({'top':'140px'},500,'easeOutBack')
			 .andSelf()
			 .find('.sdt_active')
		     .stop(true)
			 .animate({'height':'140px'},300,function(){
			var $sub_menu = $elem.find('.sdt_box');
			if($sub_menu.length){
				var left = '-170px';  /*diff on left - open only on ;eft*/
				if($elem.parent().children().length == $elem.index()+3) /*3 - galerie_foto*/
					left = '-170px';
				$sub_menu.show().animate({'left':left,'top':'0px'},200);
			}	
		});
		}).bind('mouseleave',function(){
			var $elem = $(this);
			var $sub_menu = $elem.find('.sdt_box');
			if($sub_menu.length)
				$sub_menu.hide().css('left','0px');
			
			$elem.find('.sdt_active')
				 .stop(true)
				 .animate({'height':'0px'},300)
				 .andSelf().find('img')
				 .stop(true)
				 .animate({
					'width':'0px',
					'height':'0px',
					'left':'85px'},400)
				 .andSelf()
				 .find('.sdt_wrap')
				 .stop(true)
				 .animate({'top':'5px'},500);
		});
	
//		//ajax for menu 
		function prepareSlideShow(){
			VisualSlideShow({
				"duration" : 3400,
				"delay" : 700,
				"sound" : "audio/0082. Kelly Family - An Angel.mp3",
				"id" : "show",
				"width" : 900,
				"height" : 620,
				"captions" : false,
				"controller" : false,
				"thumbnails" : false,
				"loop" : true,
				"paused" : false,
				"effect" : "KenBurns"
			});
		}
		var hash = window.location.hash.substr(1);
		var href = $('#sdt_menu li a').each(function(){
			href = $(this).attr('href');
			if(hash==href.substr(0,href.length-5)){
				var toLoad = hash+'.html #myBody';
//				alert('Ajax toLoad: ' + toLoad);
				$('#myBody').load(toLoad);
				if (hash == "index"){
					prepareSlideShow();
				}
			}											
		});
		
		$('#sdt_menu li a').click(function(e){
									  
			var toLoad = $(this).attr('href')+' #myBody';
//			$('#myBody').hide('fast',loadmyBody);
			$('#myBody').empty();
			
			$('#load').remove();
			$('#wrapper').append('<span id="load">LOADING...</span>');
			$('#load').fadeIn('normal');
			window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
			loadmyBody();
			function loadmyBody() {
				$('#myBody').load(toLoad,'',showNewmyBody());
//				alert("loadmyBody");
			}
			function showNewmyBody() {
				$('#myBody').show('normal',hideLoader());
//				alert("showNewmyBody");
			}
			function hideLoader() {
				$('#load').fadeOut('normal');
//				alert("hideLoader");
			}
			var hash = window.location.hash.substr(1);
			if (hash == "index" || hash == "galerie_foto" || hash == "galerie_video" || hash == "contact"){
				prepareSlideShow();
			}else{
				e.preventDefault();
			}
			//return false;
		});
		$("#menu_entry").hide();
		$('.pachete_menu').live("click", function(){
			var id = $(this).attr('id');
			if ( id.search('-') == -1){
				$("#pachete_content").load('pachete/'+id+'.html');
//				$('.pachete_menu').each(function(){
//					$(this).show();
//				});
//				$("#"+id).hide();
			}
			
		});
		$('.pachete_menu').
			live("mouseover", function(){
				var src = $(this).children().attr("src");
				var newsrc = src.replace(".jpg", "MO.jpg");
				$(this).children().attr("src", newsrc);
				
			})
			.live("mouseout", function(){
				var src = $(this).children().attr("src");
				var newsrc = src.replace("MO.jpg", ".jpg"); 
				$(this).children().attr("src", newsrc);
			});
})(jQuery);