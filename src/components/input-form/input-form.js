import React, {useState} from "react";
import "./input-form.css";
import InputDisplay from "../info-display";
import {v4 as uuidv4} from "uuid";

const InputForm = () => {
  const [inputs, setInputs] = useState([
    {
      id: 1,
      date: "11.07.2019",
      distance: 11,
    },
    {
      id: 2,
      date: "12.09.2019",
      distance: 14,
    },
    {
      id: 3,
      date: "10.05.2019",
      distance: 14,
    },
  ]);

  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [alert, setAlert] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setAlert("");
    const regex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
    if (regex.test(date) && distance.length > 0) {
      let checkForSameDate = inputs.filter((input) => {
        return input.date === date;
      });

      if (checkForSameDate.length > 0) {
        let filteredInputs = inputs.filter((input) => {
          return input.date !== date;
        });
        setInputs([
          ...filteredInputs,
          {
            id: checkForSameDate[0].id,
            date: checkForSameDate[0].date,
            distance:
              parseInt(checkForSameDate[0].distance) + parseInt(distance),
          },
        ]);
        resetInputs();
      } else if (checkForSameDate.length === 0) {
        setInputs([
          ...inputs,
          {
            id: uuidv4(),
            date: date,
            distance: distance,
          },
        ]);

        resetInputs();
      }
    } else {
      setAlert("Please check date formant. Distance field should not be empty");
      resetInputs();
    }
  };

  const resetInputs = () => {
    setDate("");
    setDistance("");
  };

  const deleteInput = (id) => {
    let filteredInputs = inputs.filter((input) => {
      return input.id !== id;
    });
    setInputs([...filteredInputs]);
  };

  const editInput = (id) => {
    let editingInput = inputs.filter((input) => {
      return input.id === id;
    });

    setDate(editingInput[0].date);
    setDistance(editingInput[0].distance);
    let filteredInputs = inputs.filter((input) => {
      return input.id !== id;
    });
    setInputs([...filteredInputs]);
  };

  return (
    <div className="container">
      <div className="form-wraper">
        <form className="form">
          <div className="input-container">
            <label>Дата(ДД.ММ.ГГ)</label>
            <input
              className="input"
              type="text"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              data-date-format="DD MMMM YYYY"
            />
          </div>
          <div className="input-container">
            <label>Пройден км</label>
            <input
              className="input"
              type="number"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>
          <button className="btn" onClick={handleClick}>
            ok
          </button>
        </form>
      </div>
      <div className="display">
        {inputs
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(({id, date, distance}) => {
            return (
              <InputDisplay
                key={id}
                id={id}
                date={date}
                distance={distance}
                deleteInput={deleteInput}
                editInput={editInput}
                alert={alert}
              />
            );
          })}
      </div>
      {alert ? alert : null}
    </div>
  );
};

export default InputForm;
