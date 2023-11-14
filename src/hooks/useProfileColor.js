import { useEffect, useState } from "react";

const COLORS = {
  red: "red",
  teal: "teal",
  orange: "orange",
  purple: "purple",
  blue: "blue",
  yellow: "yellow",
  emerald: "emerald",
  rose: "rose",
  pink: "pink",
  fuchsia: "fuchsia",
};

const calculateColorIndex = (char) => {
  // For simplicity, this example uses the ASCII code of
  // the character and performs a modulo operation.
  return char.charCodeAt(0) % Object.keys(COLORS).length;
};

const getColorByInput = (input) => {
  // Ensure the input string is not empty
  if (!input || input.trim() === "") {
    return "rose";
  }

  // Extract the first character of the input string
  const firstChar = input.charAt(0).toLowerCase();

  // Calculate a color index based on the first character
  const colorIndex = calculateColorIndex(firstChar);

  // Get the color at the calculated index
  const color = Object.keys(COLORS)[colorIndex];

  return color || "rose";
};

export const useProfileColor = (name) => {
  const [color, setColor] = useState("rose");

  useEffect(() => {
    if (!name) return;
    setColor(getColorByInput(name));
  }, [name]);

  return color;
};
