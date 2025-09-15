import React from 'react';
import { MantineProvider } from '@mantine/core';
import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import theme from "@site/src/theme/MantineTheme";

export default function Root({children}) {
  return (
    <>
        <ColorSchemeScript />
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
    </>
  );
}