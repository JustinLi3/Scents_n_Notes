import React from "react";
import BaseLayout from "./baseLayout"; // Import BaseLayout correctly

const TestPage = () => {
  const messages = [
    { type: "info", text: "This is a test message for the BaseLayout." },
  ];

  return (
    <BaseLayout title="Test Page" messages={messages}></BaseLayout>
  );
};

export default TestPage;
