// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/nightOwl");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

module.exports = {
  stylesheets: [
    // String format.
    "https://docusaurus.io/style.css",
    // Object format.
    {
      href: "http://mydomain.com/style.css",
    },
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Developer Documentation",
  tagline: "1Kosmos BlockID Developer Portal",
  url: 'https://eager-thompson-4fe0a6.netlify.app',
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "1kosmos", // Usually your GitHub org/user name.
  projectName: "1k-mobile-docs", // Usually your repo name.
  onDuplicateRoutes: "warn",

  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./docs/sidebars.js"),
          // Please change this to your repo.
          // editUrl: "https://github.com/1KBlockID/devx_frontend/tree/develop/", we might want this again someday
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/1KBlockID/devx_frontend/tree/develop/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  stylesheets: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
  plugins: ["docusaurus-node-polyfills", require.resolve("./src/docuplugin")],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Developer",
        logo: {
          alt: "BlockID Logo",
          src: "img/1klogo.svg",
        },
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Home",
                to: "/docs/uwl",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} 1Kosmos Inc., All Rights Reserved. | Privacy Policy | Cookie Policy`,
      },
      prism: {
        additionalLanguages: ["php", "java"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
