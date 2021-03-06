import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
//import 'typeface-roboto';
//import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import ActiveJoined from './ActiveJoined';


class ActiveList extends Component {
  constructor(props) {
    super(props);
   // this.activeQueue = this.activeQueue.bind(this);
    this.returnClick = this.returnClick.bind(this);
    this.holdClick = this.holdClick.bind(this);
    this.doneClick = this.doneClick.bind(this);
    this.noshowClick = this.noshowClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "ACTIVE");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      activeQueue:''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({activeQueue:state});
  }

  returnClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs","PENDING" );
    localStorage.setItem("hasActive", 'NO' );
  }
  
  
  doneClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs","DONE" );
    localStorage.setItem("hasActive", 'NO' );
  }

  holdClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs","HOLD" );
    localStorage.setItem("hasActive", 'NO' );
  }

  noshowClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs","NOSHOW" );
    localStorage.setItem("hasActive", 'NO' );
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const QUEUE_HDR = [];
    querySnapshot.forEach((doc) => {
      const { QUEUE_NO, BRANCH_CODE, STATUS,  activeQueue } = doc.data();
      QUEUE_HDR.push({
        key: doc.id,
        activeQueue,
        doc, // DocumentSnapshot
        QUEUE_NO,
        BRANCH_CODE,
        STATUS,
      });
    });
    this.setState({
      QUEUE_HDR,
      activeQueue:localStorage.getItem("queue_No")
   });
  }

  componentWillUnmount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = {
      QUEUE_HDR: []
    };
  }
 

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container ActiveContainer">
        <div className="panel panel-default">
          <div className="panel-heading hidden">
            <h3 className="panel-title">
              SERVING
            </h3>
          </div>
          <div className="panel-body responsive-table">
            <h4 className="hidden"><Link to="/create" className="btn btn-primary">Add</Link></h4>
          
            <Table id="ActiveItem" className="table table-stripe">
              
                {this.state.QUEUE_HDR.map(board =>
                <tbody  key={board.QUEUE_NO}>
                 <tr>
                   <td colSpan="2">
                   <ActiveJoined/>
                   </td>
                 </tr>
                  <tr>
                    <td className="keyItem"><input type="hidden" id="keyID" value={this.state.activeQueue} onChange={this.onChange}/></td>
                    <td className="hidden">{board.BRANCH_CODE}</td>
                    <td className="hidden">{board.STATUS}</td>
                    <td>
                    <div className="btn-group" role="group" >
  
                        <Link to={`/edit/${board.key}`} type="button" onClick={this.doneClick} value="DONE" className="btn btn-success btn btn-secondary">Done</Link>
                        <Link to={`/edit/${board.key}`} type="button" onClick={this.returnClick} value="PENDING" className="btn btn-success btn btn-secondary">Return</Link>
                        <Link to={`/edit/${board.key}`} type="button" onClick={this.holdClick} value="HOLD" className="btn btn-success btn btn-secondary" >Hold</Link>
                        <Link to={`/edit/${board.key}`} type="button" onClick={this.noshowClick} value="NOSHOW" className="btn btn-success btn btn-secondary" >No Show</Link>
                        </div>
                    </td>
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

export default ActiveList;
