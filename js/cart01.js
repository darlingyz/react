import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js";
import "../scss/cart01.scss";
export default class Cart extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			many:[],
			name:[],
			arr:[]
		}
	}
	
	toBackFn(){
		hashHistory.push({
			pathname:"/"
		})
	}
	//del
	toDeleteFn(index){
		var that=this;
		var name1=this.state.name;
		console.log(name1)
	    name1.splice(index, 1)
		that.setState({
			name:name1
		})
		$("li").eq(index).css('display','none');
		localStorage.setItem("goods",JSON.stringify(name1))
		
	}
	//reduce
	todecreaseFn(num){
		
		
		var that=this;
		var val=this.refs.val.innerHTML;
		--val;		
		$('.carListCon').eq(num).find('.pronum').html(val);
		var rq=that.state.proList;
		rq[num].size=val
		that.setState({
			size:rq[num].size
		})
		var name1=this.state.name;
		name1[num].size=val;
		that.setState({
			size:name1[num].size
		})
		localStorage.setItem("goods",JSON.stringify(name1))
	}
	
	//add
	toaddFn(index){
		var that=this;
		var value=this.refs.val.innerHTML;
		++value;
		$('.carListCon').eq(index).find('.pronum').html(value);
		var rq=that.state.proList;
		rq[index].size=value
		that.setState({
			size:rq[index].size
		})
		var name1=this.state.name;
		name1[index].size=value;
		that.setState({
			size:name1[index].size
		})
		localStorage.setItem("goods",JSON.stringify(name1))
	}	
	componentWillMount(){
		var that=this
		var name=JSON.parse(localStorage.getItem("goods"))
		that.setState({
			name:name
		})
		var many=[];
		for(let i=0;i<name.length;i++){
			var brandId=name[i].a;
			var gid=name[i].b;	
		var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+gid+"&brandId="+brandId;
			MyAjax.fetchJsonp(url,function(data){				
				var result=data.data.goods			
				var obj={
					verticalImage:result.verticalImage,
					brandStoreName:result.brandStoreName,
					productName:result.productName,
					vipshopPrice:result.vipshopPrice,
					size:name[i].size
				}
				many.push(obj)				
				that.setState({
					proList:many,
				
				})							
			
		
			},function(err){
				console.log(err)
			})				
		}		
	}	
	gopay(total){
		hashHistory.push({
			pathname:"/cart01/pay",
			query:{
				total:total
			}
		})
	}
	render(){	
		var that=this
		var result=this.state.proList;
		var arr=[];
		var disp=[];
		var total=0;	
		
		for(var i in result){
			total=total+result[i].vipshopPrice*result[i].size
			arr.push(<li key={i} ref="lis" data-gid={result[i].gid} className="carListCon">
						<div className="cart01_left"><img src={result[i].verticalImage}/></div>
						<div className="cart01_right">
						<strong>{result[i].brandStoreName}</strong>
							<p>{result[i].productName}</p>
							<p>￥{result[i].vipshopPrice}</p>
							<p>
								<span onClick={this.todecreaseFn.bind(this,i)} className='reduce'>-</span>
								<span ref='val' className='pronum'>{result[i].size}</span>
								<span onClick={this.toaddFn.bind(this,i)} className="plus">+</span>
							</p>
							<p onClick={this.toDeleteFn.bind(this,i)} className="del">&times;</p>
						</div>
					</li>)
		}		
		
		var len=this.state.name.length;
		if(len>=1){
			disp.push(arr)
		}else{
			hashHistory.push({				
					pathname:"/cart"
					
			})
		}
		
		return(
			<div className = "type">
				<header id="cart01_Header">										
						<div className="iconfont" id="cart01_return" onClick={this.toBackFn.bind(this)}>&#xe60d;</div>				
						<div className="cart01_box">购物车</div>										
				</header>
				<div id="cart01_Content">	
						<div className="logoname">乐蜂</div>
						<ul id="pro">
							{disp}							
						</ul>
				</div>		
						<div className="payfor">
							<div className="total-left">
								<p>
									<b>待支付:</b>
									<span>￥{total}</span>
								</p>
							</div>
							<div className="total-right" onClick={this.gopay.bind(this,total)}>
								<p>结算</p>
							</div>
						</div>				
			</div>
		)
	}
}