/**
 * 구분 레이어
 */
function fn_Date_Type()
{
	$("#pop_date_type").bPopup({modalClose:false});
}

/**
 * 시작 시간 레이어
 */
function StartTimeClick()
{
	$("#pop_time_view").bPopup({modalClose:false});
}

/**
 * 시작 분 레이어
 */
function StartMinClick()
{
	$("#pop_min_view").bPopup({modalClose:false});
}

/**
 * 종료 시간 레이어
 */
function fn_EndTime()
{
	$("#pop_endTime_view").bPopup({modalClose:false});
}

/**
 * 차량 선택
 */
function fn_car()
{
	$("#pop_car_view").bPopup({modalClose:false});
}

/**
 * 결제 진행 취소시 값 가져올시
 * @param gunbun
 */
function fn_GubunCdExist(gunbun){
	switch(gunbun){
		case 'V0000008' :   $('#Start_Time').removeAttr('disabled');
							$('#Start_Min').removeAttr('disabled');
							$('#End_Time').removeAttr('disabled');
							$('#Start_Min').attr('onclick','StartMinClick()');
							break;
		case 'V0000004' :   $('#End_Time').attr('disabled',true);
							$('#Start_Min').attr('onclick','');
							break;
		case 'V0000005' :   $('#Start_Time').attr('disabled',true);
							$('#Start_Min').attr('disabled',true);
							$('#End_Time').attr('disabled',true);
							$('#Start_Min').attr('onclick','').unbind('click');
							break;
		case 'V0000006' :   $('#Start_Time').attr('disabled',true);
							$('#Start_Min').attr('disabled',true);
							$('#End_Time').attr('disabled',true);
							$('#Start_Min').attr('onclick','').unbind('click');
							break;
	}
}

/**
 * 구분 선택
 * @param gun_cd
 * @param gun_value
 */
function fn_gubun(gun_cd,gun_value,gun_name) 
{
	var frm = document.frmReserve;
	
	if(gun_cd == 'V0000008')		// 시간주차
	{
		$('#Start_Time').removeAttr('disabled');
		$('#Start_Min').removeAttr('disabled');
		$('#End_Time').removeAttr('disabled');
		$('#Start_Min').attr('onclick','StartMinClick()');
		
		$('#gubun').val(gun_cd);
		$('#price').val(gun_value);
		$('#Date_Type').val(gun_name);
		
		$('#Use_Date_1').val($('#Start_Cal').val());
		$('#Use_Date_2').val($('#End_Cal').val());
		$('#Use_Time_1').val($('#Start_Time').val());
		$('#Use_Time_2').val($('#End_Time').val());
		$('#Use_Min_1').val($('#Start_Min').val());
		$('#Use_Min_2').val($('#End_Min').val());
	}
	else if(gun_cd == 'V0000004')		// 1일 주차
	{
		$('#End_Time').attr('disabled',true);
		$('#Start_Min').attr('onclick','');
				
		$('#gubun').val(gun_cd);
		$('#price').val(gun_value);
		$('#Date_Type').val(gun_name);
		
		$('#Start_Min').val('00');
		$('#Use_Date_1').val($('#Start_Cal').val());
		$('#Use_Date_2').val($('#End_Cal').val());
		$('#Use_Time_1').val('09');
		$('#Use_Time_2').val('19');
		$('#Use_Min_1').val('00');
		$('#Use_Min_2').val('00');
	}
	else if(gun_cd == 'V0000005')		// 주간 주차
	{
		$('#Start_Time').attr('disabled',true);
		$('#Start_Min').attr('disabled',true);
		$('#End_Time').attr('disabled',true);
		$('#Start_Min').attr('onclick','').unbind('click');
		
		$('#gubun').val(gun_cd);
		$('#price').val(gun_value);
		$('#Date_Type').val(gun_name);
		
		$('#Use_Date_1').val($('#Start_Cal').val());
		$('#Use_Date_2').val($('#End_Cal').val());
		$('#Use_Time_1').val('09');
		$('#Use_Time_2').val('19');
		$('#Use_Min_1').val('00');
		$('#Use_Min_2').val('00');
	}
	else if(gun_cd == 'V0000006')		// 월간주차
	{
		$('#Start_Time').attr('disabled',true);
		$('#Start_Min').attr('disabled',true);
		$('#End_Time').attr('disabled',true);
		$('#Start_Min').attr('onclick','').unbind('click');
		
		$('#gubun').val(gun_cd);
		$('#price').val(gun_value);
		$('#Date_Type').val(gun_name);
		
		$('#Use_Date_1').val($('#Start_Cal').val());
		$('#Use_Date_2').val($('#End_Cal').val());
		$('#Use_Time_1').val('09');
		$('#Use_Time_2').val('19');
		$('#Use_Min_1').val('00');
		$('#Use_Min_2').val('00');
	}
	else
	{
		$('#Start_Time').removeAttr('disabled');
		$('#Start_Min').removeAttr('disabled');
		$('#End_Time').removeAttr('disabled');
	}
	
	fn_calc(gun_value);
	fn_date('09','pop_date_type','time');
}

