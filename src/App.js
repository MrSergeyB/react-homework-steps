import React, {useState} from "react";
import "./App.css";
import InputForm from "./components/input-form";
import Display from "./components/display";
import {v4 as uuidv4} from "uuid";

function App() {
  const [alert, setAlert] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingInput, setEditingInput] = useState("");
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

  const handleClick = (date, distance) => {
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
      } else if (checkForSameDate.length === 0) {
        setInputs([
          ...inputs,
          {
            id: uuidv4(),
            date: date,
            distance: distance,
          },
        ]);
      }
    } else {
      setAlert("Please check date formant. Distance field should not be empty");
    }
  };

  const deleteInput = (id) => {
    let filteredInputs = inputs.filter((input) => {
      return input.id !== id;
    });
    setInputs([...filteredInputs]);
  };

  const editInput = (id) => {
    let editingItem = inputs.filter((input) => {
      return input.id === id;
    });

    setEditingInput(editingItem[0]);
    setEditMode((prevValue) => !prevValue);
  };

  const addEditedInput = (id, date, distance) => {
    let otherItems = inputs.filter((input) => {
      return input.id !== id;
    });

    setInputs([
      ...otherItems,
      {
        id: id,
        date: date,
        distance: distance,
      },
    ]);
  };

  return (
    <div className="container">
      <InputForm
        handleClick={handleClick}
        editMode={editMode}
        editingInput={editingInput}
        addEditedInput={addEditedInput}
      />
      <Display
        inputs={inputs}
        handleDelete={deleteInput}
        handleEdit={editInput}
      />
      <p>{alert ? alert : null}</p>
    </div>
  );
}

export default App;
