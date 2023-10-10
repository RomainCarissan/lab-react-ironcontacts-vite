import React, { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [listContacts, setListContacts] = useState(contacts.slice(0, 5));
  console.log(listContacts);

  //*********ADD CONTACT */
  const handleAddRandomContact = () => {
    const remainingContacts = contacts.filter(
      (contact) => !listContacts.includes(contact)
    );
    if (remainingContacts.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setListContacts([...listContacts, randomContact]);
  };

  //*********SORT BY NAME */
  function sortByName(contactA, contactB) {
    return contactA.localeCompare(contactB, undefined, { sensitivity: "base" });
  }
  const handleSortByName = () => {
    const copy = [...listContacts];
    copy.sort((contactA, contactB) => {
      return sortByName(contactA.name, contactB.name);
    });
    setListContacts(copy);
  };

  //*********SORT BY POPULARITY*/
  const handleSortByPopularity = () => {
    const copy = [...listContacts];
    copy.sort((contactA, contactB) => {
      const popularityA = contactA.popularity,
        popularityB = contactB.popularity;
      return popularityB - popularityA;
    });
    setListContacts(copy);
  };

  //*********DELETE CONTACT*/
  const handleContactDelete = (id) => {
    const contactsToKeep = listContacts.filter((contact) => {
      return contact.id !== id;
    });

    setListContacts(contactsToKeep);
  };

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <>
        <div>
          <button onClick={handleAddRandomContact}>Add Random Contact</button>
          <button onClick={handleSortByName}>sort by name</button>
          <button onClick={handleSortByPopularity}>sort by popularity</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listContacts.map((listContacts, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={listContacts.pictureUrl}
                    alt={listContacts.name}
                    style={{ height: "100px" }}
                  ></img>
                </td>
                <td>{listContacts.name}</td>
                <td>{listContacts.popularity.toFixed(2)}</td>
                <td>{listContacts.wonOscar ? "🏆" : null}</td>
                <td>{listContacts.wonEmmy ? "🌟" : null}</td>
                <td>
                  <button onClick={() => handleContactDelete(listContacts.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default App;
