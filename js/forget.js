import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/forget.scss";
export default class Forget extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		
	}
	toback(){
		window.history.go(-1)
	}
	render(){
		
		
		return(
			<div className="type">
				<header id="for_Header">
					<span className="iconfont" onClick={this.toback.bind(this)}>&#xe60d;</span>
					<div className="titie">注册</div>
					
				</header>
				<div id="forget_content">
					<div className="zhuce">
						<input type="text" id="uerId" placeholder="手机号"/>
						<input type="button" value="获取验证码" id="btn"/>
					</div>
				</div>
			</div>
			
		)
	}
	
}

