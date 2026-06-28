---
title: Save Item
sidebar_label: Save Item
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Item

The **Save Item API** is used to **register or update product master data** in the **RRA EBM system**.

Each item represents a **sellable or purchasable product** and must be registered before it can be used in:

- Sales transactions
- Purchase transactions
- Inventory management
- Tax calculations

**Endpoint**
```http
POST /saveItem
```

---

## Purpose

This API allows you to:

- Register new items in EBM
- Update existing item information
- Assign tax types, units, and pricing
- Control item availability (active / inactive)

> ⚠️ Items must reference **valid classification, unit, tax, and nation codes** obtained from the **Code Lists** and **Item Classifications** APIs.

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `ItemSaveReq`

### Authentication & Request Fields

| Field         | Description                  | Type   | Required | Length | Notes |
|---------------|------------------------------|--------|----------|--------|-------|
| `tin`         | Taxpayer Identification Number | CHAR   | ✅ Yes   | 9      |       |
| `bhfId`       | Branch ID                    | CHAR   | ✅ Yes   | 2      |       |
| `cmcKey`      | Communication Key            | CHAR   | ✅ Yes   | 255    |       |
| `itemClsCd`   | Item Classification Code     | CHAR   | ✅ Yes   | 10     |       |
| `itemCd`      | Item Code                    | CHAR   | ✅ Yes   | 20     | See Item Code rules |
| `itemTyCd`    | Item Type Code               | CHAR   | ✅ Yes   | 5      | See Product Type |
| `itemNm`      | Item Name                    | CHAR   | ✅ Yes   | 200    |       |
| `itemStdNm`   | Item Standard Name           | CHAR   | ❌ No    | 200    |       |
| `orgnNatCd`   | Origin Nation Code           | CHAR   | ✅ Yes   | 5      | See Nation Codes |
| `pkgUnitCd`   | Packaging Unit Code          | CHAR   | ✅ Yes   | 5      | See Packaging Unit |
| `qtyUnitCd`   | Quantity Unit Code           | CHAR   | ✅ Yes   | 5      | See Unit of Quantity |
| `taxTyCd`     | Taxation Type Code           | CHAR   | ✅ Yes   | 5      | See Tax Type |
| `btchNo`      | Batch Number                 | CHAR   | ❌ No    | 10     |       |
| `bcd`         | Barcode                      | CHAR   | ❌ No    | 20     |       |
| `dftPrc`      | Default Unit Price           | NUMBER | ✅ Yes   | 18,2   |       |
| `grpPrcL1`    | Group 1 Unit Price           | NUMBER | ❌ No    | 18,2   |       |
| `grpPrcL2`    | Group 2 Unit Price           | NUMBER | ❌ No    | 18,2   |       |
| `grpPrcL3`    | Group 3 Unit Price           | NUMBER | ❌ No    | 18,2   |       |
| `grpPrcL4`    | Group 4 Unit Price           | NUMBER | ❌ No    | 18,2   |       |
| `grpPrcL5`    | Group 5 Unit Price           | NUMBER | ❌ No    | 18,2   |       |
| `addInfo`     | Additional Information       | CHAR   | ❌ No    | 7      |       |
| `sftyQty`     | Safety Quantity              | NUMBER | ❌ No    | 13,2   |       |
| `isrcAplcbYn` | Insurance Applicable (Y/N)   | CHAR   | ✅ Yes   | 1      |       |
| `useYn`       | Active Status (Y/N)          | CHAR   | ✅ Yes   | 1      |       |
| `regrId`      | Registration ID              | CHAR   | ✅ Yes   | 20     |       |
| `regrNm`      | Registration Name            | CHAR   | ✅ Yes   | 60     |       |
| `modrId`      | Modifier ID                  | CHAR   | ✅ Yes   | 20     |       |
| `modrNm`      | Modifier Name                | CHAR   | ✅ Yes   | 60     |       |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "itemCd": "RW1NTXU0000006",
  "itemClsCd": "5059690800",
  "itemTyCd": "1",
  "itemNm": "test material item3",
  "itemStdNm": null,
  "orgnNatCd": "RW",
  "pkgUnitCd": "NT",
  "qtyUnitCd": "U",
  "taxTyCd": "B",
  "btchNo": null,
  "bcd": null,
  "dftPrc": 3500,
  "grpPrcL1": 3500,
  "grpPrcL2": 3500,
  "grpPrcL3": 3500,
  "grpPrcL4": 3500,
  "grpPrcL5": null,
  "addInfo": null,
  "sftyQty": null,
  "isrcAplcbYn": "N",
  "useYn": "Y",
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
```

---

## Response Object: `ItemSaveRes`

### Response Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result Code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result Message                | CHAR     | -      |
| `resultDt`  | Result Timestamp              | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Usually null |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193918",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
item_data = {
    'itemCd': 'RW1NTXU0000006',
    'itemClsCd': '5059690800',
    'itemTyCd': '1',
    'itemNm': 'test material item3',
    'itemStdNm': None,
    'orgnNatCd': 'RW',
    'pkgUnitCd': 'NT',
    'qtyUnitCd': 'U',
    'taxTyCd': 'B',
    'dftPrc': 3500,
    'isrcAplcbYn': 'N',
    'useYn': 'Y',
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
}

response = client.save_item(item_data)

print("Result Code:", response.get('resultCd'))
print("Result Message:", response.get('resultMsg'))
print("Result Date:", response.get('resultDt'))
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.saveItem({
  itemCd: `RW1NTXU${Date.now()}`,
  itemClsCd: '5059690800',
  itemTyCd: '1',
  itemNm: `Test Item ${Date.now()}`,
  orgnNatCd: 'RW',
  pkgUnitCd: 'NT',
  qtyUnitCd: 'U',
  taxTyCd: 'B',
  dftPrc: 3500,
  isrcAplcbYn: 'N',
  useYn: 'Y',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(`✅ Item saved: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'itemCd'      => 'RW1NTXU0000006',
    'itemClsCd'   => '5059690800',
    'itemTyCd'    => '1',
    'itemNm'      => 'test material item3',
    'orgnNatCd'   => 'RW',
    'pkgUnitCd'   => 'NT',
    'qtyUnitCd'   => 'U',
    'taxTyCd'     => 'B',
    'dftPrc'      => 3500,
    'isrcAplcbYn' => 'N',
    'useYn'       => 'Y',
    'regrId'      => 'Test',
    'regrNm'      => 'Test',
    'modrId'      => 'Test',
    'modrNm'      => 'Test',
];

$response = $client->saveItem($requestData);

echo "Result Code: {$response['resultCd']}\n";
echo "Result Message: {$response['resultMsg']}\n";
echo "Result Date: {$response['resultDt']}\n";
```

  </TabItem>
</Tabs>

---

## Best Practices

* Generate **unique item codes** (typically prefixed with your country code, e.g., `RW`).
* Validate all reference codes (Classification, Units, Tax Types, Nations) before saving.
* Cache item master data locally to reduce API calls.
* Do not delete items — set `useYn = 'N'` instead to maintain historical transaction integrity.

