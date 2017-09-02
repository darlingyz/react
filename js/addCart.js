import React from "react";
import {hashHistory} from "react-router";

import "../scss/addCart.scss";

export default class addCart extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(			
			<div className="type">
				<header id="add_header"></header>
				<div id="add_content"></div>			
			</div>
		)
		
		
	}
	
}
