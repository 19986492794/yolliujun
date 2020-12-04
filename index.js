/**
 * liujun
 * 2020/11/16
 */


function All() {
	//获取复选框所有字段
	$.ajax({
		type: "GET",
		url: 'local.json',
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		async: false,
		// data:JSON.stringify({"menuId":54}),
		//如果获取成功
		success: function(res) {
			if (res.state == 1) {
				result = res.data.flow_set.form_set;
				flowId = res.data.flowId;
				var alldata = result;
				selectZiduan(alldata);
			}
		},
	});
}

//获取复选框值并在右边申请人效果展示栏显示
function getCheckBox() {
	//获取input类型是checkBox并且 name="box"选中的checkBox的元素
	var data = $('input:checkbox[name="box"]:checked').map(function() {
		return $(this).val();
	}).get();

	//隐藏所有
	$(".box").hide(); // 隐藏待显示字段
	$(".content_sprpz").hide();

	// 遍历读取已选复选框中值
	for (var i = 0; i < result.length; i++) {
		//按条件显示
		//data  复选框已经选择的值

		//对比需要隐藏和显示的字段
		for (var j = 0; j < result.length; j++) {
			if (data[i] == $("#check_box" + j).val()) {
				$("#box" + j).show();
			}
		}
	}
}

//效果栏日期
layui.use('laydate', function() {
	var laydate = layui.laydate;
	//自定义格式
	laydate.render({
		elem: '#time1',
		format: 'yyyy年MM月dd日'
	});
	laydate.render({
		elem: '#time2',
		format: 'yyyy年MM月dd日'
	});
});

//删除字段信息
function deleteBox(m) { //m传入的字段索引号
	this.m = m;
	$("#box" + this.m).hide();
	$("#check_box" + this.m).prop("checked", false);
}

//弹出条件配置框
/**
 * @param {Object} i 传入索引以区别
 */
var indexview;
var termi;
var form1Data = null;
var ress;

function tanchu(i) {
	termi = this.i;
	var indexview0 = layer.open({
		type: 1,
		title: ['条件配置', 'background-color:#5188F3'],
		closeBtn: 1,
		shade: [0.01, 'white'],
		offset: ['120px', '1031px'],
		anim: 0,
		fix: false,
		shadeClose: true,
		maxmin: true,
		area: ['451px', '600px'],
		content: `<!-- 审批条件配置 -->
		<div class="approval_config" id="boxx">
			<!-- 条件配置主面板 -->
			<div class="config_main">
				<form method="post" action="" name="myForm" id="shenpi_term">
					<!-- 显示复选框1 -->
					<div class="config_checkbox">
						<div class="layui-input-block">
							<!-- condition: 条件 -->
							<input name="term" title="" type="radio" checked="" value="1" class="fu1">&nbsp;&nbsp;&nbsp;&nbsp;有条件&nbsp;&nbsp;&nbsp;&nbsp;</input>
							<input name="term" title="" type="radio" value="0" class="fu2">&nbsp;&nbsp;&nbsp;&nbsp;无条件</input>
						</div>
					</div>
					<!-- 显示表单-->
					<div class="config_select">
						<ul>
							<li class="if" id="if1">
								&nbsp;&nbsp;条件：
								<!-- 选择下拉框1 -->
								<select id="form1" name="field_name" lay-filter="aihao" class="config_s c1" onclick="formSlecetChange(this)">
									<option class="text" value="0" id="select_field">选择字段</option>
								</select>
								<!-- 选择下拉框2 -->
								<select name="field_more_than" lay-filter="aihao" class="config_s c2">
									<option value="1" selected="">大于等于</option>
									<option value="2">小于等于</option>
									<option value="3">等于</option>
									<option value="4">大于</option>
									<option value="5">小于</option>
								</select>
								<input id="form2" name="field_input" class="layui-input c3" type="text" placeholder="" autocomplete="off" lay-verify="title">
							</li>
						</ul>
					</div>
					<!-- 条件配置表单控件 -->
					<div class="config_btn">
						<button id="flow_btn1" type="button" class="layui-btn" data-method="setTop" onclick="addSIf()">添加条件</button>
						<button id="flow_btn2" type="button" class="layui-btn" data-method="setTop" onclick="send_term()">保存配置</button>
						<button id="flow_btn3" type="reset" class="layui-btn" data-method="setTop">重置配置</button>
						<button id="flow_btn4" type="button" class="layui-btn" data-method="setTop" onclick="deleteSIf()">删除条件</button>
					</div>
				</form>
			</div>
		</div>`

	});
	indexview = indexview0;

	//配置设置
	$.ajax({
		type: "GET",
		url: 'local.json',
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		async: false,
		success: function(res) {
			if (res.state == 1) {
				result = res.data.flow_set.form_set;
				flowId = res.data.flowId;
				form1Data = result;
				//克隆第一表单下拉框
				/**
				 * @i:循环参数
				 * @result：结果集
				 * @result[i].fieldCnName ：字段名
				 * @result[i].fieldId：字段值(Id)
				 * @result[i].fieldType：字段表单类型
				 */

				for (var i = 0; i < result.length; i++) {
					$("#form1").append($("#select_field").clone(false, false).attr("id", "select_field" + i));
					$("#select_field" + i).text(result[i].fieldCnName);
					$("#select_field" + i).attr("value", result[i].fieldId);
					$("#select_field").prop("selected");
				}
			} else {
				console.log("失败")
			}
		},
		error: function(err) {
			console.log("error");
		}
	});
}
//条件配置保存json数据
function send_term() {
	var formRef_term = $('#shenpi_term').serializeArray();
	var jsonString_term = JSON.stringify(formRef_term);
	$(".itermBtn:last").data("getjson", jsonString_term);
	var getterm = $(".itermBtn:last").data("getjson");
	console.log(getterm);
	layer.close(indexview);
}
//弹出字段配置框
/**
 * 
 */
