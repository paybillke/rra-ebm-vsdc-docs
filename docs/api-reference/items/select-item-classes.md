---
title: Item Classifications
sidebar_label: Item Classifications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Item Classifications 

The **Item Classifications API** allows you to retrieve **RRA-managed product classification codes** used when registering and validating items in the **EBM system**.

Item classifications define:

*   Product hierarchy levels
*   Tax applicability
*   Major / minor classification flags
*   Allowed item grouping rules

**Endpoint**
```http
POST /itemClass/selectItemsClass
```

---

## Purpose

This API:

*   Retrieves **item classification master data**
*   Returns classifications **created or modified after `lastReqDt`**
*   Ensures items are registered using **valid RRA classification codes**

> ℹ️ Item classification data should be **cached locally** and refreshed periodically.

> ℹ️ Your CIS/ERP should store the latest successful `lastReqDt` for this lookup and send it on the next request.

---

## Request Object: `ItemClsReq`

### Request Fields

| Field       | Description                         | Type | Required | Length | Notes |
|-------------|-------------------------------------|------|----------|--------|-------|
| `tin`       | Taxpayer Identification Number      | CHAR | ✅ Yes   | 9      |       |
| `bhfId`     | Branch ID                           | CHAR | ✅ Yes   | 2      |       |
| `lastReqDt` | Last Request Date (YYYYMMDDHHmmss)  | CHAR | ✅ Yes   | 14     |       |

> 🔎 Only item classifications **registered or updated after `lastReqDt`** are returned.

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "lastReqDt": "20180523000000"
}
```

---

## Response Object: `ItemClsRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length | Format / Notes |
| ----------- | ----------------------------- | -------- | ------ | -------------- |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |                |
| `resultMsg` | Result message                | CHAR     | -      |                |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `itemClsList` |

---

### Item Classification List (`itemClsList`)

Each entry represents a **single product classification**.

| Field        | Description                    | Type   | Length | Notes |
| ------------ | ------------------------------ | ------ | ------ | ----- |
| `itemClsCd`  | Item Class Code                | CHAR   | 10     |       |
| `itemClsNm`  | Item Class Name                | CHAR   | 200    |       |
| `itemClsLvl` | Item Class Level               | NUMBER | -      |       |
| `taxTyCd`    | Taxation Type Code             | CHAR   | 5      | See Tax Type |
| `mjrTgYn`    | Major Target Indicator (`Y/N`) | CHAR   | 1      |       |
| `useYn`      | Usage Status (`Y/N`)           | CHAR   | 1      |       |

> 📘 `taxTyCd` values must match **Taxation Types** retrieved from **Code Lists**.

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226185625",
  "data": {
    "itemClsList": [
      {
        "itemClsCd": "14111400",
        "itemClsNm": "Paper products no use",
        "itemClsLvl": 3,
        "taxTyCd": null,
        "mjrTgYn": null,
        "useYn": "Y"
      },
      {
        "itemClsCd": "14111401",
        "itemClsNm": "Paper products no use Commodity",
        "itemClsLvl": 4,
        "taxTyCd": null,
        "mjrTgYn": null,
        "useYn": "Y"
      },
      {
        "itemClsCd": "3133130600",
        "itemClsNm": "Non metallic sonic welded structural assemblies",
        "itemClsLvl": 5,
        "taxTyCd": "B",
        "mjrTgYn": "N",
        "useYn": "Y"
      }
    ]
  }
}
```

> ✅ `resultCd = 000` indicates a successful request.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$itemClasses = $client->selectItemClasses([
    'lastReqDt' => lastReqDt('-30 days')
]);

$itemClsList = $itemClasses['data']['itemClsList'] ?? [];

echo "Item Classes found: " . count($itemClsList) . PHP_EOL;

foreach ($itemClsList as $item) {
    echo "- Item Class Code: {$item['itemClsCd']}" . PHP_EOL;
    echo "  Name: {$item['itemClsNm']}" . PHP_EOL;
    echo "  Level: {$item['itemClsLvl']}" . PHP_EOL;
    echo "  Tax Type Code: {$item['taxTyCd']}" . PHP_EOL;
    echo "  Major Target: {$item['mjrTgYn']}" . PHP_EOL;
    echo "  Use Status: {$item['useYn']}" . PHP_EOL . PHP_EOL;
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.selectItemClasses({
  lastReqDt: formatDateForEBM(-30),
});

const classes = response.data?.itemClsList || [];
console.log(`Found ${classes.length} item classes`);

classes.forEach(cls => {
  console.log(`- ${cls.itemClsCd}: ${cls.itemClsNm} (Lvl ${cls.itemClsLvl})`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
item_classes = client.select_item_classes({
    'lastReqDt': last_req_dt(-30)
})

item_cls_list = item_classes.get('data', {}).get('itemClsList', [])
print(f"Item Classes found: {len(item_cls_list)}")

for item in item_cls_list:
    print(f"- Item Class Code: {item['itemClsCd']}")
    print(f"  Name: {item['itemClsNm']}")
    print(f"  Level: {item['itemClsLvl']}")
    print(f"  Tax Type Code: {item['taxTyCd']}")
    print(f"  Major Target: {item['mjrTgYn']}")
    print(f"  Use Status: {item['useYn']}\n")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Cache item classifications locally to reduce API calls.
*   Refresh periodically (daily or weekly) to capture updates.
*   Always validate item registrations against this list.
*   Never hard-code classification codes; rely on the API response.

---

## Next Steps

*   👉 **[Items](./select-items)**
*   👉 **[Code Lists](../select-code-list)**
*   👉 **[Sales Transactions](../purchases/save-sales-transaction)**
