import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import "../scss/detail.scss";
import Toast from "./Toast.js";
export default class Detail extends React.Component{
	constructor(props){
		super(props)
		this.state={
			arr:[],			
			corese:[],
			res:[],
			forms:[],
			imgs:[],
			gid:this.props.location.query.gid,
			vid:this.props.location.query.vid,
			looks:[],
		
		}
		
	}

	
	componentWillMount(){
		var that=this;
		var url0="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+this.state.gid;
		var url1="http://w.lefeng.com/api/neptune/handpick_list/v1?stochastic=1&start=1";
		var url2="http://w.lefeng.com/api/neptune/appraise/get_appraise_list/v1?page=1&pageSize=3&scoreLevel=0&spuId="+this.state.vid;
		var url3="http://w.lefeng.com/api/neptune/appraise/count/v1?spuId="+this.state.vid;
		MyAjax.fetchJsonp(url0,function(data){
			console.log(data)
			var detail_Res=data.data.goods.descriptions;
			var imgList=data.data.goods.detailImage;			
			var dataStr=data.data.goods;		
			that.setState({
				arr:dataStr,			
				forms:detail_Res,
				imgs:imgList,
				
			})			
		},function(err){
			console.log(err)
	})
		
	MyAjax.fetch(url2,function(res){
		var datares=res.data;
	
		that.setState({
			res:datares
		})
				
	},function(err){
		console.log(err)
	})
	MyAjax.fetchJsonp(url3,function(data){	
		var core=data.data;
		var cores=[];
		cores.push(
			core.goodCount,
			core.greatScale
		)
		that.setState({
			corese:cores
		})
	},function(err){
		console.log(err)
	})	
	MyAjax.fetchJsonp(url1,function(data){		
		var lookOther=data.data;
		console.log(lookOther);
		that.setState({
			looks:lookOther
		})
	},function(err){
		console.log(err)
	})
			
}		
		
		toback(){
			window.history.go(-1);
		}
		
		tohome(){
			hashHistory.push({
				pathname:"/"
			})
	}
		
	
	goDetail(gid,vid){	
		hashHistory.push({
			pathname:"/Datail/Detailother",
			query:{
				gid:gid,
				vid:vid
			}
		})
	}
	
	goCart(){
		hashHistory.push({
			pathname:"/cart01"
		})
	}
	
	addCart(bid,gid){			
		if(localStorage.getItem("isLogin")=="1"){
			var that=this;
			var flag=true;
		if(localStorage.getItem("goods")){
			var a=JSON.parse(localStorage.getItem("goods"))
			for(var i in a){
				if(a[i].b==gid){
					a[i].size++;
					flag=false
				}
			}			
			localStorage.setItem("goods",JSON.stringify(a));			
			if(flag){			
				var obj={
					"a":bid,
					"b":gid,
					size:1					
				}
				a.push(obj);
				localStorage.setItem("goods",JSON.stringify(a))
			}
		}else{
			var a=[]
			var obj={
				"a":bid,
				"b":gid,
				size:1					
			}
			a.push(obj);
			localStorage.setItem("goods",JSON.stringify(a))			
		}
	var proNum=JSON.parse(localStorage.getItem("goods"))	
	var total=0;
	for(var i in proNum){
		total=total+proNum[i].size;		
	}
	var that=this;
		that.setState({
			total:total
		})

	var nums=document.getElementsByClassName("numred")[0];
		nums.style.display="block";
	
}else{
	hahsHistory.push("/login")	
 }
}	
	
