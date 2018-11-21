import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    source: '',
    error: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchCat();
  }

  fetchCat = async () => {
    try {
      const result = await fetch("https://aws.random.cat/meow");
      const image = result.json();
      this.setState({ source: image.file, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  }

  render() {
    const { error, loading, source } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : error ? (
      <div>Error: {error}</div>
    ) : (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <img src={source} className="img-fluid" alt="cat picture" />
            </div>
            <div className="col-1"></div>
          </div>
          <button type="button" className="btn btn-light" onClick={this.fetchCat}>
            Get Cat
          </button>
        </div>
      </div>
    );
  }
}


export default App;
