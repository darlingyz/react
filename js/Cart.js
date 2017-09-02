import React from "react";
import {hashHistory} from "react-router";
import "../scss/cart.scss";
export default class Cart extends React.Component{
	constructor(props){
		super(props)
	}
	
	goHome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	toback(){
		window.history.go(-1)
	}
	
	render(){
		
		return (
			<div className = "type">
				<header id="cart_Header">
					<span className="iconfont" id="cart_icon" onClick={this.toback.bind(this)}>&#xe60d;</span>
					<div className="cart_header">购物车</div>	
				</header>
				<div id="cart_Content">				
					<div className="cartcont">
						<img src="../img/100.png"/>
						
						<p> 购物车为空哦~ </p>
						<p> 赶紧抢点东西犒劳自己吧~ </p>
						<div className="coress" onClick={this.goHome.bind(this)}>去首页逛逛</div>
					</div>				
				</div>
			</div>
		)
	}
}
