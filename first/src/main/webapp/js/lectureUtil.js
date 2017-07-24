util={};
util.tbl = {};
util.comm = {};
util.semester = {};
util.mask = {};

util.comm.FileDown = function(FileUrl){
	location.href = FileUrl;
}

util.popFunc = function(url,targetName,opt){
	if(opt == null || opt == undefined){
		var option = "width=750, height=600, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no";
		window.open(url,targetName,option);
	}else{
		window.open(url,targetName,opt);	
	}
	
}

util.emptyPaging = function(){
	var pagingStr = "";
	pagingStr += "<span class=\'com_table_board-no-sum\'>";
	pagingStr += "<a class=\'board-em\' href=\'javascript:void(0);\'>1</a>";
	pagingStr += "</span>";
	return pagingStr;
}

/*
 * Paging Function parameter - imgPath,pageSize,totalCount,currentPage
 * */
util.paging = function(paramObj){
	
	var decimal = 10;
	var imgPath = paramObj['imgPath'];
	var pageSize = parseInt(paramObj['pageSize'],decimal);
	var totalCount = parseInt(paramObj['totalCount'],decimal);
	var pageCnt = Math.ceil(totalCount/pageSize);
	var currentPage = parseInt(paramObj['currentPage'],decimal);
	var pagePerBlock = 10;
	var totalBlock = 1;
	
	if(pageCnt % pagePerBlock == 0){
		totalBlock = Math.floor(pageCnt / pagePerBlock);
	}
	else{
		totalBlock = Math.floor(pageCnt / pagePerBlock) + 1;
	}

	var currBlock = 1;
	if(currentPage % pagePerBlock == 0){
		currBlock = Math.floor(currentPage / pagePerBlock);
	}
	else{
		currBlock = Math.floor(currentPage / pagePerBlock) + 1;
	}

	var prevPage = (currBlock - 1) * pagePerBlock;
	var nextPage = currBlock * pagePerBlock;
	if(totalBlock <= currBlock){
		nextPage = pageCnt;
	}
	
	var pagingStr = "";
	pagingStr += "<span class=\'com_table_board-no-btn\'>";
	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:fn_egov_link_page(1)\'><img src=\'"+imgPath+"/img/btn/btn-board-fist.gif\' alt=\'처음\' /></a>&nbsp;";
	}
	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:fn_egov_link_page(" + prevPage + ")\'><img src=\'"+imgPath+"/img/btn-board-prev.gif\' alt=\'이전\' /></a>&nbsp;";
	}
	pagingStr += "</span>";
	
	pagingStr += "<span class=\'com_table_board-no-sum\'>";
	for(var pageIdx = prevPage + 1; pageIdx <= nextPage; pageIdx++){
		if(currentPage == pageIdx){
			pagingStr += "<a class=\'board-em\' href=\'javascript:void(0);\'>" + pageIdx + "</a>&nbsp;";
		}
		else{
			pagingStr += "<a href=\'javascript:fn_egov_link_page(" + pageIdx + ")\'>" + pageIdx + "</a>&nbsp;";
		}
	}
	pagingStr += "</span>";
	
	pagingStr += "<span class=\'com_table_board-no-btn\'>";
	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:fn_egov_link_page(" + (nextPage + 1) + ")\'><img src=\'"+imgPath+"/img/btn-board-next.gif\' alt=\'다음\' /></a>&nbsp;";
	}
	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:fn_egov_link_page(" + pageCnt + ")\'><img src=\'"+imgPath+"/img/btn-board-end.gif\' alt=\'마지막\' /></a>&nbsp;";
	}
	pagingStr += "</span>";
	
	return pagingStr;
}

/*
 * Paging Function parameter - imgPath,pageSize,totalCount,currentPage
 * */
