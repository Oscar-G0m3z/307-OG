// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];


function MyApp() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		fetchUsers()
		  .then((res) => res.json())
		  .then((json) => setCharacters(json["users_list"]))
		  .catch((error) => {console.log(error)});
	  }, []);
	  
	return (
 		<div className="container">
 			<Table 
			characterData={characters} 
    			removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList}/>
		</div>
		);
	/*function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
		return i !== index;
		});
		setCharacters(updated);
  	}*/
	// how to delete
	  function removeOneCharacter(index) {
		// Make DELETE request to backend
		console.log(characters[index])
		const id = characters[index].id
		fetch(`http://localhost:8000/users/${id}`, {
		  method: 'DELETE',
		})
		  .then((res) => {
			if (res.status === 204) {
			  // If the DELETE request was successful, remove the user from the state
			  setCharacters((prevCharacters) =>
				prevCharacters.filter((character) => character.id !== id)
			  );
			  console.log(`User with ID ${id} deleted.`);
			} else if (res.status === 404) {
			  // If the user was not found, log an error
			  console.log(`User with ID ${id} not found.`);
			}
		  })
		  .catch((error) => {
			console.error('Error deleting user:', error);
		  });
	  }
	
	function updateList(person) {
		postUser(person)
		.then(() => setCharacters([...characters, person]))
		.catch((error) => {
		  console.log(error);
		});
	}

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	  }
	
	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(person)
		});
	  
		return promise;
	  }
}
export default MyApp;

