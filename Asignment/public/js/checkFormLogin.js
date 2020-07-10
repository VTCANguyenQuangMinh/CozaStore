

$(document).ready(function(){
  var check = checkRe = 1;
  $("#Uname").focusout(function(){
    if($("#Uname").val() == "")
    {
        $("#UnameErr").text("Vui lòng nhập Email hoặc Số điện thoại");
        check = 0;
    }else{
      $("#UnameErr").text("");
      check=1;
    }
  });

  
  $("#pwd").focusout(function(){
    var checkpwd = $("#pwd").val();
    if(checkpwd == "")
    {
      $("#pwdErr").text("Vui lòng nhập mật khẩu");
      check = 0;
    }else if(checkpwd.length < 6 || checkpwd.length>31)
    {
      $("#pwdErr").text("Mật khẩu phải dài từ 6 đến 32 ký tự");
      check = 0;
    }
    else{
      $("#pwdErr").text("");
      check=1;
    }
  });

  $("#nameRe").focusout(function(){
    if($("#nameRe").val() == "")
    {
        $("#nameReErr").text("Vui lòng nhập họ tên");
        checkRe = 0;
    }else{
      $("#nameReErr").text("");
      checkRe = 1;
    }
  });

  $("#sdtRe").focusout(function(){
    var sdt = $("#sdtRe").val();
    if(sdt == "")
    {
        $("#sdtReErr").text("Vui lòng nhập số điện thoại");
        checkRe = 0;
    }else if(sdt.length > 11 || sdt.length < 10)
    {
        $("#sdtReErr").text("Số điện thoại không đúng định dạng");
        checkRe = 0;
    }
    else if(isNaN(sdt))
    {
        $("#sdtReErr").text("Số điện thoại không đúng định dạng");
        checkRe = 0;
    }
    else{
      $("#sdtReErr").text("");
      checkRe = 1;
    }
  });

  $("#emailRe").focusout(function(){
    if($("#emailRe").val() == "")
    {
        $("#emailReErr").text("Vui lòng nhập email");
        checkRe = 0;
    }else{
      $("#emailReErr").text("");
      checkRe = 1;
    }
  });


  $("#passRe").focusout(function(){
      var passRe = $("#passRe").val();
    if(passRe == "")
    {
        $("#passReErr").text("Vui lòng nhập mật khẩu");
        checkRe = 0;
    }else if(passRe.length < 6 || passRe.length > 32)
    {
        $("#passReErr").text("Mật khẩu từ 6-32 ký tự");
        checkRe = 0;
    }
    else{
      $("#passReErr").text("");
      checkRe = 1;
    }
  });

  

  $("#form-regis").submit(function(){
    if(checkRe == 0)
    {
      return false;
    }
  });

  $("#form-login").submit(function(){
    if(check == 0)
    {
      return false;
    }
  });

});