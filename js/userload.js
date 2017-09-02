import React from "react";
import {hashHistory} from "react-router";
import "../scss/userload.scss";
export default class User extends React.Component{
	constructor(props){
		super(props)
	}
	
	goHome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	toBack(){
		window.history.go(-1)
	}
	gologin(){
		var username=document.getElementsByClassName("username")[0];
		var Btns=document.getElementById("btn");
		var id=localStorage.getItem("userID");
		var idlogin=localStorage.getItem("isLogin")
		username.innerHTML="用户名";		
		localStorage.removeItem("userID");
		localStorage.removeItem("isLogin");
		hashHistory.push({
			pathname:"/User"
		})
		
	}
	render(){
		
		return (
			<div className = "type">
				<header id="Userheader">
				<div className="iconfont" id="icon_Return" onClick={this.toBack.bind(this)}>&#xe60d;</div>
				<div className="title">我的蜂巢</div>
				<div className="iconfont" id="icon_Home" onClick={this.goHome.bind(this)}>&#xe660;</div>						
				</header>
				<div id="Usercontent">
				<div className="user_login">
					<img src="../img/001.png"/>
						<span className="last_Img">
							<img src="../img/002.png"/>
						</span>
					<div className="btns">
						<div className="username">用户名</div>		
					</div>	
					<input type="button" value="退出登录" id="btn" onClick={this.gologin.bind(this)}/>
				</div>					
				</div>
			</div>
		)
	}
	componentDidMount(){
		var username=document.getElementsByClassName("username")[0];
		var btns=document.getElementById("btn")
		var id=localStorage.getItem("userID");
		username.innerHTML=id;
		var islogin=localStorage.getItem("isLogin");
		if(islogin=="1"){
			$("#Usercontent").css("display","block")
		}else{
			username.innerHTML="用户名";
		}
	
		
	}
}
