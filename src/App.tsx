import React, { useEffect, useState } from "react";
import "./App.css";
import DragNDrop from "./components/DragNDrop";

const defaultData = [
 { title: "group 1", items: ["1", "2"] },
 { title: "group 2", items: ["4", "5"] },
 { title: "group 3", items: ["6", "7"] },
];

function App() {
 const [data, setData] = useState(defaultData);
 useEffect(() => {
  setData(defaultData);
 }, [setData]);
 return (
  <div className="App">
   <DragNDrop data={data} />
  </div>
 );
}

export default App;
