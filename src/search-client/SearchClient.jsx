import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function SearchClient(props) {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllClients()
      .then((clients) => {
        setResults(clients);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const getPromise = searchTerm.length
      ? () => getClientsByLastname(searchTerm)
      : getAllClients;

    getPromise()
      .then(setResults)
      .finally(() => setLoading(false));
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function goToClientPage(client) {
    history.push(`/client/${client._id}`, {
      client,
    });
  }

  return (
    <div>
      <h2>Rechercher un client</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Entrez un nom de client"
            value={searchTerm}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <button type="submit" className="button-primary">
            Rechercher
          </button>
        </form>
      </div>

      {loading && <p>Recherche en cours...</p>}

      {!loading && (
        <div>
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Ville</th>
              </tr>
            </thead>

            {results.length > 0 && (
              <tbody>
                {results.map((client, index) => (
                  <tr key={index} onClick={() => goToClientPage(client)}>
                    <td>{client.lastname}</td>
                    <td>{client.firstname}</td>
                    <td>{client.city}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {results.length === 0 && <p>Aucun résultat</p>}
        </div>
      )}
    </div>
  );
}

/**
 * Returns a promise of an array that contains clients
 * with the corresponding lastname
 * @param {string} lastname Client lastname
 * @returns {Promise} Array of clients
 */
function getClientsByLastname(lastname) {
  const API_URL =
    // "http://192.168.1.105:1452/api/v1/clients/search/lastname/" + lastname;
    "http://localhost:1452/api/v1/clients/search/lastname/" + lastname;

  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => res.clients);
}

/**
 * Returns a promise of an array with every client
 * @returns {Promise} Array of clients
 */
function getAllClients() {
  const API_URL = "http://localhost:1452/api/v1/clients";

  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => res.clients);
}
