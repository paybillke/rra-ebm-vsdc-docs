---
title: Save Sales Transaction
sidebar_label: Save Sales Transaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Sales Transaction

The **Sales Transaction Save API** registers a sales transaction in the RRA EBM system. It captures invoice details, customer information, payment, tax amounts, and itemized sale records.

**Endpoint**
```http
POST /saveTrnsSalesVsdc
```

---

## Purpose

This API:

*   Saves a **sales transaction** with header, receipt, and itemized details
*   Supports **tax calculation, discounts, and optional insurance**
*   Returns a receipt reference (`curRcptNo`) and internal control data upon success

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields documented below.

---

## Request Object: `TrnsSalesSaveWrReq`

### Authentication & Header Fields

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `tin`      | Taxpayer Identification Number | CHAR  | ✅ Yes  | 9      | Seller's TIN |
| `bhfId`    | Branch ID                     | CHAR  | ✅ Yes  | 2      | Seller's Branch ID |
| `cmcKey`   | Communication Key             | CHAR  | ✅ Yes  | 255    | Security Key |
| `invcNo`   | Invoice Number                | NUMBER| ✅ Yes  | 38     | Unique Invoice Number |
| `orgInvcNo`| Original Invoice Number       | NUMBER| ✅ Yes  | 38     | 0 for new invoices |
| `custTin`  | Customer TIN                  | CHAR  | ❌ No   | 9      | Optional |
| `custNm`   | Customer Name                 | CHAR  | ❌ No   | 60     |       |
| `rcptTyCd` | Receipt Type Code             | CHAR  | ✅ Yes  | 5      | See Sale Receipt Type |
| `pmtTyCd`  | Payment Type Code             | CHAR  | ❌ No   | 5      | See Payment Method |
| `salesSttsCd`| Invoice Status Code         | CHAR  | ✅ Yes  | 5      | See Transaction Progress |
| `cfmDt`    | Validated Date                | CHAR  | ✅ Yes  | 14     | YYYYMMDDhhmmss |
| `salesDt`  | Sale Date                     | CHAR  | ✅ Yes  | 8      | YYYYMMDD |
| `stockRlsDt`| Stock Released Date          | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `cnclReqDt`| Cancel Requested Date        | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `cnclDt`   | Canceled Date                | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `rfdDt`    | Refunded Date                | CHAR  | ❌ No   | 14     | YYYYMMDDhhmmss |
| `rfdRsnCd` | Refund Reason Code           | CHAR  | ❌ No   | 5      | See Refund Reason |
| `totItemCnt`| Total Item Count            | NUMBER| ✅ Yes  | 10     |       |

### Tax Summary Fields (Header)

RRA supports Tax Categories A through D.

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `taxblAmtA`..`taxblAmtD` | Taxable Amounts A–D | NUMBER | ✅ Yes | 18,2 |       |
| `taxRtA`..`taxRtD`       | Tax Rates A–D     | NUMBER | ✅ Yes | 7,2  |       |
| `taxAmtA`..`taxAmtD`     | Tax Amounts A–D   | NUMBER | ✅ Yes | 18,2 |       |
| `totTaxblAmt` | Total Taxable Amount      | NUMBER | ✅ Yes | 18,2 |       |
| `totTaxAmt`   | Total Tax Amount           | NUMBER | ✅ Yes | 18,2 |       |
| `totAmt`      | Total Amount               | NUMBER | ✅ Yes | 18,2 |       |

### General Fields

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `prchrAcptcYn`| Purchase Accept Y/N        | CHAR   | ✅ Yes | 1    | 'Y' or 'N' |
| `remark`      | Optional remark            | CHAR   | ❌ No  | 400   |       |
| `regrId`      | Registration ID            | CHAR   | ✅ Yes | 20    |       |
| `regrNm`      | Registration Name          | CHAR   | ✅ Yes | 60    |       |
| `modrId`      | Modifier ID                | CHAR   | ✅ Yes | 20    |       |
| `modrNm`      | Modifier Name              | CHAR   | ✅ Yes | 60    |       |

