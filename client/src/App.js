import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8080"); // socket to the server

// Listen for something from server
// socket.on('event-name', (data) => {
//
// });

let num = 0;

function App() {
  const [queueStack, setQueueStack] = useState(3); // default to 3 columns
  const [runLine, setRunLine] = useState(3); // default to runline of 3

  useEffect(() => {
    getApi();
    getConfig();
  }, []);

  // Config has changed
  useEffect(() => {
    socket.on("config-update", (data) => {
      setQueueStack(data.columns);
      setRunLine(data.runline);
      console.log(`${num++} Config update: ` + JSON.stringify(data));
      //if too many queues, trim from end

      //if too few queues, add to end
    });
  }, []);

  let getApi = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  let getConfig = async () => {
    const response = await fetch("api/config");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // Send something to server
  // socket.emit('event-name', data);

  let handleConfigUpdate = () => {
    socket.emit("config-update", { runline: 1, columns: 1 });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Outside</div>} />
        <Route path="/inside" element={<div>Inside</div>} />
        <Route
          path="/config"
          element={
            <div>
              Config
              <button onClick={handleConfigUpdate}>Config Update</button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
