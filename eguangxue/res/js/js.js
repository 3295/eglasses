$(function(){
	var imgs = $(".prolistpage ul.probox li a .img");
	imgs.height(imgs.width());
	// dropload
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
            url: 'json/update.json',
            dataType: 'json',
            success: function(data){
                var result = '';
                for(var i = 0; i < data.lists.length; i++){
                    result +=   '<a class="item opacity">'
                                    +'<img src="'+data.lists[i].pic+'" alt="">'
                                    +'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
                                    +'<span class="date">'+data.lists[i].date+'</span>'
                                +'</a>';
                }
                // 为了测试，延迟1秒加载
                setTimeout(function(){
                    $('.lists').html('');
                    $('.lists').prepend(result);
                    me.resetload();
                },1000);
            },
            error: function(xhr, type){
                // alert('Ajax error!');
                me.resetload();
            }
        });
    },
    loadDownFn : function(me){
        $.ajax({
            type: 'GET',
            url: 'json/more.json',
            dataType: 'json',
            success: function(data){
                var result = '';
                for(var i = 0; i < data.lists.length; i++){
                    result +=   '<a class="item opacity">'
                                    +'<img src="'+data.lists[i].pic+'" alt="">'
                                    +'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
                                    +'<span class="date">'+data.lists[i].date+'</span>'
                                +'</a>';
                }
                // 为了测试，延迟1秒加载
                setTimeout(function(){
                    $('.lists').append(result);
                    me.resetload();
                },1000);
            },
            error: function(xhr, type){
                // alert('Ajax error!');
                me.resetload();
            }
        });
    }
});
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

	$(".listsure .pay span").click(function(){
		if($(this).parent().hasClass("active")) return false;
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	});
	$(".listsure .cou span").click(function(){
		if($(this).parent().hasClass("sure")) return false;
		$(this).parent().addClass("sure");
		$(this).parent().siblings().removeClass("sure");
	});
	$(".listsure .payment a").click(function(){
		if($(".listsure .payment").hasClass("act")){
			$(".listsure .payment").removeClass("act");
			$(".listsure .pay").show();
		}else{
			$(".listsure .payment").addClass("act");
			$(".listsure .pay").hide();
		}
	});
	$(".listsure .couponbox a").click(function(){
		if($(".listsure .couponbox").hasClass("act")){
			$(".listsure .couponbox").removeClass("act");
			$(".listsure .cou").show();
		}else{
			$(".listsure .couponbox").addClass("act");
			$(".listsure .cou").hide();
		}
	});
	$(".prodetails .pron a").click(function(){
		if($(this).hasClass("act")){
			$(this).removeClass("act");
		}else{
			$(this).addClass("act");
		}
	});
	$(".prodetails .size ul li").click(function(){
		$(this).attr('class','sel').siblings().removeClass("sel");
	})
	$('.prodetails .prodeta .deta_h li a').click(function () {
		var par = $(this).parent();
		var index = par.index();
		par.addClass("active").siblings().removeClass('active');
		$('.imgandsale .aftersale').eq(index).show().siblings().hide();
	});
	$(".shopadvicepage .quest h3").click(function(){
		if ($(this).hasClass("sel")) {
			$(this).removeClass("sel").siblings("p").hide();
		}else{
			$(this).addClass("sel").siblings("p").show();
		}
	})
	$(".prodetails .swiper-container").click(function(){
		if ($(this).hasClass("cli")) {
			$(this).removeClass("cli");
		}else{$(this).addClass("cli")}
	})
	$(".prodetails .imgandsale .img").click(function(){
		if ($(this).hasClass("cli")) {
			$(this).removeClass("cli");
		}else{$(this).addClass("cli")}
	})

});
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
