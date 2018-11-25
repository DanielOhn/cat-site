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
      const image = await result.json();
      this.setState({ source: image.file, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  }

  // CORS Issue
  // fetchFox = async () => {
  //   try {
  //     const result = await fetch("https://randomfox.ca/floof");
  //     const img = await result.json();
  //     this.setState({ source: img.image, loading: false });
  //   } catch (e) {
  //     this.setState({ error: e.message, loading: false });
  //   }
  // }

  fetchDog = async () => {
    try {
      const result = await fetch("https://dog.ceo/api/breeds/image/random");
      const image = await result.json();
      this.setState({ source: image.message, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false});
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
              <h1 className="display-1">Random Cats</h1>
              <img src={source} className="img-fluid" alt="just a normal cat or dog" />
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-2">
              <Button 
                text="Get Cat"
                type="button"
                className="btn btn-light"
                onClick={this.fetchCat}
              />
            </div>
            <div className="col-2">
              <Button 
                text="Get Dog"
                type="button"
                className="btn btn-light"
                onClick={this.fetchDog}
              />
            </div>
            <div className="col-4"></div>
          </div>
          
          
        </div>
      </div>
    );
  }
}

const Button = ({ text, ...props }) => {
  return <button {...props} >{text}</button>
}
  

export default App;
