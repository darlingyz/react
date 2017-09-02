import React from "react";
import {Link, hashHistory} from "react-router";
import "./../scss/home.scss";
import MyAjax from "./MyAjax.js";
export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			proList:[],
			Lists:[],
			strList:[],
			lastpic:[],
			fen_Ging:[],
			fen_Lists:[],
			products_List:[],
			day_list:[],
			num:0
		}
	
}	

	
	componentWillMount(){
		var that=this;
	var url="http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1";
		MyAjax.fetchJsonp(url,function(data){
			var str=data.data[478];
			var strList=data.data[724];
			var lastPic=data.data[725];
			var fenGing=data.data[727];
			var fenList=data.data[728];
			var arr1=[];
			var fenList_arr=[];			
			for(var item of str){
				arr1.push(item.imgFullPath)
			}	
			for(var item of fenList){
				fenList_arr.push(item.imgFullPath)
			}
			that.setState({
				proList:arr1,
				lunbo:strList,
				lastpic:lastPic,
				fen_go:fenGing,
				fen_Lists:fenList_arr,
				
			})
		},function(err){
			console.log(err)
		})
	
		
	var urls="http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1";
	MyAjax.fetchJsonp(urls,function(res){
		var datas=res.data[496];	
		that.setState({
			Lists:datas
		})
	},function(err){
		console.log(err)
	})	
	
	
	
	
	
	
	
/*	
		*/
}
	toSearch(){
		hashHistory.push({
			pathname:"/search"
		})
		
	}
	goDetail(gid,vid){
		hashHistory.push({
			pathname:"/Datail",
			query:{
				gid:gid,
				vid:vid
			}
		})
	}
	toListDetail(bid){
		hashHistory.push({
			pathname:"/detaillist",
			query:{
				bid:bid
			}
		})
	}	
	tomoreFn(event){		
		var that=this;
		var top=this.refs.top.scrollTop;
		var height=this.refs.top.scrollHeight;
		var num=this.state.num;
		if(top>height-100-this.refs.top.offsetHeight){		
			if(num<10){
				num++	
			}			
			console.log(num)
			that.setState({
				num:num
			})
			var url1="http://w.lefeng.com/api/neptune/special_brands/v3?page="+num+"&labelType=1";
			MyAjax.fetchJsonp(url1,function(data){
			var Products=data.data;
				that.setState({					
					products_List:Products
				})			
			},function(err){
				console.log(err)
			})
			
			
	var urlday="http://w.lefeng.com/api/neptune/handpick_list/v1?start="+this.state.num;
	MyAjax.fetch(urlday,function(data1){
		var day_Data=data1.data;
		that.setState({
			day_list:day_Data
		})		
	},function(err){
			console.log(err)
	})		
																		
		}				
		
	}
	toTop(){
		var that=this;
		that.refs.top.scrollTop=0;
	}
	render(){
		var that =this;
		var arr1=this.state.proList;					
		var arr=[];
		for(var i in arr1){	
		arr.push(
			<li key={i} className="swiper-slide" >
					<img src={arr1[i]}/>
			</li>
		)}			
		var data1=this.state.Lists;
		var arr3=[];
		for(var i in data1){
			arr3.push(
				<li key={i}>				
					<img src={data1[i].imgFullPath}/>									
				</li>
			)
		}
		var arrLists=this.state.lunbo;
		var strLists=[];
		for(var i in arrLists){
			strLists.push(
				<li key={i} className="swiper-slide">
					<img src={arrLists[i].imgFullPath}/>
				</li>				
			)
		}
		var last_Pic=this.state.lastpic;
		var last_pic=[];
		for(var i in last_Pic){
			last_pic.push(				
					<img src={last_Pic[i].imgFullPath} key={i}/>				
			)
		}
		var fen_Go=this.state.fen_go;
		var fen_go=[];
		for(var i in fen_Go){
			fen_go.push(
					<img src={fen_Go[i].imgFullPath} key={i}/>								
			)
		}		
		var fen_lists=this.state.fen_Lists;	
		var products_lists=this.state.products_List;
		var products_listsarr=[];
		var products_Title=[];
		for(var i in products_lists){			
			if(products_lists[i].agio==""){
				var pro_small=products_lists[i].starProductList;
				var products_listsarr1=[];
				if(pro_small !=undefined){	
				for(var j=2;j<pro_small.length;j++){								
					products_listsarr1.push(		
					<div className="swiper-slide" key={j}>
						<img src={pro_small[j].image}/>
						<p>
							<i>￥</i>
							<em>{pro_small[j].vipshopPrice}</em>
						</p>
					</div>								
					)
				}
			}
				products_listsarr.push(					
					<li className="pro_Pic" key={i} onClick={this.toListDetail.bind(that,products_lists[i].bid)}>
						<img src={products_lists[i].brandImage}/>						
						<div className="swiper-containers" >					
						<div className="swiper-wrappers">
								{products_listsarr1}		
						</div>	
						</div>
					</li>					
				)					
			}
		if(products_lists[i].agio=!""){
			products_Title.push(
				<li key={i} onClick={this.toListDetail.bind(that,products_lists[i].bid)}>
					<span>{products_lists[i].agio}</span>
					<span>{products_lists[i].name}</span>
					<img src={products_lists[i].brandImage}/>
				</li>				
			)
		}				
	}			
	var dayList=this.state.day_list;
	var day_lists=[];
	for(var i=1;i<dayList.length;i++){
		day_lists.push(
			<li key={i} onClick={this.goDetail.bind(that,dayList[i].goods.gid,dayList[i].goods.vendorProductId)}>
			
				<img src={dayList[i].goods.image}/>
				<strong>{dayList[i].goods.name}</strong>				
					<i>￥</i>
				<span>
					{dayList[i].goods.vipshopPrice}
				</span>
				<b className="iconfont">&#xe63f;</b>
			</li>
		)}
																						
		return (
			<div className="type">
				<header id="header">
				<h1>乐蜂</h1>
				<div className="head_Search" onClick={this.toSearch.bind(this)}>
					<span className="iconfont">&#xe651;防晒隔离</span>
				</div>				
					<div className="iconfont" id="head_Rigist">&#xe659;</div>
				</header>
				<div id="content" ref="top" onScroll={this.tomoreFn.bind(this)}>
					<div className="swiper-container" id="homeBanner">					
						<ul className="swiper-wrapper" id="homeWrapper">
									{arr}
						</ul>					
					<div className="swiper-pagination"></div>						
			        </div>	
			     <div id="list">
				     <ul>
				     	{arr3}
				     </ul>			     
			     </div>
			    <div className="imgs">
			    	<img src="../img/01.jpg"/>
			    	<img src="../img/003.jpg"/>
			    	<img src="../img/03.jpg"/>
			    </div>
			     <div className="imgcart">
			     	<img src="../img/07.jpg"/>
			     	<img src="../img/04.jpg"/>
			    	<img src="../img/05.jpg"/>
			    	<img src="../img/06.jpg"/>			    	
			     </div>	
			     <div className="lunbo">
				    <div className="swiper-Container">			    	
				    	<ul className="swiper-wrapper">
				    		{strLists}
				    	</ul>			
				    </div>
				  </div>
			     <div className="proList">
			     		{last_pic}
			     </div>
			     <div className="feng_go">
			     	<p>蜂购全球</p>
			     	{fen_go}
			    <div className="swiper-Lunbo">
				    <ul className="swiper-wrapper">
					    <li className="swiper-slide">	
				    		<table>
				    			<tbody>
							    <tr>
							    	<td>
							    		<img src={fen_lists[0]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[1]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[2]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[3]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[4]}/>
							    </td>							     
							      </tr>	
							     </tbody>							   
						    </table>
						</li>
						 <li className="swiper-slide">					   
						    <table>
						    <tbody>
								<tr>
							    	<td>
							    		<img src={fen_lists[5]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[6]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[7]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[8]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[9]}/>
							    	</td>
							    </tr>
							    </tbody>
						    </table>
						</li>
					    <li className="swiper-slide">					   
						    <table>
						    <tbody>
							    <tr>
							    	<td>
							    		<img src={fen_lists[10]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[11]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[12]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[13]}/>
							    	</td>
							    	<td>
							    		<img src={fen_lists[14]}/>
							    	</td>
							    </tr>
							   </tbody>
						 </table>    
					    </li>							 	    
				    </ul>
				 <div className="swiper-Pagination"></div>	
				</div>			  
			</div>						
			<div className="product_List">
				<p>品牌专场</p>
				<ul>
					{products_listsarr}
				</ul>
				<ul className="proList_Titlt">			
					{products_Title}
				</ul>			
		<div className="daylists">
				<h1>每日精选</h1>
				{day_lists}		
		    </div>
		 </div>											
	 </div>
	 <div id="toTop" onClick={this.toTop.bind(this)}>
	  		<span className="iconfont">&#xe604;</span>	
	 </div>
</div>
		)
	}
	componentDidMount(){		
		var mySwiper = new Swiper("#homeBanner",{
					pagination:".swiper-pagination",
					autoplay:3000,
					loop:true,
					observer:true,
					autoplayDisableOnInteraction:false,
					paginationClickable: true
			})					
		var swiper = new Swiper('.swiper-Container', {   
			        slidesPerView: 3,			     
			        observer:true,
			        spaceBetween: 10
   			});	   				
   		var swipers = new Swiper('.swiper-Lunbo', {  
			       	autoplay:3000,
					pagination: '.swiper-Pagination',
        			paginationClickable: true					
   			});		   				
   		var swiper1= new Swiper('.swiper-containers', {   		     
			        observer:true,
 					slidesPerView: 3,
 					spaceBetween: 10
   			});	 
   			
   			
   		var islogin=localStorage.getItem("isLogin");
		$("#head_Rigist").on("tap",function(){
			if(islogin=="1"){
			window.location.href="http://localhost:8080/#/login/userload";
		}else{
			window.location.href="http://localhost:8080/#/User";
		}
		})
			
   			
   			
   			
	}		
}

