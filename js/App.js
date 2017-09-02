import React from "react";
import { Link, IndexLink, hashHistory } from "react-router";
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div id="container">
				{this.props.type}
				<footer id="footer">	
					<ul>
						<li>
							<IndexLink to ="/" activeClassName="active">首页</IndexLink>
						</li>
						<li>
							<IndexLink to ="/cart" activeClassName="active" id="cart">购物车</IndexLink>
						</li>
						<li>
							<IndexLink to ="/user" activeClassName="active" id="user">我的</IndexLink>
						</li>
			
					</ul>
				</footer>
			</div>

		)
	}
	componentDidMount(){
		
		var islogin=localStorage.getItem("isLogin");
		$("#user").on("tap",function(){
			if(islogin=="1"){
			window.location.href="http://localhost:8080/#/login/userload";
		}else{
			window.location.href="http://localhost:8080/#/User";
		}
		})
	
	var goodNum=JSON.parse(localStorage.getItem("goods"))
		var allNums=0;
		for(var i in goodNum){			
		allNums+=goodNum[i].size;
		}
	
	$("#cart").on("tap",function(){
		if(allNums>0){
			hashHistory.push({
				pathname:"/cart01"
			})
		}
	})
		
	}

}