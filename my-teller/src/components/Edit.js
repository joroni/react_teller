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
      STATUS: '',
    };
    this.handleStatClick = this.handleStatClick.bind(this);
  }

  
  handleStatClick() {
    this.setState(state => ({
        isActiveOn: !state.isActiveOn
    }));
  }
  componentDidMount() {
    const ref = firebase.firestore().collection('QUEUE_HDR').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          QUEUE_NO: board.QUEUE_NO,
          BRANCH_CODE: board.BRANCH_CODE,
          STATUS: board.STATUS
        });
       // alert(this.state.STATUS);
       let toBeSetAs = localStorage.getItem("setAs");
        //if(this.state.STATUS === 'PENDING'){
          if(toBeSetAs === 'ACTIVE' && this.state.STATUS === 'PENDING'){
            // PENDING to ACTIVE
            this.setState({STATUS:'ACTIVE'});
            
          } else if(toBeSetAs === 'HOLD' && this.state.STATUS === 'ACTIVE'){
            // ACTIVE to HOLD
            this.setState({STATUS:'HOLD'});
  
          } else if(toBeSetAs === 'RETURN' && this.state.STATUS === 'ACTIVE'){
            // ACTIVE back to PENDING (RETURN)
            this.setState({STATUS:'RETURN'});
  
          }  else if(toBeSetAs === 'ACTIVE' && this.state.STATUS === 'ONHOLD'){
            // HOLD back to ACTIVE (RECALL)
            this.setState({STATUS:'ACTIVE'});
  
          } else if(toBeSetAs === 'DONE' && this.state.STATUS === 'ACTIVE'){
            // DONE
            this.setState({STATUS:'DONE'});
  
          }
          else{
          //this.props.history.push("/");
        }
        
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
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
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
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
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>

        <button className="btn btn-primary hidden" onClick={this.handleClickStat}>
        {this.STATUS = 'HOLD'}
        HOLD
      </button>
      </div>
    );
  }
}

export default Edit;
