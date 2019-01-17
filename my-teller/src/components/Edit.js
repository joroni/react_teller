import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      QUEUE_NO: '',
      BRANCH_CODE: '',
      STATUS: '',
    };
    this.handleStatClick = this.handleStatClick.bind(this);
  }


  
  handleStatClick() {
    this.setState(state => ({
        isActiveOn: !state.isActiveOn
    }));
  }
  componentDidMount() {
  
    getUrlParam();
    function getUrlParam(parameter, defaultvalue){
      var urlparameter = defaultvalue;
      if(window.location.href.indexOf(parameter) > -1){
          urlparameter = this.getUrlVars()[parameter];
          }
          console.log(urlparameter);
      return urlparameter;
     
  }
    
 
 
 
  function getAllUrlParams(url) {
    
      // get query string from url (optional) or window
      var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    console.log(queryString);
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




    
    //alert(getAllUrlParams().stat);
    const ref = firebase.firestore().collection('QUEUE_HDR').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          QUEUE_NO: board.QUEUE_NO,
          BRANCH_CODE: board.BRANCH_CODE,
          STATUS: board.STATUS
        });
       // alert(this.state.STATUS);
       let watstatus = getAllUrlParams().stat.toUpperCase();
       //alert(watstatus);
      // this.setState({STATUS:watstatus.toUpperCase()});
      this.setState({STATUS:watstatus});
       /*   let toBeSetAs = localStorage.getItem("setAs");
      
     //if(this.state.STATUS === 'PENDING'){
          if(toBeSetAs === 'ACTIVE' && this.state.STATUS === 'PENDING'){
            // PENDING to ACTIVE
            this.setState({STATUS:'ACTIVE'});
            
          } else if(toBeSetAs === 'HOLD' && this.state.STATUS === 'ACTIVE'){
            // ACTIVE to HOLD
            this.setState({STATUS:'HOLD'});
  
          } else if(toBeSetAs === 'RETURN' && this.state.STATUS === 'ACTIVE'){
            // ACTIVE back to PENDING (RETURN)
            this.setState({STATUS:'RETURN'});
  
          }  else if(toBeSetAs === 'ACTIVE' && this.state.STATUS === 'ONHOLD'){
            // HOLD back to ACTIVE (RECALL)
            this.setState({STATUS:'ACTIVE'});
  
          } else if(toBeSetAs === 'DONE' && this.state.STATUS === 'ACTIVE'){
            // DONE
            this.setState({STATUS:'DONE'});
  
          }
          else{
          //this.props.history.push("/");
        }
        */
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { QUEUE_NO, BRANCH_CODE, STATUS } = this.state;

    const updateRef = firebase.firestore().collection('QUEUE_HDR').doc(this.state.key);
    updateRef.set({
      QUEUE_NO,
      BRANCH_CODE,
      STATUS
    }).then((docRef) => {
      this.setState({
        key: '',
        QUEUE_NO: '',
        BRANCH_CODE: '',
        STATUS: ''
      });
     // this.props.history.push("/show/"+this.props.match.params.id)
    this.props.history.push("/");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }



  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">QUEUE_NO:</label>
                <input type="text" readOnlys class="form-control" name="QUEUE_NO" value={this.state.QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div class="form-group hidden">
                <label for="BRANCH_CODE">BRANCH_CODE:</label>
                <input type="text" readOnlys class="form-control" name="BRANCH_CODE" value={this.state.BRANCH_CODE} onChange={this.onChange} placeholder="BRANCH_CODE" />
              </div>
              <div class="form-group hiddens">
                <label for="STATUS">STATUS:</label>
                <input type="text" class="form-control" name="STATUS" value={this.state.STATUS} onChange={this.onChange} placeholder="STATUS" />
              </div>
              <Link to="/" class="btn btn-primary">Cancel</Link>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>

        <button className="btn btn-primary hidden" onClick={this.handleClickStat}>
        {this.STATUS = 'HOLD'}
        HOLD
      </button>
      </div>
    );
  }
}

export default Edit;
