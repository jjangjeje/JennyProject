String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}

String.prototype.replaceAll = function(OrgStr, RepStr){
	return this.split(OrgStr).join(RepStr);
}

function ViewDeemed(ScrollFlag){
	if(GetObject("DEEMED_LAYER") == null){
		var DeemedLayer = document.createElement("div");
		
		var LayerWidth = document.body.offsetWidth;
		var LayerHeight = document.body.offsetHeight;
		
		if(LayerWidth < document.body.scrollWidth){
			LayerWidth = document.body.scrollWidth;
		}
		
		if(LayerWidth < document.body.clientWidth){
			LayerWidth = document.body.clientWidth;
		}
		
		if(LayerHeight < document.body.scrollHeight){
			LayerHeight = document.body.scrollHeight;
		}
		
		if(LayerHeight < document.body.clientHeight){
			LayerHeight = document.body.clientHeight;
		}
		
		DeemedLayer.setAttribute("id", "DEEMED_LAYER");
		
		DeemedLayer.style.width = LayerWidth;
		DeemedLayer.style.height = LayerHeight;
		DeemedLayer.style.position = "absolute";
		DeemedLayer.style.top = "0";
		DeemedLayer.style.left = "0";
		DeemedLayer.style.filter = "Alpha(opacity=50)";
		DeemedLayer.style.opacity = "0.5";
		DeemedLayer.style.backgroundColor = "#000000";
		DeemedLayer.style.zIndex = "1";
		
		document.body.appendChild(DeemedLayer);
		
		if(ScrollFlag != null && ScrollFlag == false){
			document.body.scroll = "no";
		}
	}
}

function CloseDeemed(){
	var DeemedLayer = GetObject("DEEMED_LAYER");
	
	if(DeemedLayer != null){
		document.body.removeChild(DeemedLayer);
		document.body.scroll = "auto";
	}
}

function SplitStr(TargetStr, Regex){
	var SplitArray = null;
	
	if(Regex.length == 0){
		SplitArray = new Array(TargetStr);
	}
	else{
		try{
			var SplitSize = 0;
			var TempStr = TargetStr;
			var Temp = "";
			var point = 0;
			
			while(TempStr.length > 0){
				point = TempStr.indexOf(Regex);
				if(point >= 0){
					Temp = TempStr.substring(0, point);
					TempStr = TempStr.substring(point + Regex.length);
				}
				else{
					Temp = TempStr;
					TempStr = "";
				}
				
				if(Temp.length > 0){
					SplitSize++;
				}
			}
			
			SplitArray = new Array(SplitSize);
			SplitSize = 0;
			
			TempStr = TargetStr;
			while(TempStr.length > 0){
				point = TempStr.indexOf(Regex);
				if(point >= 0){
					Temp = TempStr.substring(0, point);
					TempStr = TempStr.substring(point + Regex.length);
				}
				else{
					Temp = TempStr;
					TempStr = "";
				}
				
				if(Temp.length > 0){
					SplitArray[SplitSize] = Temp;
					SplitSize++;
				}
			}
		}catch(e){
			SplitArray = new Array(TargetStr);
		}
	}
	
	return SplitArray;
}

function SplitAllStr(TargetStr, Regex){
	var SplitArray = null;
	
	if(Regex.length == 0){
		SplitArray = new Array(TargetStr);
	}
	else{
		try{
			var SplitSize = 0;
			var TempStr = TargetStr;
			var Temp = "";
			var point = 0;
			
			while(TempStr.length > 0){
				point = TempStr.indexOf(Regex);
				if(point >= 0){
					Temp = TempStr.substring(0, point);
					TempStr = TempStr.substring(point + Regex.length);
				}
				else{
					Temp = TempStr;
					TempStr = "";
				}
				
				SplitSize++;
			}
			
			SplitArray = new Array(SplitSize);
			SplitSize = 0;
			
			TempStr = TargetStr;
			while(TempStr.length > 0){
				point = TempStr.indexOf(Regex);
				if(point >= 0){
					Temp = TempStr.substring(0, point);
					TempStr = TempStr.substring(point + Regex.length);
				}
				else{
					Temp = TempStr;
					TempStr = "";
				}
				
				SplitArray[SplitSize] = Temp;
				SplitSize++;
			}
		}catch(e){
			SplitArray = new Array(TargetStr);
		}
	}
	
	return SplitArray;
}