/**
 * 레이어 창 닫기
 * @param id
 */
function LearClose(id)
{
	if(id !='')
	{
		var pop = $('#'+id).bPopup();
		pop.close();
	}
}

/**
 * 종료일시 표시
 */
function fn_date(day,str,day_type)
{ 
	if(DateCompare($('#Start_Cal').val()))
	{
		if($('#gubun').val() == 'V0000008')			// 시차
		{
			$('#End_Cal').val($('#Start_Cal').val());
						
			if(day_type =='time')
			{
				$('#Start_Time').val(day);
				$('#End_Min').val($('#Start_Min').val());
							
				if(Number($('#Start_Time').val()) >= Number($('#End_Time').val()))
				{
					$('#End_Time').val(Number($('#Start_Time').val())+1);	
				}				
			}
			else if(day_type =='min')
			{
				$('#Start_Min').val(day);
				$('#End_Min').val($('#Start_Min').val());
			}
			
			fn_BetweenTime($('#End_Time').val());
			
			$('#Use_Date_1').val($('#Start_Cal').val());
			$('#Use_Date_2').val($('#End_Cal').val());
			$('#Use_Time_1').val($('#Start_Time').val());
			$('#Use_Time_2').val($('#End_Time').val());
			$('#Use_Min_1').val($('#Start_Min').val());
			$('#Use_Min_2').val($('#End_Min').val());
		}
		else if($('#gubun').val() == 'V0000004')	// 1일 
		{
			$('#End_Cal').val($('#Start_Cal').val());
			$('#End_Time').val('19');
			$('#End_Min').val('00');
			$('#Start_Time').val(day);			
			
			$('#Use_Date_1').val($('#Start_Cal').val());
			$('#Use_Date_2').val($('#End_Cal').val());
			$('#Use_Time_1').val($('#Start_Time').val());
			$('#Use_Time_2').val('19');
			$('#Use_Min_1').val($('#Start_Min').val());
			$('#Use_Min_2').val('00');
		}
		else if($('#gubun').val() == 'V0000005')	// 주간
		{
			$('#End_Cal').val(
								fn_date_calc($('#gubun').val(),$('#Start_Cal').val())
							 );
			$('#Start_Time').val('09');
			$('#Start_Min').val('00');
			$('#End_Time').val('19');
			$('#End_Min').val('00');
			
			$('#Use_Date_1').val($('#Start_Cal').val());
			$('#Use_Date_2').val($('#End_Cal').val());
			$('#Use_Time_1').val('09');
			$('#Use_Time_2').val('19');
			$('#Use_Min_1').val('00');
			$('#Use_Min_2').val('00');
		}
		else if($('#gubun').val() == 'V0000006')	// 월간
		{
			$('#End_Cal').val(
					fn_date_calc($('#gubun').val(),$('#Start_Cal').val())
				 );
			$('#Start_Time').val('09');
			$('#Start_Min').val('00');
			$('#End_Time').val('19');
			$('#End_Min').val('00');
			
			$('#Use_Date_1').val($('#Start_Cal').val());
			$('#Use_Date_2').val($('#End_Cal').val());
			$('#Use_Time_1').val('09');
			$('#Use_Time_2').val('19');
			$('#Use_Min_1').val('00');
			$('#Use_Min_2').val('00');
		}else{
			alert('구분을 먼저 선택해 주세요');
			return;
		}
	}else{
		alert('현재일 보다 뒤일순 없습니다.');
		return;
	}
	
	LearClose(str);
}


/**
 * 시간 주차시 가격 변동
 * @param time
 */
function fn_BetweenTime(time)
{
	var val = Number(time) - Number($('#Start_Time').val());
	$('#Use_Time_2').val(time);
	$('#End_Time').val(time);
	
	if(val > 0)
	{
		fn_calc(
				Number($('#price').val())*val
				);
	}
	else
	{
		alert('이용시작 시간 보다 뒤일 순 없습니다.');
		$('#End_Time').val(Number($('#Start_Time').val())+1);		
	}
	
	LearClose('pop_endTime_view');
}

/**
 * 날짜 비교
 * @param Start_Date
 * @returns {Boolean}
 */
function DateCompare(Start_Date)
{
	var Today = new Date().format();
	var day   = Start_Date.split("-");
	var day2  = Today.split("-");
	
	var To_day = new Date(day2[0],Number(day2[1])-1,day2[2]);
	var ChangeDay = new Date(day[0],Number(day[1])-1,day[2]);
	var BetweenDay = ChangeDay.getTime() - To_day.getTime();
	
	if(BetweenDay >= 0)
	{
		return true;
	}
	else
	{
		return false;
	}	
}

/**
 * 날짜 포멧
 * @returns {String}
 */
