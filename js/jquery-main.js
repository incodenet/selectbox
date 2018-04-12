function changeSelectbox(){
	// Other functions
	$('html').on("click",function() {
		$('span.selectedOption').removeClass("active");
		$('div.select').css('display','none');
	});
	$('div.select').on("click",function(e){
		e.stopPropagation();
	});

	$('div.selectbox').each(function(){
		var selectDiv = $(this);
		var selectboxName = $(this).attr("name");
		var selectOption = $(this).find(".selectOption");
		var defaultTxt = $(this).find(".selectedOption").text();

		// Specific options
		$(document).on('keydown',selectDiv,function (e) {
		  	var keyCode = e.keyCode || e.which;
		    var arrow = {tab: 9, up: 38, down: 40 };

		    if(keyCode === arrow.tab && !selectDiv.children('span.selectedOption').hasClass("active")){
		    	selectDiv.children('span.selectedOption').addClass("active");
		    	selectDiv.children('.select').css('display','block');
		    };

		    var c = 0;

			if (keyCode === arrow.up && selectDiv.children('span.selectedOption').hasClass("active")) {
				selectOption.addClass('multiSpan');
			}else if(keyCode === arrow.down && selectDiv.children('span.selectedOption').hasClass("active")){
				selectOption.removeClass('multiSpan');
			};

		});

		// Create a 'select' tag with 'option's and its values, and append it in Selectbox
		$(this).append("<select name='"+selectboxName+"' style='display:none'><option></option></select>");
		selectOption.each(function(){
			var selectCurrent = $(this);
			var selectOptionVal = $(this).text();
			var selectOptionData = $(this).attr("data");
			selectDiv.children('select').append("<option value='"+selectOptionData+"'>"+selectOptionVal+"</option>");

			// Disabled,selected options
			selectDiv.find("option").each(function(){
				var optionCurrent = $(this);
				if(selectCurrent.hasClass("disabled") && optionCurrent.attr("value") === selectCurrent.attr("data")){
					optionCurrent.attr("disabled",true);
				};
				if(selectCurrent.hasClass("selected") && optionCurrent.attr("value") === selectCurrent.attr("data")){
					optionCurrent.attr("selected",true);
                    selectDiv.find('select').val(optionCurrent.val());
                    selectDiv.find(".selectedOption").text(selectCurrent.text());
				};
			});
		});

		// Dropdown function
		selectDiv.children('span.selectedOption').on("click",function(e){
			e.stopPropagation();
			$('div.select').css('display','none');

			if($(this).hasClass("active")){
				$('span.selectedOption').removeClass("active");
				$(this).parent().children('div.select').css('display','none');
			}else{
				$('span.selectedOption').removeClass("active");
				$(this).addClass("active");
				$(this).parent().children('div.select').css('display','block');
			};
		});

		// Value selecting
		selectDiv.find('span.selectOption').on("click",function(){
			if($(this).siblings(".selectOption").hasClass("selected")){
				$(this).siblings(".selectOption").removeClass("selected");
			}

			$(this).parent().css('display','none');
			$(this).parents(".selectbox").find('span.selectedOption').removeClass("active");
			$(this).closest('div.selectbox').attr('data',$(this).attr("data"));
			$(this).closest('div.selectbox').find("select").val($(this).attr("data"));
			$(this).parent().siblings('span.selectedOption').html($(this).html());
		});
		
		// Multiple(default) select with its parametres
		var multiselectDatas = new Array();
		var multiselectValues = new Array();
		if(selectDiv.hasClass("multiple-default")){
			selectDiv.children('select').attr("multiple",true);
			
			selectDiv.find('span.selectOption').on("click",function(event){
				if (event.ctrlKey){
					$(this).parent('div.select').css('display','block');
					$(this).parents('.selectbox').find(".selectedOption").addClass('active');

					if($(this).hasClass('multiSpan')){
						$(this).removeClass('multiSpan');
						var pos = multiselectValues.indexOf($(this).text());
						multiselectValues.splice(pos,1);
						$(this).closest('div.selectbox').find("select").val(multiselectValues);

						if(multiselectValues.length){
							if(multiselectValues.length > 2){
								$(this).parent().siblings('span.selectedOption').text(multiselectValues.length + " selected");
							}else{
								$(this).parent().siblings('span.selectedOption').text(multiselectValues.join(','));
							};
						}else{
							$(this).parent().siblings('span.selectedOption').text(defaultTxt);
						}
					}else{
						$(this).addClass('multiSpan');
						multiselectDatas.push($(this).attr("data"));
						multiselectValues.push($(this).text());
						$(this).closest('div.selectbox').attr('value',multiselectValues.join(','));
						$(this).closest('div.selectbox').find("select").val(multiselectDatas);
						$(this).parent().siblings('span.selectedOption').text(multiselectValues.join(','));

						if(multiselectValues.length > 2){
							$(this).parent().siblings('span.selectedOption').text(multiselectValues.length + " selected");
						};

						if(multiselectValues.length == selectDiv.find("span.selectOption").length){
							$(this).parent().siblings('span.selectedOption').text("All selected!");
						};
					};
				};

				if (!event.ctrlKey){
					selectDiv.find('span.selectOption').removeClass('multiSpan');
				};
			});

			var selectedAttrOptions = new Array();
			if(selectDiv.find('.selected').length > 1){
				var selectedValue = selectDiv.find('.selected');
				for(var i = 0;i < selectedValue.length;i++ ){
					selectedAttrOptions.push($(selectedValue[i]).attr("data"));
				}
				
				selectDiv.find('span.selectedOption').text(selectedAttrOptions.join(','));
				if(selectedAttrOptions.length > 2){
					selectDiv.find('span.selectedOption').text(selectedAttrOptions.length + " selected");
				};

				if(selectedAttrOptions.length == selectDiv.find("span.selectOption").length){
					selectDiv.find('span.selectedOption').text("All selected!");
				};
				selectDiv.find("select").val(selectedAttrOptions);
			}
		};
		
		
		// Multiple(with checks) select with its parametres
		var multiselectChecksDatas = new Array();
		var multiselectChecksValues = new Array();
		if(selectDiv.hasClass("multiple")){
			selectDiv.children('select').attr("multiple",true);

			selectDiv.find('span.selectOption').on("click",function(event){
				$(this).parent('div.select').css('display','block');
				$(this).parents('.selectbox').find(".selectedOption").addClass('active');

				if($(this).hasClass('multiSelected')){
					$(this).removeClass('multiSelected');
					var arrayMulti = multiselectChecksValues.indexOf($(this).text());
					multiselectChecksValues.splice(arrayMulti,1);

					$(this).closest('div.selectbox').find("select").val(multiselectChecksValues);

					if(multiselectChecksValues.length){
						if(multiselectChecksValues.length > 2){
							$(this).parent().siblings('span.selectedOption').text(multiselectChecksValues.length + " selected");
						}else{
							$(this).parent().siblings('span.selectedOption').text(multiselectChecksValues.join(','));
						};
					}else{
						$(this).parent().siblings('span.selectedOption').text(defaultTxt);
					};
				}else{
					$(this).addClass('multiSelected');
                    multiselectChecksDatas.push($(this).attr("data"));
					multiselectChecksValues.push($(this).text());

					$(this).closest('div.selectbox').attr('value',multiselectChecksValues.join(','));
					$(this).closest('div.selectbox').find("select").val(multiselectChecksDatas);
					$(this).parent().siblings('span.selectedOption').text(multiselectChecksValues.join(','));

					if(multiselectChecksValues.length > 2){
						$(this).parent().siblings('span.selectedOption').text(multiselectChecksValues.length + " selected");
					};

					if(multiselectChecksValues.length == selectDiv.find("span.selectOption").length){
						$(this).parent().siblings('span.selectedOption').text("All selected!");
					};
				};
			});

			var selectedAttrOptionsMultiple = new Array();
			if(selectDiv.find('.selected').length > 1){
				var selectedValue = selectDiv.find('.selected');
				for(var i = 0;i < selectedValue.length;i++ ){
					selectedAttrOptionsMultiple.push($(selectedValue[i]).attr("data"));
				}
				
				selectDiv.find('span.selectedOption').text(selectedAttrOptionsMultiple.join(','));

				if(selectedAttrOptionsMultiple.length > 2){
					selectDiv.find('span.selectedOption').text(selectedAttrOptionsMultiple.length + " selected");
				};

				if(selectedAttrOptionsMultiple.length == selectDiv.find("span.selectOption").length){
					selectDiv.find('span.selectedOption').text("All selected!");
				};
				selectDiv.find("select").val(selectedAttrOptionsMultiple);
			}
		};
	});
};

document.addEventListener("DOMContentLoaded", function(){
	changeSelectbox();

    // var currentUrl = window.location.search;
    // var mod = currentUrl.split("&");
    // var newUrl = [];
    //
    // for(var i = 0;i < mod.length;i++){
    //     var con = mod[i].split('=');
    //     if(con[1] !== ""){
    //         newUrl.push(con[0]);
    //     }
    // }

    // var modifiedUrl = newUrl.join("/");
    // currentUrl = modifiedUrl.replace(/\?/g,"");
    // console.log(currentUrl);
    //
    // $("form").submit(function () {
    //     var url = document.baseURI + LANG_URL + "/" + ID + "/tab/" + $(".tab_item a.active").parent().index();
    //
    //     $(this.querySelectorAll("select")).each(function(ind, data) {
    //         url += "/" + data.name + "/" + data.value;
    //     });
    //
    //     location.assign(url);
    //     return false;
    // });
});