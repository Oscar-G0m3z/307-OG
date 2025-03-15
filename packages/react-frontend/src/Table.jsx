import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <td>ID</td> {/* No need to change this label */}
        <th>Name</th>
        <th>Job</th>
        <th>Actions</th> {/* Add a header for the delete button */}
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row) => {
    return (
      <tr key={row._id}> {/* ✅ Use _id as the unique key */}
        <td>{row._id}</td> {/* ✅ Use _id instead of id */}
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(row._id)}> {/* ✅ Pass _id instead of index */}
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;
