import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
//import 'typeface-roboto';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';


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


  
class ActiveJoined extends Component {

    constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_DTL').where("QUEUE_NO", "==", "W-1005");
    this.unsubscribe = null;
    

    this.state = {
        QUEUE_DTL: []
      };

      
      var countItem = firebase.firestore().collection('QUEUE_DTL').where("STATUS", "==", "ACTIVE")._query.filters[0];
      console.log(countItem);
      console.log('lkjhgf');
      if(countItem >= 1 ){
        localStorage.setItem('countItem', countItem);
      }else{
        document.getElementsByClassName("serveBtn").display="none";
      }
     
   
 

  }

 
 

  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs",buttonValue );
    this.props.history.push("/edit/"+this.props.match.params.id);
    localStorage.setItem("HasActiveItem", '' );
    //some logic
}

   
  onCollectionUpdate = (querySnapshot) => {
    const QUEUE_DTL = [];
    querySnapshot.forEach((doc) => {
      const { QUEUE_NO, ACCOUNT, AMOUNT } = doc.data();
      QUEUE_DTL.push({
        key: doc.id,
        doc, // DocumentSnapshot
        QUEUE_NO,
        ACCOUNT,
        AMOUNT,
      });
    });
    this.setState({
      QUEUE_DTL
   });
  }

 

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  //  this.QUEUE_NO = localStorage.getItem("ThisQueueNo");
  //  alert(this.QUEUE_NO);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              SERVING
            </h3>
          </div>
          <div className="panel-body">
            <h4 className="hidden"><Link to="/create" className="btn btn-primary">Add</Link></h4>
            <Table id="ActiveItem" className="table table-stripe">
              <tbody>
                {this.state.QUEUE_DTL.map(board =>
                  <tr>
                    <td>{board.QUEUE_NO}</td>
                    <td className="hidden">{board.ACCOUNT}</td>
                    <td className="hidden">{board.AMOUNT}</td>
                    <td>
                    <div className="btn-group" role="group" >
  
                        <Link to={`/edit/${board.key}?stat=DONE&queue=${board.QUEUE_NO}`} type="button" className="btn btn-success btn btn-secondary">Done</Link>
                        <Link to={`/edit/${board.key}?stat=PENDING&queue=${board.QUEUE_NO}`} type="button" className="btn btn-success btn btn-secondary">Return</Link>
                        <Link to={`/edit/${board.key}?stat=HOLD&queue=${board.QUEUE_NO}`} type="button" className="btn btn-success btn btn-secondary" >Hold</Link>
                        <Link to={`/edit/${board.key}?stat=NOSHOW&queue=${board.QUEUE_NO}`} type="button" className="btn btn-success btn btn-secondary" >No Show</Link>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveJoined;
