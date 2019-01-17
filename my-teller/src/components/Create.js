import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      QUEUE_NO: '',
      BRANCH_CODE: '',
      STATUS: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { QUEUE_NO, BRANCH_CODE, STATUS } = this.state;

    this.ref.add({
      QUEUE_NO,
      BRANCH_CODE,
      STATUS
    }).then((docRef) => {
      this.setState({
        QUEUE_NO: '',
        BRANCH_CODE: '',
        STATUS: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { QUEUE_NO, BRANCH_CODE, STATUS } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="QUEUE_NO">QUEUE_NO:</label>
                <input type="text" class="form-control" name="QUEUE_NO" value={QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div class="form-group">
                <label for="BRANCH_CODE">BRANCH_CODE:</label>
                <textArea class="form-control" name="BRANCH_CODE" onChange={this.onChange} placeholder="BRANCH_CODE" cols="80" rows="3">{BRANCH_CODE}</textArea>
              </div>
              <div class="form-group">
                <label for="STATUS">STATUS:</label>
                <input type="text" class="form-control" name="STATUS" value={STATUS} onChange={this.onChange} placeholder="STATUS" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
