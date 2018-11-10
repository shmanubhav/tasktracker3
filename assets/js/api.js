import store from './store';

class TheServer {
  delete_task(id) {
    $.ajax('/api/v1/tasks/' + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'TASK_DELETE',
          task_id: id,
        });
      }
    });
  }

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  create_session(email, password) {
    this.send_post(
      "/api/v1/sessions",
      {email, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

  delete_session() {
    store.dispatch({
      type: 'DELETE_SESSION',
    });
  }

  create_user() {
    let name = $("#new-user-name").val();
    let email = $("#new-user-email").val();
    let password = $("#new-user-password").val();
    let data = {
      user: {
        name: name,
        email: email,
        password_hash: password,
      },
    };
    this.send_post(
      "/api/v1/users",
      data,
      (resp) => {
        store.dispatch({
          type: 'NEW_USER',
          data: resp.data,
        });
        this.create_session(email, password);
      }
    );
  }

  create_task(token) {
    let title = $("#new-title").val();
    let desc = $("#new-desc").val();
    let assignTo = $("#assign-to").val();
    let data = {
      task: {
        title: title,
        desc: desc,
        user_id: assignTo,
      },
      token: token,
    };
    this.send_post(
      "/api/v1/tasks",
      data,
      (resp) => {
        store.dispatch({
          type: 'NEW_TASK',
          data: resp.data,
        });
      }
    );
  }

  get_task(task_id) {
    this.fetch_path(
      "/api/v1/tasks/" + task_id,
      (resp) => {
        store.dispatch({
          type: 'GET_TASK',
          data: resp.data,
        });
      }
    );
  }

  update_task(task_id, token) {
    let title = $("#edit-title").attr('placeholder');
    let desc = $("#edit-desc").attr('placeholder');
    if ($("#edit-title").val() != '') {
      title = $("#edit-title").val();
    }
    if ($("#edit-desc").val() != '') {
      desc = $("#edit-desc").val();
    }
    let assignTo = $("#edit-assign-to").val();
    let completed = $("#edit-completed").is(":checked");
    let duration = $("#duration").val();
    console.log(duration);
    let data = {
      task: {
        title: title,
        desc: desc,
        completed: completed,
        duration: duration,
        user_id: assignTo,
      },
      token: token,
    };
    $.ajax("/api/v1/tasks/" + task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          task_id: task_id,
        });
        this.fetch_tasks();
      }
    });
  }

  delete_task(task_id, token) {
    $.ajax("/api/v1/tasks/" + task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: token}),
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          task_id: task_id,
        });
      }
    });
  }


}

export default new TheServer();