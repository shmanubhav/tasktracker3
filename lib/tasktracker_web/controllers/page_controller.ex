defmodule TasktrackerWeb.PageController do
  use TasktrackerWeb, :controller

  def index(conn, _params) do
    # render(conn, "index.html")
    tasks = Tasktracker.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :completed, :duration, :user_id])))
    render conn, "index.html", tasks: tasks
  end
end
