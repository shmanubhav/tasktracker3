defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :desc, :string
    field :duration, :integer
    field :title, :string

    belongs_to :user, Tasktracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :duration, :completed, :user_id])
    |> unique_constraint(:user_id, name: :tasks_user_id_index)
    |> validate_required([:title, :desc])
  end
end
