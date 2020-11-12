import { useState } from "react";
import "./App.css";
import { Text } from "./layers/text";
import { Inspector } from "./inspector";

function App() {
  const [fontFamily, setFontFamily] = useState("Zapfino");
  const [scale, setScale] = useState("3");
  const [shape, setShape] = useState("arc");
  return (
    <div className="App">
      <Text
        fontFamily={fontFamily}
        scale={scale}
        shape={shape}
        fontSize="12px"
      />
      <Inspector
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        scale={scale}
        setScale={setScale}
        shape={shape}
        setShape={setShape}
      />
    </div>
  );
}

export default App;