function tanMainText() {
	layer.open({
		type: 2,
		// title: this.i,
		title: false,
		closeBtn: 0,
		shade: [0.01, 'white'],
		offset: ['115px', '1052px'],
		anim: 0,
		fix: false,
		shadeClose: true,
		maxmin: true,
		area: ['430px', '417px'],
		content: 'maintext.html',
	});
}

//添加流程图条件
/**
 * id="a" 申请人
 * id="b_00" 审批人
 * id="1dc_00" 同意
 */
var I = 1;
var J = 1;

function fun() {
	jsPlumb.ready(function() {
		var common = {
			connector: ['Flowchart'],
			anchor: ["Left", "Right"],
			endpointStyle: {
				outlineStroke: 'none',
				outlineWidth: 1
			},
			maxConnections: -1
		}
		var c = jsPlumb.connect({
			source: 'a',
			target: 'b_00',
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false,
			overlays: [
				["Label", {
					label: "<button type='button' class='itermBtn' style='background-color:white;border:1px solid white;'>有条件</button>",
					id: "label"
				}]
			]
		}, common)
		jsPlumb.connect({
			source: 'b_00',
			target: '1dc_00',
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_00',
			target: '2dc_00',
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_00',
			target: '3dc_00',
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		$(".itermBtn:last").click(function() {
			tanchu(I);
			if ($(this).data("data") == null || $(this).data("data") == undefined) {
				$(this).data("data", I);
				// console.log($(this).data("data", i));
			}
		});

	});
	$(document).ready(function() {
		//点击“添加条件”后执行向下添加一块审批人：
		$("#flow_btn").off("click").on("click", addTIf);
		//点击“同意”后执行向右添加一块审批人
		$("#1dc_00").off("click").click(function() {
			var value = $(this).attr('id');
			//读取当前同意块的位置，方便向右生成审批人
			// console.log(value[4], value[5]);
			RaddTIf(value[4], value[5]);
		});
		$("#b_00").click(function() {
			tanSPR(0, 0);
		});
		$("#2dc_00").click(function() {
			tanbohui(0, 0);
		});
		$("#3dc_00").click(function() {
			tanReject(0, 0);
		});
	});
	//触发字段配置框弹出
	$(".select_title").click(function() {
		tanMainText();
	});
}

/**
 * @param {Object} i  垂直坐标点
 */
function addTIf() {
	var i = I;
	var z = 150 * i; //每次生成向下移动150px
	//复制坐标原点元素
	var element = $("#d_00").clone(false, false).attr("id", "d_" + i + 0);
	$(".shengpi").append(element);
	var itemId = "#d_" + i + 0;
	$(itemId).attr('index', i);
	// 将id更改,使id不同
	$("#d_" + i + 0).css("margin-top", z + "px");
	$("#d_" + i + 0).css("margin-top", z + "px");
	$("#d_" + i + 0 + " #b_00").attr("id", "b_" + i + 0);
	$("#d_" + i + 0 + " #c_00").attr("id", "c_" + i + 0);
	$("#c_" + i + 0 + " #1dc_00").attr("id", "1dc_" + i + 0);
	//点击“同意”事件，向右复制一块审批人，并把当前坐标点传入
	$("#c_" + i + 0 + " #2dc_00").attr("id", "2dc_" + i + 0);
	$("#c_" + i + 0 + " #3dc_00").attr("id", "3dc_" + i + 0);

	$("#b_" + i + "0").click(function() {
		tanSPR(i, 0);
	});
	$("#2dc_" + i + "0").click(function() {
		tanbohui(i, 0);
	});
	$("#3dc_" + i + "0").click(function() {
		tanReject(i, 0);
	});

	$("#c_" + i + 0 + " #1dc_" + i + 0).off("click").click(function() {
		var value = $(this).attr('id'); //value[4]读取的纵坐标点i,value[5]读取的横坐标点j
		RaddTIf(value[4], value[5]);
	});
	//将按钮块之间根据逻辑连线
	jsPlumb.ready(function() {
		var common = {
			connector: ['Flowchart'],
			anchor: ["Left", "Right"],
			endpointStyle: {
				outlineStroke: 'none',
				outlineWidth: 1
			},
			maxConnections: -1
		}
		var linec = jsPlumb.connect({
			source: 'a',
			target: 'b_' + i + 0,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false,
			overlays: [
				["Label", {
					label: "<button type='button' class='itermBtn' style='background-color:white;border:1px solid white;'>有条件</button>",
					id: "label",
					location: (20 * i) / (20 * i + 10)
				}],
			]
		}, common)
		jsPlumb.connect({
			source: 'b_' + i + 0,
			target: '1dc_' + i + 0,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_' + i + 0,
			target: '2dc_' + i + 0,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_' + i + 0,
			target: '3dc_' + i + 0,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		//线上文字（条件配置）
		$(".itermBtn:last").click(function() {
			tanchu(i);
			if ($(this).data("data") == null || $(this).data("data") == undefined) {
				$(this).data("data", i);
				// console.log($(this).data("data"));
				//线上显示是否有条件
				$("#flow_btn2").click(function() {
					// console.log("以保存");
					x = $("form").serializeArray();
					$.each(x, function(i, field) {
						// console.log(field.value);
					});
				});

			}
		});
	});
	I++; //每次执行完，纵坐标加1
}


/**
 * @param {Object} i  垂直坐标点
 * @param {Object} j  水平坐标点
 */

function RaddTIf(i, j) {
	this.i = i; //获取的纵坐标
	var p = this.i; //获取的横坐标
	this.j = j;
	var q = this.j;
	q++; //每次执行完,横坐标加一
	var x = 300 * q; //x水平平移量
	var y = 150 * p - 50 * q; //y垂直平移量
	$(".shengpi").append($("#d_" + p + (q - 1)).clone(false, false).attr("id", "d_" + p + q)); //复制克隆审批人后整体
	$("#d_" + p + q).css("margin-left", x + "px"); //新元素向右上方移动生成
	$("#d_" + p + q).css("margin-top", y + "px");
	$("#d_" + p + q + " #b_" + p + (q - 1)).attr("id", "b_" + p + q);
	$("#d_" + p + q + " #c_" + p + (q - 1)).attr("id", "c_" + p + q);
	$("#c_" + p + q + " #1dc_" + p + (q - 1)).attr("id", "1dc_" + p + q);
	$("#1dc_" + p + q).off("click").click(function() {
		var value = $(this).attr('id');
		RaddTIf(value[4], value[5]); //继续点击事件生成新元素
	});
	$("#c_" + p + q + " #2dc_" + p + (q - 1)).attr("id", "2dc_" + p + q);
	$("#c_" + p + q + " #3dc_" + p + (q - 1)).attr("id", "3dc_" + p + q);

	$("#b_" + p + q).click(function() {
		tanSPR((p - 1), q);
	});
	$("#2dc_" + p + q).click(function() {
		tanbohui((p - 1), q);
	});
	$("#3dc_" + p + q).click(function() {
		tanReject((p - 1), q);
	});
	jsPlumb.ready(function() {
		var common = {
			connector: ['Flowchart'],
			anchor: ["Left", "Right"],
			endpointStyle: {
				outlineStroke: 'none',
				outlineWidth: 1
			},
			maxConnections: -1
		}
		jsPlumb.connect({
			source: '1dc_' + p + (q - 1),
			target: 'b_' + p + q,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_' + p + q,
			target: '1dc_' + p + q,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_' + p + q,
			target: '2dc_' + p + q,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
		jsPlumb.connect({
			source: 'b_' + p + q,
			target: '3dc_' + p + q,
			endpointStyle: {
				outlineWidth: 1
			},
			ConnectionsDetachable: false
		}, common)
	});
	p++;
	J++;
}

//删除设置条件
function deleteSIf() {
	if ($(".if:nth-last-child(2)").length > 0) {
		$(".if:last").remove();
	} else
		alert("请保证条件至少一条！")
}


//驳回申请弹出框内容
var itembo1;
var itembo2;
var Tanbohui;

function tanbohui(bo1, bo2) {
	itembo1 = bo1;
	itembo2 = bo2
	var Tanbohui0 = layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		shade: [0.01, 'white'],
		offset: ['119px', '1052px'],
		anim: 0,
		fix: false,
		shadeClose: true,
		maxmin: true,
		area: ['430px', '217px'],
		content: `<div class="content_bohui">
			<form id="shenpi_bohui">
				<ul>				
					<li class="shenpi_input2">
						<div class="input2_s">
							<p>拒绝配置:</p>
							<select name="refuse_name" lay-filter="aihao">
								<option id="bo1" value="0">上一级</option>
								<option id="bo2" value="1">前几级皆可选</option>
								<option id="bo3" value="2">初始化</option>
								<option id="bo4" value="3">结束</option>
							</select>
						</div>
					</li>
					<li class="shenpi_input4">
						<input type="button" name="title" value="提交" onclick="send_bohui()">
					</li>
				</ul>
			</form>
		</div>`
	});
	Tanbohui = Tanbohui0;
	//表单修改后，赋表单值
	var getbohui = $("#2dc_" + itembo1 + itembo2).data("getjson");
	if (getbohui != null || getbohui != undefined) {
		var initbo = JSON.parse(getbohui);
		// console.log(initbo[0].value);
		if (initbo[0].value == "0")
			$("#bo1").attr("selected", "true");
		else if (initbo[0].value == "1")
			$("#bo2").attr("selected", "true");
		else if (initbo[0].value == "2")
			$("#bo3").attr("selected", "true");
		else if (initbo[0].value == "3")
			$("#bo4").attr("selected", "true");
	}
}
//提交驳回申请框内容
function send_bohui() {
	var bohui1 = itembo1;
	var bohui2 = itembo2;
	var formRef = $('#shenpi_bohui').serializeArray();
	var jsonString = JSON.stringify(formRef);
	$("#2dc_" + bohui1 + bohui2).data("getjson", jsonString)
	var getdata0 = $("#2dc_" + bohui1 + bohui2).data("getjson");
	// console.log(getdata0)
	layer.close(Tanbohui);
}

//弹出拒绝配置框
/**
 * @param {Object} rj1,rj2 传入索引以区别
 */
var it1;
var it2;
var getReject;
var Tanreject;

function tanReject(rj1, rj2) {
	it1 = rj1; //i
	it2 = rj2; //j
	var Tanreject0 = layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		shade: [0.01, 'white'],
		offset: ['119px', '1052px'],
		anim: 0,
		fix: false,
		shadeClose: true,
		maxmin: true,
		area: ['430px', '217px'],
		content: `<div class="content_reject">
			<form id="shenpi_reject">
				<ul>				
					<li class="shenpi_input2">
						<div class="input2_s">
							<p>拒绝配置:</p>
							<select name="reject_name" lay-filter="aihao">
								<option id="re1" value="0">流程结束</option>
								<option id="re2" value="1">初始化</option>
							</select>
						</div>
					</li>
					<li class="shenpi_input4">
						<input type="button" name="title" value="提交" onclick="send_reject()">
					</li>
				</ul>
			</form>
		</div>`
	});
	Tanreject = Tanreject0;
	getReject = $("#3dc_" + it1 + it2).data("getjson");
	if (getReject != null || getReject != undefined) {
		var init = JSON.parse(getReject);
		if (init[0].value == "流程结束")
			$("#re1").attr("selected", "true");
		else
			$("#re2").attr("selected", "true");
	}
}
//提交拒绝申请框内容
function send_reject() {
	var rj1 = it1;
	var rj2 = it2;
	var formRef = $('#shenpi_reject').serializeArray();
	var jsonString = JSON.stringify(formRef);
	$("#3dc_" + rj1 + rj2).data("getjson", jsonString)
	var getdata0 = $("#3dc_" + rj1 + rj2).data("getjson");
	getReject = getdata0;
	layer.close(Tanreject);
}

//保存申请人效果展示json
function send_ziduan() {
	var formRef_ZD = $('#shenpi_ziduan').serializeArray();
	var jsonString_ZD = JSON.stringify(formRef_ZD);
	$("#shows_btn").data("getjson", jsonString_ZD);
	alert(jsonString_ZD)
}
//拖动字段
$(function() {
	$("#shenpi_ziduan").sortable({
		revert: true
	});
	$(".box").disableSelection();;
});

//动态获取json数据,读取复选框中字段名称
$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: 'local.json',
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		async: false,
		// data:JSON.stringify({"menuId":54}),
		//如果获取成功
		success: function(res) {
			ress = res; //向后传值
			if (res.state == 1) {
				result = res.data.flow_set.form_set;
				flowId = res.data.flowId;
				//获取字段表单类型,进行判断
				function getType(t) {
					this.t = t;
					if (result[this.t].fieldType == 11) {
						return "select"
					}
					if (result[this.t].fieldType == 9) {
						return "number"
					}
					if (result[this.t].fieldType == 1) {
						return "text"
					}
					if (result[this.t].fieldType == 10) {
						return "date"
					}
				}
				var type0 = getType(0);
				//复制第一个复选框,动态生成
				for (var num = 1; num < result.length; num++) {
					//读取表单类型
					var type = getType(num);

					//如果获取表单类型为下拉框,则进行换成select元素
					var select_title =
						"<select class='Selects' name='apply_type' lay-filter='aihao'><option id='se' value='null'>选择字段</option></select>";

					//左边复选框
					$(".main_select .select ul").append($("#s_box0").clone(false, false).attr("id", "s_box" + num));
					$("#s_box" + num + " #cs_box0").attr("id", "cs_box" + num);
					$("#s_box" + num + " .layui-input-block #check_box0").attr("id", "check_box" + num);
					$("#s_box" + num + " #cs_text0").attr("id", "cs_text" + num);
					//复选框表单赋值
					$("#check_box" + num).prop("value", result[num].fieldCnName);
					//复选框命名
					$("#cs_text" + num + " p").append(result[num].fieldCnName);

					//右边字段
					$("#shenpi_ziduan").append($("#box0").clone(false, false).attr("id", "box" + num));
					$("#box" + num + " .box_2").append(result[num].fieldCnName);
					if (type == "select") { //判断是否下拉框
						$("#box" + num + " .box_4_input").remove(); //移除原input表单
						$("#box" + num + " .box_4 .layui-input-block").append(select_title); //增加下拉框元素
						// 循环获取下拉框值
						for (var index = 0; index < result[num].dicList.length; index++) {
							$("#box0 .box_4 .layui-input-block select").append($("#se").clone(false, false).attr("id", "se" + index)); //复制下拉框 框
							//存放数据
							$("#se" + index).prop("value", result[num].dicList[index].id);
							$("#se" + index).prop("name", result[num].dicList[index].name);
							$("#se" + index).append(result[num].dicList[index].name);
							if (index == 0) {
								$("#se0").prop("selected");
							}
						}
					} else {
						$("#box" + num + " .box_4_input").prop("type", type);
						$("#box" + num + " .box_4_input").prop("name", result[num].fieldName);
					}
					//删除方法赋值
					$("#box" + num + " .box_3 i").attr("onclick", "deleteBox(" + num + ")");
				}
				//左1
				$("#check_box0").prop("value", result[0].fieldCnName);
				$("#cs_text0 p").append(result[0].fieldCnName);
				//右1
				$("#box0 .box_2").append(result[0].fieldCnName);
				if (type0 == "select") { //判断是否下拉框
					$("#box0 .box_4_input").remove(); //移除原input表单
					$("#box0 .box_4 .layui-input-block").append(select_title).attr("class", "layui-input-block"); //增加下拉框元素
					// 循环获取下拉框值
					for (var index = 0; index < result[0].dicList.length; index++) {
						// console.log(index)
						$("#box0 .box_4 .layui-input-block select").append($("#se").clone(false, false).attr("id", "se" + index)); //复制下拉框 框
						$("#se" + index).prop("value", result[0].dicList[index].id);
						$("#se" + index).text(result[0].dicList[index].name);
					}
				} else {
					$("#box0 .box_4_input").prop("type", type0);
				}
			} else {
				console.log("失败")
			}
		},
		error: function(err) {
			console.log("error");
		}
	});
});

