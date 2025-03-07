// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

function generateRandomId() {
  return Math.floor(Math.random() * 10000).toString();  // Generate a random number between 0 and 9999
}

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

	const deleteUser = (user) => {
  		users["users_list"].push(user);
  		return user;
	};

app.use(cors());

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  const newId = generateRandomId();

  const userWithId = {
    ...userToAdd,
    
    id: newId,  // Add the generated ID to the user object
  };
  
  console.log

  users.users_list.push(userWithId);
  
  //201 Content Created
  res.status(201).json({ message: "User created successfully", user: userToAdd });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );

  app.delete("/users/:id", (req, res) => {
    const userId = req.params.id; // Get the ID from the URL
    users["users_list"] = users["users_list"].filter(user => user["id"] !== userId); // Find the user by ID
  
    if (users["users_list"] != undefined) {
      res.status(204).send(); // Send HTTP 204 No Content status code to indicate successful deletion
    } else {
      res.status(404).json({ error: "User not found" }); // Send HTTP 404 Not Found if user does not exist
    }
  });
}); 
