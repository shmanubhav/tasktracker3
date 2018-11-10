import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import task_list from './task_list';

function EditTask(props) {
  let curTask = props.cur_task;
  return <div className="row">
    <div className="col-2">
    </div>
    <div className="col-10">
      <p className="form">
        Title <input className="form-control" id="edit-title" type="text"  placeholder={curTask.title}/>
        Description<input className="form-control" id="edit-desc" type="text"  placeholder={curTask.desc} />
        Completed <input id="edit-completed" type="checkbox" value ={curTask.completed} />
        <br />
        Duration <input id="edit-duration" type="number" min="0" step="15" />  minutes
        <br />
        Assigned To  
        <select id="edit-assign-to">
          {props.users.map((u, val) => {
            if (u.id == curTask.user_id) {
              return <option selected="selected" key={val} value={u.id}>{u.name}</option>;
            } else {
              return <option key={val} value={u.id}>{u.name}</option>;
            }
          })}
        </select> 
        <br />
        <Link to="/" id="edit-task-button" className="btn btn-primary" onClick={( ) => { api.update_task(curTask.id, props.session.token); api.fetch_tasks() ;}}>Update Task</Link>
      </p>
    </div>
  </div>;
}

export default connect((state) => {return {cur_task: state.cur_task, users: state.users, session: state.session};})(EditTask);