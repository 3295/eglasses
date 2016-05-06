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
			$('.sex input').val($('.sex a.sel').text());
		})
	},
	'selcity':function(){
		$('form ul').show();
		$('.gray').show();
		$('.gray').click(function(){
			$('ul').hide();
			$(this).hide();
		})
	},
	'selyes':function(a){
		$(a).addClass('sel').siblings().removeClass('sel');
		$(a).parent().siblings('.city').find('span').html($(a).html());
		$(a).parent().hide();
		$('.gray').hide();
		$('.city input').val($('.city span').html());
	}
};
JS.shopaddrpage={
	'radio':function(m){
			if ($(m).hasClass('sel')) return false;
			$(m).addClass('sel').parents('.userinfo').siblings().find('a.radio').removeClass('sel');
	},
	'del':function(m){
		$(m).parents('.userinfo').remove();
	}
	
};
JS.addaddrpage={
	'out':function(){
		$('.gray').hide();
		$('.hidebox').hide();
	},
	'province':function(M){
		if ($(M).parent("li").hasClass('sel')) return false;
		$(M).parent("li").addClass("sel").siblings().removeClass("sel");
		$(M).parents("ul.province").css('width','33%');
		$('ul.province li').css('border-right','1px dotted #efeff4');
		$('ul.down').css({'display':'block','width':'67%'})
		$('ul.county').hide();
	},
	'city':function(M){
		if ($(M).parent().hasClass('sel')) return false;
		$(M).parent().addClass('sel').siblings().removeClass('sel');
		$(M).css("border-bottom","2px solid #b81c22");
		$(M).parents("li").siblings().find("a").css('border-bottom',"none");
		$(M).parents("ul.down").css('width','33%');
		$('ul.down li').css('border-right','1px dotted #efeff4');
		$('ul.county').css({'display':'block','width':'34%'})
	},
	'county':function(M){
		if ($(M).hasClass('sel')) return false;
		$(M).addClass('sel').siblings().removeClass('sel');
	},
	'init':function(){
		$('.useraddr .area').click(function(){
			$('.hidebox').show();
			$('.gray').show();
		});	
		$('.hidebox .btnbox a.sure').click(function(){
			
			if ($('ul.county li').hasClass('sel')) {
				var result='';
				var code='';
				
			var aaa=$('.hidebox .localbox ul li.sel a');
			$.each(aaa,function(i,e){
				result+=$(e).html()+' ';
				code=$(e).attr("tag");
			});
			$(".area input").val(code);
			$('.useraddr .area span').html(result);
			JS.addaddrpage.out();
		}else{
			return false;
		}
			
		});
	}
	
};
JS.mycollectionpage={
	'del':function(a){
		$(a).parents('.collpro').remove();
	}
};
JS.personalcenter={
	'upload_change':function(inp) {
		if ( typeof(FileReader) === 'undefined' ){ 
			alert('不支持！');

		} else{
			var file = inp[0].files[0];
			var reader = new FileReader(); 
			reader.readAsDataURL(file); 
			reader.onload = function(e){ 
				inp.siblings('img').attr('src', this.result);
			} 
		}
	}
}
function promp(tiph,tipc){
	var prompbox="<div class='prompbox' style='z-index:999;width:70%;height:24%;position:fixed;left:15%;top:38%;background:#ffffff;border:1px solid #9a9a9a;'></div>";
	var gray="<div class='gray' style='z-index:998;width:100%;height:100%;position:fixed;left:0px;top:0px;background:#000000;opacity:0.8;'></div>";
	var tipcont="<div class='cont' style='margin:50px 10px;font-size:12px;color:#333333;line-height:18px;overflow:hidden;text-align:center;'>"+tipc+"</div>"
	var tiphead="<div class='tiphead' style='position:absolute;left:0px;top:0px;width:100%;height:40px;border-bottom:1px solid #efeff4'><p style='padding:0px 10px;font-size:12px;color:#000000;line-height:40px;text-align:center;font-weight:bold;'>"+tiph+"</p></div>"
	var tipsurebtn="<div class='surebox' style='width:100%;height:40px;background:#efeff4;position:absolute;bottom:0px;left:0px;'><a onclick='tiphide()' style='display:block;width:60px;height:30px;margin:5px auto;background:#b81c22;color:#ffffff;text-align:center;line-height:30px;border-radius:5px;'>确定</a></div>"
	$('body').append(gray);
	$('body').append(prompbox);
	$('body .prompbox').append(tiphead);
	$('body .prompbox').append(tipsurebtn);
	$('body .prompbox').append(tipcont);
}
function tiphide(){
		$('.prompbox').hide();
		$('.gray').hide();
}
