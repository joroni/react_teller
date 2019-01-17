import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('QUEUE_HDR');
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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="QUEUE_NO">QUEUE_NO:</label>
                <input type="text" className="form-control" name="QUEUE_NO" value={QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div className="form-group">
                <label for="BRANCH_CODE">BRANCH_CODE:</label>
                <input className="form-control" name="BRANCH_CODE" onChange={this.onChange} placeholder="BRANCH_CODE" cols="80" value={BRANCH_CODE} />
              </div>
              <div className="form-group">
                <label for="STATUS">STATUS:</label>
                <input type="text" className="form-control" name="STATUS" value={STATUS} onChange={this.onChange} placeholder="STATUS" />
              </div>
              <Link to="/" className="btn btn-primary">Cancel</Link>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
