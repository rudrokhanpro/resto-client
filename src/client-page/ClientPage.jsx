import React from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function ClientPage() {
  const location = useLocation();
  const history = useHistory();

  const client = location.state.client;

  const fullname = client.lastname + " " + client.firstname;

  function handleDelete() {
    if (window.confirm(`Supprimer le client ${fullname} ?`)) {
      deleteClient(client._id).then((wasDeleted) => {
        if (wasDeleted) history.replace("/search-client");
      });
    }
  }

  return (
    <div>
      <h2>
        {fullname}
      </h2>

      <ul>
        {/* TODO: Show only  non-empty information */}
        <li>Numéros de contact: {client.phone_numbers.join(", ")}</li>
        <li>Adresse: {client.address}</li>
        <li>Code postal: {client.zip}</li>
        <li>Ville: {client.city}</li>
        <li>
          Commenaires:
          <p>{client.comments}</p>
        </li>
      </ul>

      <button className="button-danger" onClick={handleDelete}>
        Supprimer
      </button>
    </div>
  );
}

/**
 * Delete a client from database
 * @param {string} _id Client ID (ObjectID)
 */
function deleteClient(_id) {
  const API_URL = "http://192.168.1.105:1452/api/v1/clients/id/" + _id;

  return fetch(API_URL, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => res.deleted);
}
