import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
//import 'typeface-roboto';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';




  
class ActiveJoined extends Component {

    constructor(props) {
    super(props);
    let QUEUE_SELECTED = localStorage.getItem("queue_No");
    this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_DTL').where("QUEUE_NO", "==", QUEUE_SELECTED);
    this.unsubscribe = null;
   

    this.state = {
        QUEUE_DTL: [],
      //  QUEUE_SELECTED:''
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
      <div className="container ActiveContainer">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              SERVING
            </h3>
          </div>
          <div className="panel-body">
            <h4 className="hidden"><Link to="/create" className="btn btn-primary">Add</Link></h4>
            <Table id="ActiveItem1" className="table table-stripe">
            {this.state.QUEUE_DTL.map(board =>
              <tbody key={board.QUEUE_NO}>
                
                  <tr>
                    <td>{board.QUEUE_NO}</td>
                    <td>{board.ACCOUNT}</td>
                    <td>{board.AMOUNT}</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
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

export default ActiveJoined;
