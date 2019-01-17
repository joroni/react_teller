import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';

//import 'typeface-roboto';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';


class PendingList extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "PENDING").where("BRANCH_CODE", "==", "PBCOM001");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      isActive: true
    
    };
    this.handleClick = this.handleClick.bind(this);
  }

  

  handleClick() {
    this.setState(state => ({
        isActiveOn: !state.isActiveOn
    }));
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
              PENDING
            </h3>
          </div>
          <div class="panel-body">
           <Link to="/create" className="btn btn-primary hidden">Add</Link>
            <button className="btn btn-primary hidden" onClick={this.handleClick}>
        {this.state.isActiveOn ? 'PENDING' : 'ACTIVE'}
      </button>
            <Table id="PendingList" class="table table-stripe">
             
              <tbody>
                {this.state.QUEUE_HDR.map(board =>
                  <tr className={board.QUEUE_NO}>
                    <td className="QueueNo"><Link to={`/edit/${board.key}`}>{board.QUEUE_NO}</Link></td>
                    <td className="hidden">{board.BRANCH_CODE}</td>
                    <td className="hidden">{board.STATUS}</td>
                    <td><Link to={`/edit/${board.key}`} className="serveBtn btn btn-success" style={{ display: 'none' }}>Serve</Link></td>
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

export default PendingList;