function GetObject(ObjectId){
	return document.getElementById(ObjectId);
}

function GetObjects(ObjectName){
	return document.getElementsByName(ObjectName);
}

function ObjValue(ObjectId){
	var Obj = GetObject(ObjectId);
	var Value = "";
	
	if(Obj != null){
		Value = Obj.value;
	}
	
	return Value;
}

function ObjValueTrim(ObjectId){
	var Obj = GetObject(ObjectId);
	
	if(Obj != null){
		Obj.value = Obj.value.replaceAll("'", "");
		Obj.value = Obj.value.replaceAll("\"", "");
		Obj.value = Obj.value.replaceAll("^", "");
		Obj.value = Obj.value.replaceAll("|", "");
		Obj.value = Obj.value.trim();
	}
	
	return Obj;
}

function ObjValueLength(ObjectId){
	var Obj = GetObject(ObjectId);
	var ValueLength = 0;
	
	if(Obj != null){
		Obj.value = Obj.value.trim();
		ValueLength = Obj.value.length;
	}
	
	return ValueLength;
}

function ObjIntValue(ObjectId){
	var Obj = GetObject(ObjectId);
	var IntValue = 0;
	
	if(Obj != null && Obj.value.length > 0){
		try{
			IntValue = parseInt(Obj.value.replace(/[^0-9]/g, ''), 10);
		}catch(e){
			IntValue = 0;
		}
	}
	
	return IntValue;
}

function ObjFocus(ObjectId){
	var Obj = GetObject(ObjectId);
	
	if(Obj != null){
		try{
			Obj.focus();
		}catch(e){
		}
	}
}

function GetRadioValue(ObjectName){
	var TargetObj = GetObjects(ObjectName);
	var RadioValue = "";
	
	try{
		if(TargetObj != null){
			for(var idx = 0; idx < TargetObj.length; idx++){
				if(TargetObj[idx].checked){
					RadioValue = TargetObj[idx].value;
					break;
				}
			}
		}
	}catch(e){
		RadioValue = "";
	}
	
	return RadioValue;
}

function GetSelectTitle(ObjectId){
	var Obj = GetObject(ObjectId);
	var Title = "";
	
	if(Obj != null){
		Title = Obj.options[Obj.options.selectedIndex].text;
	}
	
	return Title;
}

function GetXmlNode(NodeObj, TagName, NodeIdx){
	var XmlNode;
	
	if(NodeIdx != null){
		XmlNode = NodeObj.getElementsByTagName(TagName)[NodeIdx];
	}
	else{
		XmlNode = NodeObj.getElementsByTagName(TagName);
	}
	return XmlNode;
}

function GetXmlNodeSize(NodeObj, TagName){
	return NodeObj.getElementsByTagName(TagName).length;
}

function GetXmlNodeValue(NodeObj, TagName){
	var NodeValue = "";
	
	if(NodeObj.getElementsByTagName(TagName)[0].firstChild != null){
		NodeValue = NodeObj.getElementsByTagName(TagName)[0].firstChild.nodeValue;
	}
	
	return NodeValue;
}

// Form Create
function CreateForm(FormName, FormMethod, FormAction, FormTarget){
	var FormObj = document.createElement("form");
	
	FormObj.setAttribute("id", FormName);
	FormObj.setAttribute("name", FormName);
	FormObj.setAttribute("method", FormMethod);
	FormObj.setAttribute("action", FormAction);
	FormObj.setAttribute("target", FormTarget);
	
	return FormObj;
}

// Hidden Add
function AddHidden(FormObj, InputName, InputValue){
	var InputObj = document.createElement("input");
	
	InputObj.setAttribute("type", "hidden");
	InputObj.setAttribute("name", InputName);
	InputObj.setAttribute("value", InputValue);
	
	FormObj.appendChild(InputObj);
	
	return FormObj;
}

function InitTable(TableObj, LimitIdx){
	if(TableObj != null){
		var StartIdx = 0;
		
		if(LimitIdx != null && LimitIdx > 0){
			StartIdx = LimitIdx;
		}
		
		var HeadObj = TableObj.tHead;
		var HeadCnt = 0;
		
		if(HeadObj != null){
			HeadCnt = HeadObj.rows.length;
			
			for(var idx = StartIdx; idx < HeadCnt; idx++){
				HeadObj.removeChild(HeadObj.children[StartIdx]);
			}
		}
		
		StartIdx = StartIdx - HeadCnt;
		
		if(TableObj.tBodies[0] != null){
			var BodyObj = TableObj.tBodies[0];
			var BodyCnt = BodyObj.rows.length;
			
			for(var idx = StartIdx; idx < BodyCnt; idx++){
				BodyObj.removeChild(BodyObj.children[StartIdx]);
			}
		}
	}
}

