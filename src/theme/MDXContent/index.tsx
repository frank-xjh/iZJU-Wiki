import React, {type ReactNode} from 'react';
import MDXContent from '@theme-original/MDXContent';
import type MDXContentType from '@theme/MDXContent';
import type {WrapperProps} from '@docusaurus/types';
import { TypographyStylesProvider } from '@mantine/core';

type Props = WrapperProps<typeof MDXContentType>;

export default function MDXContentWrapper(props: Props): ReactNode {
  return (
    <>
    <TypographyStylesProvider>
      <MDXContent {...props} />
    </TypographyStylesProvider>
    </>
  );
}
