import React, {  ReactNode } from "react";
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

const Comments = (): React.ReactNode => {
  const { colorMode } = useColorMode();
  const giscusTheme = colorMode === 'dark' ? 'dark' : 'light';

  return (
    <Giscus
      repo="frank-xjh/iZJU-Wiki"
      repoId="R_kgDOOBz3tA"
      category="Comments"
      categoryId="DIC_kwDOOBz3tM4Cqs8T"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={giscusTheme}
      lang="zh-CN"
      loading="lazy"
    />
  );
};

export default Comments;