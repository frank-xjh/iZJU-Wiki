import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
 const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  intro: [
    {
      type: 'autogenerated',
      dirName: 'intro',
    },
  ],
  info: [
    {
      type: 'autogenerated',
      dirName: 'info',
    },
  ],
  life: [{
    type: 'category',
    label: '饮食',
    items: ['life/diet-campus'],
    collapsed: false,
  }],
  zjui: [
    {
      type: 'category',
      label: '课程概述',
      link: {type: 'doc', id: 'zjui/zjui-courses'},
      items: [
        'zjui/courses/MATH221',
      ],
      collapsed: false,
    }
  ]
};

export default sidebars;