function InitSelect(SelectObj, LimitIdx){
	if(SelectObj != null){
		var RowsCnt = SelectObj.options.length;
		var StartIdx = 0;
	
		if(LimitIdx != null && LimitIdx > 0){
			StartIdx = LimitIdx;
		}
	
		for(var idx = StartIdx; idx < RowsCnt; idx++){
			SelectObj.options.remove(StartIdx);
		}
	}
}

function CheckRadio(TargetObj){
	var CheckFlag = true;
	
	if(TargetObj == null){
		return CheckFlag;
	}
	
	if(TargetObj.checked != null){
		if(TargetObj.checked){
			CheckFlag = false;
		}
	}
	else{
		for(var idx = 0; idx < TargetObj.length; idx++){
			if(TargetObj[idx].checked){
				CheckFlag = false;
				break;
			}
		}
	}
	
	return CheckFlag;
}

function CheckKorean(KoreanChar){
	var result = true;

	if(KoreanChar.length == 1){
		var CharStr = escape(KoreanChar);

		if(CharStr.substring(1, 2) == "u"){
			var CheckStr = CharStr.substring(2, CharStr.length);
			
			if((CheckStr >= "3131" && CheckStr <= "3163") || (CheckStr >= "AC00" && CheckStr <= "D7A3")){
				result = false;
			}
		}
	}
	else if (KoreanChar.length == 0){
		result = false;
	}

	return result;
}

function CheckUpperChar(TargetStr){
	var ChkStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	for(var idx = 0; idx < TargetStr.length; idx++){
		if(ChkStr.indexOf(TargetStr.substring(idx, idx + 1)) < 0){
			return true;
			break;
		}
	}
	
	return false;
}

function CheckLowerChar(TargetStr){
	var ChkStr = "abcdefghijklmnopqrstuvwxyz";
	
	for(var idx = 0; idx < TargetStr.length; idx++){
		if(ChkStr.indexOf(TargetStr.substring(idx, idx + 1)) < 0){
			return true;
			break;
		}
	}
	
	return false;
}

function CheckChar(TargetStr, ChkStr){
	for(var idx = 0; idx < TargetStr.length; idx++){
		if(ChkStr.indexOf(TargetStr.substring(idx, idx + 1)) < 0){
			return true;
			break;
		}
	}
	
	return false;
}

function CheckInt(TargetStr){
	var ChkStr = "1234567890";
	
	for(var idx = 0; idx < TargetStr.length; idx++){
		if(ChkStr.indexOf(TargetStr.substring(idx, idx + 1)) < 0){
			return true;
			break;
		}
	}
	
	return false;
}

function CheckFloat(TargetStr){
	var ChkStr = "1234567890.";
	var ChkStr = "";
	
	for(var idx = 0; idx < TargetStr.length; idx++){
		ChkStr = TargetStr.substring(idx, idx + 1);
		
		if(ChkStr.indexOf(ChkStr) < 0){
			return true;
			break;
		}
		else if((idx == 0 && ChkStr == ".") || (idx + 1 == TargetStr.length && ChkStr == ".")){
			return true;
			break;
		}
	}
	
	return false;
}

function SetImeDisable(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^\!-\~]/g, '');
	}
}

function SetChar(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9a-zA-Z]/g, '');
	}
}

function SetDate(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9]/g, '');
		
		if(TargetObj.value.length == 8){
			TargetObj.value = TargetObj.value.substring(0, 4) + "-" + TargetObj.value.substring(4, 6) + "-" + TargetObj.value.substring(6, 8);
		}
		else{
			TargetObj.value = "";
		}
	}
}

function SetNumber(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9]/g, '');
	}
	
	return TargetObj;
}

function SetNaturalNum(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9]/g, '');
		
		var StrLength = TargetObj.value.length;
		var StrTemp = "";
		var StrChar = "";
		
		for(var idx = 0; idx < StrLength; idx++){
			StrChar = TargetObj.value.substring(idx, idx + 1);
			
			StrTemp += StrChar;
			
			if(StrTemp == "0"){
				StrTemp = "";
			}
		}
		
		TargetObj.value = StrTemp;
	}
	
	return TargetObj;
}

