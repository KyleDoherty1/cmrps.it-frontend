import './App.css';
import React, { Component } from 'react';
class App extends Component {
	state = {
		showButton: false,
		longURL: '',
		slug: '',
		shortURL: 'https://cmprs.it/' + this.slug,
	};

	handleChange = (event) => {
		this.setState({ longURL: event.target.value });
	};

	callAPI = async () => {
		const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				url: this.state.longURL,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result);
			this.setState({
				slug: result.shortURL,
				shortURL: 'https://cmprs.it/' + result.shortURL,
				showButton: true,
			});
			console.log(this.state.shortURL);
		} else if (response.status === 400) {
		} else {
			const result = await response.json();
			this.error = result.message;
		}
	};

	render() {
		return (
			<header className='App-header'>
				<div className='box has-text-centered'>
					<h1 className='title'>cmprs.it</h1>
					<h2 className='subtitle'>
						<i>
							<b>c</b>o<b>m</b>
							<b>p</b>
							<b>r</b>e<b>s</b>s your url
						</i>
					</h2>
					<div className='field is-grouped'>
						<p className='control is-expanded'>
							<input
								className='input'
								type='text'
								placeholder='url goes here'
								id='userInput'
								onChange={this.handleChange}
							/>
						</p>
						<button
							className='button is-info'
							id='myButton'
							onClick={this.callAPI}
						>
							compress
						</button>
					</div>
					<div
						id='slugOutput'
						style={{ display: this.state.showButton ? 'block' : 'none' }}
					>
						<h2 id='compressedURLText'>&darr; your compressed url &darr;</h2>
						<a href={this.state.shortURL}>{this.state.shortURL}</a>
					</div>
				</div>
			</header>
		);
	}
}

export default App;