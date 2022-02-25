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
  title: "1Kosmos Developer Experience",
  tagline: "1Kosmos Developer Experience",
  url: "https://eager-thompson-4fe0a6.netlify.app",
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
          lastVersion: "current",
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

  stylesheets: [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://use.typekit.net/tus5fxi.css",
  ],
  plugins: [
    "docusaurus-node-polyfills",
    require.resolve("./src/docuplugin"),
    [
      "docusaurus2-dotenv",
      {
        path: "./.env", // The path to your environment variables.
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: false, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      },
    ],
  ],
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
        links: [
          {
            items: [
              {
                html: `
                <Box
                height="auto"
                width="100%"
                flex="0 0 auto"
                zIndex="1"
                position="fixed"
                bottom="0"
              ><Typography
              variant="body2"
            >
              ©${new Date().getFullYear()} 1Kosmos Inc., All Rights Reserved. | <a
              href="https://www.1kosmos.com/privacy/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Privacy Policy"
              style="color:#fff"
            >
              Privacy Policy
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://www.1kosmos.com/cookies/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Cookie Policy"
              style="color:#fff"
            >
            Cookie Policy
            </a>
            </Typography></Box>
                    `,
              },
            ],
          },
        ],
      },
      prism: {
        additionalLanguages: ["php", "java"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
