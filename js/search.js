import React from "react";
import {Link,hashHistory} from "react-router";
import MyAjax from "./MyAjax.js";
import Home from "./Home.js";
import "../scss/search.scss"
export default class Search extends React.Component{
	constructor(props){
		super(props)
	this.state={
		list:[],
		cont_list:[],
	
	}
}
	componentWillMount(){
		var that=this;
		var url="http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1";
		MyAjax.fetchJsonp(url,function(data){
			var str=data.data;
			that.setState({
				list:str
			})
		},function(err){
			console.log(err)
		})		
	}
	tosearchother(){
		
		var that=this;
		var ipt=$("input").val();
		var searchLi=$(".searchList");
		var urls="http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword="+ipt+"&count=15";
		MyAjax.fetch(urls,function(data){
			var seatchList=data.data;
			console.log(seatchList)
			that.setState({
				cont_list:seatchList
			})
		},function(err){
			console.log(err)
		})
		if(ipt!==""){
			searchLi.css("display","block");			
		}else{
			searchLi.css("display","none");	
		}
		
	}
	goHome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	goJump(ipt){
		
		var btns=document.getElementById("searchLists");
		var searchLi=$(".searchList");
		btns.addEventListener("tap",function(event){
			var target=event.target;
			var ipt=target.innerHTML;
			$("input").val(ipt);
			searchLi.css("display","none");	
		})
		hashHistory.push({
			pathname:"/search/Jump",
			query:{
				ipt:ipt
			}
		})
	}
	
	

	
	render(){		
		var that=this;
		var lists=this.state.list;
		var search=this.state.cont_list;
		var arr=[];
		var arr1=[];
		var arrs=[];
		for(var i in lists){
			if(lists[i].ishighlight=="1"){
				arr.push(
				<li key={i} onClick={this.goJump.bind(that,lists[i].word)}>{lists[i].word}</li>				
			)
			}
			if(lists[i].ishighlight=="0"){
				arr1.push(
				<li key={i} className="specal" onClick={this.goJump.bind(that,lists[i].word)}>
					{lists[i].word}
				</li>
					
				)
			}
		}
		for(var i in search){
			arrs.push(
				<li key={i} onClick={this.goJump.bind(that,search[i])}>{search[i]}</li>
			)
		}
			
		return (
			<div className="container">
				<div className="type">
					<header id="Searchheader">
						<input type = "text" placeholder="搜索商品" id="sear_Btn" onChange ={this.tosearchother.bind(this)}/>
						<div className="cancel" onClick={this.goHome.bind(this)}>取消</div>
						<i className="iconfont" id="home" onClick={this.goHome.bind(this)}>&#xe660;</i>
					</header>
					<div id="Searchcontent">
						<p>大家都在搜</p>
						<ul>
							{arr}	
							{arr1}
						</ul>
						
					</div>
				</div>
				
				<div className="searchList" id="searchLists">
							<ol>
								{arrs}							
							</ol>
						</div>
			</div>
		)
	}
	
	componentDidMount(){					
		var btns=document.getElementById("Searchcontent");		
		btns.addEventListener("tap",function(event){
			var target=event.target;
			var ipt=target.innerHTML;
			$("input").val(ipt);
			btns.style.display="none";
		
		
		})
		
	
		
	}	
}


