
import React from "react";

export default class More extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		
		return (
			<div className = "type">
				<header id="Moreheader">More头部</header>
				<div id="Morecontent">More内容区域</div>
			</div>
		)
	}
}
