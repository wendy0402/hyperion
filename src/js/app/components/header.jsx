import React, {Component} from 'react'

export default class Header extends Component{
  render(){
    return(
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title"> HYPERION </h1>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className="is-active"><a>Producer</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}
