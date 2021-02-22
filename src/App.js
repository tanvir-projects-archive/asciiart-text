import { useState, useRef } from "react"
import './App.css'
import { Figlet } from './Figlet'
import { fonts } from "./fonts.js"


function App() {
  const [text, setText] = useState("Type Something")
  const [font, setFont] = useState(() => (fonts.font_Standard))
  return (
    <div className="App">
      <select onChange={(e) => {
        setFont(fonts[e.target.value])
      }}>
        {Object.entries(fonts).map(([fontKey, { name }]) => <option key={fontKey} value={fontKey}>{name}</option>)}
      </select>
      <textarea value={text} onChange={(e) => { setText(e.target.value) }}></textarea>
      <Figlet text={text} font={font.name} fontData={font.value} />
    </div>
  );
}
function copyToClipboard(node) {
  const copyText = node.textContent;
  const textArea = document.createElement('textarea');
  textArea.style.position = "absolute";
  textArea.style.left = "-100%";
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove()
}

const FigletContainer = (props) => {
  const ref = useRef(null)
  return <div>
    <div>{props.font}</div>
    <Figlet {...props} ref={ref} />
    <button onClick={() => copyToClipboard(ref.current)}>Copy</button>
  </div>
}

function MultiApp() {
  const [text, setText] = useState("Type Something")
  const [width, setWidth] = useState(80)
  return (
    <div className="App">
      <input type="number" min={0} max={3000} value={width} onChange={(e) => { setWidth(e.target.value) }} />
      <textarea value={text} onChange={(e) => { setText(e.target.value) }}></textarea>
      {Object.values(fonts).map((font) => <FigletContainer key={font.name} text={text} font={font.name} fontData={font.value} width={width} />)}
    </div>
  );
}

export default MultiApp;
