$(function(){

var $window = $(window),
		breakPoint = 767, //ブレイクポイントの設定
		winW = $window.width(), //画面の横幅
		winH = $window.height(), //画面の縦幅
		anchorSpeed = 400, //アンカーリンクのスムーズスクロールのスピード
		resizeTimer = false,
		anchorClickAfter = false,
		anchorMoving = false;

/* change Img
*********************************************/
function changeImgSp(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_pc\./, '_sp.'));
	});
}
function changeImgPc(){
	$('.change-img').each(function(){
		$(this).attr("src",$(this).attr("src").replace(/_sp\./, '_pc.'));
	});
}

/* smooth scroll 
*********************************************/
var headerHeight = 0;
// var headerHeight = $('.l-header').outerHeight(); //headerが常時追従の場合はこれをアンコメント
var urlHash = location.hash;

if(urlHash) {
	$('body,html').stop().scrollTop(0);
	setTimeout(function(){
		var target = $(urlHash);
		smoothScroll(target);
	}, 100);
}
$('.anchor').click(function() {
	anchorMoving = true;
	anchorClickAfter = true;
	setTimeout(function() {
		anchorMoving = false;
	},anchorSpeed+1000);
	$('.fixed-navi').removeClass('is-visible');
	var href= $(this).attr("href");
	var target = $(href);
	smoothScroll(target);
	return false;
});

function smoothScroll(target) {
	var position = target.offset().top - headerHeight;
	$("html, body").animate({scrollTop:position}, anchorSpeed, "swing");
}

/* swiper
*********************************************/
var gallerySwiper1 = new Swiper('.shop-gallery__swiper-1', {
	slidesPerView: 2.52,
	spaceBetween: 20,
	loop: true,
	speed: 6000,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
	},
	breakpoints: {
		768: {
			slidesPerView: 4.2,
			spaceBetween: 30,
		},
	},
});

var gallerySwiper2 = new Swiper('.shop-gallery__swiper-2', {
	slidesPerView: 2.52,
	spaceBetween: 20,
	loop: true,
	speed: 6000,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
		reverseDirection: true
	},
	breakpoints: {
		768: {
			slidesPerView: 4.2,
			spaceBetween: 30,
		},
	},
});

/* MicroModal
*********************************************/
MicroModal.init({
	disableScroll: true, //モーダル開いてる時に後ろのコンテンツがスクロールするのを防ぐ
	disableFocus: true, //モーダル開いた時にフォーカス可能な要素にフォーカスがあたるのを防ぐ
});

/* fixed-navi
*********************************************/
$scrollPos = 0;
$(window).scroll(function(){
	var scroll = $(window).scrollTop();
	// console.log(anchorClickAfter);
	if(anchorClickAfter == false) {
		// アンカークリック前だったら、スティッキーナビを普通に表示
		$('.fixed-navi').each(function(){
			fixedStart = $('.bus-tour__contents').offset().top + $('.bus-tour__contents').innerHeight();
			fixedFinish = $('#kaiko').offset().top + $('#kaiko').innerHeight() - winH;
			if(scroll > fixedStart) {
				$(this).addClass('is-visible');
			} else {
				$(this).removeClass('is-visible');
			}
			if(scroll > fixedFinish) {
				$(this).addClass('is-clear');
			} else {
				$(this).removeClass('is-clear');
			}
		});
	} else {
		if(anchorMoving == false && scroll < $scrollPos ){ //上にスクロール中
			anchorClickAfter = false;
		}
		$scrollPos = $(this).scrollTop();
	}
});



/********************************************
 [PC ONLY]
*********************************************/
function pcSizeOnly(){

	/* 画像PC/SP切り替え
	*******************************************/
	changeImgPc();

	/* dom移動
	*******************************************/
	$('.shop-intro').each(function(){
		$($(this).find('.shop-intro__image-1')).prependTo($(this).find('.shop-intro__image-wrap'));
	});
	$('.shop-intro').each(function(){
		$($(this).find('.shop-intro__image-4')).prependTo($(this).find('.shop-intro__image-wrap'));
	});

}

/********************************************
 [SP ONLY]
*********************************************/
function spSizeOnly(){

	/* 画像PC/SP切り替え
	*******************************************/
	changeImgSp();

	/* dom移動
	*******************************************/
	$('.shop-intro').each(function(){
		$($(this).find('.shop-intro__image-1')).prependTo(this);
	});
	$('.shop-intro').each(function(){
		$($(this).find('.shop-intro__image-4')).prependTo(this);
	});

}

/********************************************
 [PC/SP切り替え] 以下編集不可
*********************************************/
function descriminateBp(){
	winW = $window.width();
	if(winW <= breakPoint){
		spSizeOnly();
	}else if(winW > breakPoint){
		pcSizeOnly();
	}
}
descriminateBp();
$window.resize(function() {
	if(winW > $window.width() || winW < $window.width()){
		if (resizeTimer !== false) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(descriminateBp, 200);
	}
});

});