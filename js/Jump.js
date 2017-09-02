import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/jump.scss";
export default class Jump extends React.Component{
	constructor(props){
		super(props)
		this.state={
			arr:[],
			gid:this.props.location.query.ipt,
			ipt:this.props.location.query.ipt			
		}
	}
	componentWillMount(){
		var that=this;	
		var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+this.state.gid;		
		MyAjax.fetch(url,function(data){
			var res=data.data;
			console.log(res)						
																																						
			that.setState({
				arr:res
			})
		},function(err){
			console.log(err)
		})			
}			
	toDetail(gid){
		hashHistory.push({
			pathname:"/Datail",
			query:{
				gid:gid
			}
		})
	}
	tosearch(){
		hashHistory.push({
			pathname:"/search"
		})
	}
	tohome(){
		hashHistory.push({
			pathname:"/"
		})
	}	
	toprice(ipt){
		hashHistory.push({
			pathname:"/search/Jump/sort",
			query:{
				ipt:this.props.location.query.ipt
			}
		})
	}
	

	
	
	
	
	render(){
		var that=this;
		var arrs=this.state.arr;
		var arry=[];
		for(var i in arrs){
			arry.push(
			<li key={i} onClick={this.toDetail.bind(that,arrs[i].goods.gid)}>
				<div className="imgs">
					<img src={arrs[i].goods.image}/>				
				</div>
				<div className="band_detail">
					<strong>{arrs[i].goods.brandStoreName}</strong>
					<p className="productName">{arrs[i].goods.productName}</p>
					<span className="iconfont" id="mans">&#xe82b;</span>
					<span className="saled">{arrs[i].goodsStock.saled}人购买</span>
					<div className="prices">
						<i>￥</i>
						<span>{arrs[i].goods.vipshopPrice}</span>					
					<p>
						<b>￥</b>
						{arrs[i].goods.marketPrice}
						<span className="iconfont" id="carts">&#xe620;</span>
					</p>					
					</div>
				</div>
				
			</li>
				
			)
			
		}
		
		return(
			<div className="type">
			<header id="JumpHeader">			
					<input type = "text" placeholder="搜索商品" id="btns"/>
					<div className="cancel_Jump" onClick={this.tosearch.bind(this)}>取消</div>
					<i className="iconfont" id="home_Jump" onClick={this.tohome.bind(this)}>&#xe660;</i>	
				
			</header>
			<div id="Jumpcontent">
			<ul className="list_Jump">
					<li onClick={this.toprice.bind(this)}>
						<span className="iconfont" id="price_Jump">&#xe66c;</span>
					价格</li>
					<li><span className="iconfont" id="sell_Jump">&#xe66c;</span>销量</li>
					<li><span className="iconfont" id="chooses_Jump">&#xe69c;</span>筛选</li>					
				</ul>
				<dl className="product_List">				
					{arry}
				</dl>
			</div>
			</div>
		)
	}
	
}
