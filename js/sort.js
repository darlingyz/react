import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/sort.scss";
export default class sort extends React.Component{
	constructor(props){
		super(props)
		this.state={
			arr:[],
			sole:[],
			gid:this.props.location.query.ipt
			
		}
	}
	componentWillMount(){
		var that=this;	
		var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+this.state.gid;		
		MyAjax.fetch(url,function(data){
			var res=data.data;
			var soleds=data.data.goodsStock;
			console.log(res)
			var down=[];
			for(var i in res){
				var saled = res[i].goodsStock.totalSaled;
				console.log(saled)
				res[i].goods.totalSaled = saled;
				down.push(
					res[i].goods
				)
			}
		var down_pri=[];
		
	function compare(property){
   		 return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
   		 }
}
						
	console.log(down.sort(compare('vipshopPrice')))				
			that.setState({
				arr:down,
				sole:soleds
				
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
	togo(){
		window.history.go(-1)
	}
	render(){
		var that=this;
		var arrs=this.state.arr;
		var arry=[];
		
		for(var i in arrs){
			arry.push(
			<li key={i} onClick={this.toDetail.bind(that,arrs[i].gid)}>
				<div className="imgs">
					<img src={arrs[i].image}/>				
				</div>
				<div className="band_detail">
					<strong>{arrs[i].brandStoreName}</strong>
					<p className="productName">{arrs[i].productName}</p>
					<span className="iconfont" id="mans">&#xe82b;</span>
					<span className="saled">{arrs[i].totalSaled}人购买</span>
					<div className="prices">
						<i>￥</i>
						<span>{arrs[i].vipshopPrice}</span>					
					<p>
						<b>￥</b>
						{arrs[i].marketPrice}
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
					<div className="cancel_Jump" onClick={this.togo.bind(this)}>取消</div>
					<i className="iconfont" id="home_Jump" onClick={this.tohome.bind(this)}>&#xe660;</i>	
				
			</header>
			<div id="Jumpcontent">
			<ul className="list_Jump">
					<li><span className="iconfont" id="price_Jump">&#xe66c;</span>价格</li>
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
