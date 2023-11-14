import { useEffect, useState } from "react";

const COLORS = {
  teal: "teal",
  orange: "orange",
  purple: "purple",
  red: "red",
  blue: "blue",
  yellow: "yellow",
  emerald: "emerald",
  pink: "pink",
};

const calculateColorIndex = (char) => {
  // For simplicity, this example uses the ASCII code of
  // the character and performs a modulo operation.
  return char.charCodeAt(0) % Object.keys(COLORS).length;
};

const getColorByInput = (input) => {
  // Ensure the input string is not empty
  if (!input || input.trim() === "") {
    return "red";
  }

  // Extract the first character of the input string
  const firstChar = input.charAt(0).toLowerCase();

  // Calculate a color index based on the first character
  const colorIndex = calculateColorIndex(firstChar);

  // Get the color at the calculated index
  const color = Object.keys(COLORS)[colorIndex];

  return color || "red";
};

export const useProfileColor = (name) => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    if (!name) {
      setColor("red")
      return;
    }
    setColor(getColorByInput(name));
  }, [name]);

  return color;
};
