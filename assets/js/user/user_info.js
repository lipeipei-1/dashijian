$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称必须在1~6个字符之间'
            }
        }
    })

    // 获取用户基本信息
    initUserInfo()

    function initUserInfo() {

        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                //如何将数据展示到页面上
                // 如果想赋值成功，后台字段需与name值相同
                form.val('formUserInfo', res.data)
            }
        })
    }


    $('#resetBtn').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 更改用户信息
    $('#changeUserInfo').submit(function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })

    })



})