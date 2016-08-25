import React, { Component } from 'react';

export default class CodeTextArea extends Component {
  componentDidMount(){
    this.codeMirror = CodeMirror.fromTextArea(document.getElementById(this.props.codemirrorId),{
      lineNumbers: true,
      tabSize: 2,
      indentWithTabs: false,
      smartIndent: true,
      mode: {name: "application/json"}
    });
    this.codeMirror.setSize("100%", 300);
    this.codeMirror.setValue(this.props.inputValue || "");
    this.codeMirror.on("change", this.codemirrorValueChanged.bind(this));
  }

  componentWillReceiveProps(nextProps){
    let currentCursor = this.codeMirror.getCursor();
    this.codeMirror.setValue(nextProps.value);
    this.codeMirror.setCursor(currentCursor.line, currentCursor.ch);
  }

  codemirrorValueChanged(doc, change) {
		if (this.props.onChange && (change.origin != 'setValue' && change.origin != 'setCursor')) {
      let fakeEvent = {
        target: {
          name: this.props.textAreaName,
          value: doc.getValue()
        }
      }
			this.props.onChange(fakeEvent);
		}
	}

  render(){
    return(
      <textArea id={this.props.codemirrorId} name={this.props.textAreaName}></textArea>
    );
  }
}
