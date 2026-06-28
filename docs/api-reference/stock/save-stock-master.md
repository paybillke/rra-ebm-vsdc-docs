---
title: Save Stock Master
sidebar_label: Save Stock Master
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Stock Master

The **Save Stock Master API** registers or updates stock master information for an item, including its remaining quantity.

**Endpoint**

```text
POST /stockMaster/saveStockMaster
```

---

## Purpose

This API:

- Creates or updates stock master information for a branch.
- Updates the remaining quantity of an item.
- Records registration and modification information.

> ℹ️ The RRA API requires `tin` and `bhfId` with every request. Ensure your VSDC is properly registered and authenticated before making this call.

---

## Request Object: `StockMstSaveReq`

| Field | Description | Type | Required | Length |
|------|-------------|------|----------|-------:|
| `tin` | Taxpayer Identification Number | CHAR | ✅ Yes | 9 |
| `bhfId` | Branch ID | CHAR | ✅ Yes | 2 |
| `itemCd` | Item Code | CHAR | ✅ Yes | 20 |
| `rsdQty` | Remaining Quantity | NUMBER | ✅ Yes | 13,2 |
| `regrNm` | Registrant Name | CHAR | ✅ Yes | 60 |
| `regrId` | Registrant ID | CHAR | ✅ Yes | 20 |
| `modrNm` | Modifier Name | CHAR | ✅ Yes | 60 |
| `modrId` | Modifier ID | CHAR | ✅ Yes | 20 |

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "itemCd": "RW1NTXU0000002",
  "rsdQty": 10,
  "regrId": "Admin",
  "regrNm": "Admin",
  "modrNm": "Admin",
  "modrId": "Admin"
}
```

---

## Response Object: `StockMstSaveRes`

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
  "resultDt": "20200226195637",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
// Assuming $client is your configured VSDC API client
$response = $client->saveStockMaster([
    'itemCd' => 'RW1NTXU0000002',
    'rsdQty' => 10,
    'regrId' => 'Admin',
    'regrNm' => 'Admin',
    'modrId' => 'Admin',
    'modrNm' => 'Admin',
]);

if (($response['resultCd'] ?? '') === '000') {
    echo "Stock master saved successfully." . PHP_EOL;
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.saveStockMaster({
  itemCd: 'RW1NTXU0000002',
  rsdQty: 10,
  regrId: 'Admin',
  regrNm: 'Admin',
  modrId: 'Admin',
  modrNm: 'Admin',
});

console.log(response.resultMsg);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
response = client.save_stock_master({
    "itemCd": "RW1NTXU0000002",
    "rsdQty": 10,
    "regrId": "Admin",
    "regrNm": "Admin",
    "modrId": "Admin",
    "modrNm": "Admin",
})

if response.get("resultCd") == "000":
    print("Stock master saved successfully.")
```

  </TabItem>
</Tabs>

---

## Best Practices

- Ensure `itemCd` references an existing item in your item master list.
- Keep the remaining quantity (`rsdQty`) synchronized with your physical inventory records.
- Use consistent and accurate registration (`regr`) and modifier (`modr`) information for audit purposes.
- Verify that the request completed successfully by checking that `resultCd` is `000`.
