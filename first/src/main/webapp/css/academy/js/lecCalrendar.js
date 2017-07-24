/**
 * 달력
 */
function _init(yy,mon){
	$('#SCHEDULE_CALENDAR').empty();

	var html = '';
	var weekDay = ['일','월','화','수','목','금','토'];
	var prev;
	var next;

	html += '<div class="month">';
	//년
	html += CurrentMon(yy,mon);
	html += PrevMon(yy,mon);
	html += NextMon(yy,mon);
	html += '</div>';

	// 요일
	html += '<div class="calendar-wrap">';
	html += 	'<table class="calendar-type" summary="연도, 월, 요일, 일이 표기되어 있음">';
	html += 		'<caption class="blind">날짜선택</caption>';
	html += 		'<colgroup>';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 			'<col style="width:14.2%;">';
	html += 		'</colgroup>';
	html +=			'<tbody>';
	html +=				'<tr>';
	for(var i=0; i < weekDay.length;i++){
		html += '<th scope="col">'+weekDay[i]+'</th>';
	}
	html +=				'</tr>';

	// 일자
	html += CalDay(yy,mon);
	html += 		'</tbody>';
	html += 	'</table>';
	html += 	'<div class="color-info">';
	html += 		'<span class="seatcolor color10"><i></i>신청 불가한 날짜</span>';
	html += 		'<span class="seatcolor color11"><i></i>신청 가능한 날짜</span>';
	html += 	'</div>';
	html += '</div>';

	$(html).appendTo('#SCHEDULE_CALENDAR');
}

function CurrentMon(yy,mon){
	var rs ='';
	var curMon = '';
	var ymd;

	if(yy == '' && mon ==''){
		ymd = new Date();

		if((ymd.getMonth()+1) < 10){
			curMon = '0'+(ymd.getMonth()+1);
		}else{
			curMon = ymd.getMonth()+1;
		}

		rs = '<span>'+ymd.getFullYear()+'.'+ curMon+'</span>';
	}else{
		ymd = new Date(yy,Number(mon)-1,'01');

		if((ymd.getMonth()+1) < 10){
			curMon = '0'+(ymd.getMonth()+1);
		}else{
			curMon = (ymd.getMonth()+1);
		}

		rs =  '<span>'+ymd.getFullYear()+'.'+curMon+'</span>';
	}

	return rs;
}

function ToMon(yy,mon){
	var ymd;
	var rs ='';
	var curMon ='';

	if(yy == '' && mon ==''){
		ymd = new Date();

		if((ymd.getMonth()+1) < 10){
			curMon = '0'+(ymd.getMonth()+1);
		}else{
			curMon = ymd.getMonth()+1;
		}

		rs = ymd.getFullYear()+curMon;
	}else{
		ymd = new Date(yy,Number(mon)-1,'01');

		if((ymd.getMonth()+1) < 10){
			curMon = '0'+(ymd.getMonth()+1);
		}else{
			curMon = ''+(ymd.getMonth()+1);
		}

		rs =  ymd.getFullYear()+curMon;
	}

	return rs;
}

// 전월 선택
function PrevMon(yy,mon){
	var rs ='';
	var ymd;
	var changeYear = '';
	var changeMon  = '';

	if(yy == '' && mon == ''){
		ymd = new Date();
		rs += '<button type="button" class="btn-last" onclick="ChangeMon(\''+ymd.getFullYear()+'\',\''+ymd.getMonth()+'\')";>';
		rs += '<span class="blind">이전달</span>';
		rs += '</button>';
	}else{
		ymd = new Date(yy,Number(mon)-1,'01');
		changeMon  = ymd.getMonth();
		changeYear = ymd.getFullYear();
		if(changeMon == '0'){
			changeYear = ymd.getFullYear() -1;
			changeMon  = '12';
		}
		rs += '<button type="button" class="btn-last" onclick="ChangeMon(\''+changeYear+'\',\''+ changeMon +'\')";>';
		rs += '<span class="blind">이전달</span>';
		rs += '</button>';
	}

	return rs;
}

// 다음월 선택
function NextMon(yy,mon){
	var rs ='';
	var ymd;
	var changeYear = '';
	var changeMon  = '';

	if(yy == '' && mon == ''){
		ymd = new Date();
		rs += '<button type="button" class="btn-next" onclick="ChangeMon(\''+ymd.getFullYear()+'\',\''+(ymd.getMonth()+2)+'\')";>';
		rs += '<span class="blind">다음달</span>';
		rs += '</button>';
	}else{
		ymd = new Date(yy,Number(mon)+1,'01');
		changeMon  = ymd.getMonth();
		changeYear = ymd.getFullYear();
		if(changeMon == '0'){
			changeYear = ymd.getFullYear() -1;
			changeMon  = '12';
		}
		rs += '<button type="button" class="btn-next" onclick="ChangeMon(\''+changeYear+'\',\''+ changeMon +'\')";>';
		rs += '<span class="blind">다음달</span>';
		rs += '</button>';
	}

	return rs;
}

// 월 변경시
function ChangeMon(yy,mon){
	var tempMon   = mon;
	_init(yy,mon);

	if(Number(tempMon) < 10){
		tempMon = '0'+mon;
	}
	fn_setCalrendar(yy+tempMon);
}


// 날짜 계산
function CalDay(yy,mon){
	var result ='';
	var j =1;
	var dd ='';

	result += '<tr>';
	for(var i=1;i<=42;i++){
		if(i >=(CalFirstWeek(yy,mon)+1) && i <=Number(CalFirstWeek(yy,mon)+CalLastDay(yy,mon))){
			if(j < 10){
				dd ='0'+j;
			}else{
				dd = ''+j;
			}

			if(Number(DayLocation()) == Number(j)){
				result += '<td id="'+ToMon(yy,mon)+dd+'"><span>'+j+'</span></td>';
			}else{
				if(i%7 == 1){
					result += '<td class="red" id="'+ToMon(yy,mon)+dd+'"><span>'+j+'</span></td>';
				}else if(i%7 == 0){
					result += '<td id="'+ToMon(yy,mon)+dd+'"><span>'+j+'</span></td>';
				}else{
					result += '<td id="'+ToMon(yy,mon)+dd+'"><span>'+j+'</span></td>';
				}
			}
			j++;
		}else{
			result += '<td><span> </span></td>';
		}

		if(i%7 == 0){
			result += '</tr><tr>';
		}

		if(i == 42){
			result += '</tr>';
		}
	}
	return result;
}

// 날짜 해당 월에 1일에 대한 요일
function CalFirstWeek(yy,mon){
	var d = new Date();
	if(mon == ''){
		return new Date(d.getFullYear(),d.getMonth()).getDay();
	}else{
		return new Date(yy,mon-1).getDay();
	}
}

// 날짜 해당 마지막날에 대한 요일
function CalLastWeek(){
	var d = new Date();

	return new Date(d.getFullYear(),d.getMonth()+1,0).getDay();
}

// 해당 월에 마지막날짜
function CalLastDay(yy,mon){
	var d = new Date();
	if(mon ==''){
		return new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
	}else{
		return new Date(yy,mon,0).getDate();
	}
}

// 오늘 날짜 구하기
function DayLocation(){
	var ymd = new Date();
	return ymd.getDate();
}