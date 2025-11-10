import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-red-50 text-black font-semibold text-4xl">
        Vite + React
      </h1>
    </>
  );
}

export default App;
