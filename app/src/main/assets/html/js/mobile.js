function showErrMsg(msg){
	if(msg!=''){
		$(".error-message").html('<span class="required">*'+msg+'</span>');
	}else{
		$(".error-message").html('<span class="required"></span>');
	}
}

function back(){
	window.history.go(-1);
}

