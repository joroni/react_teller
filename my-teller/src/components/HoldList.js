import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
import Toggle from './Toggle';
import 'typeface-roboto';
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
  }


  


 
  // Table data sorting ends....
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
             ON HOLD
            </h3>
          </div>
          <div class="panel-body">
            <h4 className="hidden"><Link to="/create" class="btn btn-primary">Add</Link></h4>
            <Table id="PendingList" class="table table-stripe">
             
              <tbody>
                {this.state.QUEUE_HDR.map(board =>
                  <tr className={board.QUEUE_NO}>
                    <td><Link to={`/edit/${board.key}`}>{board.QUEUE_NO}</Link></td>
                    <td>{board.BRANCH_CODE}</td>
                    <td>{board.STATUS} <Toggle /></td>
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