---

### Request Fields (Receipt & Items)

**Receipt Object (`receipt`)**

| Field       | Description                  | Type   | Required | Length | Notes |
|------------|-------------------------------|-------|---------|--------|-------|
| `custTin`  | Customer TIN                 | CHAR  | ❌ No   | 9      |       |
| `custMblNo`| Customer Mobile Number       | CHAR  | ❌ No   | 20     |       |
| `rcptPbctDt`| Receipt Published Date      | CHAR  | ✅ Yes  | 14     | YYYYMMDDhhmmss |
| `trdeNm`   | Trader Name                  | CHAR  | ❌ No   | 20     |       |
| `adrs`     | Address                      | CHAR  | ❌ No   | 200    |       |
| `topMsg`   | Top Message                  | CHAR  | ❌ No   | 20     |       |
| `btmMsg`   | Bottom Message               | CHAR  | ❌ No   | 20     |       |
| `prchrAcptcYn`| Purchase Accept Y/N       | CHAR  | ✅ Yes  | 1      |       |

**Item List (`itemList`)**

| Field        | Description                  | Type   | Required | Length | Notes |
|-------------|-------------------------------|-------|---------|--------|-------|
| `itemSeq`   | Item Sequence Number          | NUMBER| ✅ Yes  | 3      |       |
| `itemClsCd` | Item Code                     | CHAR  | ❌ No   | 10     |       |
| `itemCd`    | Item Classification Code      | CHAR  | ✅ Yes  | 20     |       |
| `itemNm`    | Item Name                     | CHAR  | ✅ Yes  | 200    |       |
| `bcd`       | Barcode                       | CHAR  | ❌ No   | 20     |       |
| `pkgUnitCd` | Packaging Unit Code            | CHAR  | ✅ Yes  | 5      | See Packaging Unit |
| `pkg`       | Package Quantity               | NUMBER| ✅ Yes  | 13,2   |       |
| `qtyUnitCd` | Quantity Unit Code             | CHAR  | ✅ Yes  | 5      | See Unit of Quantity |
| `qty`       | Quantity                       | NUMBER| ✅ Yes  | 13,2   |       |
| `prc`       | Unit Price                     | NUMBER| ✅ Yes  | 18,2   |       |
| `splyAmt`   | Supply Amount                  | NUMBER| ✅ Yes  | 18,2   |       |
| `dcRt`      | Discount Rate                  | NUMBER| ✅ Yes  | 5,2    |       |
| `dcAmt`     | Discount Amount                | NUMBER| ✅ Yes  | 18,2   |       |
| `isrccCd`   | Insurance Company Code         | CHAR  | ❌ No   | 10     |       |
| `isrccNm`   | Insurance Company Name         | CHAR  | ❌ No   | 100    |       |
| `isrcRt`    | Insurance Rate                 | NUMBER| ❌ No   | 3      |       |
| `isrcAmt`   | Insurance Amount               | NUMBER| ❌ No   | 18,2   |       |
| `taxTyCd`   | Taxation Type Code             | CHAR  | ✅ Yes  | 5      | See Tax Type |
| `taxblAmt`  | Taxable Amount                 | NUMBER| ✅ Yes  | 18,2   |       |
| `totTaxAmt` | Tax Amount                     | NUMBER| ✅ Yes  | 18,2   |       |
| `totAmt`    | Total Amount                   | NUMBER| ✅ Yes  | 18,2   |       |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "invcNo": 1,
  "orgInvcNo": 0,
  "custTin": "999991112",
  "custNm": "Taxpayer1112",
  "salesTyCd": "N",
  "rcptTyCd": "S",
  "pmtTyCd": "01",
  "salesSttsCd": "02",
  "cfmDt": "20200127210300",
  "salesDt": "20200127",
  "stockRlsDt": "20200127210300",
  "cnclReqDt": null,
  "cnclDt": null,
  "rfdDt": null,
  "rfdRsnCd": null,
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
  "prchrAcptcYn": "N",
  "remark": null,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test",
  "receipt": {
    "custTin": null,
    "custMblNo": null,
    "rcptPbctDt": "20201118120300",
    "trdeNm": null,
    "adrs": null,
    "topMsg": null,
    "btmMsg": null,
    "prchrAcptcYn": "N"
  },
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
      "isrccCd": null,
      "isrccNm": null,
      "isrcRt": null,
      "isrcAmt": null,
      "taxTyCd": "B",
      "taxblAmt": 7000,
      "totTaxAmt": 1068,
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
      "isrccCd": null,
      "isrccNm": null,
      "isrcRt": null,
      "isrcAmt": null,
      "taxTyCd": "B",
      "taxblAmt": 3500,
      "totTaxAmt": 534,
      "totAmt": 3500
    }
  ]
}
```

---

## Response Object: `TrnsSalesSaveWrRes`

| Field       | Description                   | Type     | Length | Notes          |
| ----------- | ----------------------------- | -------- | ------ | -------------- |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |                |
| `resultMsg` | Result message                | CHAR     | -      |                |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | See below      |

**Response Data**

| Field         | Description            | Type   | Length |
| ------------- | ---------------------- | ------ | ------ |
| `curRcptNo`   | Current Receipt Number | NUMBER | 10     |
| `totRcptNo`   | Total Receipt Number   | NUMBER | 10     |
| `intrlData`   | Internal Data          | CHAR   | 26     |
| `rcptSign`    | Receipt Signature      | CHAR   | 16     |
| `sdcDateTime` | SDC Date Time          | CHAR   | 14     | YYYYMMDDhhmmss |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194328",
  "data": {
    "curRcptNo": "1",
    "totRcptNo": "1",
    "intrlData": "EAHSAV6ECUUXSY6PCCJYAUP6MI",
    "rcptSign": "QUII27MATATSHFRB",
    "sdcDateTime": "20210502115145"
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'invcNo'       => 1,
    'orgInvcNo'    => 0,
    'custTin'      => '999991112',
    'custNm'       => 'Taxpayer1112',
    'salesTyCd'    => 'N',
    'rcptTyCd'     => 'S',
    'pmtTyCd'      => '01',
    'salesSttsCd'  => '02',
    'cfmDt'        => '20200127210300',
    'salesDt'      => '20200127',
    'totItemCnt'   => 2,
    'taxblAmtA'    => 0,
    'taxblAmtB'    => 10500,
    'taxblAmtC'    => 0,
    'taxblAmtD'    => 0,
    'taxRtA'       => 0,
    'taxRtB'       => 18,
    'taxRtC'       => 0,
    'taxRtD'       => 0,
    'taxAmtA'      => 0,
    'taxAmtB'      => 1602,
    'taxAmtC'      => 0,
    'taxAmtD'      => 0,
    'totTaxblAmt'  => 10500,
    'totTaxAmt'    => 1602,
    'totAmt'       => 10500,
    'prchrAcptcYn' => 'N',
    'regrId'       => 'Test',
    'regrNm'       => 'Test',
    'modrId'       => 'Test',
    'modrNm'       => 'Test',
    'receipt' => [
        'custTin'      => null,
        'rcptPbctDt'   => '20201118120300',
        'prchrAcptcYn' => 'N'
    ],
    'itemList' => [
        [
            'itemSeq'    => 1,
            'itemCd'     => 'RW1NTXU0000001',
            'itemClsCd'  => '5059690800',
            'itemNm'     => 'test item 1',
            'pkgUnitCd'  => 'NT',
            'pkg'        => 2,
            'qtyUnitCd'  => 'U',
            'qty'        => 2,
            'prc'        => 3500,
            'splyAmt'    => 7000,
            'dcRt'       => 0,
            'dcAmt'      => 0,
            'taxTyCd'    => 'B',
            'taxblAmt'   => 7000,
            'totTaxAmt'  => 1068,
            'totAmt'     => 7000
        ]
    ]
];

$response = $client->saveSalesTransaction($requestData);
```

  </TabItem>
  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const requestData = {
  invcNo: 1,
  orgInvcNo: 0,
  custTin: '999991112',
  custNm: 'Taxpayer1112',
  salesTyCd: 'N',
  rcptTyCd: 'S',
  pmtTyCd: '01',
  salesSttsCd: '02',
  cfmDt: '20200127210300',
  salesDt: '20200127',
  totItemCnt: 2,
  taxblAmtA: 0,
  taxblAmtB: 10500,
  taxblAmtC: 0,
  taxblAmtD: 0,
  taxRtA: 0,
  taxRtB: 18,
  taxRtC: 0,
  taxRtD: 0,
  taxAmtA: 0,
  taxAmtB: 1602,
  taxAmtC: 0,
  taxAmtD: 0,
  totTaxblAmt: 10500,
  totTaxAmt: 1602,
  totAmt: 10500,
  prchrAcptcYn: 'N',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
  receipt: {
    custTin: null,
    rcptPbctDt: '20201118120300',
    prchrAcptcYn: 'N'
  },
  itemList: [
    {
      itemSeq: 1,
      itemCd: 'RW1NTXU0000001',
      itemClsCd: '5059690800',
      itemNm: 'test item 1',
      pkgUnitCd: 'NT',
      pkg: 2,
      qtyUnitCd: 'U',
      qty: 2,
      prc: 3500,
      splyAmt: 7000,
      dcRt: 0,
      dcAmt: 0,
      taxTyCd: 'B',
      taxblAmt: 7000,
      totTaxAmt: 1068,
      totAmt: 7000
    }
  ]
};

