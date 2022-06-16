import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io(); // socket to the server

export default class App extends Component {
  state = { 
    queue_stack: [],
    config: {}
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getApi()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

    this.getConfig()
      .then(res => this.setState({ config: res }))
      .catch(err => console.log(err));
  }

  getApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
 
  getConfig = async () => {
    const response = await fetch('api/config');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  handleClick = () => {
    //console.log("I'm being clicked!");
    socket.emit('hello', 'HELLO SOCKET.IO!!!');
  };

  render() {
    const {
      handleClick
    } = this;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={handleClick}>Click me</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  };
}
