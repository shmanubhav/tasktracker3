import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import { pipeline } from 'stream';

function TaskList(props) {
  let {tasks, dispatch} = props;
  let taskslist = _.map(tasks, (tt) =>
    <Task key={tt.id} dispatch={dispatch}
          task={tt} />
  );
  return <div className="row">
    {taskslist}
  </div>;
}

function Task(props) {
  let {task, root, dispatch} = props;
  //countchanged here

  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        {task.desc}<br />
        completed: {task.completed ? "✓" : "❌"}
      </p>
    </div>
  </div>
}

function state2props(state) {
  console.log("rerender", state);
  return {
    tasks: state.tasks,
  };
}

export default connect(state2props)(TaskList);