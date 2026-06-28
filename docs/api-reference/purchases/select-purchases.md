---
title: Purchase/Sales Transactions
sidebar_label: Purchase/Sales Transactions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Purchase/Sales Transactions

The **Purchase-Sales Transaction API** retrieves purchase and sales transactions from the RRA EBM system. It provides supplier, invoice, tax, and itemized details for each transaction.

**Endpoint**
```http
POST /selectTrnsPurchaseSalesList
```

---

## Purpose

This API:

*   Retrieves **purchase and sales transactions** for a branch
*   Returns **supplier and item details** for each transaction
*   Supports **reporting and reconciliation** of transaction data

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields documented below.

---

## Request Object: `TrnsPurchaseSalesReq`

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `tin`      | Taxpayer Identification Number | CHAR  | ✅ Yes  | 9      | Buyer's TIN |
| `bhfId`    | Branch ID                     | CHAR  | ✅ Yes  | 2      | Buyer's Branch ID |
| `cmcKey`   | Communication Key             | CHAR  | ✅ Yes  | 255    | Security Key |
| `lastReqDt`| Last Request Date            | CHAR  | ✅ Yes  | 14     | YYYYMMDDhhmmss, fetch recent transactions |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "lastReqDt": "20190524000000"
}
```

---

## Response Object: `TrnsPurchaseSalesRes`

| Field       | Description                   | Type     | Length | Notes                     |
| ----------- | ----------------------------- | -------- | ------ | ------------------------- |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |                           |
| `resultMsg` | Result message                | CHAR     | -      |                           |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss            |
| `data`      | Response data                 | Object   | -      | Contains `saleList` array |

---

### Transaction List (`saleList`)

| Field                   | Description             | Type   | Length | Notes                |
| ----------------------- | ----------------------- | ------ | ------ | -------------------- |
| `spplrTin`              | Supplier TIN            | CHAR   | 9      | —                    |
| `spplrNm`               | Supplier Name           | CHAR   | 60     | —                    |
| `spplrBhfId`            | Supplier Branch ID      | CHAR   | 2      | —                    |
| `spplrInvcNo`           | Supplier Invoice Number | NUMBER | 38     | —                    |
| `rcptTyCd`              | Receipt Type Code       | CHAR   | 5      | —                    |
| `pmtTyCd`               | Payment Type Code       | CHAR   | 5      | —                    |
| `cfmDt`                 | Validated Date          | CHAR   | 19     | YYYY-MM-DD HH24:MI:SS|
| `salesDt`               | Sale Date               | CHAR   | 8      | YYYYMMDD             |
| `stockRlsDt`            | Stock Released Date     | CHAR   | 19     | YYYY-MM-DD HH24:MI:SS|
| `totItemCnt`            | Total Item Count        | NUMBER | 10     | —                    |
| `taxblAmtA`–`taxblAmtD` | Taxable Amounts A–D     | NUMBER | 18,2   | —                    |
| `taxRtA`–`taxRtD`       | Tax Rates A–D           | NUMBER | 7,2    | —                    |
| `taxAmtA`–`taxAmtD`     | Tax Amounts A–D         | NUMBER | 18,2   | —                    |
| `totTaxblAmt`           | Total Taxable Amount    | NUMBER | 18,2   | —                    |
| `totTaxAmt`             | Total Tax Amount        | NUMBER | 18,2   | —                    |
| `totAmt`                | Total Amount            | NUMBER | 18,2   | —                    |
| `remark`                | Remark                  | CHAR   | 400    | —                    |

---

### Transaction Item List (`itemList`)

| Field       | Description              | Type   | Length | Notes |
| ----------- | ------------------------ | ------ | ------ | ----- |
| `itemSeq`   | Item Sequence Number     | NUMBER | 3      | —     |
| `itemClsCd` | Item Classification Code | CHAR   | 10     | —     |
| `itemCd`    | Item Code                | CHAR   | 20     | —     |
| `itemNm`    | Item Name                | CHAR   | 200    | —     |
| `bcd`       | Barcode                  | CHAR   | 20     | —     |
| `pkgUnitCd` | Packaging Unit Code      | CHAR   | 5      | —     |
| `pkg`       | Package Quantity         | NUMBER | 13,2   | —     |
| `qtyUnitCd` | Quantity Unit Code       | CHAR   | 5      | —     |
| `qty`       | Quantity                 | NUMBER | 13,2   | —     |
| `prc`       | Unit Price               | NUMBER | 18,2   | —     |
| `splyAmt`   | Supply Amount            | NUMBER | 18,2   | —     |
| `dcRt`      | Discount Rate            | NUMBER | 5,2    | —     |
| `dcAmt`     | Discount Amount          | NUMBER | 18,2   | —     |
| `taxTyCd`   | Taxation Type Code       | CHAR   | 5      | —     |
| `taxblAmt`  | Taxable Amount           | NUMBER | 18,2   | —     |
| `taxAmt`    | Tax Amount               | NUMBER | 18,2   | —     |
| `totAmt`    | Total Amount             | NUMBER | 18,2   | —     |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226195420",
  "data": {
    "saleList": [
      {
        "spplrTin": "999991111",
        "spplrNm": "Taxpayer1111",
        "spplrBhfId": "00",
        "spplrInvcNo": 2,
        "rcptTyCd": "S",
        "pmtTyCd": "01",
        "cfmDt": "2020-01-27 21:03:00",
        "salesDt": "20200127",
        "stockRlsDt": "2020-01-27 21:03:00",
        "totItemCnt": 2,
        "taxblAmtA": 0,
        "taxblAmtB": 10500,
        "taxblAmtC": 0,
        "taxblAmtD": 0,
        "taxRtA": 0,
        "taxRtB": 18,
        "taxRtC": 0,
        "taxRtD": 0,
        "taxAmtA": 0,
        "taxAmtB": 1602,
        "taxAmtC": 0,
        "taxAmtD": 0,
        "totTaxblAmt": 10500,
        "totTaxAmt": 1602,
        "totAmt": 10500,
        "remark": null,
        "itemList": [
          {
            "itemSeq": 1,
            "itemCd": "RW1NTXU0000001",
            "itemClsCd": "5059690800",
            "itemNm": "test item 1",
            "bcd": null,
            "pkgUnitCd": "NT",
            "pkg": 2,
            "qtyUnitCd": "U",
            "qty": 2,
            "prc": 3500,
            "splyAmt": 7000,
            "dcRt": 0,
            "dcAmt": 0,
            "taxTyCd": "B",
            "taxblAmt": 7000,
            "taxAmt": 1068,
            "totAmt": 7000
          },
          {
            "itemSeq": 2,
            "itemCd": "RW1NTXU0000002",
            "itemClsCd": "5022110801",
            "itemNm": "test item 2",
            "bcd": null,
            "pkgUnitCd": "NT",
            "pkg": 1,
            "qtyUnitCd": "U",
            "qty": 1,
            "prc": 3500,
            "splyAmt": 3500,
            "dcRt": 0,
            "dcAmt": 0,
            "taxTyCd": "B",
            "taxblAmt": 3500,
            "taxAmt": 534,
            "totAmt": 3500
          }
        ]
      }
    ]
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'lastReqDt' => '20190524000000',
];

$response = $client->selectPurchases($requestData);
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const requestData = {
  lastReqDt: '20190524000000'
};

const response = await client.selectPurchases(requestData);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
requestData = {
    'lastReqDt': '20190524000000'
}

response = client.select_purchases(requestData)
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Always include **TIN, Branch ID, and Communication Key** in the request payload.
*   Use `lastReqDt` to fetch only recently updated transactions (incremental sync).
*   Validate `resultCd` before processing data.
*   Handle empty `saleList` if no transactions are found.
*   Note that date fields like `cfmDt` and `stockRlsDt` are returned in `YYYY-MM-DD HH24:MI:SS` format.