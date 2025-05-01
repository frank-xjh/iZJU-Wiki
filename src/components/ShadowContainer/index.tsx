import React, { ReactNode } from "react";
import root from "react-shadow";
import { MantineProvider } from "@mantine/core";

interface ShadowContainerProps {
  children: ReactNode;
}

const ShadowContainer: React.FC<ShadowContainerProps> = ({
  children,
}) => {
  return (
    <root.div className="shadow-mantine-host">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@mantine/core@latest/styles.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@mantine/dates@latest/styles.css"
      />
    </root.div>
  );
};

export default ShadowContainer;
