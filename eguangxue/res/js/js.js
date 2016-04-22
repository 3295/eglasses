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
var width=0;
JS.prolistpage = {
	'currpage':1,	//当前页码 默认1
	'init':function(opt){
		if(typeof(opt)=='undefined') opt = {};
		if(!opt.ptype) opt.ptype = '';
		var imgs = $(".prolistpage ul.probox li a .img");
		imgs.height(imgs.width());
		width=imgs.width();
		var dropload = $('.inner').dropload({
		    domUp : {
		        domClass   : 'dropload-up',
		        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
		        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
		        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    },
		    domDown : {
		        domClass   : 'dropload-down',
		        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
		        domUpdate  : '<div class="dropload-update">↓释放加载</div>',
		        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    },
		    loadUpFn : function(me){
		        $.ajax({
		            type: 'GET',
		            url: opt.path+'/product/index_ajax.htm',
		            data:{
		            	'ptype':opt.ptype,
		            	'currpage':JS.prolistpage.currpage=1
		            },
		            dataType: 'json',
		            success: function(data){
		                var result = '';
		                $.each(data.product,function(i,e){
		                	result+="<li><a href='"+opt.path+"/product/detial.htm?pid="+e.id+"'><div class='img' style='height:"+width+"px;'><img src='"+data.prefix_url+"/"+e.picture+"'></div><p class='pron'>"+e.productname+"</p><p class='pri'>￥"+e.present_price+"<span>￥"+e.price+"</span></p></a></li>"
		                });
		                    $('ul.probox').html('');
		                    $('ul.probox').prepend(result);
		                    me.resetload();
		            },
		            error: function(xhr, type){
		                me.resetload();
		            }
		        });
		    },
	 	    loadDownFn : function(me){
		        $.ajax({
		            type: 'GET',
		            url: opt.path+'/product/index_ajax.htm',
		            data:{
		            	'ptype':opt.ptype,
		            	'currpage':++JS.prolistpage.currpage
		            },
		            dataType: 'json',
		            success: function(data){
		                var result = '';
		                 $.each(data.product,function(i,e){
		                	result+="<li><a href='"+opt.path+"/product/detial.htm?pid="+e.id+"'><div class='img' style='height:"+width+"px;'><img src='"+data.prefix_url+"/"+e.picture+"'></div><p class='pron'>"+e.productname+"</p><p class='pri'>￥"+e.present_price+"<span>￥"+e.price+"</span></p></a></li>"
		                });
		                $('ul.probox').append(result);
		                    me.resetload();  
		            },
		            error: function(xhr, type){
		                me.resetload();
		            }
		        });
		    }
		});
	}
};
JS.cartpage={
	'init':function(){
		$('.cartpage .pro').find('div.radio a').click(function(e){
			if($(this).parent().hasClass('checked')){
				$(this).parent().removeClass('checked');
				$('.cartpage a.sellall').removeClass('checked');
			} else {
				$(this).parent().addClass('checked');
				if($('.cartpage .pro').find('div.radio').size()==$('.cartpage .pro').find('div.radio.checked').size()){
					$('.cartpage a.sellall').addClass('checked');
				}
			}
		_allprice();
		});

		$('.cartpage .sellall').click(function(e){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
				$('.cartpage .pro').find('div.radio').removeClass('checked');
			} else {
				$(this).addClass('checked');
				$('.cartpage .pro').find('div.radio').addClass('checked');
			}
		_allprice();
		});
	}
};
JS.prodetailspage={
	'init':function(img){
		var price,present_price;
		var W=$("body").width();
        var H = 437*W/640; 
		$("#rotatebox").spritespin({
			width     : W,
			height    : H,
			frames    : 8,
			image     : img,
			frameTime : 120
		});
		$("#rotatebox").css({'background-image':img,'background-size':W*8+'px auto'});
		$(".prodetails .pron a").click(function(){
			if($(this).hasClass("act")){
				$(this).removeClass("act");
			}else{
				$(this).addClass("act");
			}
		});
		$(".prodetails .size ul li").click(function(){
			$(this).attr('class','sel').siblings().removeClass("sel");
			var price=($(this).find('input')[0]).value;
			var present_price=$(this).find('input')[1].value;
			$('.proname p.pri').html("￥<span>"+present_price+"</span><s>￥"+price+"</s>");
		})
		$('.prodetails .prodeta .deta_h li a').click(function () {
			var par = $(this).parent();
			var index = par.index();
			par.addClass("active").siblings().removeClass('active');
			$('.imgandsale .aftersale').eq(index).show().siblings().hide();
		});
		$(".prodetails .imgandsale .img").click(function(){
			if ($(this).hasClass("cli")) {
				$(this).removeClass("cli");
			}else{$(this).addClass("cli")}
		})
	}
};
JS.shopadvicepage={
	'init':function(){
		$(".shopadvicepage .quest h3").click(function(){
			if ($(this).hasClass("sel")) {
				$(this).removeClass("sel").siblings("p").hide();
			}else{
				$(this).addClass("sel").siblings("p").show();
			}
		})
	}
};
JS.listsurepage={
	'init':function(name,tel,addr){
		$('.listsure .addbox a').html("<p class='name'>"+"name+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tel+"</p>"+"<p class='add'>"+addr+"</p>");
		// console.log(name,tel,addr);
	}
}
function count_plus(btn){
	var inp = btn.prev();
	var count = parseInt(inp.val())+1;
	inp.val(count);
	_allprice();
}
function count_mins(btn){
	var inp = btn.next();
	var count = parseInt(inp.val())-1;
	if(count<=0) count = 1;
	inp.val(count);
	_allprice();
}
function _allprice(){
	var price = 0;
	$.each($('.cartpage .pro'), function(i, v){
		if($(v).find('div.radio').hasClass('checked')){
			price += parseFloat($(v).find('.price span').text())*parseInt($(v).find('.count input').val());
		}
	});
	$('.allprice p b').html(price.toFixed(2));
}