var madd = 2;
//添加设置条件
function addSIf() {
	$(".config_select ul").append($("#if1").clone(false, false).first().attr("id", "if" + madd));
	madd++;
}

/**
 * form 中 slect 值变化事件
 * @param {Object} elem 
 */
function formSlecetChange(elem) {
	var result = form1Data;
	var getvalue = $(elem).val();

	//判断第一表单值类型
	for (var m = 0; m < result.length; m++) {
		if (result[m].fieldId == getvalue) {
			var get_fieldType = result[m].fieldType;
			// console.log(get_fieldType)
			if (get_fieldType == 11) {
				$("#form2").hide();
				//如果选择第二表单输出为下拉框
				var addselect = "<select id='se' class='layui-input c3'><option value='' id='op0'></option></select>";
				$(".if").append(addselect);
				//克隆第二表单下拉框
				/**
				 * @result[0].dicList[i].name：请假类型字段选择
				 * @result[0].dicList[i].id：请假类型Id
				 * 
				 */
				$("#op0").text(result[0].dicList[0].name);
				$("#op0").prop("value", result[0].dicList[0].id)
				for (var j = 1; j < result[0].dicList.length; j++) {
					$("#se").append($("#op0").clone(false, false).attr("id", "op" + j));
					// console.log(result[0].dicList[j].name)
					// console.log($("#op"+j).attr("id"))
					$("#op" + j).text(result[0].dicList[j].name);
					$("#op" + j).attr("value", result[0].dicList[j].id);
					$("#op0").prop("selected");
				}
			}

			if (get_fieldType == 1) {
				$("#form2").show();
				$("#se").remove();
				$("#form2").prop("type", "text");
			}
			if (get_fieldType == 9) {
				$("#form2").show();
				$("#se").remove();
				$("#form2").prop("type", "number");
			}
			if (get_fieldType == 10) {
				$("#form2").show();
				$("#se").remove();
				$("#form2").prop("type", "date");
				// console.log($("#form2").attr("type"))
			}
			if (get_fieldType == 0) {
				$("#se").remove();
				alert("请选择字段！")
			}
		}
	}
}

