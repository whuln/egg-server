(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b92721f"],{"56ff":function(t,e,a){"use strict";var r=a("c194"),n=a.n(r);n.a},7422:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticClass:"header",attrs:{color:"red"}},[a("mu-button",{attrs:{slot:"left",icon:""},on:{click:t.goHome},slot:"left"},[a("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_left")])]),t._t("default")],2)],1)},n=[],c={name:"TaskHeader",methods:{goHome:function(){this.$router.push("home")}}},s=c,i=(a("56ff"),a("2877")),u=Object(i["a"])(s,r,n,!1,null,"19711852",null);e["a"]=u.exports},ad83:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("task-header",[t._v("我的任务")]),a("div",{staticClass:"tablecon"},[null==t.carapply.carnumber?a("div",[t._v("您当前没有出车安排")]):a("div",[t._v("\n      您即将出行的用车安排信息如下：\n      "),a("mu-list",[a("mu-sub-header",[t._v("基本信息")]),a("mu-list-item",[t._v("用车人："+t._s(t.carapply.user.name)+"(电话："+t._s(t.carapply.user.phone)+")")]),a("mu-list-item",[t._v("项目 ："+t._s(t.carapply.project))]),a("mu-list-item",[t._v("用途："+t._s(t.carapply.purpose))]),a("mu-list-item",[t._v("地点："+t._s(t.carapply.places))]),a("mu-list-item",[t._v("计划出发日期："+t._s(t.carapply.plantime1))]),a("mu-list-item",[t._v("计划回程日期："+t._s(t.carapply.plantime2))]),a("mu-sub-header",[t._v("填写信息")]),a("mu-list-item",[t._v("\n          实际出发日期：\n          "),a("mu-date-input",{attrs:{"label-float":""},model:{value:t.carapply.actualtime1,callback:function(e){t.$set(t.carapply,"actualtime1",e)},expression:"carapply.actualtime1"}}),a("br"),a("mu-button",{attrs:{small:"",color:"red",disabled:t.carapply.isgo},on:{click:t.onGo}},[t._v("确认出发")])],1),a("mu-list-item",[t._v("\n          实际返回日期：\n          "),a("mu-date-input",{attrs:{"label-float":""},model:{value:t.carapply.actualtime2,callback:function(e){t.$set(t.carapply,"actualtime2",e)},expression:"carapply.actualtime2"}}),a("br"),a("mu-button",{attrs:{small:"",color:"red",disabled:t.carapply.isback},on:{click:t.onBack}},[t._v("确认交车")])],1)],1)],1)])],1)},n=[],c=(a("96cf"),a("3b8d")),s=a("cebc"),i=a("2f62"),u=a("7422"),l={name:"MyTask",components:{TaskHeader:u["a"]},data:function(){return{carapply:{}}},computed:Object(s["a"])({},Object(i["d"])(["userinfo","r"])),methods:{nullOrempty:function(t){return null==t||""==t},onGo:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.nullOrempty(this.carapply.actualtime1)){t.next=3;break}return this.$alert("请选择出发日期！"),t.abrupt("return");case 3:return t.prev=3,t.next=6,this.r.post("upsert_ucf",qs.stringify({id:this.carapply.id,isgo:1,actualtime1:this.carapply.actualtime1}));case 6:e=t.sent,0==e.data.code?(this.carapply.isgo=1,this.$alert("提交成功")):this.$alert("提交失败"),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),this.$alert("提交失败");case 13:case"end":return t.stop()}},t,this,[[3,10]])}));function e(){return t.apply(this,arguments)}return e}(),onBack:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.nullOrempty(this.carapply.actualtime2)){t.next=3;break}return this.$alert("请选择返回日期！"),t.abrupt("return");case 3:return t.prev=3,t.next=6,this.r.post("upsert_ucf",{id:this.carapply.id,isback:1,actualtime2:this.carapply.actualtime2,driveraccount:this.carapply.driveraccount,carnumber:this.carapply.carnumber});case 6:e=t.sent,0==e.data.code?(this.carapply.isback=1,this.$alert("提交成功 "),setTimeout(function(){a.getCaruse()},1e3)):this.$alert("提交失败"),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),this.$alert("提交失败");case 13:case"end":return t.stop()}},t,this,[[3,10]])}));function e(){return t.apply(this,arguments)}return e}(),getCaruse:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.prev=1,t.next=4,this.r.post("getucfs_driver",{driveraccount:this.userinfo.account});case 4:a=t.sent,r=a.data,0==r.code&&(e.carapply=r.msg),1==r.code&&(this.carapply={},e.$alert("您当前没有出车安排")),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](1),e.$alert("您当前没有出车安排");case 13:case"end":return t.stop()}},t,this,[[1,10]])}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.getCaruse()}},p=l,o=a("2877"),m=Object(o["a"])(p,r,n,!1,null,null,null);e["default"]=m.exports},c194:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5b92721f.8fc33623.js.map