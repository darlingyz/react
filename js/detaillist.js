import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/detaillist.scss";
export default class detaillist extends React.Component{
	constructor(props){
		super(props)
		this.state={
			arr:[],
			arr1:[],
			bid:this.props.location.query.bid
		}
	}
	componentWillMount(){	
	var that=this; 
	var url0="http://w.lefeng.com/api/neptune/brand/details/v1?brandId="+this.state.bid;//**进入header/
	var url1="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+this.state.bid+"&start=1";//*list*/
		MyAjax.fetch(url0,function(data){
			var res=[];			
			console.log(data.data)
			res.push(
				data.data.brandHeadImg,
				data.data.bid,
				data.data.brandName
			)
			that.setState({
				arr:res
			})
				
		},function(err){
			console.log(err)
		})
	MyAjax.fetch(url1,function(res){	
		var datas=res.data;
		console.log(datas)
		that.setState({
				arr1:datas		
		})
	},function(err){
		console.log(err)
	})
		
}
	tohome(){
			hashHistory.push({
			pathname:"/"
			
		})
	}
	goDetail(gid,vid,bid){		
		hashHistory.push({
			pathname:"/Datail",
			query:{
				gid:gid,
				vid:vid,
				bid:bid
			}
		})
	}
	topro(bid){
		hashHistory.push({
			pathname:"/detaillist/sort",
			query:{
				bid:bid
			}
		})
	}
	
	render(){
		var that=this;
		var ress=this.state.arr;
		var datalist=this.state.arr1;	
		var datali=[];
		var brandId=this.state.bid
		for(var i in datalist){
			datali.push(
		<li key={i} onClick={this.goDetail.bind(that,datalist[i].goods.gid,datalist[i].goods.vendorProductId,datalist[i].goods.brandId)}>
					<img src={datalist[i].goods.image}/>
					<div className="bandName">
						{datalist[i].goods.brandStoreName}
						{datalist[i].goods.productName}
						
					</div>
					<i>￥</i>
					<b className="vipprice">{datalist[i].goods.vipshopPrice}</b>
					<div className="marketprice">
						<i>￥</i>
						{datalist[i].goods.marketPrice}
					</div>
					<div className="iconfont" id="cart">&#xe620;</div>
				</li>
			)
		}
		return(
			<div className="type">
				<header id="Listheader">
					<div className="iconfont" id="List_retuen" onClick={this.tohome.bind(this)}>&#xe60d;</div>
					<div className="title_Detail">
							{ress[2]}
					</div>
					<div id="Return_icon" className="iconfont" onClick={this.tohome.bind(this)}>&#xe660;</div>
				</header>
				<div id="Listcontent">					
					<img src={ress[0]}/>
					<p>满199减50 上不封顶</p>
				<ul className="listHeader">
					<li><span className="iconfont" id="price" onClick={this.topro.bind(this,brandId)}>&#xe66c;</span>价格</li>
					<li><span className="iconfont" id="sell">&#xe66c;</span>销量</li>
					<li><span className="iconfont" id="chooses">&#xe69c;</span>筛选</li>					
				</ul>
				
					<ul className="otherList">					
						 {datali}
										
					</ul>				
				</div>
			
			
			
			
			
			
			</div>
		)
	}
}