function SetInt(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9]/g, '');
		
		var StrLength = TargetObj.value.length;
		var StrTemp = "";
		var StrChar = "";
		
		for(var idx = 0; idx < StrLength; idx++){
			StrChar = TargetObj.value.substring(idx, idx + 1);
			
			if(StrTemp == "0"){
				StrTemp = "";
			}
			
			StrTemp += StrChar;
		}
		
		TargetObj.value = StrTemp;
	}
	
	return TargetObj;
}

function SetSignInt(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9^\-]/g, '');
		
		var StrTemp = "";
		var Sign = "";
		
		if(TargetObj.value.length > 0){
			if(TargetObj.value.substring(0, 1) == "-"){
				Sign = "-";
				TargetObj.value = TargetObj.value.substring(1);
			}
			
			if(TargetObj.value.length > 0){
				SetInt(TargetObj);
				
				if(TargetObj.value != "0"){
					TargetObj.value = Sign + TargetObj.value;
				}
			}
		}
	}
	
	return TargetObj;
}

function SetFloat(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9^.]/g, '');
		
		var StrLength = TargetObj.value.length;
		var StrTemp = "";
		var StrChar = "";
		
		for(var idx = 0; idx < StrLength; idx++){
			StrChar = TargetObj.value.substring(idx, idx + 1);
			
			StrTemp += StrChar;
			
			if(StrTemp == "."){
				StrTemp = "";
			}
			else if(StrTemp.length == 2 && StrTemp.substring(0, 1) == "0" && StrChar != "."){
				StrTemp = StrChar;
			}
			else if(StrChar == "." && StrTemp.indexOf(".") != (StrTemp.length - 1)){
				StrTemp = StrTemp.substring(0, StrTemp.length - 1);
			}
		}
		
		if(StrTemp.length > 0){
			if(StrTemp.substring(StrTemp.length - 1) == "."){
				StrTemp = StrTemp.substring(0, StrTemp.length - 1);
			}
		}
		
		TargetObj.value = StrTemp;
	}
	
	return TargetObj;
}

function SetSignFloat(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9^.\-]/g, '');
		
		var StrTemp = "";
		var Sign = "";
		
		if(TargetObj.value.length > 0){
			if(TargetObj.value.substring(0, 1) == "-"){
				Sign = "-";
				TargetObj.value = TargetObj.value.substring(1);
			}
			
			if(TargetObj.value.length > 0){
				SetFloat(TargetObj);
				
				if(TargetObj.value.length > 0 && TargetObj.value != "0"){
					TargetObj.value = Sign + TargetObj.value;
				}
			}
		}
	}
	
	return TargetObj;
}

function SetComma(TargetObj){
	if(TargetObj != null){
		SetSignFloat(TargetObj);
		
		if(TargetObj.value.length > 0){
			var StrTemp = TargetObj.value;
			var Sign = "";
			var FloatStr = "";
			
			if(StrTemp.substring(0, 1) == "-"){
				Sign = "-";
				StrTemp = StrTemp.substring(1);
			}
			
			var FloatPos = StrTemp.indexOf(".");
			
			if(FloatPos >= 0){
				FloatStr = StrTemp.substring(FloatPos + 1);
				StrTemp = StrTemp.substring(0, FloatPos);
			}
			
			var ComStr = "";
			var SubLen = StrTemp.length;
			
			while(SubLen > 0){
				SubLen = SubLen - 3;
				
				if(SubLen < 0){
					SubLen = 0;
				}
				
				if(ComStr.length > 0){
					ComStr = StrTemp.substring(SubLen) + "," + ComStr;
				}
				else{
					ComStr = StrTemp.substring(SubLen);
				}
				
				StrTemp = StrTemp.substring(0, SubLen);
			}
			
			if(FloatStr.length > 0){
				ComStr += "." + FloatStr;
			}
			
			if(ComStr.value != "0"){
				TargetObj.value = Sign + ComStr;
			}
			else{
				TargetObj.value = ComStr;
			}
		}
	}
	
	return TargetObj;
}

