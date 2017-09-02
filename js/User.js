
import React from "react";
import {hashHistory} from "react-router";
import "../scss/user.scss";
export default class User extends React.Component{
	constructor(props){
		super(props)
	}
	
	goHome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	goRegister(){
		hashHistory.push({
			pathname:"/register"
		})
	}
	goLogin(){
		hashHistory.push({
			pathname:"/login"
		})
	}
	render(){
		
		return (
			<div className = "type">
				<header id="Userheader">
				<div className="iconfont" id="icon_Return">&#xe60d;</div>
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
						<div className="btn_Login" onClick={this.goLogin.bind(this)}>登录  / </div>		
						<div className="btn_register" onClick={this.goRegister.bind(this)}>&nbsp;注册</div>	
					</div>					
				</div>												
				</div>
			</div>
		)
	}
}
