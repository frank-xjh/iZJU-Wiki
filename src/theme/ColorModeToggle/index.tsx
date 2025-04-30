import React, {type ReactNode, useEffect} from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import type {WrapperProps} from '@docusaurus/types';
import { useMantineColorScheme } from '@mantine/core';

type Props = WrapperProps<typeof ColorModeToggleType>;

export default function ColorModeToggleWrapper(props: Props): ReactNode {
  const { setColorScheme } = useMantineColorScheme();
  const { value } = props;

  useEffect(() => {
    setColorScheme(value);
  }, [value]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
