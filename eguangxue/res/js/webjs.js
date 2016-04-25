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