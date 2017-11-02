/**
 * Created by HUCC on 2017/11/1.
 */
//开启左侧的区域滚动
//    插件
var sc = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false
});

//发送ajax请求
$.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (data) {
        // 将数据渲染到页面
        var html = template("tpl", data);
        $(".lt_category_l ul").html(html);
        //需要在一级分类数据渲染完成后 去渲染一个一级分类对应的二级分类
        renderSecond(data.rows[0].id);
    }
});


//封装  参数一级分类id
function renderSecond(id) {
    $.ajax({
        type: 'get',
        url: "/category/querySecondCategory",
        data: {
            id: id
        },
        success: function (data) {
            //渲染二级分类
            $(".lt_category_r ul").html(template("tpl2", data));
        }
    });
}

//给左边所有的li注册委托事件 获取到自定义属性id 渲染对应的自定义属性
$(".lt_category_l").on("click", "li", function () {
    //给当前的对象添加类名 其他兄弟删除类名
    $(this).addClass("now").siblings().removeClass("now");
    //
    var id = $(this).data("id");
    // 调用函数
    renderSecond(id);

    //这里需要让右边的区域滚动 scrollop 到 0 0
    sc[1].scrollTo(0, 0, 500);
})