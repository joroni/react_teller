import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
//import 'typeface-roboto';
//import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';





class ActiveJoined extends Component {

  constructor(props) {
    super(props);
   // let QUEUE_SELECTED = localStorage.getItem("queue_No");
   //const QUEUE_SELECTED = document.getElementById('keyID').value;
   const QUEUE_SELECTED = localStorage.getItem("queue_No");
   console.log(QUEUE_SELECTED);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_DTL').where("QUEUE_NO", "==", QUEUE_SELECTED);
    this.unsubscribe = null;


    this.state = {
      QUEUE_DTL: [],
      QUEUE_SELECTED:''
    };


    /* var countItem = firebase.firestore().collection('QUEUE_DTL').where("STATUS", "==", "ACTIVE")._query.filters[0];
          console.log(countItem);
          console.log('lkjhgf');
          if(countItem >= 1 ){
            localStorage.setItem('countItem', countItem);
          }else{
            document.getElementsByClassName("serveBtn").display="none";
          }
         */



  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({activeQueue:state});
    console.log(this.activeQueue);
  }


  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs", buttonValue);
    this.props.history.push("/edit/" + this.props.match.params.id);
    localStorage.setItem("HasActiveItem", '');
    //some logic
  }


  onCollectionUpdate = (querySnapshot) => {
    const QUEUE_DTL = [];
    querySnapshot.forEach((doc) => {
      const { QUEUE_NO, ACCOUNT,ACCOUNT_NAME, AMOUNT, TRANS_TYPE, CURRENCY, SCHED_DATE, SCHED_TIME } = doc.data();
      QUEUE_DTL.push({
        key: doc.id,
        doc, // DocumentSnapshot
        QUEUE_NO,
        ACCOUNT,
        ACCOUNT_NAME,
        AMOUNT,
        TRANS_TYPE,
        CURRENCY,
        SCHED_DATE,
        SCHED_TIME
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
    //window.location.reload();
  }

  render() {
    return (
      <div className="container ActiveContainer">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              NOW SERVING
            </h3>
          </div>
          <div className="panel-body">
            <h4 className="hidden"><Link to="/create" className="btn btn-primary">Add</Link></h4>
            <Table id="ActiveItem1" className="table table-stripe">
              {this.state.QUEUE_DTL.map(board =>
                <tbody key={board.QUEUE_NO}>

                  <tr>
                    <td className="label">QUEUE NO:</td><td>{board.QUEUE_NO}</td>
                    <td className="label">ACCOUNT NAME:</td><td>{board.ACCOUNT_NAME}</td>
                  </tr>
                  <tr>
                  <td className="label">ACCOUNT:</td><td>{board.ACCOUNT}</td>
                  <td className="label">AMOUNT:</td><td>{board.AMOUNT}</td>
                  </tr>
                  <tr>
                  <td className="label">TRANS TYPE:</td><td>{board.TRANS_TYPE}</td>
                  <td className="label">CURRENCY</td><td>{board.CURRENCY}</td>
                  </tr>
                  <tr>
                  <td className="label">SCHED_DATE:</td><td>{board.SCHED_DATE}</td>
                  <td className="label">SCHED_TIME:</td><td>{board.SCHED_TIME}</td>
                  </tr>


                </tbody>
              )}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveJoined;