//弹出审批人配置框
/**
 * @param {Object}  itermIndex1传入索引i,2-->j
 */
var getdata;
var iterm1;
var iterm2;
var Tanspr;
var indexof = 1;

function tanSPR(itermIndex1, itermIndex2) {
	iterm1 = itermIndex1;
	iterm2 = itermIndex2;
	//初始默认值
	$("#sp_cj").val('');
	$("#sp_r1 option").removeAttr("selected");
	$("#sp_q2 option").removeAttr("selected");
	$(".input3_s input").removeAttr("checked");
	$("#b_" + iterm1 + iterm2).text("审批人")

	var initdata = $("#b_" + iterm1 + iterm2).data("getjson");
	// console.log(initdata)

	//弹出框动态获值
	var result_wd = ress.data.manageTableList; //权限维度
	var result_rose = ress.data.roleList; //审批角色
	var result_cj = ress.data.flow_set.flow_term[0].floor_set; //审批层级维度
	//如果读取json为空，则读取json文件数据
	if (initdata == null) {

		//角色名称
		$("#r0").text(result_rose[0].role_name);
		$("#r0").attr("value", result_rose[0].role_id);
		if (indexof == 1) {
			indexof = 2;
			for (var i = 1; i < result_rose.length; i++) {
				$("#sp_r1").append($("#r0").clone(false, false).prop("id", "r" + i));
				$("#r" + i).text(result_rose[i].role_name);
				$("#r" + i).attr("value", result_rose[i].role_id);
			}
			//权限维度
			$("#q0").text(result_wd[0].tableCnName);
			$("#q0").attr("value", result_wd[0].tableId);
			for (var i = 1; i < result_wd.length; i++) {
				$("#sp_q2").append($("#q0").clone(false, false).prop("id", "q" + i));
				$("#q" + i).text(result_wd[i].tableCnName);
				$("#q" + i).attr("value", result_wd[i].tableId);
			}
		}
		//设置初始值
		$("#r0").prop("selected", "true");
		$("#q0").prop("selected", "true");
		//默认单选框
		$("#x1").prop("checked", "true");
		$("#y1").prop("checked", "true");
		$("#f1").prop("checked", "true");

	} else {
		//转换数组形式
		var jsonn = JSON.parse(initdata)

		//层级名称
		$("#sp_cj").prop("value", jsonn[0].value);
		$("#sp_cj").text(jsonn[0].value);

		//修改后角色名称
		var role_id = jsonn[1].value;
		// 读取修改值
		$("#r" + (role_id - 1)).prop("selected", "true");

		// 修改后权限维度
		$("#q" + jsonn[2].value).prop("selected", "true");

		//读取单选框值
		//是否发短信
		if (jsonn[3].value == "1") {
			$("#x1").prop("checked", "true");
		} else
			$("#x2").prop("checked", "true");

		//是否发邮件
		if (jsonn[4].value == "1") {
			$("#y1").prop("checked", "true");
		} else
			$("#y2").prop("checked", "true");

		//审批方式
		if (jsonn[5].value == "1") {
			$("#f1").prop("checked", "true");
		} else
			$("#f2").prop("checked", "true");
	}
	var Tanspr0 = layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		shade: [0.01, 'white'],
		offset: ['120px', '1052px'],
		anim: 0,
		fix: false,
		shadeClose: true,
		maxmin: true,
		area: ['430px', '600px'],
		content: $(".content_sprpz")
	});
	Tanspr = Tanspr0;
}
//审批人配置表单提交json数据
function send_spr() {
	var itermIndex1 = iterm1;
	var itermIndex2 = iterm2;
	var formRef = $('#shenpi_man').serializeArray();
	var jsonString = JSON.stringify(formRef);
	//如果传值为空，则显示“审批人”
	if (formRef[0].value != 0) {
		$("#b_" + itermIndex1 + itermIndex2).text(formRef[0].value);
	}
	//保存审批人配置json数据
	$("#b_" + itermIndex1 + itermIndex2).data("getjson", jsonString)
	//数据读取
	var getdata0 = $("#b_" + itermIndex1 + itermIndex2).data("getjson")
	// console.log(getdata0)

	//关闭弹窗
	layer.close(Tanspr);
}
