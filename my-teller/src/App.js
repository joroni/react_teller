import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
//import PendingList from './components/PendingList';
import ActiveList from './components/ActiveList';
//import FormDialog from './components/FormDialog';
//import HoldList from './components/HoldList';
//import Button from '@material-ui/core/Button';
import CustomizedTable from './components/CustomizedTable';
import Paper from './components/Paper';
import FullWidthGrid from './components/FullWidthGrid';
import PendingList from './components/PendingList';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "PENDING");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      id:''
    };
  }


  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs",buttonValue );
    this.props.history.push("/edit/"+this.props.match.params.id);
    //some logic
}


  handleClicks() {
    console.log('Click happened', this.id);
    
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

  limitActiveToOne() {
    const Active = document.getElementById('ActiveItem');
     const ActiveItem = Active.document.getElementsByTagName('tr');
     if(ActiveItem.firstChild.length === 1) {
        document.getElementsByClassName('serveBtn').prop("disabled", true);
     } else {
      document.getElementsByClassName('serveBtn').prop("disabled", false);
     }
  }

  render() {
  
    return (
      <div class="container">
       
        <button onClick={this.handleClick}  value="ACTIVE" className="btn btn-primary">Serve</button> 
        <button onClick={this.handleClick}  value="HOLD" className="btn btn-primary">Hold</button> 
       <button onClick={this.handleClick}  value="NOSHOW" className="btn btn-primary">No Show</button>
       <button onClick={this.handleClick}  value="RETURN" className="btn btn-primary">Return</button>
       <button onClick={this.handleClick}  value="DONE" className="btn btn-primary">Done</button>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4 className="hidden"><Link to="/create" class="btn btn-primary">Add</Link></h4>
            <table class="table table-stripe">
              
             
              <tbody>
               
                <tr>
                  <td>  <PendingList/></td>
                  <td> <ActiveList/></td>
                 
                </tr>
                <tr>
                <td colSpan="2">  <Paper/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      
       <FullWidthGrid/>
       
      </div>
    );
  }
}

export default App;
