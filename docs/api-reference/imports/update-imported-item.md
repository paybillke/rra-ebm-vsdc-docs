---
title: Update Import Item Status (VSDC)
sidebar_label: Update Import Item Status
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Import Item Status

The **Update Import Item Status API** updates details of an imported item in the RRA EBM system via the VSDC interface, such as status, classification, or remarks. This is commonly used to **modify import item records** after initial entry.

**Endpoint**

```http
POST /imports/updateImportItems
```

---

## Purpose

This API:

*   Updates an **imported item record** based on task code, declaration date, and item sequence.
*   Allows updating **item status, classification, and optional remarks**.
*   Requires **valid task and declaration references** for the item to be updated.

> ℹ️ Ensure `taskCd`, `dclDe`, and `itemSeq` are valid and exist in your environment. 

> ℹ️ The RRA API requires `tin`, `bhfId`, and authentication credentials with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `ImptItemSaveReq`

### Authentication & Request Fields

| Field            | Description                     | Type     | Required | Length | Format / Notes |
|-----------------|---------------------------------|---------|---------|--------|----------------|
| `tin`           | Taxpayer Identification Number  | CHAR    | ✅ Yes  | 9      | Buyer's TIN |
| `bhfId`         | Branch ID                       | CHAR    | ✅ Yes  | 2      | Buyer's Branch ID |
| `taskCd`        | Task Code                       | CHAR    | ✅ Yes  | 50     |                |
| `dclDe`         | Declaration Date                | CHAR    | ✅ Yes  | 8      | YYYYMMDD       |
| `itemSeq`       | Item Sequence                   | NUMBER  | ✅ Yes  | 10     |                |
| `hsCd`          | HS Code                         | CHAR    | ✅ Yes  | 17     |                |
| `itemClsCd`     | Item Classification Code        | CHAR    | ✅ Yes  | 10     |                |
| `itemCd`        | Item Code                       | CHAR    | ✅ Yes  | 20     |                |
| `imptItemSttsCd`| Import Item Status Code         | CHAR    | ✅ Yes  | 5      | See Import Item Status |
| `remark`        | Optional remark                 | CHAR    | ❌ No   | 400    |                |
| `modrId`        | Modifier ID                     | CHAR    | ✅ Yes  | 20     |                |
| `modrNm`        | Modifier Name                   | CHAR    | ✅ Yes  | 60     |                |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "taskCd": "2231943",
  "dclDe": "20191217",
  "itemSeq": 1,
  "hsCd": "1231531231",
  "itemClsCd": "5022110801",
  "itemCd": "RW1NTXU0000001",
  "imptItemSttsCd": "1",
  "remark": "Updated remark",
  "modrId": "Admin",
  "modrNm": "Admin"
}
```

---

## Response Object: `ImptItemSaveRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Usually null |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194253",
  "data": null
}
```

> ✅ `resultCd = 000` indicates the update was successful.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'taskCd'         => '2231943',
    'dclDe'          => '20191217',
    'itemSeq'        => 1,
    'hsCd'           => '1231531231',
    'itemClsCd'      => '5022110801',
    'itemCd'         => 'RW1NTXU0000001',
    'imptItemSttsCd' => '1',
    'remark'         => 'Updated remark',
    'modrId'         => 'Admin',
    'modrNm'         => 'Admin',
];

$response = $client->updateImportedItem($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Import item updated successfully\n";
} else {
    abort("Failed to update import item: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.updateImportedItem({
  taskCd: '2231943',
  dclDe: '20191217',
  itemSeq: 1,
  hsCd: '1231531231',
  itemClsCd: '5022110801',
  itemCd: 'RW1NTXU0000001',
  imptItemSttsCd: '1',
  remark: 'Updated via SDK',
  modrId: 'Admin',
  modrNm: 'Admin',
});

console.log(`✅ Import item updated: ${response.resultMsg}`);
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
import_data = {
    'taskCd': '2231943',
    'dclDe': '20191217',
    'itemSeq': 1,
    'hsCd': '1231531231',
    'itemClsCd': '5022110801',
    'itemCd': 'RW1NTXU0000001',
    'imptItemSttsCd': '1',
    'remark': 'Updated remark',
    'modrId': 'Admin',
    'modrNm': 'Admin',
}

response = client.update_imported_item(import_data)

if response.get('resultCd') == '000':
    print("✅ Import item updated successfully")
else:
    abort(f"Failed to update import item: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Always use **valid `taskCd`, `dclDe`, and `itemSeq`** from your system environment.
*   Handle non-`000` result codes gracefully.
*   Include meaningful remarks for audit trail.
*   Updates are **permanent**, ensure data correctness before submission.
