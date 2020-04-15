import React from "react";
import "./display.css";

const InfoDisplay = ({inputs, handleDelete, handleEdit}) => {
  return (
    <div className="display">
      {inputs
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(({id, date, distance}) => {
          return (
            <div>
              <ul className="display__info">
                <li className="display__item">{date}</li>
                <li className="display__item">{distance}</li>
                <li className="display__item">
                  <a href="!#" onClick={() => handleDelete(id)}>
                    <i className="fas fa-trash-alt" />
                  </a>
                  <a href="!#" onClick={() => handleEdit(id)}>
                    <i className="fas fa-pencil-alt" />
                  </a>
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default InfoDisplay;
