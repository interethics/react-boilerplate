import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import TestPage from './components/views/testPage';

import Auth from './hoc/auth';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Auth(LandingPage, null)} />
				<Route exact path="/login" component={Auth(LoginPage, false)} />
				<Route exact path="/register" component={Auth(RegisterPage, false)} />
				<Route exact path="/test" component={TestPage} />
			</Switch>
		</Router>
		/*
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
		*/
	);
}

export default App;
