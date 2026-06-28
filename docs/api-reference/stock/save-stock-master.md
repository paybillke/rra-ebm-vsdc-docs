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
POST /saveStockMaster
```

---

## Purpose

This API:

- Creates or updates stock master information for a branch.
- Updates the remaining quantity of an item.
- Records registration and modification information.

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `StockMasterSaveReq`

| Field | Description | Type | Required | Length |
|------|-------------|------|----------|-------:|
| `itemCd` | Item Code | CHAR | ✅ Yes | 20 |
| `rsdQty` | Remaining Quantity | NUMBER | ✅ Yes | 13,2 |
| `regrId` | Registration ID | CHAR | ✅ Yes | 20 |
| `regrNm` | Registration Name | CHAR | ✅ Yes | 60 |
| `modrId` | Modifier ID | CHAR | ✅ Yes | 20 |
| `modrNm` | Modifier Name | CHAR | ✅ Yes | 60 |

### JSON Request Example

```json
{
  "itemCd": "RW1NTXU0000002",
  "rsdQty": 10,
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
```

---

## Response Object: `StockMasterSaveRes`

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
$response = $client->saveStockMaster([
    'itemCd' => 'RW1NTXU0000002',
    'rsdQty' => 10,
    'regrId' => 'Test',
    'regrNm' => 'Test',
    'modrId' => 'Test',
    'modrNm' => 'Test',
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
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(response.resultMsg);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
response = client.save_stock_master({
    "itemCd": "RW1NTXU0000002",
    "rsdQty": 10,
    "regrId": "Test",
    "regrNm": "Test",
    "modrId": "Test",
    "modrNm": "Test",
})

if response.get("resultCd") == "000":
    print("Stock master saved successfully.")
```

  </TabItem>
</Tabs>

---

## Best Practices

- Ensure `itemCd` references an existing item.
- Keep the remaining quantity (`rsdQty`) synchronized with your inventory records.
- Use consistent registration and modifier information for audit purposes.
- Verify that the request completed successfully by checking `resultCd`.
