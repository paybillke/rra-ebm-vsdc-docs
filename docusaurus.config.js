const devServerPlugin = require('./src/plugins/devServer/index.js');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Paybill',
  tagline: 'Open Source Apps To Grow Your Business.',
  url: 'https://paybill.ke',
  baseUrl: '/docs/rra-ebm-vsdc/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/paybill-favicon.svg',
  organizationName: 'paybillke', // Usually your GitHub org/user name.
  projectName: 'rra-ebm-vsdc-docs', // Usually your repo name.
  themeConfig: {
    image: 'img/paybill-og-image.png',
    announcementBar: {
      id: 'support_us',
      content:
        'Follow our repositories on <a target="_blank" rel="noopener noreferrer" href="https://github.com/paybillke">GitHub</a> to stay updated with new features and contribute to our platform!',
      backgroundColor: '#ECF0FE',
      textColor: '#4368E3',
      isCloseable: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      }
    },
    colorMode: {

    },
    navbar: {
      logo: {
        href: '/docs/rra-ebm-vsdc/',
        alt: 'Paybill Logo',
        src: 'img/docs_logo.svg',
        srcDark: `img/docs_logo_dark.svg`,
        width: 120
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'left',
        },
        {
          href: 'https://www.paybill.ke/',
          position: 'right',
          label: 'Website',
          className: 'navbar-signin',
          'aria-label': 'Visit Paybill Website',
        },
        {
          href: 'https://www.paybill.ke/dashboard',
          position: 'right',
          label: 'Sign in',
          className: 'navbar-signin',
          'aria-label': 'Start Project',
        },
        {
          href: 'https://www.paybill.ke/dashboard',
          position: 'right',
          label: 'Try for free',
          className: 'navbar-website',
          'aria-label': 'Try Paybill for free',
        },
      ],
    },
    footer: {
      style: 'light', 
      logo: {
        alt: 'Paybill Logo',
        src: '/img/docs_logo.svg',
        srcDark: '/img/docs_logo_dark.svg',
      },
      links: [
        {
          title: 'Developers',
          items: [
            { label: 'Blogs', to: 'https://www.paybill.ke/blog' },
            { label: 'Events', to: 'https://www.paybill.ke/events' },
            { label: 'GitHub', href: 'https://github.com/paybillke' }
          ],
        },
        {
          title: 'Contact us',
          items: [
            { label: 'info@paybill.dev', href: 'mailto:info@paybill.dev' },
            { label: 'support@paybill.dev', href: 'mailto:support@paybill.dev' },
            { label: '+254757807150', href: 'tel:+254757807150' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paybill Kenya Limited. All rights reserved.
      <script>
      (function () {
          const hubspotKeys = ['__hstc', '__hssc', '__hsfp'];
          const marketingKeys = ['utm_', '_hs', '_gl', 'li'];
          const exactKeys = ['gclid', '_ga', '_gid', 'msclkid', 'fbclid', 'li_fat_id', 'gbraid'];
          function getStoredParams() {
              const keys = JSON.parse(localStorage.getItem("storedQueryParamsKeys") || "[]");
              const params = {};
              keys.forEach(key => {
                  const val = localStorage.getItem(key);
                  if (val) params[key] = val;
              });
              return params;
          }
          function storeUTMParams() {
              try {
                  const url = new URL(window.location.href);
                  const params = new URLSearchParams(url.search);
                  const storedParams = {};
                  const keysToStore = [];
                  for (const [key, value] of params.entries()) {
                      const isMatch = exactKeys.includes(key) || marketingKeys.some(prefix => key.startsWith(prefix)) || hubspotKeys.includes(key);
                      if (isMatch && value && value !== '[object Object]') {
                        localStorage.setItem(key, value);
                          storedParams[key] = value;
                          keysToStore.push(key);
                      }
                  }
                  if (keysToStore.length > 0) {
                      localStorage.setItem("storedQueryParamsKeys", JSON.stringify(keysToStore));
                  }
              } catch (e) {
                  console.warn('UTM store error:', e);
              }
          }
          function appendTrackingToLinks() {
              const utmParams = getStoredParams();
              const links = document.querySelectorAll('a[href]');
              const allowedDomains = ['paybill.ke'];
              links.forEach(link => {
                  const href = link.getAttribute('href');
                  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                  const tempA = document.createElement('a');
                  tempA.href = href;
                  const isInternal = allowedDomains.some(domain => tempA.hostname.includes(domain));
                  if (!isInternal) return;
                  const linkParams = new URLSearchParams(tempA.search);
                  Object.entries(utmParams).forEach(([key, value]) => {
                      if (!linkParams.has(key)) linkParams.set(key, value);
                  });
                  const newHref = tempA.origin + tempA.pathname + (linkParams.toString() ? '?' + linkParams.toString() : '') + tempA.hash;
                  link.setAttribute('href', newHref);
              });
          }
          // NEW: Function to build URL with stored UTM parameters
          function buildUrlWithStoredParams(baseUrl) {
              try {
                  const storedParams = getStoredParams();
                  if (Object.keys(storedParams).length === 0) {
                      return baseUrl;
                  }
                  const url = new URL(baseUrl, window.location.origin);
                  const urlParams = new URLSearchParams(url.search);
                  // Add stored parameters that don't already exist in the URL
                  Object.entries(storedParams).forEach(([key, value]) => {
                      if (!urlParams.has(key)) {
                          urlParams.set(key, value);
                      }
                  });
                  const finalUrl = url.origin + url.pathname +
                      (urlParams.toString() ? '?' + urlParams.toString() : '') +
                      url.hash;
                  return finalUrl;
              } catch (e) {
                  console.warn('Error building URL with params:', e);
                  return baseUrl;
              }
          }
          function clearStoredUTMParams() {
              try {
                  const storedKeys = JSON.parse(localStorage.getItem("storedQueryParamsKeys") || "[]");
                  storedKeys.forEach(key => {
                      localStorage.removeItem(key);
                  });
                  localStorage.removeItem("storedQueryParamsKeys");
              } catch (e) {
                  console.warn('Error clearing UTM params:', e);
              }
          }
          // Run when the page loads
          window.addEventListener('load', () => {
              clearStoredUTMParams();
              storeUTMParams();
              appendTrackingToLinks();
          });
          // Run before the user leaves the page
          window.addEventListener('beforeunload', () => {
              clearStoredUTMParams();
          });
          // Expose functions for manual use
          window.clearStoredUTMParams = clearStoredUTMParams;
          window.getStoredUTMParams = getStoredParams; // NEW: Access stored params
          window.buildUrlWithStoredParams = buildUrlWithStoredParams; // NEW: Build URLs with UTM params
      })();
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script");
        s1.async=true;
        s1.src='https://embed.tawk.to/6917e66e5781c019591e4f6e/1ja2lo89t';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        document.body.appendChild(s1);
      })();
      </script>      
      `,
    },    
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || 'change_me',
      apiKey: process.env.ALGOLIA_API_KEY || 'development', // Public API key: it is safe to commit it
      indexName: 'paybillke',
      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', ],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl: 'https://github.com/paybillke/rra-ebm-vsdc-docs/blob/develop/',

            // 👇 Single-version setup
            includeCurrentVersion: true,
            lastVersion: 'current',
            versions: {
                current: {
                    label: 'Docs',
                },
            },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [],
          filename: 'sitemap.xml',
        },
        googleTagManager: isProd
          ? {
            containerId: process.env.GTM || 'development',
          }
          : undefined,
      },
    ],
  ],
  plugins: [
    devServerPlugin,
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: '/docs',
          },
        ],
      },
    ],
  ],
};