function CheckFile(FileName, TargetFileType){
	if(FileName.length > 0){
		var idx = FileName.lastIndexOf('.');
		
		if(idx > 0 && FileName.length > idx + 1){
			var Suffix = FileName.substring(idx + 1).toUpperCase();
			
			var CheckSuffix = "SH|EXE|BAT|ASP|JSP|PHP|JS|HTML|HTM|JAR|WAR|CLASS|JAVA|";
			
			if(Suffix.length == 0){
				alert("첨부할 수 없는 파일형식입니다.");
				return true;
			}
			
			if(CheckSuffix.toUpperCase().indexOf(Suffix + "|") >= 0){
				alert("첨부할 수 없는 파일형식입니다.");
				return true;
			}
			
			if(TargetFileType.length > 0 && TargetFileType.toUpperCase().indexOf(Suffix) < 0){
				alert(TargetFileType + " 파일만 가능합니다.");
				return true;
			}
		}
	}
	
	return false;
}

function CheckImageFile(FileName){
	var result = CheckFile(FileName, "jpg, jpeg, gif, png, bmp");
	
	return result;
}



// Byte Length
function ByetLength(TargetStr){
	var Length = 0;
	
	for(var idx = 0; idx < TargetStr.length; idx++){
		var StrChar = TargetStr.charAt(idx);
		if(escape(StrChar).length > 4){
			Length += 2;
		}
		else if(StrChar == '\n'){
			if(TargetStr.charAt(idx - 1) != '\r'){
				Length += 1;
			}
		}
		else if(StrChar == '<' || StrChar == '>'){
			Length += 4;
		}
		else{
			Length += 1;
		}
	}
	
	return Length;
}

// Textarea Max Length Check
function Limit(TargetObj){
	if(TargetObj != null){
		if(TargetObj.getAttribute("maxlength") == null){
			return;
		}
		
		var MaxLength = parseInt(TargetObj.getAttribute("maxlength"), 10);
		
		if(TargetObj.value.length > MaxLength){
			alert(MaxLength + "자 까지만 입력가능합니다.");
			TargetObj.value = TargetObj.value.substring(0, MaxLength);
		}
	}
}

function GetCurrTime(){
	var CurrDateTime = new Date();

	var CurrTimeStr = ConvertStr(CurrDateTime.getFullYear(), 4) + ConvertStr(CurrDateTime.getMonth() + 1, 2) + ConvertStr(CurrDateTime.getDate(), 2) + ConvertStr(CurrDateTime.getHours(), 2) + ConvertStr(CurrDateTime.getMinutes(), 2) + ConvertStr(CurrDateTime.getSeconds(), 2);
	
	return CurrTimeStr;
}

function GetWeekDay(DateStr, DispType){
	//DispType : NUM (0, 1, 2, 3, 4, 5, 6), ENG (SUN, MON, TUE, WED, THU, FRI, SAT), KOR (일, 월, 화, 수, 목, 금, 토) 
	if(DispType == null){
		DispType = "NUM";
	}
	
	DateStr = DateStr.replaceAll("-", "").replaceAll(" ", "");
	
	if(DateStr.length < 8){
		return -1;
	}
	
	var YearInt = parseInt(DateStr.substring(0, 4), 10);
	var MonthInt = parseInt(DateStr.substring(4, 6), 10);
	var DayInt = parseInt(DateStr.substring(6, 8), 10);
	
	var StandDate = new Date(YearInt, MonthInt - 1, DayInt);
	var WeekDay = StandDate.getDay();
	
	var EngArray = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
	var KorArray = new Array("일", "월", "화", "수", "목", "금", "토");
	
	var WeekDayStr = "";
	
	if(DispType == "NUM"){
		WeekDayStr = WeekDay;
	}
	else if(DispType == "ENG"){
		WeekDayStr = EngArray[WeekDay];
	}
	else if(DispType == "KOR"){
		WeekDayStr = KorArray[WeekDay];
	}
	
	return WeekDayStr;
}

function AddDate(DateStr, Months, Days){
	DateStr = DateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var YearInt = parseInt(DateStr.substring(0, 4), 10);
	var MonthInt = parseInt(DateStr.substring(4, 6), 10);
	var DayInt = parseInt(DateStr.substring(6, 8), 10);
	
	var StandDate = new Date(YearInt, MonthInt - 1, DayInt);
	
	if(Months != 0){
		StandDate.setMonth(StandDate.getMonth() + Months);
	}
	
	if(Days != 0){
		StandDate.setDate(StandDate.getDate() + Days);
	}
	
	var AddDate = StandDate.getFullYear() + ConvertStr(StandDate.getMonth() + 1, 2) + ConvertStr(StandDate.getDate(), 2);
	
	return AddDate;
}

