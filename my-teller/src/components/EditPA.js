import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class EditPA extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      QUEUE_NO: '',
      BRANCH_CODE: '',
      STATUS:'',
    };
    this.handleClick = this.handleClick.bind(this);
    //const statIs = localStorage.getItem("setAs");
    
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
  
  handleClick() {
    this.setState(state => ({
        STATUS: 'ACTIVE'
    }));
  }

  componentDidMount(){
   this.getAllURLParams();
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
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }



  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-title text-centered">
             <p>This will set</p>
                  <h2>          {this.state.QUEUE_NO}</h2>
             <p> to</p>
              <h2>{this.state.STATUS}</h2>
            </div>
          </div>
          <div class="panel-body">
            <h4 className="hidden"><Link to="/" class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit} className="text-centered"> 
              <div class="form-group hidden">
                <label for="title">QUEUE_NO:</label>
                <input type="text" readOnly class="form-control" name="QUEUE_NO" value={this.state.QUEUE_NO} onChange={this.onChange} placeholder="QUEUE_NO" />
              </div>
              <div class="form-group hidden">
                <label for="BRANCH_CODE">BRANCH_CODE:</label>
                <input type="text" readOnly class="form-control" name="BRANCH_CODE" value={this.state.BRANCH_CODE} onChange={this.onChange} placeholder="BRANCH_CODE" />
              </div>
              <div class="form-group hidden">
                <label for="STATUS">STATUS:</label>
                <input type="text" class="form-control" name="STATUS" value={this.state.STATUS} onChange={this.onChange} placeholder="STATUS" />
              </div>
              <Link to="/" class="btn btn-primary">Cancel</Link>
              &nbsp; <button type="submit" class="btn btn-success">OK</button>
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

export default EditPA;
