import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/pay.scss";
export default class Pay extends React.Component{
	constructor(props){
		super(props)
		this.state={
			total:this.props.location.query.total
		}
	}
	componentWillMount(){
		
	}
	goback(){
		window.history.go(-1)
	}
render(){
	
	var total=this.state.total
	
	return(
		<div className="type">
			<header id="payheader">
				<div className="iconfont" id="pay_icon" onClick={this.goback.bind(this)}>&#xe60d;</div>
				<div className="pay_All">结算</div>
			</header>
			<div id="payContent">
				<div className="address">
					<p>收货信息</p>
					<img src="../img/adds.png"/>
					<ul>
						<li className="pay_name">你是谁</li>
						<li className="pay_phone">18211111111</li>
						<li className="pay_adds">河南省郑州市高新区</li>
					</ul>
					<div className="moreAdds">更多收货地址</div>
				</div>
				<div className="paystyle">
					<p className="styles">支付方式</p>
					
					<p className="fans">
					
						花粉 暂不支持使用
					</p>
					
					<p className="zhifu">
					<span className="iconfont" id="icon_fan">&#xe622;</span>					
					支付宝付款
					</p>
					<p className="fassts">
						<span className="iconfont" id="fub">&#xe640;</span>	
						银行卡快捷支付
					</p>
				</div>
				<div className="allPay">
					<p>费用详情:</p>
					<p>商品总金额:145</p>
					<p>乐蜂发货,运费:10</p>					
				</div>
				<div className="fapiap"></div>
			</div>
			<div className="payFooter">
				<div className="payleft">
					<span>总金额:</span>
					<span>￥155</span>
				</div>
				<div className="payRight">
					支付
				</div>
		</div>
		</div>
	)
}
	
	
	
}

