var Common = {
	String : {},
	Util   : {},
	Rule   : {},
	Widget : {}
};

// 숫자,영문 소/대,한글,백스페이스,스페이스 포함
Common.Rule.Special = function(){
	return /^[0-9|a-z|A-Z|ㄱ-ㅎ|가-힣|\s|\b]*$/;
};

Common.Rule.HasChar = function(TextVal){
	return Common.Rule.Special().test(TextVal);
};

Common.Util.ShowAlert = function(show,msg){
	if(!show)
		alert(msg);
};

Common.String.RemoveText = function(TextVal){
	var result='';
	if(TextVal != '')
	{
		for(var i=0;i < TextVal.length;i++)
		{
			if(Common.Rule.HasChar(TextVal.charAt(i)))
			{
				result += TextVal.charAt(i);
			}
		}
	}
	return result;
};

// 숫자
Common.Rule.OnlyNumber = function(){	 
	return /^[0-9]*$/;
};

Common.Rule.HasNumber = function(TextVal){
	return Common.Rule.OnlyNumber().test(TextVal);
};

Common.String.RemoveChar = function(TextVal)
{
	var result='';
	if(TextVal != '')
	{
		for(var i=0;i < TextVal.length;i++)
		{
			if(Common.Rule.HasNumber(TextVal.charAt(i)))
			{
				result += TextVal.charAt(i);
			}
		}
	}
	return result;
};


// 영문 소문자
Common.String.SmallEnglish = function(){	
	return /^[a-z]*$/;
};

Common.Rule.HasSmallEnglish = function(TextVal){
	return Common.String.SmallEnglish().test(TextVal);
};

Common.String.RemoveSmallEnglish = function(TextVal)
{
	var result='';
	if(TextVal != '')
	{
		for(var i=0;i < TextVal.length;i++)
		{
			if(Common.Rule.HasSmallEnglish(TextVal.charAt(i)))
			{
				result += TextVal.charAt(i);
			}
		}
	}
	return result;
};

// 영문 대문자
Common.String.BigEnglish = function(){
	return /^[A-Z]*$/;
};

Common.Rule.HasBigEnglish = function(TextVal){
	return Common.String.BigEnglish().test(TextVal);
};

Common.String.RemoveBigEnglish = function(TextVal)
{
	var result='';
	if(TextVal != '')
	{
		for(var i=0;i < TextVal.length;i++)
		{
			if(Common.Rule.HasBigEnglish(TextVal.charAt(i)))
			{
				result += TextVal.charAt(i);
			}
		}
	}
	return result;
};

// 영문
Common.String.OnlyEnglish = function(){
	return /^[a-z|A-Z]*$/;
};

Common.Rule.HasOnlyEnglish = function(TextVal){
	return Common.String.OnlyEnglish().test(TextVal);
};

Common.String.RemoveOnlyEnglish = function(TextVal)
{
	var result='';
	if(TextVal != '')
	{
		for(var i=0;i < TextVal.length;i++)
		{
			if(Common.Rule.HasOnlyEnglish(TextVal.charAt(i)))
			{
				result += TextVal.charAt(i);
			}
		}
	}
	return result;
};

// jquery 달력
Common.Widget.DatePicker = function(id){
	$("#"+id).datepicker({
		prevText:'이전 달',
		nextText:'다음 달',
		monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames:['일','월','화','수','목','금','토'],
		daynamesShort:['일','월','화','수','목','금','토'],
		dateFormat:'yy-mm-dd',
		showMonthAfterYear:true,
		showButtonPanel:true,
		closeText:'닫기',
		yearSuffix:'년'
	});
	
	 $('#'+id).datepicker("show");
};

// 꼼마,천단위
Common.Util.Comma = function(n){
	var result = String(n);
	return result.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};






































