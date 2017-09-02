import React from "react";
import {hashHistory} from "react-router";
import "../scss/login.scss";
import "./User.js"
import MyAjax from "./MyAjax.js";
export default class Login extends React.Component{
	constructor(props){
		super(props)
	}
	goHomes(){
			hashHistory.push({
				pathname:"/"
			})
		}
		goUsers(){
			hashHistory.push({
				pathname:"/User"
			})
		}
		toBtn(){
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
								status:"login",
								userID:userID,
								password:password
							},
							dataType:"JSON"
						}
						
						MyAjax.zeptoAjax(userObj,function(data){
							if(data == "0"){
								alert("没有此人")
							}else if(data == "2"){
								alert("密码错误")
							}else{
								//存储一个登录状态
								localStorage.setItem("isLogin","1");
								localStorage.setItem("userID",userID);
							    hashHistory.push({
								pathname:"/login/userload"
					})
			}
		})
	}
}
		goreg(){
			hashHistory.push({
					pathname:"login/forget"
			})
		}
		gofind(){
			hashHistory.push({
				pathname:"login/find"
			})
		}
		render(){
		return(
			<div className="type">
				<header id="login_Header">
					<div id="icon_login" className="iconfont" onClick={this.goUsers.bind(this)}>&#xe60d;</div>
					<span className="login_Regis">登录</span>
					<div id="login_Home" className="iconfont" onClick={this.goHomes.bind(this)}>&#xe660;</div>
				</header>	
				<div id="login_Content">												
				<div className="login_Box">
					<div className="Btn1_regis">
						<input type="text"placeholder="已验证手机号/用户名/邮箱" id="userId"/>
					</div>
						<div className="Btn1_Login">
							<input type="password" placeholder="密码" id="pwd"/>						
						</div>						
					</div>
					<p>
						<input type="checkbox" checked="readOnly" className="check_Boxs"/>
						<span>一个月之内免登录</span>
					</p>
					<input type="button" value="登录" id="handles" onClick={this.toBtn.bind(this)}/>	
				<b className="free_login" onClick={this.goreg.bind(this)}>免费注册</b>
				<strong className="forget_login" onClick={this.gofind.bind(this)}>忘记密码</strong>										
				</div>
			</div>
		)
	}		
	componentDidMount(){
		$(".Btn1_regis input").on("focus",function(){
			$(".Btn1_regis").css({"border-color":"#666","z-index":1,"position":"relative"})		
		})
		$(".Btn1_regis input").on("blur",function(){
			$(".Btn1_regis").css({"border-color":"#ccc","z-index":1})		
		})
		$(".Btn1_Login input").on("focus",function(){
			$(".Btn1_Login").css({"border-color":"#666","position":"relative","z-index":2})
		})
		$(".Btn1_Login  input").on("blur",function(){
			$(".Btn1_Login ").css({"border-color":"#ccc","z-index":0})		
		})
	 }		
		
		

}
