import React, {useState, useEffect} from "react";
import "./input-form.css";

const InputForm = (props) => {
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");

  const {handleClick, editMode, editingInput, addEditedInput} = props;

  useEffect(() => {
    if (editMode) {
      setDate(editingInput.date);
      setDistance(editingInput.distance);
    }
  }, [editingInput.date, editingInput.distance, editMode]);

  const submitInput = (e) => {
    e.preventDefault();
    if (editMode) {
      addEditedInput(editingInput.id, date, distance);
      setDate("");
      setDistance("");
    } else {
      handleClick(date, distance);
      setDate("");
      setDistance("");
    }
  };

  return (
    <div>
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
          <button className="btn" onClick={submitInput}>
            ok
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
