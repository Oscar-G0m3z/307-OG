import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json)) // ✅ No more "users_list"
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(_id) { // ✅ Expect _id instead of index
    fetch(`http://localhost:8000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prevCharacters) =>
            prevCharacters.filter((character) => character._id !== _id)
          );
          console.log(`User with _id ${_id} deleted.`);
        } else if (res.status === 404) {
          console.log(`User with _id ${_id} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((newUser) => setCharacters([...characters, newUser])) // ✅ Ensure we add the new user properly
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
