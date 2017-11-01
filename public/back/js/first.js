/**
 * Created by Liu on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                //渲染数据 
                $("tbody").html(template("tpl", data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    render();




//  显示摸态框
    $(".btn_add").on("click",function () {

        $("#addModal").modal("show");

    });


    //表单验证
    var $form=$("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            //校验时使用的图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            //name属性
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv",function (e) {
        e.preventDefault();


    //    发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
                //1.success=true时
                //1.关闭模态框
                if (data.success){
                    $("#addModal").modal("hide");
                    //2. 重新渲染第一页
                    currentPage=1;
                    render();

                    //3.重置表单
                    $form.data("bootstrapValidator").resetForm();
                    //表单有一个reset方法，会把表单中所有的值都清空
                    //js方法
                    $form[0].reset();
                }

            }

        })
    });


});