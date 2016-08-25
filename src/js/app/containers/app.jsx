import React, { Component, PropTypes } from 'react'
import Header from '../components/header'
import Producer from './producer'
export default class App extends Component {
  render(){
    return(
      <div>
        <Header />
        <section className="section">
          <div className="container is-fluid">
            <Producer />
          </div>
        </section>
      </div>
    )
  }
}
