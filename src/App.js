import React, { Component } from 'react';
import './App.css';

class App extends Component {
  _isMounted = false;

  state = {
    source: 'https://i.imgur.com/VYUdUNJ.png',
    error: null,
  };

  fetchCat() {
    fetch("https://aws.random.cat/meow").then(res=>res.json()).then(
      (result) => {
        this.setState({
          source: result.file
        });
    },
    (error) => {
      this.setState({
        error
      });
    }
    )
  }

  componentDidMount() {
    this._isMounted = true;
    const { source } = this.state;
    this.fetchCat(source);

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { error, source } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <Image 
                src={source}
                className="img-fluid"
                alt="cat picture"
              />
            </div>
            <div className="col-1"></div>
          </div>
          <Button
            text="Get Cat"
            type="button"
            className="btn btn-light"
            onClick={() => this.fetchCat()}
          />
        </div>
      </div>
    );
  }
}

const Image = ({source, ...props}) => {
  return <img src={source} {...props} />
}

const Button = ({ text ,...props}) => {
  return <button {...props}>{text}</button>
}


export default App;
