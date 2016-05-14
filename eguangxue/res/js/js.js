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
		    // domUp : {
		    //     domClass   : 'dropload-up',
		    //     domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
		    //     domUpdate  : '<div class="dropload-update">↑释放更新</div>',
		    //     domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    // },
		    domDown : {
		        domClass   : 'dropload-down',
		        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
		        domUpdate  : '<div class="dropload-update">↓释放加载</div>',
		        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		    },
		    // loadUpFn : function(me){
		    //     $.ajax({
		    //         type: 'GET',
		    //         url: opt.path+'/product/index_ajax.htm',
		    //         data:{
		    //         	'ptype':opt.ptype,
		    //         	'currpage':JS.prolistpage.currpage=1
		    //         },
		    //         dataType: 'json',
		    //         success: function(data){
		    //             var result = '';
		    //             $.each(data.product,function(i,e){
		    //             	result+="<li><a href='"+opt.path+"/product/detial.htm?pid="+e.id+"'><div class='img' style='height:"+width+"px;'><img src='"+data.prefix_url+"/"+e.picture+"'></div><p class='pron'>"+e.productname+"</p><p class='pri'>￥"+e.present_price+"<span>￥"+e.price+"</span></p></a></li>"
		    //             });
		    //                 $('ul.probox').html('');
		    //                 $('ul.probox').prepend(result);
		    //                 me.resetload();
		    //         },
		    //         error: function(xhr, type){
		    //             me.resetload();
		    //         }
		    //     });
		    // },
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
	},
	'topscroll':function(m){
        $('.inner').scrollTop(0);
        
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
		JS.cartpage._allprice();
		});

		$('.cartpage .sellall').click(function(e){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
				$('.cartpage .pro').find('div.radio').removeClass('checked');
			} else {
				$(this).addClass('checked');
				$('.cartpage .pro').find('div.radio').addClass('checked');
			}
		JS.cartpage._allprice();
		});
		$('.pro a.del').click(function(){
			$(this).parent('.pro').remove();
			JS.cartpage._allprice();
		})

	},
	'count_plus':function(btn){
		var inp = btn.prev();
		var count = parseInt(inp.val())+1;
		inp.val(count);
		JS.cartpage._allprice();
	},
	'count_mins':function(btn){
		var inp = btn.next();
		var count = parseInt(inp.val())-1;
		if(count<=0) count = 1;
		inp.val(count);
		JS.cartpage._allprice();
	},
	'_allprice':function(){
		var price = 0;
		$.each($('.cartpage .pro'), function(i, v){
			if($(v).find('div.radio').hasClass('checked')){
				price += parseFloat($(v).find('.price span').text())*parseInt($(v).find('.count input').val());
			}
		});
		$('.allprice p b').html(price.toFixed(2));
	}
};
JS.prodetailspage={
	'init':function(img){
		// var price,present_price;
		// var W=$("body").width();
  		//var H = 437*W/640; 
		// $("#rotatebox").spritespin({
		// 	width     : W,
		// 	height    : H,
		// 	frames    : 8,
		// 	image     : img,
		// 	frameTime : 120
		// });
		// $("#rotatebox").css({'background-image':img,'background-size':W*8+'px auto','background-color':'#ffffff'});
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
		$(".prodetails .quest a").click(function(){
			if ($(this).hasClass("sel")) {
				$(this).removeClass("sel").siblings("p").hide();
			}else{
				$(this).addClass("sel").siblings("p").show();
			}
		})
	},
	'shoucang':function(a){
		if($(a).hasClass("act")){
			$(a).removeClass("act");
		}else{
			$(a).addClass("act");
		}
	}
};
JS.listsurepage={
	'init':function(name,tel,addr){
		$('.listsure .addbox a.useradd').html("<p class='name'>"+name+"<span>"+tel+"</span></p><p class='address'><span>"+addr+"</span></p>");
	},
	'plus':function(btn){
		var inp = btn.prev();
		var count = parseInt(inp.val())+1;
		inp.val(count);
		JS.listsurepage.allpri();
	},
	'min':function(btn){
		var inp = btn.next();
		var count = parseInt(inp.val())-1;
		if(count<=0) count = 1;
		inp.val(count);
		JS.listsurepage.allpri();
	},
	'allpri':function(){
		var price=0;
		var pro_pri=$('.listsure .pro .pro_intro .pro_pri');
		var allpri=parseFloat($(pro_pri).find('span b').text())*parseInt($(pro_pri).find('.count input').val());
		var dis = parseFloat($('.listsure .qydmbox input.zk').val());
		var allpri_now=(allpri*dis).toFixed(2);
		var dispri=(allpri-allpri_now).toFixed(2);
		$('.subbox h4 span').html('￥'+allpri_now);
		$('.subbox input').val(allpri_now);
		if (dis==1) {return false;}else{
			$('.listsure .qydmbox a').html("您已享受优惠<span>-￥"+dispri+"</span>");
			$('.listsure .qydmbox input.yhpri').val(dispri);
		};
	},
	'yesorno':function(m){
		if ($(m).hasClass('sel')) {$(m).removeClass('sel');$(m).attr('tag','2')}else{$(m).addClass('sel');$(m).attr('tag','1')}
		$('.yanguang input').val($(m).attr('tag'));
	},
	'IsNum':function(e){
		
	      var k = window.event ? e.keyCode : e.which;
            if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {

            } else {
                if (window.event) {
                    window.event.returnValue = false;
                }
                else {
                    e.preventDefault(); //for firefox 
                }
            }
	},
	'num':function(a){
		if (!isNaN(a.val())) {
			if (a.val()<1) {a.val(1)}
		}else{
			a.val(1);
			alert("输入有误！")
		}
	},
	'forword':function(a){
		$(a).parent().parent().hide().siblings().show();
	},
	'discount':function(a){
		$(a).parent().parent().hide().siblings().show();
		JS.listsurepage.allpri();
	}
};
JS.listsure_fcart={
	'allpri':function(a){
		$(a).parent().parent().hide().siblings().show();
		var allpri=0;
		$.each($('.listsure .pro'),function(i,e){
			allpri+=parseFloat($(e).find('.pro_pri span b').text())*parseInt($(e).find('.count_fcart p em').html());
		});
		var dis = parseFloat($('.listsure .qydmbox input.zk').val());
		var allpri_now=(allpri*dis).toFixed(2);
		var dispri=(allpri-allpri_now).toFixed(2);
		$('.subbox h4 span').html('￥'+allpri_now);
		$('.subbox input').val(allpri_now);
		if (dis==1) {return false;}else{
			$('.listsure .qydmbox a').html("您已享受优惠<span>-￥"+dispri+"</span>");
			$('.listsure .qydmbox input.yhpri').val(dispri);
		};
		
	}
}
function promp(tiph,tipc){
	console.log(111)
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

