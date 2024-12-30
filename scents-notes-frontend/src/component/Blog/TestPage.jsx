import React from "react";
import BaseLayout from "./baseLayout"; // Import BaseLayout correctly

const TestPage = () => {
  const messages = [
    { type: "info", text: "This is a test message for the BaseLayout." },
  ];

  return (
    <BaseLayout title="Test Page" messages={messages}>
      <div>
        <h1>Welcome to the Test Page</h1>
        <p>This is a demo for the BaseLayout component.</p>
      </div>
    </BaseLayout>
  );
};

export default TestPage;
