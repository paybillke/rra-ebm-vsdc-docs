---
title: Stock In/Out
sidebar_label: Stock In/Out
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stock In/Out

The **Stock In/Out API** records stock movement transactions for inventory entering or leaving a branch.

**Endpoint**

```text
POST /stock/saveStockItems
```

---

## Purpose

This API:

- Records stock in/out transactions.
- Updates inventory movement at the item level.
- Captures pricing, tax, and quantity information for inventory reconciliation and reporting.

> ℹ️ The RRA API requires `tin` and `bhfId` with every request. Ensure your VSDC is properly registered and authenticated before making this call.

---

## Request Object: `StockIOSaveReq`

### Request Fields

| Field | Description | Type | Required | Length | Notes |
|------|-------------|------|----------|-------:|------|
| `tin` | Taxpayer Identification Number | CHAR | ✅ Yes | 9 | |
| `bhfId` | Branch ID | CHAR | ✅ Yes | 2 | |
| `sarNo` | Stored and Released Number | NUMBER | ✅ Yes | 38 | Unique identifier for this transaction |
| `orgSarNo` | Original Stored and Released Number | NUMBER | ✅ Yes | 38 | Usually same as `sarNo` for new entries |
| `regTyCd` | Registration Type Code | CHAR | ✅ Yes | 5 | See **Registration Type** |
| `custTin` | Customer TIN | CHAR | ❌ No | 9 | Required if transferring to another taxpayer |
| `custNm` | Customer Name | CHAR | ❌ No | 100 | |
| `custBhfId` | Customer Branch ID | CHAR | ❌ No | 2 | |
| `sarTyCd` | Stock In/Out Type Code | CHAR | ✅ Yes | 5 | See **Stock In/Out Type** |
| `ocrnDt` | Occurred Date (`YYYYMMDD`) | CHAR | ✅ Yes | 8 | Date the movement actually happened |
| `totItemCnt` | Total Item Count | NUMBER | ✅ Yes | 10 | Number of distinct items in `itemList` |
| `totTaxblAmt` | Total Supply Price | NUMBER | ✅ Yes | 18,2 | Sum of taxable amounts |
| `totTaxAmt` | Total VAT | NUMBER | ✅ Yes | 18,2 | Sum of tax amounts |
| `totAmt` | Total Amount | NUMBER | ✅ Yes | 18,2 | Sum of total amounts |
| `remark` | Remark | CHAR | ❌ No | 400 | |
| `regrId` | Registration ID | CHAR | ✅ Yes | 20 | |
| `regrNm` | Registration Name | CHAR | ✅ Yes | 60 | |
| `modrId` | Modifier ID | CHAR | ✅ Yes | 20 | |
| `modrNm` | Modifier Name | CHAR | ✅ Yes | 60 | |

---

### Stock Item List (`itemList`)

| Field | Description | Type | Required | Length | Notes |
|------|-------------|------|----------|-------:|------|
| `itemSeq` | Item Sequence | NUMBER | ✅ Yes | 3 | Sequential number (1, 2, 3...) |
| `itemCd` | Item Code | CHAR | ❌ No | 20 | |
| `itemClsCd` | Item Class Code | CHAR | ✅ Yes | 10 | |
| `itemNm` | Item Name | CHAR | ✅ Yes | 200 | |
| `bcd` | Barcode | CHAR | ❌ No | 20 | |
| `pkgUnitCd` | Package Unit Code | CHAR | ✅ Yes | 5 | See **Packaging Unit** |
| `pkg` | Package Quantity | NUMBER | ✅ Yes | 13,2 | |
| `qtyUnitCd` | Quantity Unit Code | CHAR | ✅ Yes | 5 | See **Quantity Unit** |
| `qty` | Quantity | NUMBER | ✅ Yes | 13,2 | |
| `itemExprDt` | Expiration Date (`YYYYMMDD`) | CHAR | ❌ No | 8 | |
| `prc` | Unit Price | NUMBER | ✅ Yes | 15,2 | |
| `splyAmt` | Supply Amount | NUMBER | ✅ Yes | 18,2 | |
| `totDcAmt` | Discount Amount | NUMBER | ✅ Yes | 18,2 | |
| `taxblAmt` | Taxable Amount | NUMBER | ✅ Yes | 18,2 | |
| `taxTyCd` | Tax Type Code | CHAR | ✅ Yes | 5 | See **Tax Type** |
| `taxAmt` | Tax Amount | NUMBER | ✅ Yes | 18,2 | |
| `totAmt` | Total Amount | NUMBER | ✅ Yes | 18,2 | |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "sarNo": 2,
  "orgSarNo": 2,
  "regTyCd": "M",
  "custTin": null,
  "custNm": null,
  "custBhfId": null,
  "sarTyCd": "11",
  "ocrnDt": "20200126",
  "totItemCnt": 2,
  "totTaxblAmt": 70000,
  "totTaxAmt": 12000,
  "totAmt": 70000,
  "remark": null,
  "regrId": "Admin",
  "regrNm": "Admin",
  "modrId": "Admin",
  "modrNm": "Admin",
  "itemList": [
    {
      "itemSeq": 1,
      "itemCd": "RW1NTXU0000001",
      "itemClsCd": "5059690800",
      "itemNm": "test item 1",
      "bcd": null,
      "pkgUnitCd": "NI",
      "pkg": 10,
      "qtyUnitCd": "U",
      "qty": 10,
      "itemExprDt": null,
      "prc": 3500,
      "splyAmt": 35000,
      "totDcAmt": 0,
      "taxblAmt": 35000,
      "taxTyCd": "B",
      "taxAmt": 6000,
      "totAmt": 35000
    },
    {
      "itemSeq": 2,
      "itemCd": "RW1NTXU0000002",
      "itemClsCd": "5059690800",
      "itemNm": "test item 2",
      "bcd": null,
      "pkgUnitCd": "NI",
      "pkg": 10,
      "qtyUnitCd": "U",
      "qty": 10,
      "itemExprDt": null,
      "prc": 3500,
      "splyAmt": 35000,
      "totDcAmt": 0,
      "taxblAmt": 35000,
      "taxTyCd": "B",
      "taxAmt": 6000,
      "totAmt": 35000
    }
  ]
}
```

---

## Response Object: `StockIOSaveRes`

| Field | Description | Type |
|------|-------------|------|
| `resultCd` | Result code (`000` indicates success) | CHAR(3) |
| `resultMsg` | Result message | CHAR |
| `resultDt` | Response date and time | CHAR(14) |
| `data` | Response data (`null` for this API) | Object |

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226195801",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$response = $client->saveStockIO($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "Stock In/Out saved successfully." . PHP_EOL;
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.saveStockIO(stockIOData);

console.log(response.resultMsg);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
response = client.save_stock_io(stock_io_data)

if response.get("resultCd") == "000":
    print("Stock In/Out saved successfully.")
```

  </TabItem>
</Tabs>

---

## Best Practices

- **Verify Success:** Always check that `resultCd` is `000` to confirm the transaction was recorded.
- **Mathematical Accuracy:** Ensure that `totTaxblAmt`, `totTaxAmt`, and `totAmt` exactly match the sum of the corresponding fields in the `itemList`.
- **Valid Codes:** Use valid codes for `sarTyCd` (Stock In/Out Type), `regTyCd` (Registration Type), `taxTyCd` (Tax Type), `pkgUnitCd`, and `qtyUnitCd`.
- **Inventory Sync:** Keep your local inventory quantities synchronized with the results of these stock movement transactions.
- **Date Accuracy:** Set `ocrnDt` to the actual date the stock movement occurred, not necessarily the current system date.

