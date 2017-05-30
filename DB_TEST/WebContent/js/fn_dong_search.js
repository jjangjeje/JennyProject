function fn_pop_dongView(){
	
	fn_initDongVal();
	$("#pop_dong_view").bPopup({modalClose:false});
}

function fn_initDongVal(){
	
	if(GetObject("dongTypeCd") != null){
		GetObject("dongTypeCd").value = "";
	}
	
	if(GetObject("dongTypeName") != null){
		GetObject("dongTypeName").value = "";
	}
	
	fn_initBtn();
}

function fn_initBtn(){
	if(GetObject("dong_searchList_btn") != null){
		GetObject("dong_searchList_btn").className = "code_btn_on";
	}
	
	if(GetObject("dong_searchMap_btn") != null){
		GetObject("dong_searchMap_btn").className = "code_btn_off";
	}
	
	fn_initDongListArea();
}

function fn_initTypeArea(type){
	if(type == 'Y'){
		GetObject("gugan_show_list").style.display="";
		GetObject("gugan_show_map").style.display="none";
	}else{
		GetObject("gugan_show_list").style.display="none";
		GetObject("gugan_show_map").style.display="";
	}
		
}

function fn_initMapArea(){
	fn_initDongListArea('N');
	$("#parentDongTag").children().remove();
	fn_initGuganListArea();
	GetObject("gugan_show_map").style.display="";
	GetObject("gugan_show_list").style.display="none";
}

function fn_initDongListArea(){
	fn_initTypeArea('Y');
	$("#parentDongTag").children().remove();
	fn_initGuganListArea();
}

function fn_initGuganListArea(){
	$("#gugan_show_list").children().remove();
	var htmlBlock = "";
	htmlBlock = "<div class='show_txt'>검색결과가 없습니다.</div>";
	$("#gugan_show_list").append(htmlBlock);
}

function fn_dongType(){
	var paramObj = {
			'targetUrl':rootPath+'/gis/dongList.do',
			'targetData':{},
			'callbackFunc':'fn_dongTypeCallback'
	};
	
	util.func_ajax(paramObj);
}

function fn_dongTypeCallback(data){
	
	$("#parentDongTag").children().remove();
	var htmlBlock = "";
	
	if(data.result){
		var list = data.dongList;
		
		if(list.length>0){
			htmlBlock = "";
			for(var i=0; i<list.length; i++){
				var item = list[i];
				htmlBlock += '<li>';
				htmlBlock += '<a href="javascript:void(0)" onclick="javascript:fn_selectDong(\''+item.cd+'\',\''+item.name+'\')">'+item.name+'</a>';
				htmlBlock += '</li>';
			}
			
			$("#parentDongTag").append(htmlBlock);
			$("#dongType_view").bPopup({modalClose:false});
			return;
		}else{
			htmlBlock += '<li>결과가 없습니다.</li>';
			$("#parentDongTag").append(htmlBlock);
			$("#dongType_view").bPopup({modalClose:false});
			return;
		}
	}else{
		
		GetObject("agree_alert_content").innerHTML = data.errMsg;
		$("#agree_alert_view").bPopup({modalClose:false});
		return;
	}
}

function fn_selectDong(dongCd,dongName){
	
	if(GetObject("dongTypeCd") != null){
		GetObject("dongTypeCd").value=dongCd;
	}
	if(GetObject("dongTypeName") != null){
		GetObject("dongTypeName").value=dongName;
	}
	
	var popupNode = $("#dongType_view").bPopup({modalClose:false});
	popupNode.close();
}

function fn_searchType(typeCode){
	
	if(ObjValueLength("dongTypeCd") == 0 || ObjValueLength("dongTypeName") == 0 ){
		GetObject("agree_alert_content").innerHTML = "동을 검색해 주세요.";
		$("#agree_alert_view").bPopup({modalClose:false});
		return;
	}
	
	if(typeCode == 'Y'){
		fn_initTypeArea(typeCode);
		GetObject("dong_searchList_btn").className = "code_btn_on";
		GetObject("dong_searchMap_btn").className = "code_btn_off";
		fn_searchTypeList(ObjValue("dongTypeCd"));
	}else{
		fn_initMapArea();
		GetObject("dong_searchList_btn").className = "code_btn_off";
		GetObject("dong_searchMap_btn").className = "code_btn_on";
		fn_searchTypeMap(ObjValue("dongTypeCd"));
	}
}

