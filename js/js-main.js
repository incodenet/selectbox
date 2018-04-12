function changeSelectbox(){
	// Other functions

	var selectedActive = document.getElementsByClassName('selected');
	var selectActive = document.getElementsByClassName('select');
	document.getElementsByTagName("html")[0].addEventListener("click",function() {
		for (let i = 0; i < selectedActive.length; i++ ) {
	        selectedActive[i].classList.remove("active");
	    };
	    for (let i = 0; i < selectActive.length; i++ ) {
	        selectActive[i].style.display = "none";
	    };
	});

	document.getElementsByClassName("select")[0].addEventListener("click", function(e){
		e.stopPropagation();
	});

	var selectBox = document.getElementsByClassName("selectbox");
	for (let i = 0; i < selectBox.length; i++) {
		var selectboxName = selectBox[i].getAttribute("name");
		var newSelect = document.createElement('select');

		selectBox[i].newSelect;
        // selectBox[i].newSelect.setAttribute("name",selectboxName).innerHTML("<option style='display:none'></option>");
		// selectOption.each(function(){
		// 	var selectDisable = $(this);
		// 	var selectOptionVal = $(this).text();
		// 	selectDiv.children('select').append("<option value='"+selectOptionVal+"'>"+selectOptionVal+"</option>");

		// 	// Disabled option
		// 	selectDiv.find("option").each(function(){
		// 		var optionDisable = $(this);
		// 		if(selectDisable.hasClass("disabled") && optionDisable.text() === selectDisable.text()){
		// 			optionDisable.attr("disabled",true);
		// 		};
		// 	});
		// });
    };

	$('div.selectbox').each(function(){
		var selectDiv = $(this);
		var selectboxName = $(this).attr("name");
		var selectOption = $(this).find(".selectOption");
		var defaultTxt = $(this).find('span.selected').text();

		//Create a 'select' tag with 'option's and its values, and append it in Selectbox
		$(this).append("<select name='"+selectboxName+"' style='display:none'><option style='display:none'></select>");
		selectOption.each(function(){
			var selectDisable = $(this);
			var selectOptionVal = $(this).text();
			selectDiv.children('select').append("<option value='"+selectOptionVal+"'>"+selectOptionVal+"</option>");

			// Disabled option
			selectDiv.find("option").each(function(){
				var optionDisable = $(this);
				if(selectDisable.hasClass("disabled") && optionDisable.text() === selectDisable.text()){
					optionDisable.attr("disabled",true);
				};
			});
		});

		// Dropdown function
		for (let i = 0; i < selectedActive.length; i++ ) {
	        selectedActive[i].addEventListener("click",function(el){
	        	el.stopPropagation();

	        	if (selectedActive[i].className === "selected"){
		        	 selectedActive[i].className === "selected active";
		      //   	 for (let i = 0; i < selectActive.length; i++ ) {
				    //     selectActive[i].style.display = "none";
				    // };
	        	}else{
			         selectedActive[i].className === "selected";
			     //     for (let i = 0; i < selectActive.length; i++ ) {
				    //     selectActive[i].style.display = "block";
				    // };
			    };
	        })
	    };
		// selectDiv.children('span.selected').on("click",function(e){
		// 	e.stopPropagation();
		// 	$('div.select').css('display','none');

		// 	if($(this).hasClass("active")){
		// 		$('span.selected').removeClass("active");
		// 		$(this).parent().children('div.select').css('display','none');
		// 	}else{
		// 		$('span.selected').removeClass("active");
		// 		$(this).addClass("active");
		// 		$(this).parent().children('div.select').css('display','block');
		// 	};
		// });


		// Value selecting
		selectDiv.find('span.selectOption').on("click",function(){
			$(this).parent().css('display','none');
			$(this).parents(".selectbox").find('span.selected').removeClass("active");
			$(this).closest('div.selectbox').attr('value',$(this).text());
			$(this).closest('div.selectbox').find("select").val($(this).text());
			$(this).parent().siblings('span.selected').html($(this).html());
		});

		
		// Multiple select with its parametres
		var multiselectValues = new Array();
		if(selectDiv.hasClass("multiple")){
			selectDiv.children('select').attr("multiple",true);
			
			selectDiv.find('span.selectOption').on("click",function(event){
				if (event.ctrlKey){
					$(this).parent('div.select').css('display','block');
					$(this).parents('.selectbox').find(".selected").addClass('active');
					if($(this).hasClass('multiSpan')){
						$(this).removeClass('multiSpan');
						var pos = multiselectValues.indexOf($(this).text());
						multiselectValues.splice(pos,1);
						$(this).closest('div.selectbox').find("select").val(multiselectValues);

						if(multiselectValues.length){
							$(this).parent().siblings('span.selected').text(multiselectValues.join(','));
						}else{
							$(this).parent().siblings('span.selected').text(defaultTxt);
						}
					}else{
						$(this).addClass('multiSpan');
						multiselectValues.push($(this).text());
						$(this).closest('div.selectbox').attr('value',multiselectValues.join(','));
						$(this).closest('div.selectbox').find("select").val(multiselectValues);
						$(this).parent().siblings('span.selected').text(multiselectValues.join(','));
					};
				};
				if (!event.ctrlKey){
					selectDiv.find('span.selectOption').removeClass('multiSpan');
				};
			});
		};		
	});


	
}

document.addEventListener("DOMContentLoaded", changeSelectbox);