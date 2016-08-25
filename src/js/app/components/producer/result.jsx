import React, { Component } from 'react';
import classNames from 'classnames'
export default class Result extends Component {
  render(){
    let labelClass = classNames({
      'message': true,
      'is-success': (this.props.result === 'success'),
      'is-danger': (this.props.result !== 'success')
    })
    let messageHeader = this.props.result === 'success' ? "SUCCESS" : "FAILED"
    return(
      <div className={labelClass}>
        <p className="message-header">{messageHeader}</p>
        <p className="message-body">{this.props.resultMessage}</p>
      </div>
    );
  }
}
