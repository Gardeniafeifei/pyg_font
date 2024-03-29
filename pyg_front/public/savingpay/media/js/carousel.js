(function($){
	function prefix(el){
		var prefixes = ["Webkit", "Moz", "O", "ms"];
		for (var i = 0; i < prefixes.length; i++){
			if (prefixes[i] + "Transition" in el.style){
				return '-'+prefixes[i].toLowerCase()+'-'; 
			};
		}; 
		return "transition" in el.style ? "" : false;
	};
	$.fn.removeStyle = function(style){
		return this.each(function(){
			var obj = $(this);
			style = style.replace(/\s+/g, '');
			var styles = style.split(',');
			$.each(styles,function(){
				var search = new RegExp(this.toString() + '[^;]+;?', 'g');
				obj.attr('style', function(i, style){
					if(style) return style.replace(search, '');
			    });
			});
		});
    };
	var methods = {
		init: function(settings){
			return this.each(function(){
				var config = {
					slideDur: 4000,
					fadeDur: 500,
					onFadeStart: null,
					onFadeEnd: null
				};
				if(settings){
					$.extend(config, settings);
				};
				this.config = config;
				var $container = $(this),
					slideSelector = '.slide',
					fading = false,
					firstLoad = true,
					slideTimer,
					activeSlide,
					newSlide,
					$slides = $container.find(slideSelector),
					totalSlides = $slides.length,
					$pagerList = $container.find('.pager_list');
					prefix = $.support.leadingWhitespace ? prefix($container[0]) : false;
				function animateSlides(activeNdx, newNdx){
					function cleanUp(){
						$slides.eq(activeNdx).removeStyle('opacity, z-index');
						$slides.eq(newNdx).removeStyle(prefix+'transition, transition');
						activeSlide = newNdx;
						fading = false;
						waitForNext();
						if(typeof config.onFadeEnd == 'function'){
							config.onFadeEnd.call(this, $slides.eq(activeSlide));
						};
					};
					if(fading || activeNdx == newNdx){
						return false;
					};
					fading = true;
					if(typeof config.onFadeStart == 'function' && !firstLoad){
						config.onFadeStart.call(this, $slides.eq(newSlide));
					};
					$pagers.removeClass('active').eq(newSlide).addClass('active');
					$slides.eq(activeNdx).css('z-index', 2);
					$slides.eq(newNdx).css('z-index', 3);
					if(!prefix){
						$slides.eq(newNdx).animate({'opacity': 1}, config.fadeDur,
						function(){
							cleanUp();
						});
					} else {
						var styles = {};
						styles[prefix+'transition'] = 'opacity '+config.fadeDur+'ms';
						styles['opacity'] = 1;
						$slides.eq(newNdx).css(styles);
						var fadeTimer = setTimeout(function(){
							cleanUp();
						},config.fadeDur);
					};
				};
				function changeSlides(target){
					if(target == 'next'){
						newSlide = activeSlide + 1;
						if(newSlide > totalSlides - 1){
							newSlide = 0;
						}
					} else if(target == 'prev'){
						newSlide = activeSlide - 1;
						if(newSlide < 0){
							newSlide = totalSlides - 1;
						};
					} else {
						newSlide = target;
					};
					animateSlides(activeSlide, newSlide);
				};
				function waitForNext(){
					firstLoad = false;
					slideTimer = setTimeout(function(){
						changeSlides('next');
					},config.slideDur);
				};
				for(var i = 0; i < totalSlides; i++){
					$pagerList
						.append('<li class="page" data-target="'+i+'">'+i+'</li>');
				};
				$container.find('.page').bind('click',function(){
					var target = $(this).attr('data-target');
					clearTimeout(slideTimer);
					changeSlides(target);
				});
				var $pagers = $pagerList.find('.page');
				$pagers.eq(0).addClass('active');
				animateSlides(1, 0);
			});
		}
	};
	$.fn.easyFader = function(settings){
		return methods.init.apply(this, arguments);
	};
})(jQuery);