util.subPaging = function(paramObj){
	
	var decimal = 10;
	var imgPath = paramObj['imgPath'];
	var pageSize = parseInt(paramObj['pageSize'],decimal);
	var totalCount = parseInt(paramObj['totalCount'],decimal);
	var pageCnt = Math.ceil(totalCount/pageSize);
	var currentPage = parseInt(paramObj['currentPage'],decimal);
	var pagePerBlock = 10;
	var totalBlock = 1;
	
	if(pageCnt % pagePerBlock == 0){
		totalBlock = Math.floor(pageCnt / pagePerBlock);
	}
	else{
		totalBlock = Math.floor(pageCnt / pagePerBlock) + 1;
	}

	var currBlock = 1;
	if(currentPage % pagePerBlock == 0){
		currBlock = Math.floor(currentPage / pagePerBlock);
	}
	else{
		currBlock = Math.floor(currentPage / pagePerBlock) + 1;
	}

	var prevPage = (currBlock - 1) * pagePerBlock;
	var nextPage = currBlock * pagePerBlock;
	if(totalBlock <= currBlock){
		nextPage = pageCnt;
	}
	
	var pagingStr = "";
	pagingStr += "<span class=\'com_table_board-no-btn\'>";
	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:fn_egov_sublink_page(1)\'><img src=\'"+imgPath+"/img/btn/btn-board-fist.gif\' alt=\'처음\' /></a>&nbsp;";
	}
	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:fn_egov_sublink_page(" + prevPage + ")\'><img src=\'"+imgPath+"/img/btn-board-prev.gif\' alt=\'이전\' /></a>&nbsp;";
	}
	pagingStr += "</span>";
	
	pagingStr += "<span class=\'com_table_board-no-sum\'>";
	for(var pageIdx = prevPage + 1; pageIdx <= nextPage; pageIdx++){
		if(currentPage == pageIdx){
			pagingStr += "<a class=\'board-em\' href=\'javascript:void(0);\'>" + pageIdx + "</a>&nbsp;";
		}
		else{
			pagingStr += "<a href=\'javascript:fn_egov_sublink_page(" + pageIdx + ")\'>" + pageIdx + "</a>&nbsp;";
		}
	}
	pagingStr += "</span>";
	
	pagingStr += "<span class=\'com_table_board-no-btn\'>";
	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:fn_egov_sublink_page(" + (nextPage + 1) + ")\'><img src=\'"+imgPath+"/img/btn-board-next.gif\' alt=\'다음\' /></a>&nbsp;";
	}
	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:fn_egov_sublink_page(" + pageCnt + ")\'><img src=\'"+imgPath+"/img/btn-board-end.gif\' alt=\'마지막\' /></a>&nbsp;";
	}
	pagingStr += "</span>";
	
	return pagingStr;
}

/*
 * ajax용 함수 
 * 인수: url : targetUrl, data: targetData, errMsg : 없으면 기본 에러문구 사용, callbackFunc : 콜백 함수
 * */
util.func_ajax = function(paramObj){
	
	var targetUrl = paramObj['targetUrl'];
	var param = paramObj['targetData'];
	var errMsg = paramObj['errMsg'];
	var callbackFunc = eval(paramObj['callbackFunc']);
	$.ajax({
		  url: targetUrl,
		  data:param,
		  method:'post',
		  dataType: 'json',
		  contentType: "application/x-www-form-urlencoded;charset=utf-8",
		  success: function(data) {
			  callbackFunc(data);
		},
		error:function(data,status,err){
			if(errMsg != undefined && errMsg != null && errMsg != ""){
				alert(errMsg);
			}else{
				alert('Server Error');
			}
			
		}
	});
}

/*
 * jsonNp
 * 
 * */

util.func_ajaxNp = function(paramObj){
	
	var targetUrl = paramObj['targetUrl'];
	var param = paramObj['targetData'];
	var callbackFunc = eval(paramObj['callbackFunc']);
	$.ajax({
		  url: targetUrl,
		  data:param,
		  method:'post',
		  dataType: 'jsonp',
		  success: function(data) {
			  callbackFunc(data);
		}
	});
}

/*
 * 테이블 초기화 스크립트
 * TableObj: 테이블 Object
 * LimitIdx: thead tr row 수 또는 thead 없을시 제목 tr의 row
 * */

