import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import api from './api';
import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    // api.create_session("john@abc.com", "pass12345");
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}