---
title: Stock Movement
sidebar_label: Stock Movement
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stock Movement

The **Stock Movement API** retrieves stock movement records, including stock in/out transactions and their associated item details.

**Endpoint**

```text
POST /selectStockMoveList
```

---

## Purpose

This API:

- Retrieves stock movement records created or updated after a specified date and time.
- Returns item-level stock movement information, including quantities, pricing, and taxes.
- Supports inventory reconciliation, reporting, and auditing.

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields documented below.

---

## Request Object: `StockMoveReq`

### Request Fields

| Field | Description | Type | Required | Length |
|------|-------------|------|----------|-------:|
| `lastReqDt` | Last request date and time (`YYYYMMDDHHmmss`) | CHAR | ✅ Yes | 14 |

### JSON Request Example

```json
{
  "lastReqDt": "20180524000000"
}
```

---

## Response Object: `StockMoveRes`

### Top-Level Fields

| Field | Description | Type |
|------|-------------|------|
| `resultCd` | Result code (`000` indicates success) | CHAR(3) |
| `resultMsg` | Result message | CHAR |
| `resultDt` | Response date and time | CHAR(14) |

---

### Stock List (`stockList`)

Each entry represents a stock movement transaction.

| Field | Description | Type | Length |
|------|-------------|------|-------:|
| `custTin` | Customer TIN | CHAR | 9 |
| `custBhfId` | Customer Branch ID | CHAR | 2 |
| `sarNo` | Stored and Released Number | NUMBER | 38 |
| `ocrnDt` | Occurred Date (`YYYYMMDD`) | CHAR | 8 |
| `totItemCnt` | Total Item Count | NUMBER | 10 |
| `totTaxblAmt` | Total Supply Price | NUMBER | 18,2 |
| `totTaxAmt` | Total VAT | NUMBER | 18,2 |
| `totAmt` | Total Amount | NUMBER | 18,2 |
| `remark` | Remark | CHAR | 400 |

---

### Stock Item List (`itemList`)

| Field | Description | Type | Length |
|------|-------------|------|-------:|
| `itemSeq` | Item Sequence | NUMBER | 3 |
| `itemClsCd` | Item Class Code | CHAR | 10 |
| `itemCd` | Item Code | CHAR | 20 |
| `itemNm` | Item Name | CHAR | 200 |
| `bcd` | Barcode | CHAR | 20 |
| `pkgUnitCd` | Package Unit Code | CHAR | 5 |
| `pkg` | Package Quantity | NUMBER | 13,2 |
| `qtyUnitCd` | Quantity Unit Code | CHAR | 5 |
| `qty` | Quantity | NUMBER | 13,2 |
| `itemExprDt` | Expiration Date (`YYYYMMDD`) | CHAR | 8 |
| `prc` | Unit Price | NUMBER | 15,2 |
| `splyAmt` | Supply Amount | NUMBER | 18,2 |
| `totDcAmt` | Discount Amount | NUMBER | 18,2 |
| `taxblAmt` | Taxable Amount | NUMBER | 18,2 |
| `taxTyCd` | Tax Type Code | CHAR | 5 |
| `taxAmt` | Tax Amount | NUMBER | 18,2 |
| `totAmt` | Total Amount | NUMBER | 18,2 |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226200723",
  "data": {
    "stockList": [
      {
        "custTin": "999991130",
        "custBhfId": "00",
        "sarNo": 6,
        "ocrnDt": "20200120",
        "totItemCnt": 1,
        "totTaxblAmt": 1800000,
        "totTaxAmt": 274576.27,
        "totAmt": 1800000,
        "remark": null,
        "itemList": [
          {
            "itemSeq": 1,
            "itemCd": "KR2BZX0000001",
            "itemClsCd": "1110162100",
            "itemNm": "Grocery_Item#1",
            "bcd": "8801234567051",
            "pkgUnitCd": "BZ",
            "pkg": 0,
            "qtyUnitCd": "CA",
            "qty": 450,
            "itemExprDt": null,
            "prc": 4000,
            "splyAmt": 1800000,
            "totDcAmt": 0,
            "taxblAmt": 1800000,
            "taxTyCd": "B",
            "taxAmt": 274576.27,
            "totAmt": 1800000
          }
        ]
      }
    ]
  }
}
```

---

## SDK Usage Examples

The SDK automatically includes `tin`, `bhfId`, and `cmcKey`, so only `lastReqDt` needs to be supplied.

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$response = $client->selectStockMovement([
    'lastReqDt' => date('YmdHis', strtotime('-30 days'))
]);

$stockList = $response['data']['stockList'] ?? [];
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.selectStockMovement({
  lastReqDt: '20180524000000'
});

const stockList = response.data?.stockList ?? [];
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
response = client.select_stock_movement({
    "lastReqDt": "20180524000000"
})

stock_list = response.get("data", {}).get("stockList", [])
```

  </TabItem>
</Tabs>

---

## Best Practices

- Provide `lastReqDt` to retrieve only newly created or updated stock movements.
- Verify that the request completed successfully by checking `resultCd`.
- Handle an empty `stockList` when no stock movements match the requested date.
- Use the item list to reconcile inventory movements and audit stock transactions.
- Validate package unit, quantity unit, and tax type codes against the published RRA code lists.