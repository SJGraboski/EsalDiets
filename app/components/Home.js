// Query page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');

// get components
var Calendar = require('./Calendar/Calendar.js');
var MoodGraph = require('./MoodGraph.js');
var EnergyGraph = require('./EnergyGraph.js');
var WeightGraph = require('./WeightGraph.js');
var SearchBar = require('react-search-bar');

const matches = {
	'macbook a': [
		'macbook air 13 case',
		'macbook air 11 case',
		'macbook air charger'
	],
	'macbook p': [
		'macbook pro 13 case',
		'macbook pro 15 case',
		'macbook pro charger'
	]
};



// helpers functions
var helpers = require('../utils/helpers.js');

// create Home component
var Home = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			userId: null,
			dietId: null,
			reportUpdate: null,
			answers: [[],[],[]],
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null

		}
	},
	// grab profile data
	componentWillMount: function(){
		helpers.getProfileData()
		.then(function(result){
			var data = result.data;
			return this.setState({
				userId: data.userId,
			})
		}.bind(this));
	},
	// componentDidUpdate: grab articles whenever update comes in
	componentDidUpdate: function(prevProps, prevState){
		// check to make sure at least one of the search inputs are different
		if (this.state.reportUpdate != prevState.reportUpdate && this.state.reportUpdate != null){
			// helpers reportAnswer
			helpers.reportUpdate(this.state.reportUpdate)
			.then(function(data){
				// check response
				if (data != false) {
					return helpers.getProfileData()
					.then(function(result){
						var data = result.data;
						return this.setState({
							userId: data.userId,
							dietId: data.dietId,
							reportId: data.reportId,
							answered: data.answered,
							startDate: data.startDate,
							answers: data.answers,
							reportUpdate: null
						})
					}.bind(this)); // make "this" function as expected)
				}
			}.bind(this)); // make "this" function as expected
		}
	},
	// set Query to inputs
	updateQuery: function(newAnswers){
		// set the state to the for inputs
		this.setState({
			reportUpdate: newAnswers,
		});
	},
	onChange(input, resolve) {
		// Simulate AJAX request
		setTimeout(() => {
			const suggestions = matches[Object.keys(matches).find((partial) => {
					return input.match(new RegExp(partial), 'i');
				})] || ['macbook', 'macbook air', 'macbook pro'];

			resolve(suggestions.filter((suggestion) =>
				suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
			));
		}, 25);
	},
	onSearch(input) {
		if (!input) return;
		console.info(`Searching "${input}"`);
		// run the search query
		helpers.getSearchResults(input)
		.then(function(results){
			console.log(results);
		})
	},
	// render function
	render: function() {
		return (
			<p>eh</p>
		)
	}
})

module.exports = Home;