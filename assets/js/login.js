$(function() {
    $('#link_reg').click(function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').click(function() {
            $('.login-box').show()
            $('.reg-box').hide()

        })
        //从layui中获取form对象
    var form = layui.form

    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //     if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //       return '用户名不能有特殊字符';
        //     }
        //     if(/(^\_)|(\__)|(\_+$)/.test(value)){
        //       return '用户名首尾不能出现下划线\'_\'';
        //     }
        //     if(/^\d+\d+\d$/.test(value)){
        //       return '用户名不能全为数字';
        //     }
        //   }

        repassword: function(value) {
            var psw = $('.reg-box[name=password]').val()
            if (psw !== value) {
                return '两次密码不一致'
            }
        }
    })









})