function fn_searchTypeList(val){
	var paramObj = {
			'targetUrl': rootPath+'/gis/gisList.do',
			'targetData':{'dongCode':val},
			'callbackFunc':'fn_searchTypeListCallback'
	};
	
	util.func_ajax(paramObj);
}

function fn_searchTypeListCallback(data){
	
	$("#gugan_show_list").children().remove();
	var htmlBlock = "";
	
	if(data.result){
		
		var list = data.gisList;
		
		if(list.length > 0 ){
			
			htmlBlock = "";
			htmlBlock += "<ul>";
			for(var i=0; i<list.length; i++){
				var item = list[i];
				if(item.gubun != '1'){
					htmlBlock += '<li>';
					htmlBlock += '<a href="javascript:void(0)" onclick="javascript:fn_selectGugan(\''+item.dongCode+'\',\''+item.lineId+'\',\''+item.lineName+'\')">'+item.lineName+'</a>';
					htmlBlock += '</li>';	
				}
			}
			htmlBlock += "</ul>";
			$("#gugan_show_list").append(htmlBlock);
			return;
			
		}else{
			htmlBlock = "<div class='show_txt'>검색결과가 없습니다.</div>";
			$("#gugan_show_list").append(htmlBlock);
			return;
		}
		
	}else{
		GetObject("agree_alert_content").innerHTML = data.errMsg;
		$("#agree_alert_view").bPopup({modalClose:false});
		return;
	}
	
}

function fn_selectGugan(dongCd,lineId,lineName){
	GetObject("Dong_Cd").value=dongCd;
	GetObject("Line_Id").value=lineId;
	
	GetObject("Dong").value = ObjValue("dongTypeName");
	GetObject("Line").value = lineName;
	var dongPopup = $("#pop_dong_view").bPopup();
	dongPopup.close();
}

function fn_inputDataInfoWindow(){
	
	var dongCodeArr = $("input[name^=marker_dongCode_]");
	var lineIdArr = $("input[name^=marker_lineId_]");
	var lineNameArr = $("input[name^=marker_lineName_]");
	
	if(dongCodeArr.length > 0){
		for(var i=0; i<dongCodeArr.length; i++){
			dongCodeArr[i].remove();
		}
	}
	
	if(lineIdArr.length > 0){
		for(var i=0; i<lineIdArr.length; i++){
			lineIdArr[i].remove();
		}
	}
	
	if(lineNameArr.length > 0){
		for(var i=0; i<lineNameArr.length; i++){
			lineNameArr[i].remove();
		}
	}
	
}

function fn_searchTypeMap(val){
	
	var paramObj = {
			'targetUrl': rootPath+'/gis/gisList.do',
			'targetData':{'dongCode':val},
			'callbackFunc':'fn_searchTypeMapCallback'
	};
	
	util.func_ajax(paramObj);
}

