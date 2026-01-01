import CommonModal from "../../components/Modal/Modal";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <CommonModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal Title"
        maxWidth={600}
      >
        <Typography>Modal content goes here.</Typography>
      </CommonModal>
    </>
  );
};

export default TestPage;
