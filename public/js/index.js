/**
 * Created by visionsmile on 2017/8/26.
 */
//登录验证
$(function (){
    $('input[name=name]').blur(function(){
        val=this.value;
        if(val.length < 2 || val.length>10 || !val.match(/^([a-zA-Z0-9]|[\u4e00-\u9fa5]){1,10}$/)){
            $ (this).next().show();
            return false;
        }else{
            $ (this).next().hide();
        }
    });
    $('input[name=password]').blur(function(){
        val=this.value;
        if(val.length < 4 || val.length>10 || !val.match(/^[^ ]+$/)){
            $(this).next().show();
            return false;
        }else if (!val.match(/^[^ ]+$/)){
            $(this).next().show();
            return false;
        }else{
            $(this).next().hide();
        }
    });
})
    //回车键登录
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $("#btn_post").click();
        }
    });
    $(function(){
        $("#btn_post").click(function(){
            if($('#name').val().length < 2 || $('#name').val().length>10 || !$('#name').val().match(/^([a-zA-Z0-9]|[\u4e00-\u9fa5]){1,10}$/)){
                $ ('#name').next().show();
            }else if ($('#password').val().length < 4 || $('#password').val().length > 10 || !val.match(/^[^ ]+$/)) {
                $ ('#password').next().show();
            } else {
                $.ajax({
                    type:'POST',
                    url:'/api/1/login',
                    data:$("#form1").serialize(),
                    dataType:'json',//数据类型,预期服务器返回的数据类型。
                    success: function(r) {
                        if (r.success == false){
                            if(r.message=="password is wrong"){
                                //当判断密码不正确时执行
                                cjy_alert("登录密码错误！");
                            }else if (r.message=='password incorrect'){
                                cjy_alert("登录密码错误！");
                            }else {
                                //当判断用户名不正确时执行
                                cjy_alert('登录用户名不存在');
                            }
                        }else {//当用户名密码正确时执行
                            location = 'admin/index';
                            //使用cookie
                            $.cookie('username', $("#name").val());
                            $.cookie('token', r.token);
                        }
                    },
                    error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                        cjy_alert('请求失败,可能网络出现错误！ ');
                    },
                })
            }
        });
});