Date.prototype.format = function()
{
	var yyyy = this.getFullYear().toString();
	var mm	 = (this.getMonth()+1).toString();
	var dd	 = this.getDate().toString();
	
	return yyyy +"-"+(mm[1] ? mm : '0'+mm[0]) + "-" + (dd[1] ? dd : '0'+dd[0]);
}

/**
 * 날짜 포멧2
 * @returns {String}
 */
Date.prototype.format2 = function()
{
	var yyyy = this.getFullYear().toString();
	var mm	 = (this.getMonth()+1).toString();
	var dd	 = this.getDate().toString();
	var hh   = this.getHours().toString();
	var mi   = this.getMinutes().toString();
		
	return yyyy +"-"+(mm[1] ? mm : '0'+mm[0]) + "-" + (dd[1] ? dd : '0'+dd[0]) + "-" + hh +"-" + mi;
}

/**
 * 주간,월간 계산
 */
function fn_date_calc(gubun,start_date)
{
	var todate = start_date.split("-");
	var BigDay = new Date(todate[0],Number(todate[1])-1,todate[2]);
	
	if(gubun == 'V0000005'){
		var num = Number(todate[2])+7;
		BigDay.setDate(num);
		
		return BigDay.format();
	}
	else
	{
		BigDay = new Date(todate[0],todate[1],Number(todate[2])-1);		
		return BigDay.format();
	}
	
}

/**
 * 차 선택
 */
function fn_myCar(car_id,car_no)
{
	$('#Car_Id').val(car_id);
	$('#Car_No').val(car_no);
	$('#MyCar').val(car_no);
	
	LearClose('pop_car_view');
}

/**
 * 방문 주차 가격
 * @param price
 */
function fn_calc(price)
{
	$('#Sum_Price').empty();
	if(price !='undefined')	
		$('#Sum_Price').append(Comma(price));
	
	$('#tot_price').val(price);
}

/**
 * 초기화
 */
function fn_reload()
{
	document.frmReserve.reset();
}

//꼼마,천단위
function Comma(n){
	var result = String(n);
	return result.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')+'원';
};

/**
 * 배정위치 검색
 */
function fn_LineSearch()
{
	var part = $('#SelectDong').val().split("^");
	if($('#SelectDong').val() != '')
	{
		var param = 'Dong='+part[0];
		$.ajax({
			type : 'post',
			url  : 'LineSearch.do',
			data : param,
			dataType : 'html',
			success:function(html){
				$('#pop_input_choice').empty();
				$(html).appendTo('#pop_input_choice');
			}
		});
	}
	else
	{
		alert('행정동을 선택해 주세요');
		return;
	}
}
/**
 * 행정동 및 배정 위치 선택
 * @param id
 * @param name
 */
function fn_choice(id,name)
{
	var part = $('#SelectDong').val().split("^");
	$('#Dong_Cd').val(part[0]);
	$('#Dong').val(part[1]);
	
	$('#Line_Id').val(id);
	$('#Line').val(name);
	
	var pop = $("#pop_code_view").bPopup();
	pop.close();
}

/**
 * 결제 페이지
 */
function fn_payment_page()
{
	var frm = document.frmReserve;
	
	if(reserveCheck())
	{
		frm.action = 'reserve_payment.do';
		frm.method = 'post';
		frm.submit();
	}	
}

/**
 * 날짜 비교2
 * @param Start_Date
 * @returns {Boolean}
 */
function DateCompare2(Start_Date,Start_Time,Start_Min)
{
	var Today = new Date().format2();
	var day = Today.split("-");
	
	var StartDay = Start_Date.split("-");
	
	var To_Day = new Date(day[0],Number(day[1])-1,day[2],day[3],day[4]);
	var ChangeDay = new Date(StartDay[0],Number(StartDay[1])-1,StartDay[2],Start_Time,Start_Min);
	var BetweenDay = ChangeDay.getTime() - To_Day.getTime();
	
	if(BetweenDay > 0)
	{
		return true;
	}
	else
	{
		return false;
	}	
}


/**
 * 결제 체크
 * @returns {Boolean}
 */
function reserveCheck()
{
	if(DateCompare2($('#Start_Cal').val(),$('#Start_Time').val(),$('#Start_Min').val()))
	{
		var frm = document.frmReserve;
		
		if(frm.Date_Type.value =='')
		{
			alert('구분을 선택을 하셔야 합니다.');
			return;
		}
		else if(frm.Dong.value =='')
		{
			alert('행정동을 선택해 주셔야 합니다.');
			return;
		}
		else if(frm.Line.value == '')
		{
			alert('배정위치를 선택해 주셔야 합니다.');
			return;
		}
		else if(frm.MyCar.value =='')
		{
			alert('차량을 선택해 주셔야 합니다.');
			return;
		}
		else
		{
			return true;
		}
	}
	else
	{
		alert('이용시작일시가 현재시간 보다 늦습니다.');
		return;
	}
}












