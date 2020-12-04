function sendData() {
	//流程图数据
	var Fflow_set={};
		Fflow_set.flow_term={};
		Fflow_set.form_set={};
		Fflow_set.menuId=54;
		Fflow_set.flow_name="请假申请管理审批";
		Fflow_set.id="23";
		Fflow_set.flowId=23;
		
		//审批人配置json
		var json_spr;
		var json_Resuse;
		var json_Reject;
		
		//获取审批流
		var floor=[{}];
		var term={};
		var Fstan_spr_name=[{}];
		var for_stan_term=[{}];
		var Fflow_term=[{}];
		var for_flow_term=[{}];
		
		//填入内容
		for (var i = 0; i < I; i++) {
			//条件配置数据
			json_term = $(".itermBtn:last").data("getjson");
			if(json_term ==null)  {
				alert("请填写条件配置！")
			}
			else{
				var array_term = JSON.parse(json_term);
				
				var Fstan_term={};
				Fstan_term.fieldName=ress.data.field_set.fieldList[(array_term[1].value)-3561].fieldName;
				Fstan_term.term_type=array_term[2].value;
				Fstan_term.term_val=array_term[3].value;
				Fstan_term.fieldId= array_term[1].value;
				
				for_stan_term[i]=Fstan_term;
				
				for (var j = 0; j <J; j++) {
					// console.log("i,j:" + i, j)
					//审批人
					json_spr = $("#b_" + i + j).data("getjson");
					if(json_spr ==null)  {
						alert("请填写"+i+j+"审批人配置！")
					}
					else{
					var array_spr = JSON.parse(json_spr);
					}
					
					//驳回
					json_Resuse = $("#2dc_" + i + j).data("getjson");
					if(json_Resuse ==null)  {
						alert("请填写"+i+j+"驳回配置！")
					}
					else{
					var array_resuse = JSON.parse(json_Resuse);
					}
					
					//拒绝
					json_Reject = $("#3dc_" + i + j).data("getjson");
					if(json_Reject ==null)  {
						alert("请填写"+i+j+"拒绝配置！")
					}
					else{
						var array_reject = JSON.parse(json_Reject);
					}
					
					//判断如果遍历一层后无结果，开始遍历下一层
					if (array_spr == null || array_resuse == null || array_reject == null) {
						// console.log("break")
						break;
					}
					
					var stan_spr_name = {};
					stan_spr_name.floor_name = array_spr[0].value;
					stan_spr_name.floor_sort = j;
					stan_spr_name.reject_type = array_reject[0].value;
					stan_spr_name.if_smessage = array_spr[3].value;
					stan_spr_name.refuse_type = array_resuse[0].value;
					stan_spr_name.floor_role = 2;
					stan_spr_name.check_type = array_spr[5].value;
					stan_spr_name.dimension = "111";
					stan_spr_name.if_email = array_spr[4].value;
						
					var stan_spr_role = {};
					stan_spr_role.role_name = ress.data.roleList[(array_spr[1].value) - 1].role_name;
					stan_spr_role.role_id = array_spr[1].value;
						
					var stan_spr_depart = {};
					stan_spr_depart.tableCnName = ress.data.manageTableList[array_spr[2].value].tableCnName
					stan_spr_depart.tableId = array_spr[2].value;
					stan_spr_depart.tableName = "user_depart"
						
					//循环获取的json相加
					// console.log(stan_spr_name)
					Fstan_spr_name[j] = stan_spr_name;
					
				}
				//第i层的floor_set
				floor=Fstan_spr_name;
				//第i层的term_set
				term=for_stan_term[i];
				Fflow_term.floor_set=floor;
				Fflow_term.term_set=term;
				for_flow_term[i]=Fflow_term;
			}
		}
		Fflow_set.flow_term=for_flow_term;
		
// 申请人效果展示
	var json_ziduan = $("#shows_btn").data("getjson");
	if(json_ziduan ==null)  {
		alert("请填写申请字段表！")
	}
	else{
		var array_ziduan = JSON.parse(json_ziduan);
		//申请人效果展示json
		
		//拼接字段申请类型json
		var stan_ziduan_type = {};
		stan_ziduan_type.valiadType = 0;
		stan_ziduan_type.ifIndex = 0;
		stan_ziduan_type.fieldName = "apply_type";
		stan_ziduan_type.fieldCnName = "申请类型";
		stan_ziduan_type.fType = 7;
		stan_ziduan_type.ifOnly = 0;
		stan_ziduan_type.dicParent = 40;
		stan_ziduan_type.tableCnName = "请假申请";
		stan_ziduan_type.sort = 3;
		stan_ziduan_type.tableName = "leave_approval";
		stan_ziduan_type.dicList = {};
		stan_ziduan_type.dicList.name = ress.data.field_set.fieldList[0].dicList[(array_ziduan[0].value) - 1].name;
		stan_ziduan_type.dicList.id = array_ziduan[0].value;
		stan_ziduan_type.zdyName = "apply_type";
		stan_ziduan_type.oldFieldName = "apply_type";
		stan_ziduan_type.ifnull = 0;
		stan_ziduan_type.tableId = 113;
		stan_ziduan_type.fieldType = 11;
		stan_ziduan_type.fieldId = 3561;
		
		var stan_ziduan_daynum = {};
		stan_ziduan_daynum.valiadType = 0;
		stan_ziduan_daynum.ifIndex = 0;
		stan_ziduan_daynum.fieldName = "apply_day";
		stan_ziduan_daynum.fieldCnName = "申请天数";
		stan_ziduan_daynum.fType = 3;
		stan_ziduan_daynum.ifOnly = 0;
		stan_ziduan_daynum.tableCnName = "请假申请";
		stan_ziduan_daynum.length = 10;
		stan_ziduan_daynum.sort = 4;
		stan_ziduan_daynum.tableName = "leave_approval";
		stan_ziduan_daynum.zdyName = "apply_day";
		stan_ziduan_daynum.oldFieldName = "apply_day";
		stan_ziduan_daynum.ifnull = 0;
		stan_ziduan_daynum.tableId = 113;
		stan_ziduan_daynum.numType = 0;
		stan_ziduan_daynum.fieldType = 9;
		stan_ziduan_daynum.fieldId = 3562;
		stan_ziduan_daynum.value = array_ziduan[1].value;
		
		var stan_ziduan_reason = {};
		stan_ziduan_reason.valiadType = 0;
		stan_ziduan_reason.ifIndex = 0;
		stan_ziduan_reason.fieldName = "apply_reason";
		stan_ziduan_reason.fieldCnName = "申请原因";
		stan_ziduan_reason.fType = 1;
		stan_ziduan_reason.ifOnly = 0;
		stan_ziduan_reason.tableCnName = "请假申请";
		stan_ziduan_reason.length = 200;
		stan_ziduan_reason.sort = 5;
		stan_ziduan_reason.tableName = "leave_approval";
		stan_ziduan_reason.zdyName = "apply_reason";
		stan_ziduan_reason.oldFieldName = "apply_reason";
		stan_ziduan_reason.ifnull = 0;
		stan_ziduan_reason.tableId = 113;
		stan_ziduan_reason.fieldType = 1;
		stan_ziduan_reason.fieldId = 3563;
		stan_ziduan_reason.value = array_ziduan[2].value;
		
		var stan_ziduan_starttime = {};
		stan_ziduan_starttime.valiadType = 0;
		stan_ziduan_starttime.ifIndex = 0;
		stan_ziduan_starttime.fieldName = "apply_start_time";
		stan_ziduan_starttime.fieldCnName = "请假开始日期";
		stan_ziduan_starttime.fType = 5;
		stan_ziduan_starttime.ifOnly = 0;
		stan_ziduan_starttime.tableCnName = "请假申请";
		stan_ziduan_starttime.sort = 6;
		stan_ziduan_starttime.tableName = "leave_approval";
		stan_ziduan_starttime.zdyName = "apply_start_time";
		stan_ziduan_starttime.oldFieldName = "apply_start_time";
		stan_ziduan_starttime.ifnull = 0;
		stan_ziduan_starttime.tableId = 113;
		stan_ziduan_starttime.fieldType = 10;
		stan_ziduan_starttime.fieldId = 3564;
		stan_ziduan_starttime.value = array_ziduan[3].value;
		
		var Fstan_ziduan = {};
		Fstan_ziduan[0] = stan_ziduan_type;
		Fstan_ziduan[1] = stan_ziduan_daynum;
		Fstan_ziduan[2] = stan_ziduan_reason;
		Fstan_ziduan[3] = stan_ziduan_starttime;
	}
	
	Fflow_set.form_set=	Fstan_ziduan;
	//汇总数据
	ress.data.flow_set=Fflow_set;
	console.log(ress)
}