	render(){
		var that=this;
		var brandId = this.state.arr.brandId;
		var gids=this.state.arr.gid;			
		var datas=this.state.arr;
		var arrs=[];
		var arrp=[];
		var price=[];
		var prices=[];		
		var mesg=this.state.corese;
		var forms_Tab=this.state.forms;
		var imgss=this.state.imgs;
		var lookes=this.state.looks;
		var looks=[];
		var total=this.state.total;			
		arrs.push(
			datas.smallImage
		)
		arrp.push(
			datas.name
		)
		price.push(
			datas.vipshopPrice
		)
		prices.push(
			datas.marketPrice
		)		
		var data2=this.state.res;
		var ress=[];
		for(var i in data2){
			ress.push(
				<li key={i}>
				<span className="phone_Num">{data2[i].authorName}</span>
				<span className="data_Time">2017-02-05</span>
				<p className="contents">{data2[i].content}</p>
				</li>
			)
		}
		var Tabs=[];
		for(var i in forms_Tab){
			Tabs.push(
				<tbody key={i}>
				<tr>					
					<td >{forms_Tab[i].name}</td>
					<td>{forms_Tab[i].value}</td>						
				</tr>
			</tbody>
			)
		}
		var imgs=[];
		for(var i in imgss){
			imgs.push(
				<img src={imgss[i]} key={i}/>
			)
		}
		for(var i in lookes){
			looks.push(
				<li key={i} onClick={this.goDetail.bind(that,lookes[i].goods.gid,lookes[i].goods.vendorProductId)}>
					<img src={lookes[i].goods.image}/>
					<span>{lookes[i].goods.brandStoreName}</span>
					<p>{lookes[i].goods.productName}</p>
				</li>
			)
		}
		
		
		return (
			<div className="type">
				<header id="detail_Deader">
					<div className="iconfont" id="deatil_Return" onClick={this.toback.bind(this)}>&#xe60d;</div>
					<div className="title_Detail">
							{arrp}
					</div>
					<div id="home_icon" className="iconfont" onClick={this.tohome.bind(this)}>&#xe660;</div>
				</header>
				<div id="detail_Content">
					<div className="detail_list">
						<img src={arrs[0]}/>
						<p>{arrp}</p>
						<div className="price_List">
							<span><i>￥</i>{price}</span>
							<b><strong>￥</strong>{prices}</b>							
						</div>
					<div className="anthor_list">
						<div className="free_list">
							<span>满减</span>
							<p>满199减100 上不封顶</p>							
						</div>
						<div className="free_send">
							<span>免邮</span>
							<p>全场满99包邮</p>
						</div>
					</div>
					</div>	
				</div>	
				<div className="price_cores">
				<div className="price_header">
					<span>商品评价</span><i>({mesg[0]})</i>
					<b>{mesg[1]}</b>
					<p>好评</p>										
				</div>
				<ul>
					{ress}					
				</ul>				
			</div>
			
			<div className="flows_fan">
				<span>花粉</span>
				<p>购买可最多获得<i>229</i>个花粉</p>
			</div>
	<div className="detatil_Content">
		<ul className="content_Header">
			<li className="left_Header">商品信息</li>
			<li className="Right_Header">购物说明</li>
		</ul>
			<div className="content_Left">				
				<table className="tab1">
						{Tabs}
				</table>
			<div className="load_More">点击查看图文详情</div>
				<div className="imgs">
					{imgs}
				</div>				
			</div>
			<div className="content_Right"></div>			
		</div>		
			<div className="look_other">浏览本商品的用户还购买了</div>
				<div className="other_List">
					<ul>
						{looks}					
					</ul>
				</div>	
				<div className="footers">
					<span className="iconfont" id="footer_Left" onClick={this.goCart.bind(this)}>&#xe63f;
						<i className="numred">{this.state.total}</i>
					</span>
					<div className="putin" onClick={this.addCart.bind(this,brandId,gids)}>					
					加入购物车</div>
				</div>
		</div>
		)
}
	
	
	componentDidMount(){	
	var loadMore=document.getElementsByClassName("load_More")[0];
	var imgMores=document.getElementsByClassName("imgs")[0];
	loadMore.addEventListener("tap",function(event){
		var target = event.target;
		imgMores.style.display="block";
	})
	var oputin=document.getElementsByClassName("putin")[0];
	var islogin=localStorage.getItem("isLogin");
	
		var gid=this.props.location.query.gid;
	$(".putin").on("tap",function(){
		if(islogin=="1"){
			
		}else{
			alert("还没有登录,请先登录")
			hashHistory.push({
				pathname:"/login"
			})
		}					
	})
	var goodNum=JSON.parse(localStorage.getItem("goods"))
		console.log(goodNum);
		var allNums=0;
		for(var i in goodNum){
			
		allNums+=goodNum[i].size;
		}
	console.log(allNums);
	var nums=document.getElementsByClassName("numred")[0];
			if(allNums>0){
				nums.style.display="block";
				nums.innerHTML=allNums;
			}else{
				nums.style.display="none";
			}
}	

}
