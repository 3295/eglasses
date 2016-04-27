var JS={};
JS.indexpage={
	'init':function(){
		if($("#slide_01")){
			var W = $('body').width();
			$('.mod_01').width(W);
			$('.mod_01 img').width(W);
			var slide_01 = new ScrollPic();
			slide_01.scrollContId   = "slide_01"; //内容容器ID
			slide_01.dotListId      = "slide_01_dot";//点列表ID
			slide_01.dotOnClassName = "selected";
			slide_01.arrLeftId      = "sl_left"; //左箭头ID
			slide_01.arrRightId     = "sl_right";//右箭头ID
			slide_01.frameWidth     = W;
			slide_01.pageWidth      = W;
			slide_01.upright        = false;
			slide_01.speed          = 10;
			slide_01.space          = 30; 
			slide_01.initialize(); //初始化
			var dn = $('.dotModule_new');
			dn.css('right', (W-dn.width())/2);
		}
	}
};
JS.appointmentpage={
	'init':function(){
		$('.appointmentpage form .sex a').click(function(){
			if ($(this).hasClass('sel')) {
				return false;
			}else{
				$(this).addClass('sel').siblings().removeClass('sel');
			}
		})
	}
}
JS.loginpage={
	'init':function(){
	}
}
JS.shopaddrpage={
	'init':function(){
		$('.userinfo .editor a.radio').click(function(){
			if ($(this).hasClass('sel')) return false;
			$(this).addClass('sel').parents('.userinfo').siblings().find('a.radio').removeClass('sel');
 		})
		$('.userinfo .editor a.del').click(function(){
			$(this).parents('.userinfo').remove();
		})
	}
}
JS.addaddrpage={
	'out':function(){
		$('.gray').hide();
		$('.hidebox').hide();
	},
	'init':function(){
		$('.useraddr .area').click(function(){
			$('.hidebox').show();
			$('.gray').show();
		})
		$('.hidebox .localbox ul.province li').click(function(){
			if ($(this).hasClass('sel')) return false;
			$(this).addClass('sel').siblings().removeClass('sel');
			$(this).parent().css('width','33%');
			$('ul.province li').css('border-right','1px dotted #efeff4');
			$('ul.down').css({'display':'block','width':'67%'})
			$('ul.county').hide();
		})
		$('.hidebox .localbox ul.down li').click(function(){
			if ($(this).hasClass('sel')) return false;
			$(this).addClass('sel').siblings().removeClass('sel');
			$(this).parent().css('width','33%');
			$('ul.down li').css('border-right','1px dotted #efeff4');
			$('ul.county').css({'display':'block','width':'34%'})
		})
		$('.hidebox .localbox ul.county li').click(function(){
			if ($(this).hasClass('sel')) return false;
			$(this).addClass('sel').siblings().removeClass('sel');
		})
		$('.hidebox .btnbox a.sure').click(function(){
			if ($('ul.county li').hasClass('sel')) {
				var result='';
			var aaa=$('.hidebox .localbox ul li.sel a');
			$.each(aaa,function(i,e){
				result+=$(e).html()+' ';
			})
			$('.useraddr .area span').html(result);
			JS.addaddrpage.out();
		}else{
			return false;
		}
			
		})
	}
}