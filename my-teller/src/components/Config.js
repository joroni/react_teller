import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
//import { Timestamp } from '@firebase/firestore-types';

class Config extends Component {

  constructor() {
    super();
    
    this.ref = firebase.firestore().collection('QUEUE_ACTIVE');
    this.state = {
      BRANCH_CODE:'',
      COUNTER_NO: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  
  getUrlVars= (e) => {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


 onSubmit = (e) => {
    e.preventDefault();
   var bc = localStorage.getItem("brnch_code");

     var cn= localStorage.getItem("counter_no");
    const { BRANCH_CODE, COUNTER_NO} = this.state;

    this.ref.add({
     
      BRANCH_CODE :bc,
      COUNTER_NO:cn,
     
    }).then((docRef) => {
      this.setState({
      BRANCH_CODE:'',
      COUNTER_NO:'',
            });
           
        })
    
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    var brchCde = document.getElementById('BranchCODE').value;
    var cnterNo = document.getElementById('CounterNo').value;
// this.props.history.push("/")

localStorage.setItem("brnch_code", brchCde);

localStorage.setItem("counter_no", cnterNo);
  }

  

  render() {
    const { BRANCH_CODE, COUNTER_NO} = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
           
          </div>
          <div className="panel-body">
     
          <form onSubmit={this.onSubmit} class="border border-light p-5">
   
    
    <ul id="sortable-form" class="droptrue drop-list">
    <li data-template="dTextInputTemp" data-popover="input">
    <input type="text" id="BranchCODE" className="form-control" name="BRANCH_CODE" value={BRANCH_CODE} onChange={this.onChange} placeholder="BRANCH CODE" />
              
    </li>
    <li data-template="dPasswordInputTemp" data-popover="input">
    <input className="form-control" id="CounterNo" name="COUNTER_NO" onChange={this.onChange} placeholder="COUNTER NO" cols="80" value={COUNTER_NO} />
             </li>
    </ul>
    

    <div class="text-center">
    <Link to="/" className="btn btn-primary">Cancel</Link>
       
              <button type="submit" className="btn btn-success">Save</button>
      
    </div>
</form>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Config;
