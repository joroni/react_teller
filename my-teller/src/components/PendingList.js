import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';

//import 'typeface-roboto';
//import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';


class PendingList extends Component {
  constructor(props) {
    super(props);
    const brchCde= localStorage.getItem("brnch_code");

   const cnterNo= localStorage.getItem("counter_no");
   this.handleClick = this.handleClick.bind(this);
    this.ref = firebase.firestore().collection('QUEUE_HDR').where("STATUS", "==", "PENDING").where("BRANCH_CODE", "==", brchCde);
    this.unsubscribe = null;
    this.state = {
      QUEUE_HDR: [],
      isActive: true,
      id:''

    };
    this.handleCheck ='none'
   
  }


  getClass(){
    var a = document.querySelector('#PendingList > tbody > tr')[0].className;
    var x = document.getElementsByTagName("tr")[0].className;
    localStorage.setItem("setAs", x)
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

  limitActiveToOne() {
    let activeOne = localStorage.getItem("hasActive");
   // alert(activeOne);
    if (activeOne === 'YES') {
       alert('Empty your Active item first');
       this.handleCheck ='none'
       // return false;
      // document.querySelector('.serveBtn').prop("disabled", true);
      } else if (activeOne === 'NO')  {
       // this.prop("disabled", false);
       this.handleCheck ='block'
      return true;
      } 
  }
  
  componentDidUpdate() {
  //this.checkActive();
  //this.limitActiveToOne();
  }
  

  handleClicks() {
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
    this.limitActiveToOne();
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);   
  }


  handleClick = e => {
    const buttonValue = e.target.value;
    console.log(buttonValue);
    var x = document.getElementById("ActiveItem").rows.length;
    console.log(x);
    if (x === 0){
      localStorage.setItem("setAs","ACTIVE" );
      localStorage.setItem("hasActive", 'NO' );
    }else {
      localStorage.setItem("setAs","PENDING" );
      localStorage.setItem("hasActive", 'YES' );
    }
  
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
                  <tr key={board.QUEUE_NO} className="ACTIVE">
                    <td className="QueueNo">{board.QUEUE_NO}</td>
                    <td className="hidden">{board.BRANCH_CODE}</td>
                    <td className="hidden">{board.STATUS}</td>
                    <td><Link onClick={this.handleClick}  value={board.QUEUE_NO} to={`/edit/${board.key}`} className="btn btn-success" >Serve</Link></td>
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