function fn_searchTypeMapCallback(data){
	
	if(data.result){
		
		//input data init
		fn_inputDataInfoWindow();
		
		var points = [];
		var markers = [];
		var infoWindows = [];
		
		var list = data.gisList;
		var centerXcode,centerYcode; 
		if(list.length > 0){
			
			for(var i=0; i<list.length; i++){
				var item = list[i];
				if(item.gubun != '1'){
					
					if(item.gisYCode != null && item.gisYCode != '' && item.gisYCode != undefined){
						if(item.gisXCode != null && item.gisXCode != '' && item.gisXCode != undefined){
							points.push(
									{	
										'title':item.lineName,
										'dongCode':item.dongCode,
										'lineId':item.lineId,
										'lineName':item.lineName,
										'latlng':new daum.maps.LatLng(item.gisYCode, item.gisXCode)
									}
							);
						}
					}
					
				}else{
					var centerValFlag = true;
					//중심좌표	
					if(list[0].gisXCode == null || list[0].gisXCode == 'null' || list[0].gisXCode == undefined){
						centerValFlag = false;
					}else{
						centerXcode = list[0].gisXCode;
					}
					if(list[0].gisYCode == null || list[0].gisYCode == 'null' || list[0].gisYCode == undefined){
						centerValFlag = false;
					}else{
						centerYcode = list[0].gisYCode;
					}
					
					// 중심 좌표가 없을 시 그다음 데이터로 중심 좌표 설정
					if(!centerValFlag){
						if(list.length > 1){
							var nextXcode = list[1].gisXCode;
							var nextYcode = list[1].gisYCode;
							
							if(nextXcode != null && nextXcode != undefined && nextXcode != ''){
								centerXcode = list[1].gisXCode;
							}else{
								centerXcode = "127.03640878200531";
							}
							
							if(nextYcode != null && nextYcode != undefined && nextYcode != ''){
								centerYcode = list[1].gisYCode;
							}else{
								centerYcode = "37.56337469949442";
							}
							
						}else{
							GetObject("agree_alert_content").innerHTML = '데이터가 없습니다.';
							$("#agree_alert_view").bPopup({modalClose:false});
							return;
						}
					}
					
				}
			}
			
			if(points.length == 0){
				GetObject("agree_alert_content").innerHTML = '구역 데이터가 없습니다.';
				$("#agree_alert_view").bPopup({modalClose:false});
				return;
			}
			
		}else{
			GetObject("agree_alert_content").innerHTML = '데이터가 없습니다.';
			$("#agree_alert_view").bPopup({modalClose:false});
			return;
		}
		
		var container = GetObject('map');
		var options = { //지도를 생성할 때 필요한 기본 옵션
				center: new daum.maps.LatLng(centerYcode, centerXcode), //지도의 중심좌표.
				level: 2 
		};
		map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
		
		map.setCenter(new daum.maps.LatLng(centerYcode, centerXcode));
		
		var bounds = new daum.maps.LatLngBounds();
		
		for (var i = 0; i < points.length; i++) {
			
			var marker = new daum.maps.Marker({
				position : points[i]['latlng'],
				title : points[i]['title'],
				clickable:true
			});
			
			markers.push(marker);
		}
		
		for (var i = 0; i < markers.length; i++) {
			
			markers[i].setMap(map);
		    bounds.extend(markers[i].getPosition());
			
		    var dataContent = '<div style="padding:5px;">'+markers[i].getTitle()+'</div>';
		    dataContent += '<input type="hidden" name="marker_dongCode_'+i+'" id="marker_dongCode_'+i+'" value="'+points[i].dongCode+'"/>';
		    dataContent += '<input type="hidden" name="marker_lineId_'+i+'" id="marker_lineId_'+i+'" value="'+points[i].lineId+'"/>';
		    dataContent += '<input type="hidden" name="marker_lineName_'+i+'" id="marker_lineName_'+i+'" value="'+points[i].lineName+'"/>';
		    
		    var infowindow = new daum.maps.InfoWindow({
				position:markers[i].getPosition(),
				content:dataContent,
				removable:true
		     }); 
		    
		    infoWindows.push(infowindow);
		    
		    var marker = markers[i];
		    
		    daum.maps.event.addListener(marker, 'click', (function(marker, i) {
  				
 				 return function(){
 					var markerTile = marker.getTitle();
 					if(confirm(markerTile+" 선택 하시겠습니까?")){
 						GetObject("Dong_Cd").value =  ObjValue("marker_dongCode_"+i);
 						GetObject("Line_Id").value =  ObjValue("marker_lineId_"+i);
 						GetObject("Line").value = ObjValue("marker_lineName_"+i);
 						GetObject("Dong").value = ObjValue("dongTypeName");
 						
 						var modalpop = $("#pop_dong_view").bPopup({modalClose:false});
 						modalpop.close();
 						
 					}else{
 						return;
 					}
 				 }
 			 })(marker,i));
		    
		    
		}
		
		map.setBounds(bounds);
					   
		for(var i=0; i<infoWindows.length; i++){
			infoWindows[i].open(map,markers[i]);
		}
		
	}else{
		GetObject("agree_alert_content").innerHTML = data.errMsg;
		$("#agree_alert_view").bPopup({modalClose:false});
		return;
	}
	
}

function fn_zoomIn(){
	
	var level = map.getLevel();
	
	if(parseInt(level,10) > 5){
    	GetObject("agree_alert_content").innerHTML = '더 이상 축소 할 수 없습니다.';
		$("#agree_alert_view").bPopup({modalClose:false,onClose:function(){map.setLevel(5);}});
    	return;
    }else{
    	map.setLevel(map.getLevel() - 1);
    }
}

function fn_zoomOut(){
	
var level = map.getLevel();
	
	if(parseInt(level,10) > 5){
		GetObject("agree_alert_content").innerHTML = '더 이상 축소 할 수 없습니다.';
		$("#agree_alert_view").bPopup({modalClose:false,onClose:function(){map.setLevel(5);}});
    	return;
    }else{
    	map.setLevel(map.getLevel() + 1);
    }

}