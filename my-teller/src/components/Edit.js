import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      QUEUE_NO: '',
      BRANCH_CODE: '',
      STATUS:'',
    };
    this.handleClick = this.handleClick.bind(this);
    this.disabled = false
    //const statIs = localStorage.getItem("setAs");
    
  }

  limitActiveToOne() {
    const activeOne = localStorage.getItem("hasActive");
   // alert(activeOne);
    if (activeOne === 'YES') {
        alert('Empty your Active item first');
       // this.disabled = true
        return false;
       // document.querySelector('.serveBtn').prop("disabled", true);
      } else {
        this.disabled = false
       // this.prop("disabled", false);
      return false;
      } 
  }
  
  handleClick() {
    this.setState(state => ({
        STATUS: 'ACTIVE'
    }));
  }

  componentDidMount(){
   this.getAllURLParams();
   this.limitActiveToOne();
  }
  
 getAllURLParams() {
   const newSTATUS = localStorage.getItem("setAs");
 
  const ref = firebase.firestore().collection('QUEUE_HDR').doc(this.props.match.params.id);
  ref.get().then((doc) => {
    if (doc.exists) {
      const board = doc.data();
      this.setState({
        key: doc.id,
        QUEUE_NO: board.QUEUE_NO,
        BRANCH_CODE: board.BRANCH_CODE,
      //  STATUS: board.STATUS,
        STATUS: newSTATUS
      });
    
    } else {
      console.log("No such document!");
    }
  });
}
  



    
    

  updateVal = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({STATUS:'ACTIVE'});
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onChangeStats = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { QUEUE_NO, BRANCH_CODE, STATUS } = this.state;

    const updateRef = firebase.firestore().collection('QUEUE_HDR').doc(this.state.key);
    updateRef.set({
      QUEUE_NO,
      BRANCH_CODE,
      STATUS
    }).then((docRef) => {
      this.setState({
        key: '',
        QUEUE_NO: '',
        BRANCH_CODE: '',
        STATUS: ''
      });
     // this.props.history.push("/show/"+this.props.match.params.id)
    this.props.history.push("/");
    localStorage.setItem("queue_No", QUEUE_NO);
    if (STATUS !== 'PENDING'){
    localStorage.setItem("hasActive", 'YES');
    } else {
      localStorage.setItem("queue_No", '');
      localStorage.setItem("hasActive", 'NO');
    }
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }



  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title text-centered">
             <p>This will set</p>
                  <h2>          {this.state.QUEUE_NO}</h2>
             <p> to</p>
              <h2>{this.state.STATUS}</h2>
            </div>
          </div>
          <div className="panel-body">
            <h4 className="hidden"><Link to="/" className="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit} className="text-centered"> 
              <div className="form-group hidden">
                <label for="title">QUEUE_NO:</label>
                <input type="text" readOnly className="form-control" id="QUEUE_NUMBER" name="QUEUE_NO" value={this.state.QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div className="form-group hidden">
                <label for="BRANCH_CODE">BRANCH_CODE:</label>
                <input type="text" readOnly className="form-control" name="BRANCH_CODE" value={this.state.BRANCH_CODE} onChange={this.onChange} placeholder="BRANCH_CODE" />
              </div>
              <div className="form-group hidden">
                <label for="STATUS">STATUS:</label>
                <input type="text" className="form-control" name="STATUS" value={this.state.STATUS} onChange={this.onChange} placeholder="STATUS" />
              </div>
              <Link to="/" className="btn btn-primary">Cancel</Link>
              &nbsp; <button type="submit" disabled={this.disabled} className="btn btn-success">OK</button>
            </form>
          </div>
        </div>

        <button className="btn btn-primary hidden" onClick={this.handleClickStat}>
        {this.STATUS = 'ACTIVE'}
        HOLD
      </button>
      </div>
    );
  }
}

export default Edit;
