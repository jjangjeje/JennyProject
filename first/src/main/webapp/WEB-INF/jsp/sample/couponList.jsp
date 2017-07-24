<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no">
<meta name="Keywords" content="">
<meta name="Description" content="">
<title>국립아시아문화전당</title>
<link rel="stylesheet" type="text/css" href="../css/academy/general.css">
<link rel="stylesheet" type="text/css" href="../css/jquery-ui-1.10.3.custom.css">

<script type="text/javascript" src="../js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="../js/fn_academy.js"></script>
<script type="text/javascript" src="../js/security.js"></script>
<script type="text/javascript" src="../js/cmm.js"></script>
<script type="text/javascript" src="../js/lectureUtil.js"></script>
<script type="text/javascript" src="../js/fn_academy_payment.js"></script>
<script type="text/javascript" src="../js/fn_memberShip.js"></script>
<script type="text/javaScript" src="../js/jquery.bpopup.min.js"></script>
<script type="text/javaScript" src="../js/placeholders.min.js"></script>
<script type="text/javascript" src="../js/fn_sale.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script><!-- 탭 추가0412 -->
<style type="text/css">
.book-board table tbody td a { color:#2182ef; font-weight:bold; }
        
/*///////////////////// 20170412 추가///////////////////////////*/

.ui-widget-content a {
	color: #222222;
}

.bene-menu-list {
border:0;
background:none;
}

.ui-state-active {
background:#fff;
}

.bene-menu-list > li > a {
padding: 1em 2em!important;
color: #222222!important;
font-size: 14px!important;
}

div.tabs-padding-editt {
padding:2.0em 0em!important;
}

table.rowtype01_e > tbody > tr > td {
padding: 15px;

}

.coupon_bg {
width: 200px;
margin: 0 auto;
background: url(../images/coupon_bg.jpg) no-repeat;
background-size: cover;
text-align: center;
}

.cou-kinds {
font-size: 15px;
}

.cou-price {
font-size: 22px;
font-weight: bold;
}

.com_table_board-no{
padding: 20px 0;
height: 20px;
text-align: center;
}

.com_table_board-no .list_block {
overflow: hidden;
width: 500px;
margin: 0 auto;
}

.com_table_board-no .list_block li {
float: left;
border: 1px solid #d5d5d5;
margin-right: 5px;
padding: 3px;
text-align: center;
line-height: 17px;
}

.com_table_board-no .list_block li >a {
font-size: 12px;
padding:3px;
}

.mobile-list-num { 
display: none;
}

.table_explain2 {
padding-top: 20px;
}


/* ------------------------------- mediaQuery  ------------------------------ */

@media all and (max-width:767px) { /* 스마트폰 */


.bene-menu-list > li > a {
padding:.5em 0.2em!important;
}

.coupon_bg {
width:34px;
padding: 0;
background-size: 34px 30px;
margin: 0 auto;
}

.cou-kinds { 
font-size: 9px;
}

.cou-price {
font-size: 10px;
letter-spacing: -1px;
}

.com_table_board-no {
display: none;
}



}


@media all and (min-width:768px) and (max-width:1024px) { /* 태블릿 */


.coupon_bg { 
width: 230px;

}



}

@media all and (min-width:1600px) { /* PC */


}

	</style>
	
	
	<script type="text/javascript">
	// 2016.12.19 수정
	function agreementMobileNot(APPLY_UNIQUE_NBR){
		$.ajax({
			type : 'post',
			url : 'academy/mypage/agreement.do',
			data: {'applyUniqueNbr':APPLY_UNIQUE_NBR,'payFlag':'P'},
			dataType :'html',
			success:function(html){
				$('#agreePayment_pop').empty();
				$(html).appendTo('#agreePayment_pop');

				// 레이어 팝업
				$('#agreePayment_pop').bPopup({modalClose:false});
			}
		});
	}

	// 신청강좌결제 창 닫기 2016.12.19
	function paymentClose(){
		$('#academyPayment_pop').bPopup().close();
	}

	//약관동의 창 닫기 2016.12.16
	function agreement_close(){
		$('#agreePayment_pop').bPopup().close();
	};
    
</script>
 
   </head>
    

<body id="academy_before" style="background-color:white;"  cz-shortcut-listen="true">
	<form name="frmBefore">
		<input type="hidden" name="pageNum">
		<input type="hidden" name="Total_Block" value="0">
		<input type="hidden" name="STATUS_TYPE" value="1">
	</form>

	<!-- 강좌 -->
	<div id="family_add"></div>
	<div id="academy_reserve"></div>

	<!-- 수강확인서 -->
	<div id="confirm_list"></div>
	<div id="confirm_content"></div>
	<div id="calrendar_content"></div>
	<!-- 약관동의 팝업 -->
	<div id="agreePayment_pop" class="terms"></div>
	<!-- 결제 팝업 -->
	<div id="academyPayment_pop"></div>
	<!-- 현금성 환불 팝업 -->
	<div id="academyRefund_cash"></div>
	<!-- 재결제 팝업 -->
	<div id="academyRepayment_pop"></div>
	<!-- 영수증 -->
	<div id="receipt_paper"></div>
	<div id="receipt_print"></div>
	<!-- 환불내역 -->
	<div id="refund_info"></div>

<div id="" class="regi-history">
    <div class="popup-contents-area">
        <!-- ----------마이페이지_혜택조회 20170412 jschoi---------- -->
        
        <div id="tabs" class="history-info-box02 mt30">
            <!-- <ul class="bene-menu-list">
                <li><a href="#tabs-1">사용 가능 쿠폰</a></li>
            </ul> -->
            
	        <div id="tabs-1" class="tabs-padding-editt">
	           <p class="table_explain">쿠폰 내역(총 ${totalCount}건)</p>
	            <table class="rowtype01 mt10 rowtype01_e" summary="포인트 상세 조회">
	       			<caption class="blind">사용가능 쿠폰_테이블</caption>
	                	<colgroup>
	                            <col width="25%">
	                        </colgroup>
	                        
                        <colgroup>
                            <col width="25%">
                        </colgroup>
                        
                        <colgroup>
                            <col width="25%">
                        </colgroup>
                        
                        <colgroup>
                            <col width="15%">
                        </colgroup>
                        
                        <colgroup>
                            <col width="10%">
                        </colgroup>
                        
                        <thead>
	                            <tr>
	                                <th>쿠폰유형</th>
	                                <th>쿠폰정보</th>
	                                <th>사용기간</th>
	                                <th>상태</th>
	                                <th>할인대상</th>
	                            </tr>
	                        </thead>
<!-- 	                        <tbody class="align-c"> -->

						<c:forEach var="list" items="${list}">
							<tr>
								<td>
									<div class="coupon_bg">
										<p class="cou-kinds">${list.MR_COUPON_CATE}</p>
										<p class="cou-price">
											<c:choose>
												<c:when	test="${list.DISCOUNT_AMT == 100 and list.DISCOUNT_TYPE == 1}">전액</c:when>

												<c:otherwise>
			                                    	${list.DISCOUNT_AMT}
			                          				<c:if test="${list.DISCOUNT_TYPE == 1}">%</c:if>
													<c:if test="${list.DISCOUNT_TYPE == 2}">원</c:if>
												</c:otherwise>
											</c:choose>
										</p>
									</div>
									<div class="cou-explain"></div>
								</td>
								<td>${list.MR_COUPON_DESC}<br />
								[${list.MR_COUPON_NBR}]								
								</td>
								<td>
									<c:choose>
										<c:when test="${list.USE_ST_TIME == null}"> </c:when>
										<c:otherwise>${list.USE_ST_TIME}</c:otherwise>
									</c:choose>
									-
									<c:choose>
										<c:when test="${list.USE_ED_TIME == null}"> </c:when>
										<c:otherwise>${list.USE_ED_TIME}</c:otherwise>
									</c:choose>
								</td>
								<td>
									<c:choose>
										<c:when test="${list.USE_FLAG == 'Y'}">사용</c:when>
										<c:otherwise>미사용</c:otherwise>
									</c:choose>								
								
								</td>
								<td>${list.MR_COUPON_PATTERN}</td>
							</tr>
						</c:forEach>

	     		</table>
	     		<div class="com_table_board-no">
	     			<ul class="list_block">
	     				${pagingHtml}
	     			</ul>
	     		</div>
	        </div>
        </div>
    </div>
</div>

</body></html>