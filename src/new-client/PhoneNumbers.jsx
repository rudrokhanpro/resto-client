import React, { useState, useRef } from "react";

/**
 * Component for submitting several phone numbers
 * @param {string} props.numbers Client's phone number array
 * @param {Function} props.setNumbers Phone number array update function
 */
export default function PhoneNumbers({ numbers, setNumbers }) {
  const [number, setNumber] = useState("");
  const input = useRef();

  function handleChange(e) {
    setNumber(e.target.value);
  }

  function handleSubmit(e) {
    // prevent parent form's submit
    e.preventDefault();

    input.current.focus();

    if (!number) return;

    // Adding the new phone number
    if (numbers.indexOf(number) === -1) setNumbers([...numbers, number]);

    // Clear of number
    setNumber("");
  }

  function handleDelete(e, num) {
    // Confirm the delete intention
    if (window.confirm(`Supprimer le numéro ${num} ?`)) {
      // Removing of the targeted number
      const newPhoneNumbers = numbers.filter((n) => n !== num);

      // Update phone number array
      setNumbers(newPhoneNumbers);
    }
  }

  return (
    <div className="six columns">
      <label htmlFor="phone_number">
        Numéros de contact ({numbers.length})
      </label>

      <div>
        <input
          ref={input}
          type="text"
          id="phone_number"
          name="phone_number"
          placeholder="Entrez un numéro"
          value={number}
          onChange={handleChange}
          style={{ position: "relative", top: 1 }}
        />
        <button type="submit" onClick={handleSubmit}>
          +
        </button>
      </div>

      <ul>
        {numbers.length > 0 ? (
          numbers.map((num, index) => {
            return (
              <li
                key={index}
                className="hover-danger"
                onClick={(e) => handleDelete(e, num)}
              >
                {num}
              </li>
            );
          })
        ) : (
          <p>Aucun numéro</p>
        )}
      </ul>
    </div>
  );
}
