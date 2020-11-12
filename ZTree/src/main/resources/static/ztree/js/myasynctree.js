$(document).ready(function(){
    $.fn.zTree.init($("#asyncTreeDemo"), setting);
});

var setting = {
    view: {
        showLine: false,
        showIcon:false,
        // 鼠标放上去的时候显示编辑、删除按钮
        addHoverDom: addHoverDom,
        // 鼠标放上去的时候取消编辑、删除按钮
        removeHoverDom: removeHoverDom,
        // 是否允许多选
        selectedMulti: false
    },
    edit: {
        enable: true,
        drag: {
            autoExpandTrigger: true,
            prev: true,
            inner: false,
            next: true
        },
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    async: {
        enable: true,
        contentType: "application/json",
        type: 'post',
        dataType: "json",
        url:"/menu/getMenuList",
        autoParam:["id"],
        dataFilter: filter
    }
};

function filter(treeId, parentNode, childNodes) {
    console.log(childNodes);
    var childNodeList = [];
    var nodeList = childNodes;
    for (var i = 0, l = nodeList.length; i < l; i++) {
        var treeNode = {
            id: nodeList[i].id,
            pId: nodeList[i].pId,
            name: nodeList[i].name,
            isParent: false,
            nodeId: nodeList[i].id
        };
        childNodeList.push(treeNode);
    }
    return childNodeList;
}

//鼠标移入+添加节点方法绑定
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
    if (treeNode.editNameFlag || $("#editBtn_"+treeNode.tId).length>0) return;
    if (treeNode.editNameFlag || $("#deleteBtn_"+treeNode.tId).length>0) return;


    var addStr = "<span style='margin-left: 10px;height: auto; float: right' class='layui-btn' id='addBtn_" + treeNode.tId
        + "' title='添加子菜单' onfocus='this.blur();'>添加子菜单</span>";
    var editStr = "<span style='margin-left: 10px;height: auto; float: right' class='layui-btn' id='editBtn_" + treeNode.tId
        + "' title='编辑' onfocus='this.blur();'>编辑</span>";
    var deleStr = "<span style='margin-left: 10px;height: auto; float: right;' class='layui-btn' id='deleteBtn_" + treeNode.tId
        + "' title='删除' onfocus='this.blur();'>删除</span>";

    if (treeNode.level==0){
        sObj.after(deleStr+editStr+addStr);
    } else {
        sObj.after(deleStr+editStr);
    }

    //添加节点
    var btnAdd = $("#addBtn_"+treeNode.tId);
    if (btnAdd) btnAdd.bind("click", function(){
        addSub(treeNode)
    });
    //编辑节点
    var btnEdit = $("#editBtn_"+treeNode.tId);
    if (btnEdit) btnEdit.bind("click", function(){
        editNode(treeNode)
    });
    var btnDelete = $("#deleteBtn_"+treeNode.tId);
    //删除节点
    if (btnDelete) btnDelete.bind("click", function(){
        deleteNode(treeNode)
    });
}


//鼠标移出+节点方法解绑
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
    $("#editBtn_"+treeNode.tId).unbind().remove();
    $("#deleteBtn_"+treeNode.tId).unbind().remove();

}



var openSize = ['400px','300px'];
//一级菜单
var dialog = '<div class="open_dialog"><table>' +
    '               <tr>' +
    '                   <td><span style="color:red;">*</span><span style="margin: 0">菜单名称：</span></td>' +
    '                   <td><input id="menu_name"></td>' +
    '               </tr>' +
    '</table></div>';

//添加二级及以下节点
function addSub(treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("asyncTreeDemo");
    layer.open({
        type: 1
        ,title: '新增菜单' //显示标题栏
        ,closeBtn: false
        ,area: openSize
        ,shade: 0.8
        ,id: 'LAY_layuipro_root' //设定一个id，防止重复弹出
        ,resize: false
        ,btn: ['确认', '取消']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content : dialog
        ,yes: function(index){
            var param = {};
            var menuName = $("#menu_name").val();
            if (menuName=="") {
                layer.alert('菜单名称不能为空');
                return;
            }
            param.menuName = menuName;
            param.fatherId = treeNode.id;
            $.ajax({
                type: "POST",
                url: "/menu/addMenu",
                data : JSON.stringify(param),
                contentType : "application/json;charset=UTF-8",
                dataType: "json",
                success: function(data){
                    zTree.addNodes(treeNode, {id:data, pId:treeNode.id, name:menuName});
                    layer.close(index);
                }
            });
        }
    });
}

//更新节点
function editNode(treeNode,state) {
    layer.open({
        type: 1
        ,title: '编辑菜单' //显示标题栏
        ,closeBtn: false
        ,area: openSize
        ,shade: 0.8
        ,id: 'LAY_layuipro_root' //设定一个id，防止重复弹出
        ,resize: false
        ,btn: ['确认', '取消']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content : dialog
        ,success : function(){
            $("#menu_name").val(treeNode.name);
        }
        ,yes: function(index){
            var param = {};
            var menuName = $("#menu_name").val();
            if (menuName=="") {
                layer.alert('菜单名称不能为空');
                return;
            }
            param.menuName = menuName;
            param.id = treeNode.id;
            $.ajax({
                type: "POST",
                url: "/menu/updateMenu",
                data : JSON.stringify(param),
                contentType : "application/json;charset=UTF-8",
                dataType: "json",
                success: function(data){
                    var zTree = $.fn.zTree.getZTreeObj("asyncTreeDemo");
                    treeNode.name = menuName;
                    zTree.updateNode(treeNode);
                    layer.close(index);
                }
            });
        }
    });
}
//删除节点
function deleteNode(treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("asyncTreeDemo");
    layer.confirm('确认删除选中菜单？', {
        btn: ['确认','取消'] //按钮
    }, function(){
        var param = {};
        param.id = treeNode.id;
        $.ajax({
            type: "POST",
            url: "/menu/deleteMenu",
            data : JSON.stringify(param),
            contentType : "application/json;charset=UTF-8",
            dataType: "json",
            success: function(data){
                layer.msg('删除成功', {icon: 1});
                zTree.removeNode(treeNode);
            }
        });
    });
}
//新建根结点
function addFirst() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    layer.open({
        type: 1
        ,title: '新增菜单' //显示标题栏
        ,closeBtn: false
        ,area: openSize
        ,shade: 0.8
        ,id: 'LAY_layuipro_root' //设定一个id，防止重复弹出
        ,resize: false
        ,btn: ['确认', '取消']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: dialog
        ,yes: function(index){
            var param = {};
            var menuName = $("#menu_name").val();
            if (menuName=="") {
                layer.alert('菜单名称不能为空');
                return;
            }
            param.menuName =menuName;
            param.fatherId = 0;
            $.ajax({
                type: "POST",
                url: "/menu/addMenu",
                data : JSON.stringify(param),
                contentType : "application/json;charset=UTF-8",
                dataType: "json",
                success: function(data){
                    zTree.addNodes(null, {id:data, pId:0, name:menuName});
                    layer.close(index);
                }
            });
        }
    });
}