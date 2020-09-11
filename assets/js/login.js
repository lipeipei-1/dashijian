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
    var layer = layui.layer
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
            var psw = $('.reg-box [name=password]').val()
            if (psw !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册的表单监听事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                url: '/api/reguser',
                method: 'post',
                data: { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg("注册成功");
                    // 模拟人的点击事件
                    $('#link_login').click()
                }
            })
        })
        // 方法 二：
        // $('#form_reg').on('submit', function(e) {
        //     e.preventDefault()
        //     $.post('http://ajax.frontend.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg(res.message);
        //         }
        //         layer.msg("注册成功");
        //         // 模拟人的点击事件
        //         $('#link_login').click()
        //     })
        // })


    // 监听登录的表单事件
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.post('/api/login', $(this).serialize(), function(res) {
            if (res.status !== 0) { return layer.msg(res.message); }
            layer.msg("登录成功");
            localStorage.setItem('token', res.token)
            location.href = '../../index.html'
        })



    })



})