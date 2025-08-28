import React, { useState } from "react";
import { getChildApps } from "../services/childService";

const ChildDashboard = ({ childId }) => {
  const [apps, setApps] = useState([]);
  const [message, setMessage] = useState("");

  // Manually fetch apps on button click
  const handleLoadApps = async () => {
    try {
      const data = await getChildApps(childId);
      setApps(data);
      setMessage("Apps loaded successfully");
    } catch (err) {
      setMessage("Failed to load apps");
      console.error(err);
    }
  };

  const handleAccessApp = (app) => {
    setMessage(`Accessing ${app.name}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Child Dashboard</h2>
      <button onClick={handleLoadApps} style={{ marginBottom: "15px" }}>
        Load Apps
      </button>
      {message && <p>{message}</p>}
      <ul>
        {apps.map((app) => (
          <li key={app.id} style={{ marginBottom: "10px" }}>
            {app.name} ({app.category}){" "}
            <button onClick={() => handleAccessApp(app)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildDashboard;