util.tbl.initTbl = function(TableObj, LimitIdx){
	
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


util.tbl.initMsg = function(paramObj){
	
	var tblId = paramObj['tblId'];
	
	var cellCnt = parseInt(paramObj['cellCnt'],10);
	
	var tableObj = document.getElementById(tblId);
	var tableBody = tableObj.tBodies[0];
	var row = tableBody.insertRow();
	row.style.textAlign = 'center';
	row.insertCell(0);
	tableBody.rows[0].cells[0].colSpan = cellCnt;
	tableBody.rows[0].cells[0].style.textAlign = 'center';
	tableBody.rows[0].cells[0].innerHTML = '조회중입니다.....';
}

util.tbl.empty = function(paramObj){
	
	var tblId = paramObj['tblId'];
	var msg = paramObj['msg'];
	var cellCnt = parseInt(paramObj['cellCnt'],10);
	
	var tableObj = document.getElementById(tblId);
	var tableBody = tableObj.tBodies[0];
	var row = tableBody.insertRow();
	row.style.textAlign = 'center';
	row.insertCell(0);
	tableBody.rows[0].cells[0].colSpan = cellCnt;
	tableBody.rows[0].cells[0].style.textAlign = 'center';
	if(msg == undefined || msg == null || msg == ''){
		tableBody.rows[0].cells[0].innerHTML = '검색 결과가 없습니다.';
	}else{
		tableBody.rows[0].cells[0].innerHTML = msg;
	}
	
}

util.tbl.error = function(paramObj){
	
	var tblId = paramObj['tblId'];
	
	var cellCnt = parseInt(paramObj['cellCnt'],10);
	
	var tableObj = document.getElementById(tblId);
	var tableBody = tableObj.tBodies[0];
	var row = tableBody.insertRow();
	row.style.textAlign = 'center';
	row.insertCell(0);
	tableBody.rows[0].cells[0].colSpan = cellCnt;
	tableBody.rows[0].cells[0].style.textAlign = 'center';
	tableBody.rows[0].cells[0].innerHTML = '에러가 발생 했습니다. 관리자에게 문의 하세요.';
}

/*
 * el : 버튼 Object => this 넘겨주면 된다.
 * tblId : 테이블 아이디
 * 
 * */
util.tbl.delNode = function(paramObj){
	
	var rowLen = 0;
	var colsLen = 0;
	
	var btnObj = paramObj['el'];
	var tableObj = document.getElementById(paramObj['tblId']);
	var delIndex = btnObj.parentNode.parentNode.rowIndex;
	tableObj.deleteRow(delIndex);
	
	var tableHead = tableObj.tHead;
	var tableBody = tableObj.tBodies[0];
	
	if(tableHead != null && tableHead != undefined){
		colsLen = tableHead.rows[0].cells.length;
	}
	
	if(tableBody != null && tableBody != undefined){
		rowLen = tableBody.rows.length;
	}
	
	if(rowLen == 0){
		var row = tableBody.insertRow();
		row.insertCell(0);
		tableBody.rows[0].cells[0].innerHTML = "조회결과가 없습니다.";
		tableBody.rows[0].cells[0].colSpan = colsLen;
	}
}

util.tbl.delNoMsgNode = function(paramObj){
	
	var btnObj = paramObj['el'];
	var tableObj = document.getElementById(paramObj['tblId']);
	var pagingObj = document.getElementById(paramObj['pagingId']);
	var delIndex = btnObj.parentNode.parentNode.rowIndex;
	tableObj.deleteRow(delIndex);
	
	if(pagingObj != null && pagingObj != undefined && pagingObj != ""){
		var tableHead = tableObj.tHead;
		var tableBody = tableObj.tBodies[0];
		
		if(tableHead != null && tableHead != undefined){
			colsLen = tableHead.rows[0].cells.length;
		}
		
		if(tableBody != null && tableBody != undefined){
			rowLen = tableBody.rows.length;
		}
		
		if(rowLen == 0){
			pagingObj.innerHTML = "";
		}
	}
	
}

util.comm.setTel = function(TargetObj){
	var ChkStr = "1234567890";
	var StrLength = TargetObj.value.length;
	var StrTemp = "";
	var StrChar = "";
	
	for(var idx = 0; idx < StrLength; idx++){
		StrChar = TargetObj.value.substring(idx, idx + 1);
		
		if(ChkStr.indexOf(StrChar) >= 0){
			StrTemp += StrChar;
		}
	}
	
	if(StrTemp.length > 11){
		StrTemp = StrTemp.substring(0, 11);
	}
	
	if(StrTemp.length > 2){
		var FNum = "";
		var SNum = "";
		var TNum = "";
		
		if(StrTemp.substring(0, 2) == "01"){
			FNum = StrTemp.substring(0, 3);
			
			if(StrTemp.substring(3).length < 4){
				SNum = StrTemp.substring(3);
			}
			else if(StrTemp.substring(3).length < 8){
				SNum = StrTemp.substring(3, 6);
				TNum = StrTemp.substring(6);
			}
			else{
				SNum = StrTemp.substring(3, 7);
				TNum = StrTemp.substring(7);
			}
		}
		else if(StrTemp.substring(0, 2) == "02"){
			if(StrTemp.length > 10){
				StrTemp = StrTemp.substring(0, 10);
			}
	
			FNum = StrTemp.substring(0, 2);
			
			if(StrTemp.substring(2).length < 4){
				SNum = StrTemp.substring(2);
			}
			else if(StrTemp.substring(2).length < 7){
				SNum = StrTemp.substring(2, 4);
				TNum = StrTemp.substring(4);
			}
			else if(StrTemp.substring(2).length < 8){
				SNum = StrTemp.substring(2, 5);
				TNum = StrTemp.substring(5);
			}
			else{
				SNum = StrTemp.substring(2, 6);
				TNum = StrTemp.substring(6);
			}
		}
		else{
			FNum = StrTemp.substring(0, 3);
			
			if(StrTemp.substring(3).length < 4){
				SNum = StrTemp.substring(3);
			}
			else if(StrTemp.substring(3).length < 7){
				SNum = StrTemp.substring(3, 5);
				TNum = StrTemp.substring(5);
			}
			else if(StrTemp.substring(3).length < 8){
				SNum = StrTemp.substring(3, 6);
				TNum = StrTemp.substring(6);
			}
			else{
				SNum = StrTemp.substring(3, 7);
				TNum = StrTemp.substring(7);
			}
		}
		
		if(SNum.length > 0){
			FNum += "-";
		}
		
		if(TNum.length > 0){
			SNum += "-";
		}
		
		StrTemp = FNum + SNum + TNum;
	}
	
	TargetObj.value = StrTemp;
}

util.comm.setBirth = function(TargetObj){
	
	var ChkStr = "1234567890";
	var StrLength = TargetObj.value.length;
	var StrTemp = "";
	var StrChar = "";
	
	for(var idx = 0; idx < StrLength; idx++){
		StrChar = TargetObj.value.substring(idx, idx + 1);
		
		if(ChkStr.indexOf(StrChar) >= 0){
			StrTemp += StrChar;
		}else{
			TargetObj.value = StrTemp;
		}
	}
	
	var year,mon,day,result;
	
	if(StrTemp.length > 8){
		StrTemp = StrTemp.substring(0, 8);
	}
	
	if(StrTemp.length == 8){
		year = StrTemp.substring(0,4);
		mon = StrTemp.substring(4,6);
		day = StrTemp.substring(6,8);
		
		if(parseInt(mon,10) > 13){
			result = year;
		}else if(parseInt(day,10) > 31){
			result = year + "-" + mon;
		}else{
			result = year + "-" + mon + "-" + day;			
		}

		TargetObj.value = result;
	}
	
}


util.comm.compareTime = function(paramObj){
	
	var orgStime = paramObj['stime'];
		var orgEtime = paramObj['etime'];
		var status = paramObj['format'];
		
		if(status == 'hhmmss'){
			
			var shour = parseInt(orgStime.substring(0,2),10) * 3600;
	 		var smin = parseInt(orgStime.substring(2,4),10) * 60;
	 		var ssec = parseInt(orgStime.substring(4),10);
	 		
	 		var ehour = parseInt(orgEtime.substring(0,2),10) * 3600;
	 		var emin = parseInt(orgEtime.substring(2,4),10) * 60;
	 		var esec = parseInt(orgEtime.substring(4),10);
	 		
	 		var stime = shour+smin+ssec;
	 		var etime = ehour+emin+esec;
			
	 		return (etime >= stime)?true:false;
	 		
		}else{
			
			var shour = parseInt(orgStime.substring(0,2),10) * 3600;
	 		var smin = parseInt(orgStime.substring(2,4),10) * 60;
	 		
	 		var ehour = parseInt(orgEtime.substring(0,2),10) * 3600;
	 		var emin = parseInt(orgEtime.substring(2,4),10) * 60;
	 		
	 		var stime = shour+smin;
	 		var etime = ehour+emin;
	 		
	 		return (etime >= stime)?true:false;
	 		
		}
}

util.comm.compareDate = function(paramObj){
	
	var isSplit = paramObj['isSplit'];
		var split = paramObj['split'];
		var startDate = paramObj['startDate'];
		var endDate = paramObj['endDate'];
		var sDate,eDate,syear,smonth,sday,eyear,emonth,eday;
		
		if(isSplit){
			
			startDate = startDate.split(paramObj['split']);	
			endDate = endDate.split(paramObj['split']);
			
			syear = parseInt(startDate[0],10);
			smonth = parseInt(startDate[1],10) - 1;
			sday = parseInt(startDate[2],10);
			
			eyear = parseInt(endDate[0],10);
			emonth = parseInt(endDate[1],10) - 1;
			eday = parseInt(endDate[2],10);
			
			sDate = new Date(syear,smonth,sday).valueOf();
			eDate = new Date(eyear,emonth,eday).valueOf();
			
			return (eDate >= sDate)?true:false;
			
		}else{
			
			syear = parseInt(startDate.substring(0,4),10);
			smonth = parseInt(startDate.substring(4,6),10) - 1;
			sday = parseInt(startDate.substring(6),10);
			
			eyear = parseInt(endDate.substring(0,4),10);
			emonth = parseInt(endDate.substring(4,6),10) - 1;
			eday = parseInt(endDate.substring(6),10);
			
			sDate = new Date(syear,smonth,sday).valueOf();
			eDate = new Date(eyear,emonth,eday).valueOf();
			
			return (eDate >= sDate)?true:false;
			
		}
}

util.comm.selectedValue = function(node,val){
	
	for(var idx=0; idx<node.options.length; idx++){
		if(node.options[idx].value == val){
			node.selectedIndex = idx;
			break;
		}
	}
}

util.semester.fromToDisable = function(paramObj){
	
	var status = paramObj['checkVal'];
	var isDisplayMenu = paramObj['isDisplayMenu'];
	var startCalImg = document.getElementById(paramObj['startCalImg']);
	var endCalImg = document.getElementById(paramObj['endCalImg']);
	
	var defaultStartHour = paramObj['stime'].substring(0,2);
	var defaultStartMin = paramObj['stime'].substring(2,4);
	var defaultEndHour = paramObj['etime'].substring(0,2);
	var defaultEndMin = paramObj['etime'].substring(2,4);
	
	var defaultDate = paramObj['date'];
	
	var startNode = document.getElementById(paramObj['sNode']);
	var startHourSelNode = document.getElementById(paramObj['startHourSel']);
	var startMinSelNode = document.getElementById(paramObj['startMinSel']);
	
	var endNode = document.getElementById(paramObj['eNode']);
	var endHourSelNode = document.getElementById(paramObj['endHourSel']);
	var endMinSelNode = document.getElementById(paramObj['endMinSel']);
	
	if(status){
		
		startNode.value = MarkDate(defaultDate,'-');
		endNode.value = MarkDate(defaultDate,'-');
		
		util.comm.selectedValue(startHourSelNode,defaultStartHour);
		util.comm.selectedValue(endHourSelNode,defaultEndHour);
		
		if(!isDisplayMenu){
			startMinSelNode.value = defaultStartMin;
			endMinSelNode.value = defaultEndMin;
		}else{
			util.comm.selectedValue(startMinSelNode,defaultStartMin);
			util.comm.selectedValue(endMinSelNode,defaultEndMin);
		}
		
		startHourSelNode.disabled = false;
		startMinSelNode.disabled = false;
		endHourSelNode.disabled = false;
		endMinSelNode.disabled = false;
		
		startCalImg.style.display = "";
		endCalImg.style.display = "";
		
	}else{
		
		startHourSelNode.disabled = true;
		startMinSelNode.disabled = true;
		endHourSelNode.disabled = true;
		endMinSelNode.disabled = true;
		
		startCalImg.style.display = "none";
		endCalImg.style.display = "none";
		
		startNode.value = "";
		endNode.value = "";
		
		if(!isDisplayMenu){
			startHourSelNode.selectedIndex = 0;
			endHourSelNode.selectedIndex = 0;
		}else{
			startMinSelNode.selectedIndex = "";
			endMinSelNode.selectedIndex = "";
		}
		
	}
}

util.tbl.InitSelect = function(SelectObj, LimitIdx){
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
util.comm.signal = function(str){
  var re = /[~!@\#$%^&*\()\=+_']/gi;
  
  return re.test(str.value);
}

util.mask.name = function(str){
	
	var tempName = "";
	var resultName = "";
	if(str.length > 1){
		for(var i=0; i<str.length; i++){
			tempName = str.substring(i,i+1);
			if(i==1){
				tempName = "*";
			}
			resultName += tempName;
		}
	}
	
	return resultName;
}

util.mask.birthday = function(str){
	
	var tempName = "";
	var resultName = "";
	if(str.length > 0){
		for(var i=0; i<str.length; i++){
			tempName = str.substring(i,i+1);
			tempName = "*";
			resultName += tempName;
		}
	}
	
	return resultName;
}

util.mask.cell = function(str){
	
	var resultName = "";
	
	var cellPhone = str.replaceAll("-","");
	cellPhone = cellPhone.trim();
	
	if(cellPhone.length == 10){
		
		resultName = cellPhone.substring(0,3) + " - *** - " + cellPhone.substring(6);
		
	}else if(cellPhone.length == 11){
		resultName = cellPhone.substring(0,3) + " - **** - " + cellPhone.substring(7);
	}
	
	return resultName;
}

util.mask.tel = function(str){
	
	var resultName = "";
	var statusNum = "";
	
	var cellPhone = str.replaceAll("-","");
	cellPhone = cellPhone.trim();
	
	if(cellPhone.length >= 9){
		statusNum = cellPhone.substring(0,2)
	}
	
	if(cellPhone.length == 9){
		resultName = cellPhone.substring(0,2) + " - *** - " + cellPhone.substring(5);
	}else if(cellPhone.length == 10){
		if(statusNum == '02'){
			resultName = cellPhone.substring(0,2) + " - **** - " + cellPhone.substring(6);
		}else{
			resultName = cellPhone.substring(0,3) + " - *** - " + cellPhone.substring(6);
			
		}
	}else if(cellPhone.length == 11){
		resultName = cellPhone.substring(0,3) + " - **** - " + cellPhone.substring(7);
	}
	
	return resultName;
}

util.mask.account = function(str){
	
	var resultName = "";
	var tempName = "";
	var account = str.replaceAll("-","");
	account = account.trim();
	
	if(account.length >= 5){
		resultName = account.substring(0,4);
		for(var i=4; i<account.length; i++){
			tempName += "*";
		}
		resultName = resultName+tempName;
	}
	
	return resultName;
}

util.comm.emailReg = function(Str){
	var reg = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(reg.test(Str)){
		return true;
	}else{
		return false;
	}
}

util.comm.fileCheck = function (FileName){
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
		}
	}
	
	return false;
}