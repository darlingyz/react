import React from "react";
import ReactDom from "react-dom";
import { Router,Route,hashHistory,IndexRoute } from "react-router";
import "./scss/main.scss";

import App from "./js/App.js";
import Home from "./js/Home.js";
import Cart from "./js/Cart.js";
import User from "./js/User.js";

import search from "./js/search.js";
import register from "./js/register";
import login from "./js/login.js";

import Detail from "./js/Detail.js";
import detaillist from "./js/detaillist.js";
import Detailother from "./js/Detailother.js";
import Jump from "./js/Jump.js";
import sort from "./js/sort.js";
import forget from "./js/forget.js";
import find from "./js/find.js";
import userload from "./js/userload.js";
import cart01 from "./js/cart01.js";
import addCart from "./js/addCart.js"; 
import pay from "./js/pay.js";
ReactDom.render(
	(
	<Router history = {hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute components={{type:Home}} />		
			<Route path="cart" components = {{type:Cart}}/>
			<Route path="user" components = {{type:User}}/>			
		</Route>	
		<Route path="/Datail" component = {Detail}></Route>
		<Route path="/search" component = {search}></Route>
		<Route path="/search/Jump" component = {Jump}></Route>
		<Route path="/search/Jump/sort" component = {sort}></Route>
		<Route path="/detaillist/sort" component = {sort}></Route>		
		<Route path="/register" component = {register}></Route>
		<Route path="/login" component = {login}></Route>	
		<Route path="/register/forget" component = {forget}></Route>
		<Route path="/login/forget" component = {forget}></Route>
		<Route path="/register/find" component = {find}></Route>
		<Route path="/login/find" component = {find}></Route>	
		<Route path="/Datail/Detailother" component = {Detailother}></Route>
		<Route path="/detaillist" component = {detaillist}></Route>	
		<Route path="/login/userload" component = {userload}></Route>
		<Route path="/cart01" component = {cart01}></Route>
		<Route path="/addCart" component = {addCart}></Route>
		<Route path="/cart01/pay" component = {pay}></Route>
	</Router>	
),document.getElementById("app"))
