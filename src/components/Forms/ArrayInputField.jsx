import React, { useEffect, useState } from "react";

const ArrayInputField = ({ addItem, onChange }) => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (!addItem || !addItem.trim()) return;

    setArr((prev) => {
      // prevent duplicate add
      if (prev.includes(addItem)) return prev;

      const updated = [...prev, addItem];
      onChange(updated);
      return updated;
    });
  }, [addItem, onChange]);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {arr.map((item) => (
        <span
          key={item}
          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default ArrayInputField;
