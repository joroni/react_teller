import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
//import { Timestamp } from '@firebase/firestore-types';

class CreateActive extends Component {

  constructor() {
    super();
    const QUEUE = this.getAllUrlParams().queue; // 'shirt'
    const BRANCH = this.getAllUrlParams().branch; // 'shirt'
    const ACCOUNT =  this.getAllUrlParams().account;
    const ACNAME =  this.getAllUrlParams().acname;
    const COUNTER = this.getAllUrlParams().counter; // 'shirt'
    const TIME = this.getAllUrlParams().time;
  
   
    this.ref = firebase.firestore().collection('QUEUE_ACTIVE');
    this.state = {
      QUEUE_NO: QUEUE.toUpperCase(),
      BRANCH_CODE: BRANCH.toUpperCase(),
      ACCOUNT: ACCOUNT.toUpperCase(),
      ACCOUNT_NAME: ACNAME.toUpperCase(),
      COUNTER_NO: COUNTER.toUpperCase(),
      TIME_ACTIVE: TIME.toUpperCase()
    };
  }

  componentDidUpdate(){
    var QUEUE = this.getAllUrlParams().queue; // 'shirt'
   // alert(QUEUE)
  }


  getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }



  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {  QUEUE_NO, BRANCH_CODE, ACCOUNT, ACCOUNT_NAME, COUNTER_NO, TIME_ACTIVE} = this.state;

    this.ref.add({
      QUEUE_NO,
      ACCOUNT,
      ACCOUNT_NAME,
      BRANCH_CODE,
      COUNTER_NO,
      TIME_ACTIVE
    }).then((docRef) => {
      this.setState({
      QUEUE_NO:'',
      ACCOUNT:'',
      ACCOUNT_NAME:'',
      BRANCH_CODE:'',
      COUNTER_NO:'',
      TIME_ACTIVE:''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { QUEUE_NO, BRANCH_CODE, ACCOUNT, ACCOUNT_NAME, COUNTER_NO, TIME_ACTIVE} = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading text-centered pdt-100">
           <h2>UPDATE SCREEN</h2>
          </div>
          <div className="panel-body text-centered">
            <h4><Link to="/" className="btn btn-primary hidden">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                
                <input type="hidden" className="form-control" name="ACCOUNT" value={ACCOUNT} onChange={this.onChange} placeholder="ACCOUNT" />
              </div>
            <div className="form-group">
                
                <input type="hidden" className="form-control" name="ACCOUNT_NAME" value={ACCOUNT_NAME} onChange={this.onChange} placeholder="ACCOUNT_NAME" />
              </div>
              <div className="form-group">
                
                <input type="hidden" className="form-control" name="QUEUE_NO" value={QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div className="form-group">
               
                <input className="form-control" type="hidden" name="BRANCH_CODE" onChange={this.onChange} placeholder="BRANCH_CODE" cols="80" value={BRANCH_CODE} />
              </div>
              <div className="form-group">
               
               <input className="form-control" type="hidden" name="COUNTER_NO" onChange={this.onChange} placeholder="COUNTER_NO" cols="80" value={COUNTER_NO} />
             </div>
              <div className="form-group">
               
                <input type="hidden" className="form-control" name="TIME_ACTIVE" value={TIME_ACTIVE} onChange={this.onChange} placeholder="TIME_ACTIVE" />
              </div>
              <Link to="/" className="btn btn-primary hidden">Cancel</Link>
              <button type="submit" className="btn btn-success">OK</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateActive;