const response = await client.saveSalesTransaction(requestData);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
requestData = {
    'invcNo': 1,
    'orgInvcNo': 0,
    'custTin': '999991112',
    'custNm': 'Taxpayer1112',
    'salesTyCd': 'N',
    'rcptTyCd': 'S',
    'pmtTyCd': '01',
    'salesSttsCd': '02',
    'cfmDt': '20200127210300',
    'salesDt': '20200127',
    'totItemCnt': 2,
    'taxblAmtA': 0,
    'taxblAmtB': 10500,
    'taxblAmtC': 0,
    'taxblAmtD': 0,
    'taxRtA': 0,
    'taxRtB': 18,
    'taxRtC': 0,
    'taxRtD': 0,
    'taxAmtA': 0,
    'taxAmtB': 1602,
    'taxAmtC': 0,
    'taxAmtD': 0,
    'totTaxblAmt': 10500,
    'totTaxAmt': 1602,
    'totAmt': 10500,
    'prchrAcptcYn': 'N',
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
    'receipt': {
        'custTin': None,
        'rcptPbctDt': '20201118120300',
        'prchrAcptcYn': 'N'
    },
    'itemList': [
        {
            'itemSeq': 1,
            'itemCd': 'RW1NTXU0000001',
            'itemClsCd': '5059690800',
            'itemNm': 'test item 1',
            'pkgUnitCd': 'NT',
            'pkg': 2,
            'qtyUnitCd': 'U',
            'qty': 2,
            'prc': 3500,
            'splyAmt': 7000,
            'dcRt': 0,
            'dcAmt': 0,
            'taxTyCd': 'B',
            'taxblAmt': 7000,
            'totTaxAmt': 1068,
            'totAmt': 7000
        }
    ]
}

response = client.save_sales_transaction(requestData)
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Ensure **TIN, Branch ID, and Communication Key** are correctly configured.
*   Validate **tax and discount calculations** before saving.
*   Handle non-`000` result codes gracefully.
*   Confirm receipt and control unit references are stored for audit.

---

## Next Steps

*   👉 **[Customer Search](../customers/select-customer)**
*   👉 **[Item Search](../items/select-items)**
*   👉 **[Purchases & Stock](../purchases/select-purchases)**