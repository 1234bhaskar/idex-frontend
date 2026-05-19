"use client";
export const EditorButton = ({
  isActive,
  label,
}: {
  isActive: boolean;
  label: string;
}) => {
  function handleClick() {
    //TODO: Implement the logic to switch between the files
  }
  return (
    <button
      className="cursor-pointer  px-15 py-2 italic"
      style={{ backgroundColor: isActive ? "#131d36ff" : "#13161aff" }}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
