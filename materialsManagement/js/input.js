
define(['jquery'],function(){
	$.extend({
		inputStyle:function(opt){
			var defaults = {
				radioCss:"radio_bg_check",
				checkCss:"checkbox_bg_check"
			}
			var opts = $.extend({},defaults,opt);
			
			function check(el){
				$(el).each(function(){
					var checkedCss = opts.radioCss;
					if($(this).attr("type")=="checkbox") checkedCss = opts.checkCss;
					
					$(this).parent('i').removeClass(checkedCss);

					var checked = $(this).prop('checked');
					if(checked){
						$(this).parent('i').addClass(checkedCss);
					}
				})
			};
			
			var inputInit = function(){
				check('input[type="radio"]',opts.radioCss);
				check('input[type="checkbox"]',opts.checkCss);
			};
			
			$('input[type="radio"]').on('click',function(){
				check($(this));
			});
			
			$('input[type="checkbox"]').on('click',function(){
				check($(this));
			});
			
			inputInit();
		}
		
	});
})

