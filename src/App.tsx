import { Providers } from "@providers/Providers";
import React from "react";
import { Routes } from "Routes";

const App: React.FC = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
