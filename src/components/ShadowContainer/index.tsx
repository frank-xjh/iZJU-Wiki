import React, { useState, useEffect, useRef, ReactNode } from "react";
import root from "react-shadow";
import { MantineProvider } from "@mantine/core";

const MANTINE_CORE_CSS_URL = "https://unpkg.com/@mantine/core@latest/styles.css";
const MANTINE_DATES_CSS_URL = "https://unpkg.com/@mantine/dates@latest/styles.css";
const cssUrls = [MANTINE_CORE_CSS_URL, MANTINE_DATES_CSS_URL];

type LoadingStatus = 'loading' | 'loaded' | 'error';

interface ShadowContainerProps {
  children: ReactNode;
}

const ShadowContainer: React.FC<ShadowContainerProps> = ({ children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<LoadingStatus>('loading');

  useEffect(() => {
    let isMounted = true;

    const loadAndAdoptStyles = async () => {
      const shadowRoot = hostRef.current?.shadowRoot;

      if (!shadowRoot) {
        return;
      }
      if (typeof shadowRoot.adoptedStyleSheets === 'undefined') {
          if (isMounted) {
              console.error("Browser does not support adoptedStyleSheets.");
              setStatus('error');
          }
          return;
      }

      try {
        const responses = await Promise.all(cssUrls.map(url => fetch(url)));

        const cssTexts = await Promise.all(responses.map(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${response.url}: ${response.statusText}`);
          }
          return response.text();
        }));

        const sheets = cssTexts.map(text => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(text);
          return sheet;
        });

        if (isMounted) {
          shadowRoot.adoptedStyleSheets = sheets;
          setStatus('loaded');
        }
      } catch (err: any) {
         if (isMounted) {
            console.error('Failed to load or adopt styles:', err);
            setStatus('error');
         }
      }
    };

    loadAndAdoptStyles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <root.div ref={hostRef} className="shadow-mantine-host">
      {status === 'loaded' && (
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      )}
    </root.div>
  );
};

export default ShadowContainer;