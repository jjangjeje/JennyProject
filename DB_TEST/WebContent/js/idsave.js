
function setCookie (name, value, expires) {
  document.cookie = name + "=" + escape (value) +
    "; path=/; expires=" + expires.toGMTString();
}

function getCookie(Name) {
  var search = Name + "=";
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1) { 
      offset += search.length;
     
      end = document.cookie.indexOf(";", offset);
     
      if (end == -1)
        end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    }
  }
  return "";
}

function saveidFunc(form) {
  var expdate = new Date();
  if (form.saveid.checked){
	  expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30);   
  }else{
	  expdate.setTime(expdate.getTime() - 1); 
  }
  setCookie("visitParkingId", form.loginId.value, expdate);
}

function getidFunc(form) {
  form.saveid.checked = ((form.loginId.value = getCookie("visitParkingId")) != "");
}