function CheckTimesBetween(CurrDateStr, StartDateStr, EndDateStr){
	if(CurrDateStr.length == 0 || StartDateStr.length == 0 || EndDateStr.length == 0){
		return false;
	}
	
	if(BetweenTime(StartDateStr, CurrDateStr) >= 0 && BetweenTime(CurrDateStr, EndDateStr) >= 0){
		return true;
	}
	else{
		return false;
	}
}

function BetweenTime(StartDateStr, EndDateStr){
	StartDateStr = StartDateStr.replaceAll("-", "").replaceAll(" ", "");
	EndDateStr = EndDateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var StartDate = new Date(parseInt(StartDateStr.substring(0, 4), 10), parseInt(StartDateStr.substring(4, 6), 10) - 1, parseInt(StartDateStr.substring(6, 8), 10), parseInt(StartDateStr.substring(8, 10), 10), parseInt(StartDateStr.substring(10, 12), 10), 0);
	var EndDate = new Date(parseInt(EndDateStr.substring(0, 4), 10), parseInt(EndDateStr.substring(4, 6), 10) - 1, parseInt(EndDateStr.substring(6, 8), 10), parseInt(EndDateStr.substring(8, 10), 10), parseInt(EndDateStr.substring(10, 12), 10), 0);
	
	var Timtes = (EndDate.getTime() - StartDate.getTime()) / (1000 * 60);
	
	return Timtes;
}

function BetweenHour(StartDateStr, EndDateStr){
	StartDateStr = StartDateStr.replaceAll("-", "").replaceAll(" ", "");
	EndDateStr = EndDateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var StartDate = new Date(parseInt(StartDateStr.substring(0, 4), 10), parseInt(StartDateStr.substring(4, 6), 10) - 1, parseInt(StartDateStr.substring(6, 8), 10), parseInt(StartDateStr.substring(8, 10), 10), 0, 0);
	var EndDate = new Date(parseInt(EndDateStr.substring(0, 4), 10), parseInt(EndDateStr.substring(4, 6), 10) - 1, parseInt(EndDateStr.substring(6, 8), 10), parseInt(EndDateStr.substring(8, 10), 10), 0, 0);
	
	var Hours = (EndDate.getTime() - StartDate.getTime()) / (1000 * 60 * 60);
	
	return Hours;
}

function BetweenDate(StartDateStr, EndDateStr){
	StartDateStr = StartDateStr.replaceAll("-", "").replaceAll(" ", "");
	EndDateStr = EndDateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var StartDate = new Date(parseInt(StartDateStr.substring(0, 4), 10), parseInt(StartDateStr.substring(4, 6), 10) - 1, parseInt(StartDateStr.substring(6, 8), 10));
	var EndDate = new Date(parseInt(EndDateStr.substring(0, 4), 10), parseInt(EndDateStr.substring(4, 6), 10) - 1, parseInt(EndDateStr.substring(6, 8), 10));
	
	var Days = (EndDate.getTime() - StartDate.getTime()) / (1000 * 60 * 60 * 24);
	
	return Days;
}

function BetweenMonth(StartDateStr, EndDateStr){
	StartDateStr = StartDateStr.replaceAll("-", "").replaceAll(" ", "");
	EndDateStr = EndDateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var StartDate = new Date(parseInt(StartDateStr.substring(0, 4), 10), parseInt(StartDateStr.substring(4, 6), 10) - 1, parseInt(StartDateStr.substring(6, 8), 10));
	var EndDate = new Date(parseInt(EndDateStr.substring(0, 4), 10), parseInt(EndDateStr.substring(4, 6), 10) - 1, parseInt(EndDateStr.substring(6, 8), 10));
	
	var Months = ((EndDate.getYear() - StartDate.getYear()) * 12) + (EndDate.getMonth() - StartDate.getMonth());
	
	return Months;
}

function BetweenYear(StartDateStr, EndDateStr){
	StartDateStr = StartDateStr.replaceAll("-", "").replaceAll(" ", "");
	EndDateStr = EndDateStr.replaceAll("-", "").replaceAll(" ", "");
	
	var Years = Math.floor((parseInt(EndDateStr, 10) - parseInt(StartDateStr, 10)) / 10000);
	
	return Years;
}

