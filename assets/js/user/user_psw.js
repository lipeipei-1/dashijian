$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('.layui-form [name=oldPwd]').val()) { return '新旧密码不能一致' }
        },
        rePwd: function(value) {
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }

    })

    // 重置密码
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '../../../login.html'
            }




        })


    })







})