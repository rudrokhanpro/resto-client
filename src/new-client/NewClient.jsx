import React, { useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import PhoneNumbers from "./PhoneNumbers";

export default function NewClient(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      address: "",
      zip: "",
      city: "",
      comments: "",
    },

    onSubmit: (values) => {
      // Capitalize firsname
      values.firstname = values.firstname
        .split(" ")
        .map((name) => name[0].toUpperCase() + name.substring(1))
        .join(" ");

      createNewClient({ ...values, phone_numbers: phoneNumbers }).then(
        (res) => {
          const client = res.client;

          if (client) {
            history.push(`/client/${client._id}`, {
              client,
            });
          } else {
            alert("Une erreur s'est produite");
          }
        },
      );
    },
  });

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  return (
    <div>
      <h2>Nouveau client</h2>

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
  const API_URL = "http://192.168.1.105:1452/api/v1/clients/new";
  const body = JSON.stringify(values);

  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((res) => res.json());
}
