/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      className: 'category-as-header getting-started-header',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'index',
          label: 'Introduction',
        },
        'getting-started/requirements',
        'getting-started/vsdc',
        'getting-started/installation',
        'getting-started/configuration',
      ],
    },

    {
      type: 'category',
      label: 'API Reference',
      className: 'category-as-header api-reference-header',
      collapsed: false,
      items: [
        'api-reference/index',
        'api-reference/initialization',
        'api-reference/select-code-list',
        {
          type: 'category',
          label: 'Customers & Branches',
          items: [
            'api-reference/customers/select-customer',
            'api-reference/branches/select-branches',
            'api-reference/branches/save-branch-customer',
            'api-reference/branches/save-branch-user',
            'api-reference/branches/save-branch-insurance',
          ],
        },

        {
          type: 'category',
          label: 'Items',
          items: [
            'api-reference/items/select-item-classes',
            'api-reference/items/select-items',
            'api-reference/items/save-item'
          ],
        },

        {
          type: 'category',
          label: 'Imported Items',
          items: [
            'api-reference/imports/select-imported-items',
            'api-reference/imports/update-imported-item',
          ],
        },

        {
          type: 'category',
          label: 'Purchases & Sales',
          items: [
            'api-reference/purchases/select-purchases',
            'api-reference/purchases/save-purchase',
            'api-reference/purchases/save-sales-transaction',
          ],
        },

        {
          type: 'category',
          label: 'Stock',
          items: [
            'api-reference/stock/select-stock-movement',
            'api-reference/stock/save-stock-io',
            'api-reference/stock/save-stock-master',
          ],
        },
        'api-reference/select-notice-list'
      ],
    },

    {
      type: 'category',
      label: 'Code Definition',
      className: 'category-as-header code-definition-header',
      collapsed: true,
      items: [
        'code-definition/tax-type',
        'code-definition/taxpayer-status',
        'code-definition/product-type',
        'code-definition/countries',
        'code-definition/packaging-unit',
        'code-definition/unit-of-quantity',
        'code-definition/currency',
        'code-definition/transaction-type',
        'code-definition/sales-receipt-type',
        'code-definition/payment-method',
        'code-definition/transaction-progress',
        'code-definition/registration-type',
        'code-definition/purchase-receipt-type',
        'code-definition/stock-in-out',
        'code-definition/import-item-status',
        'code-definition/refund-reason',
        'code-definition/api-response-code',
        'code-definition/item-code',
      ],
    }
  ],
};

module.exports = sidebars;
