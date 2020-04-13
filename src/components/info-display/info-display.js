import React from "react";
import "./info-display.css";

const InfoDisplay = ({id, date, distance, deleteInput, editInput}) => {
  const handleDelete = () => {
    deleteInput(id);
  };
  const handleEdit = () => {
    editInput(id);
  };

  return (
    <div>
      <ul className="display__info">
        <li className="display__item">{date}</li>
        <li className="display__item">{distance}</li>
        <li className="display__item">
          <a href="!#" onClick={handleDelete}>
            <i className="fas fa-trash-alt" />
          </a>
          <a href="!#" onClick={handleEdit}>
            <i className="fas fa-pencil-alt" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InfoDisplay;
