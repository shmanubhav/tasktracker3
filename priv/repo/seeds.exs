# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker.Repo.insert!(%Tasktracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Tasktracker.Repo
alias Tasktracker.Users.User

pwhash = Argon2.hash_pwd_salt("pass12345")

Repo.insert!(%User{name: "John Doe", email: "john@abc.com", password_hash: pwhash})
Repo.insert!(%User{name: "Dwight Schrute", email: "dwight@abc.com", password_hash: pwhash})

alias Tasktracker.Tasks.Task

Repo.insert!(%Task{title: "Clean dishes", desc: "Finish cleaning the dishes before rommates parents arrive.", duration: 4, completed: false})
Repo.insert!(%Task{title: "Hotwheels", desc: "Build the Hot Wheels track at home before Slade Gomes birthday party.", duration: 8, completed: false})
Repo.insert!(%Task{title: "Wash Car", desc: "Sister drove to the Grand Canyon and the car is dirty. Need to clean it before mum arrives.", duration: 15, completed: false})