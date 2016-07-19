// App
// ===
var React = require('react');
var helpers = require('../utils/helpers.js');
var Navigation = require('react-router').Navigation;

// Auth0
import Login from '../components/Login';
import auth from '../utils/authentication.js';

var SearchBar = require('./SearchBar.js');

var App = React.createClass({

	getInitialState: function(){
		return {
			searchQuery: null
		}
	},

	  login: function() {
    // We can call the show method from Auth0Lock,
    // which is passed down as a prop, to allow
    // the user to log in
    this.props.lock.show((err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      this.setState({authenticated: true});
    })
  },

  logout: function() {
    // AuthActions.logUserOut();
    this.setState({authenticated: false});
  },

	searchQuery: function(term){
		helpers.getSearchResults(term)
		.then(function(results){
			console.log(results);
		})
	},

	// Allow for transitions between elements.
	mixins: [Navigation],


	// main component app. Takes in the other routes
	render: function() {
		return (
			<div>
			<div className="container" id="main">

				<header className="masthead">
				  <div className="container">
				  <div className="row">
				    <div>
				      <h1 className="dietName">ESAL</h1>
				    </div>
				  </div>
				  </div>
				</header>	

				<div className="nav-wrapper">
				<div id="nav">
					<nav className="navbar navbar-default navbar-static">
				  			<div className="container">


							    <div className="navbar-header">
							      <a className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							        <span className="sr-only">Toggle navigation</span>
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>
							      </a>
							      <a href="#" className="navbar-left"><img className="navbar-left" src="./assets/images/esallogosmall.png" id="navlogo" /></a>
							    </div>


							    <div className="navbar-collapse collapse">
							    <ul className="nav navbar-nav navbar-right icon">
				      <li><a href="#analytics"><i className="fa fa-line-chart" aria-hidden="true"></i> Analytics</a></li>
				      <li><a href="#userdata"><i className="fa fa-user" aria-hidden="true"></i> User Data</a></li>
				    </ul>
				    	<SearchBar onSearchTermChange={this.searchQuery} />
							      
							    </div>

							  </div>
							</nav>
				</div>
				</div>
				</div>



			<div className="container" id="childrenContainer">
				{this.props.children}
			</div>
			<div id="placeholder"></div>
			</div>
		)
	}
})

// export, where config/router will require it.
module.exports = App;