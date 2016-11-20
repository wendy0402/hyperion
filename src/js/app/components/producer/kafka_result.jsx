import React, {Component} from 'react'
import {connect} from 'react-redux'
import Result from './result'
import { ProducerConst } from '../../constants/producer_const'

class KafkaResult extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.status === ProducerConst.form.status.sent){
      return( <Result result={this.props.result} resultMessage={this.props.resultMessage}/> )
    } else{
      return null;
    }
  }
}


const mapStateToProps = (state) => {
  return {
    result: state.producerForm.result,
    resultMessage: state.producerForm.resultMessage,
    status: state.producerForm.status
  };
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(KafkaResult);
