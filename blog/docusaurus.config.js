// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const mockResponse = {
  footer: {
    _createdAt: '2022-03-23T09:42:19Z',
    _id: '8a3b568c-3b94-47c1-81c3-364899d712d7',
    _rev: '7xovLrdFPKAzdDyvzc7xZ3',
    _type: 'footer',
    _updatedAt: '2022-07-13T09:15:01Z',
    contactInfo: ' London, Amsterdam, Warsaw, Remote.',
    copyInfo: '© 2022 FocusReactive',
    documentTitle: 'Default footer',
    navigation: [
      {
        _key: '03f804ec9332',
        links: [
          {
            _key: 'e332713922a2',
            link: '/',
            title: 'Home',
          },
          {
            _key: 'b7576afb1e32',
            link: '/our-work/',
            title: 'Our work',
          },
          {
            _key: 'aff7601cf764',
            link: '/about/',
            title: 'About',
          },
          {
            _key: '0110ee1c4379',
            link: '/blog/',
            title: 'Blog',
          },
          {
            _key: '08104bba7e93',
            link: 'https://careers.smartrecruiters.com/FocusReactive',
            title: 'Careers',
          },
        ],
        title: 'COMPANY',
      },
      {
        _key: '3e02eccdecef',
        links: [
          {
            _key: '6717bfd1505e',
            link: '/#mail-us',
            title: 'Contact us',
          },
          {
            _key: 'bc6ac1cc01ef',
            link: 'https://www.linkedin.com/company/focusreactive',
            title: 'LinkedIn',
          },
          {
            _key: '4cb16586719e',
            link: 'https://twitter.com/FocusReactive',
            title: 'Twitter',
          },
        ],
        title: 'GET IN TOUCH',
      },
      {
        _key: '76253d6a0b2c',
        links: [
          {
            _key: '41308efca5f9',
            link: '/headless-ecommerce-experts/',
            title: 'Headless eCommerce experts',
          },
          {
            _key: '6ced0427ec1e',
            link: '/headless-cms-experts/',
            title: 'Headless CMS experts',
          },
          {
            _key: 'a702e0464874',
            link: '/shopify-hydrogen-agency-experts/',
            title: 'Shopify Hydrogen agency experts ',
          },
          {
            _key: 'fb580f23ac1f',
            link: '/sanity-experts/',
            title: 'Sanity experts',
          },
          {
            _key: '9103a1dfef22',
            link: '/next-js-experts/',
            title: 'NextJS experts',
          },
        ],
        title: 'SERVICES',
      },
    ],
    phone: '+44 208 935 5328',
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FocusReactive - Next.js, Headless CMS and eCommerce expert agency',
  tagline: 'Next.js, Headless CMS and eCommerce expert agency',
  url: 'https://focusreactive.com/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'icons/favicon.png',
  trailingSlash: true,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FocusReactive', // Usually your GitHub org/user name.
  projectName: 'FocusReactiveBlog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemapBlog.xml',
        },
      }),
    ],
  ],
  plugins: ['./plugins/blog-plugin.js'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { disableSwitch: true },
      navbar: {
        items: [
          {
            position: 'left',
            to: 'https://focusreactive.com/',
            className: 'header-logo',
            target: '_self',
          },
          {
            to: 'https://focusreactive.com/',
            label: 'Home',
            position: 'right',
            className: 'header-navbar-link',
            target: '_self',
          },
          {
            to: 'https://focusreactive.com/#services',
            label: 'Services',
            position: 'right',
            className: 'header-navbar-link',
            target: '_self',
          },
          {
            to: 'https://focusreactive.com/#techs',
            label: 'Technologies',
            position: 'right',
            className: 'header-navbar-link',
            target: '_self',
          },
          {
            to: 'https://focusreactive.com/our-work/',
            label: 'Our work',
            position: 'right',
            className: 'header-navbar-link',
            target: '_self',
          },
          {
            to: 'https://focusreactive.com/about/',
            label: 'About',
            position: 'right',
            className: 'header-navbar-link',
            target: '_self',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right',
            className: 'header-navbar-link',
          },
          {
            to: 'https://careers.smartrecruiters.com/FocusReactive',
            label: 'Careers',
            position: 'right',
            className: 'header-navbar-link',
          },
          {
            type: 'custom-ContactUsButton',
            position: 'right',
            to: 'https://focusreactive.com/#mail-us',
            label: 'Contact Us',
          },
        ],
      },
      footer: {
        copyright: mockResponse.footer.copyInfo,
        links: mockResponse.footer.navigation.map((group) => ({
          title: group.title,
          items: group.links.map((link) => ({
            label: link.title,
            to: link.link,
          })),
        })),
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  customFields: {
    /** Footer Fields */
    contactInfo: mockResponse.footer.contactInfo,

    // mail-to-us
    mailToUsTitle: `WHETHER YOU ARE STARTING A NEW PROJECT
    OR FEELING STUCK ON A CURRENT ONE,
    CONTACT US TODAY`,
  },
};

module.exports = config;
