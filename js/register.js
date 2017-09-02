import React from "react";
import {hashHistory} from "react-router";
import "../scss/register.scss";
import "./User.js"
import MyAjax from "./MyAjax.js";
export default class Register extends React.Component{
	constructor(props){
		super(props)
	}
	toHome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	toUser(){
		hashHistory.push({
			pathname:"/User"
		})
	}
	tobtn(){
			var istel = false;
			var ispwd = false;
			var userID = $("#userId").val();
			var password    = $("#pwd").val();
			var patrn=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if(!patrn.test(userID)){
				alert("手机号格式错误");
				istel = false;
			}else{
				istel = true;
			}
		
		if(password =""){
			alert("密码格式错误");
			ispwd = false;
		}else{
			ispwd = true;
		}
		if(istel==true && ispwd == true){
			var userObj= {
							url:"http://datainfo.duapp.com/shopdata/userinfo.php",
							data:{
								status:"register",
								userID:userID,
								password:password
							},
							dataType:"JSON"
						}
			MyAjax.zeptoAjax(userObj,function(data){
							if(data == "0"){
								alert("用户名重名")
							}else if(data == "1"){
								alert("注册成功")
								hashHistory.push({
									pathname:"login"
								})
							}else{
								alert("注册失败")
							}
						})
		}
		}
	
		goreg(){
			hashHistory.push({
				pathname:"register/forget"
			})
		}
		gofind(){
			hashHistory.push({
				pathname:"register/find"
			})
		}
	render(){
		return(
			<div className="type">
				<header id="register_Header">
					<div id="icon_Regis" className="iconfont" onClick={this.toUser.bind(this)}>&#xe60d;</div>
					<span className="regis_Regis">注册</span>
					<div id="ichome_Regis" className="iconfont" onClick={this.toHome.bind(this)}>&#xe660;</div>
				</header>	
				<div id="reginstr_Content">
					<div className="regist_Box">
					<div className="Btn_regis">
						<input type="text" id="userId" placeholder="已验证手机号/用户名/邮箱"/>
					</div>
						<div className="Btn_Login">
							<input type="password" id="pwd" placeholder="密码"/>						
						</div>						
					</div>
					<p>
						<input type="checkbox" checked="Checked" className="check_Box"/>
						<span>一个月之内免登录</span>
					</p>
					<input type="button" value="注册" id="handle"onClick={this.tobtn.bind(this)}/>
				</div>
				<b className="free" onClick={this.goreg.bind(this)}>免费注册</b>
				<strong className="forget" onClick={this.gofind.bind(this)}>忘记密码</strong>
			</div>
		)
	}
componentDidMount(){
	$(".Btn_regis input").on("focus",function(){
		$(".Btn_regis").css({"border-color":"#666","z-index":1,"position":"relative"})		
	})
	$(".Btn_regis input").on("blur",function(){
		$(".Btn_regis").css({"border-color":"#ccc","z-index":1})		
	})
	$(".Btn_Login input").on("focus",function(){
		$(".Btn_Login").css({"border-color":"#666","position":"relative","z-index":2})
	})
	$(".Btn_Login  input").on("blur",function(){
		$(".Btn_Login ").css({"border-color":"#ccc","z-index":0})		
	})
 }
}
