
import React from "react";

export default class Kind extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		
		return (
			<div className = "type">
				<header id="header">Kind头部</header>
				<div id="content">Kind内容区域</div>
			</div>
		)
	}
}
