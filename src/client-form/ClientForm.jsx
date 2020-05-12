import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import PhoneNumbers from "./PhoneNumbers";

export default function ClientForm(props) {
  const location = useLocation();
  const history = useHistory();
  const client = location.state ? location.state.client : undefined;
  const [phoneNumbers, setPhoneNumbers] = useState(
    client ? client.phone_numbers : [],
  );

  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      address: "",
      zip: "",
      city: "",
      comments: "",
      // if client informations are provided
      // then populate form
      ...client,
    },

    onSubmit: (values) => {
      // Capitalize firsname
      values.firstname = values.firstname
        .split(" ")
        .map((name) => name[0].toUpperCase() + name.substring(1))
        .join(" ");

      if (client) {
        updateClient({ ...values, phone_numbers: phoneNumbers })
          .then((res) => {
            history.replace(`/client/${client._id}`, {
              client: res.client,
            });
          })
          .catch(console.log);
      } else {
        createNewClient({ ...values, phone_numbers: phoneNumbers }).then(
          (res) => {
            const newClient = res.client;

            if (newClient) {
              history.push(`/client/${newClient._id}`, {
                client: newClient,
              });
            } else {
              alert("Une erreur s'est produite");
            }
          },
        );
      }
    },
  });

  return (
    <div>
      <h2>{client ? "Modifier" : "Nouevau client"}</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              value={formik.values.lastname}
              onChange={formik.handleChange}
              className="u-full-width uppercase"
            />
          </div>
          <div className="six columns">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              className="u-full-width capitalize"
            />
          </div>
        </div>

        <div className="row">
          <div className="six columns">
            <label htmlFor="address">Adresse</label>
            <textarea
              id="address"
              name="address"
              rows="4"
              className="u-full-width"
              value={formik.values.address}
              onChange={formik.handleChange}
              style={{ resize: "vertical", height: 120 }}
            />
          </div>
          <div className="six columns">
            <div className="row">
              <label htmlFor="zip">Code postal</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                className="u-full-width"
              />
            </div>
            <div className="row">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="u-full-width uppercase"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <PhoneNumbers numbers={phoneNumbers} setNumbers={setPhoneNumbers} />

          <div className="six columns">
            <label htmlFor="address">Commentaires</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              className="u-full-width"
              value={formik.values.comments}
              onChange={formik.handleChange}
              style={{ resize: "vertical", height: 120 }}
            />
          </div>
        </div>

        <button type="submit" className="button button-primary">
          Valider
        </button>
      </form>
    </div>
  );
}

function createNewClient(values) {
  const API_URL = "http://localhost:1452/api/v1/clients/new";
  const body = JSON.stringify(values);

  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((res) => res.json());
}

function updateClient(infos) {
  const API_URL = "http://localhost:1452/api/v1/clients/id/" + infos._id;

  return fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  }).then((res) => res.json());
}
