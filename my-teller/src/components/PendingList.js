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
    this.handleClick = this.handleClick.bind(this);
   // this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "PENDING").where("BRANCH_CODE", "==", "PBCOM001");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      isActive: true,
      id:''
    };
   
  }


  checkActive(){
    let hasActiveItem =localStorage.getItem("hasActive");
  if(hasActiveItem === ""){
    alert('Multiple items is not allowed at same time')
    return false;
    } else{
     return true;
    }
  }

  
  componentDidUpdate() {
  //this.checkActive();
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


  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs",buttonValue );
    localStorage.setItem("hasActive", 'YES' );
    this.props.history.push("/edit/"+this.props.match.params.id);
    //some logic


   // this.getUrlParam();
}
  


 
  // Table data sorting ends....
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              PENDING
            </h3>
          </div>
          <div className="panel-body">
           <Link to="/create" className="btn btn-primary hidden">Add</Link>
            <button className="btn btn-primary hidden">
        SERVE
      </button>
            <Table id="PendingList" className="table table-stripe">
             
              <tbody>
                {this.state.QUEUE_HDR.map(board =>
                  <tr key={board.QUEUE_NO} className={board.QUEUE_NO}>
                    <td className="QueueNo"><Link className="serveBtn" to={`/edit/${board.key}/?stat=ACTIVE`}>{board.QUEUE_NO}</Link></td>
                    <td className="hidden">{board.BRANCH_CODE}</td>
                    <td className="hidden">{board.STATUS}</td>
                    <td><Link to={`/edit/${board.key}/?stat=ACTIVE`} className="serveBtn btn btn-success" style={{ display: 'none' }}>Serve</Link></td>
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


