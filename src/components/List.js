import React from "react";

export const List = ({ items, onToggle = () => {}, onRemove }) => {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            textDecoration: item.complete && "line-through",
          }}
        >
          <span onClick={() => onToggle(item)}>{item.name}</span>
          <button onClick={() => onRemove(item)}>x</button>
        </li>
      ))}
    </ul>
  );
};
