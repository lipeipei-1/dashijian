$(function() {
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    // 渲染下拉菜单


    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                template('tpl-cate', res)
                var htmlStr = template('tpl-cate', res)
                    // console.log(htmlStr);

                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 筛选功能
    $('#form-search').on('submit', function(e) {
            e.preventDefault()
            var cate_id = $('[name=cate_id]').val()

            var state = $('[name=state]').val()
            q.cate_id = cate_id
            q.state = state
            initTable()
        })
        // 定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                    // 如果 first 的值为 true，证明是方式2触发的
                    // 否则就是方式1触发的
                if (!first) { initTable() }

            }
        })
    }
    // 删除功能
    $('tbody').on('click', '.delete-btn', function() {
        var artId = $(this).attr('data-id')
        var len = $('.delete-btn').length
        console.log(len);

        layer.confirm('是否删除文章?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/' + artId,
                method: 'GET',
                success: function(res) {
                    console.log(res);

                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    }
                    initTable()
                }


            })

            layer.close(index);
        });

    })


})