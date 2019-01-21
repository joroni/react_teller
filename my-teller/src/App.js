import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import HoldList from './components/HoldList';
import ActiveList from './components/ActiveList';
//import ActiveJoined from './components/ActiveJoined';
//import FormDialog from './components/FormDialog';
//import Button from '@material-ui/core/Button';
//import CustomizedTable from './components/CustomizedTable';
//import Paper from './components/Paper';
//import FullWidthGrid from './components/FullWidthGrid';
// using an ES6 transpiler, like babel
import Table from 'rc-table';
import Img from 'react-image';
 
import PendingList from './components/PendingList';


class App extends Component {
  constructor(props) {
    super(props);
   // this.handleClick = this.handleClick.bind(this);
   // otherwise
   
    let Img = require('react-image');
    const myLogo = () => <Img src="https://github.com/joroni/react_teller/blob/master/my-teller/src/logo.png" />
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "PENDING");
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      id: '',
      MYCounter:0
    };
   
  }

/*
  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    localStorage.setItem("setAs", buttonValue);
    this.props.history.push("/edit/" + this.props.match.params.id);
    //some logic
  }


  handleClicks() {
    console.log('Click happened', this.id);

  }
*/
  onCollectionUpdate = (querySnapshot) => {
   // this.MYCounter = document.getElementById('myCounter').value;
    this.MYCounter = localStorage.getItem("counter_no");
    localStorage.setItem("MYCounter", this.MYCounter);
    const QUEUE_HDR = [];
    querySnapshot.forEach((doc) => {
      const { QUEUE_NO, BRANCH_CODE, STATUS, MYCounter } = doc.data();
      QUEUE_HDR.push({
        MYCounter:this.MYCounter,
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

  componentWillUnmount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onChangeCounter(){
    const myCounter = document.getElementById('myCounter').value;
    localStorage.setItem('MYCounter',myCounter);
   const MYCounter = localStorage.getItem("MYCounter");
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    //this.limitActiveToOne();
  }

  limitActiveToOne() {
    const Active = document.getElementById('ActiveItem');
    const ActiveItem = Active.document.getElementsByTagName('tr');
    if (ActiveItem.firstChild.length === 1) {
      document.getElementsByClassName('serveBtn').prop("disabled", true);
    } else {
      document.getElementsByClassName('serveBtn').prop("disabled", false);
    }
  }

  render() {
    return (
      
      <div className="container">
       <header>
          <div className="branding"><img src="./pbcom-logo-transparent.png" /></div>
          <div className="nav-right">
          <ul>
            <li>Counter: &nbsp;{this.MYCounter}</li>
          <li><div className="config"><Link to="/config" className="btn-icon btn-config"><img src="./setup.svg" /></Link></div></li>
          </ul>
          </div>
        </header>
        <div className="contents">
        <div className="row">
       
          <div className="col-4x sidenav"><PendingList /></div>
          <div className="col-8x min-content"> 
            <div><ActiveList /></div>
            <div><HoldList /></div>
          </div>
        </div>

        <div className="hidden"> 
         <button onClick={this.handleClick} value="ACTIVE" className="btn btn-primary">Serve</button>
          <button onClick={this.handleClick} value="HOLD" className="btn btn-primary">Hold</button>
          <button onClick={this.handleClick} value="NOSHOW" className="btn btn-primary">No Show</button>
          <button onClick={this.handleClick} value="RETURN" className="btn btn-primary">Return</button>
          <button onClick={this.handleClick} value="DONE" className="btn btn-primary">Done</button>
         
        </div>
        </div>


      </div>
    );
  }
}

export default App;
