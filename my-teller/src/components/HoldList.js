import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
//import 'typeface-roboto';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';



class HoldList extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "HOLD");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: []
    };
   
  }

  recallClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs","ACTIVE" );
    localStorage.setItem("hasActive", 'YES' );
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const QUEUE_HDR = [];
    querySnapshot.forEach((doc) => {
      const { QUEUE_NO, BRANCH_CODE, STATUS } = doc.data();
      QUEUE_HDR.push({
        key: doc.id,
        doc, // DocumentSnapshot
        QUEUE_NO,
        BRANCH_CODE,
        STATUS,
      });
    });
    this.setState({
      QUEUE_HDR
      
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);  
    this.limitActiveToOne();

  }


  limitActiveToOne() {
    const activeOne = localStorage.getItem("hasActive");
    //const Active = document.getElementById('ActiveItem');
   // const ActiveItem = Active.document.getElementsByTagName('tr');
    if (activeOne === 'Yes') {
      alert('Yes');
      document.querySelector('.serveBtn').prop("disabled", true);
    } else {
     // this.prop("disabled", false);
    }
  }
  

 
  // Table data sorting ends....
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
             ON HOLD
            </h3>
          </div>
          <div className="panel-body">
            <h4 className="hidden"><Link to="/create" className="btn btn-primary">Add</Link></h4>
            <Table id="PendingList" className="table table-stripe">
              <tbody>
                {this.state.QUEUE_HDR.map(board =>
                  <tr  key={board.QUEUE_NO}  className={board.QUEUE_NO}>
                    <td><Link to={`/edit/${board.key}`}>{board.QUEUE_NO}</Link></td>
                    <td className="hidden">{board.BRANCH_CODE}</td>
                    <td className="hidden">{board.STATUS} </td>
                   <td> <Link to={`/edit/${board.key}`} type="button" onClick={this.recallClick} value="ACTIVE" className="serveBtn btn btn-success btn btn-secondary">ReCall</Link></td>
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

export default HoldList;


