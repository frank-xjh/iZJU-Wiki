import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'iZJU Wiki',
  tagline: 'A Wiki for ZJU International Campus',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://izju.icu',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/frank-xjh/iZJU-Wiki/tree/main/',
        },
        blog: {
          routeBasePath: '/news',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'iZJU Wiki',
      logo: {
        alt: 'iZJU Wiki Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'intro',
          position: 'left',
          label: '简介',
        },
        {
          type: 'docSidebar',
          sidebarId: 'info',
          position: 'left',
          label: '常用信息',
        },
        {
          type: 'docSidebar',
          sidebarId: 'life',
          position: 'left',
          label: '生活',
        },
        {
          type: 'docSidebar',
          sidebarId: 'zjui',
          position: 'left',
          label: 'ZJUI',
        },
        {to: '/news', label: '新闻', position: 'left'},
        {
          href: 'https://github.com/frank-xjh/iZJU-Wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '校区官网',
          items: [
            {
              label: '浙江大学国际校区',
              href: 'https://www.intl.zju.edu.cn/',
            },
            {
              label: 'ZJUI',
              href: 'https://zjui.intl.zju.edu.cn/',
            },
            {
              label: 'ZJE',
              href: 'https://zje.zju.edu.cn/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'News',
              to: '/news',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/frank-xjh/iZJU-Wiki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} iZJU Wiki. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,

  future: {
    v4: true,
    experimental_faster: true,
  },
};

export default config;