function MarkDate(DateStr, Mark){
	var MarkStr = "";
	
	if(DateStr.length == 6){
		MarkStr = DateStr.substring(0, 2) + Mark + DateStr.substring(2, 4) + Mark + DateStr.substring(4);
	}
	else if(DateStr.length == 8){
		MarkStr = DateStr.substring(0, 4) + Mark + DateStr.substring(4, 6) + Mark + DateStr.substring(6);
	}
	else{
		MarkStr = DateStr;
	}
	
	return MarkStr;
}

function MarkTime(TimeStr, Mark){
	var MarkStr = "";
	
	if(TimeStr.length == 4){
		MarkStr = TimeStr.substring(0, 2) + Mark + TimeStr.substring(2);
	}
	else if(TimeStr.length == 6){
		MarkStr = TimeStr.substring(0, 2) + Mark + TimeStr.substring(2, 4) + Mark + TimeStr.substring(4);
	}
	else{
		MarkStr = TimeStr;
	}
	
	return MarkStr;
}

function MarkComma(CommaStr){
	var MarkStr = "";
	
	var BuffStr = CommaStr+"";
	
	try{
		var Minus = "";
		if(BuffStr.substring(0, 1) == "-"){
			Minus = "-";
			BuffStr = BuffStr.substring(1);
		}
		
		var DotPoint = BuffStr.indexOf(".");
		
		var Prefix = "";
		var Suffix = "";
		
		if(DotPoint > 0){
			Prefix = BuffStr.substring(0, DotPoint);
			Suffix = BuffStr.substring(DotPoint + 1);
		}
		else{
			Prefix = BuffStr;
		}
		
		for(var idx = Prefix.length; idx > 0; idx = idx - 3){
			if(idx - 3 > 0){
				MarkStr = "," + BuffStr.substring(idx - 3, idx) + MarkStr;
			}
			else{
				MarkStr = BuffStr.substring(0, idx) + MarkStr;
			}
		}
		
		if(DotPoint > 0){
			ReturnStr += "." + Suffix;
		}
		
		MarkStr = Minus + MarkStr;
	}catch(e){
		MarkStr = CommaStr;
	}
	return MarkStr;
}

function ConvertStr(IntValue, ZeroCnt){
	var IntStr = "";
	
	IntStr = IntValue + "";
	
	for(var idx = IntStr.length; idx < ZeroCnt; idx++){
		IntStr = "0" + IntStr;
	}
	
	return IntStr;
}

// Document Scroll
function DocumentTop(){
	window.scrollTo(0, 0);
}

// Document Scroll
function ClipCopy(CopyStr){
	window.clipboardData.setData("Text", CopyStr);
	alert("복사되었습니다.");
}

function PopCalendar(ObjectName, PrevYears, NextYears){
	var CalendarDate = ObjValue(ObjectName);
	
	if(PrevYears == null){
		PrevYears = "";
	}
	
	if(NextYears == null){
		NextYears = "";
	}
	
	/*
	 * OBJECT_NAME : 일자 선택 시 입력 값 Return 할 Object Name.
	 * PREV_YEARS : 과거년도 표시 기간. Default 10년.
	 * NEXT_YEARS : 미래년도 표시 기간. Default 10년.
	 */
	
	var url = "/AsiaTotalManage/comm/Calendar.jsp?CALENDAR_DATE=" + CalendarDate + "&OBJECT_NAME=" + ObjectName + "&PREV_YEARS=" + PrevYears + "&NEXT_YEARS=" + NextYears;
	window.open(url, "Calendar", "width=200, height=260, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no");
}

function PopZip(ZipCdObjectName, AddrObjectName){
	var url = "/AsiaTotalManage/comm/StreetCode.jsp?ZIP_CD_OBJECT_NAME=" + ZipCdObjectName + "&ADDR_OBJECT_NAME=" + AddrObjectName;
	window.open(url, "StreetCode", "width=500, height=800, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no");
}

function FileUpload(FileType, FileIdx, MultipleFlag){
	if(MultipleFlag == null){
		MultipleFlag = "N";
	}
	
	var url = "/AsiaTotalManage/comm/FileUpload.jsp?FILE_TYPE=" + FileType + "&FILE_IDX=" + FileIdx + "&MULTIPLE_FLAG=" + MultipleFlag;
	window.open(url, "FileUpload", "width=700, height=220, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no");
}

function FileDown(FileUrl){
	window.open(encodeURI(FileUrl), "", "width=100, height=300, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no");
}

