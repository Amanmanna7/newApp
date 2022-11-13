// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor() {
    super();
    document.body.style.backgroundColor = "#9aa1a7";
    
  }

  apiKey= process.env.REACT_APP_NEWS_API
  
  state={
    progress:0,
  }

  setProgress=(progress)=>{
    this.setState({
      progress:progress,
    })
  }

  pageSize = 5;
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='general' pageSize={this.pageSize} category='general' />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='business' pageSize={this.pageSize} category='business' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} category='entertainment' />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='health' pageSize={this.pageSize} category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='science' pageSize={this.pageSize} category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='sports' pageSize={this.pageSize} category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress } apiKey={this.apiKey} key='technology' pageSize={this.pageSize} category='technology' />}></Route>
          </Routes>

        </Router>
      </div>
    )
  }
}

