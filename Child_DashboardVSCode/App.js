import React from "react";
import ChildDashboard from "./components/ChildDashboard";

function App() {
  const childId = 1; // test with child ID 1
  return <ChildDashboard childId={childId} />;
}

export default App;
