---
title: Import Item Search
sidebar_label: Import Item Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Import Item Search

The **Select Import Item API** retrieves **imported item details** from the RRA EBM system via the VSDC interface based on a taxpayer PIN, branch ID, and last request date. It helps track **imported goods and related invoice data**.

**Endpoint**

```http
POST /imports/selectImportItems
```

---

## Purpose

This API:

*   Returns a list of **imported items** for a given taxpayer and branch.
*   Provides details like **task code, declaration number, item name, quantity, supplier, and invoice amounts**.
*   Can be used to **monitor import items or for update workflows**.

> ℹ️ The RRA API requires `tin`, `bhfId`, and authentication credentials with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `ImptItemReq`

### Request Fields

| Field       | Description                  | Type | Required | Length | Format         |
|-------------|------------------------------|------|----------|--------|----------------|
| `tin`       | Taxpayer Identification Number | CHAR | ✅ Yes   | 9      | Buyer's TIN    |
| `bhfId`     | Branch ID                    | CHAR | ✅ Yes   | 2      | Buyer's Branch ID |
| `lastReqDt` | Last Request Date            | CHAR | ✅ Yes   | 14     | YYYYMMDDHHMMSS |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "lastReqDt": "20190524000000"
}
```

---

## Response Object: `ImptItemRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `itemList` |

---

### Imported Item List (`itemList`)

| Field            | Description                     | Type      | Length | Notes                    |
| ---------------- | ------------------------------- | --------- | ------ | ------------------------ |
| `taskCd`         | Task Code                       | CHAR      | 50     |                          |
| `dclDe`          | Declaration Date                | CHAR      | 8      | YYYYMMDD                 |
| `itemSeq`        | Item Sequence                   | NUMBER    | 10     |                          |
| `dclNo`          | Declaration Number              | CHAR      | 50     |                          |
| `hsCd`           | HS Code                         | CHAR      | 17     |                          |
| `itemNm`         | Item Name                       | CHAR      | 500    |                          |
| `imptItemSttsCd` | Import Item Status Code         | CHAR      | 5      | See Import Item Status   |
| `orgnNatCd`      | Origin Nation Code              | CHAR      | 5      | See Nation Codes         |
| `exptNatCd`      | Export Nation Code              | CHAR      | 5      | See Nation Codes         |
| `pkg`            | Package Quantity                | NUMBER    | 13,2   |                          |
| `pkgUnitCd`      | Package Unit Code               | CHAR      | 5      | See Packaging Unit Codes |
| `qty`            | Quantity                        | NUMBER    | 13,2   |                          |
| `qtyUnitCd`      | Quantity Unit Code              | CHAR      | 5      | See Unit Codes           |
| `totWt`          | Total Weight                    | NUMBER    | 13,2   |                          |
| `netWt`          | Net Weight                      | NUMBER    | 13,2   |                          |
| `spplrNm`        | Supplier Name                   | CHAR      | 500    |                          |
| `agntNm`         | Agent Name                      | CHAR      | 500    |                          |
| `invcFcurAmt`    | Invoice Foreign Currency Amount | NUMBER    | 18,2   |                          |
| `invcFcurCd`     | Invoice Currency Code           | CHAR      | 5      | See Currency Codes       |
| `invcFcurExcrt`  | Invoice Foreign Exchange Rate   | NUMBER    | 18,2   |                          |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226194118",
  "data": {
    "itemList": [
      {
        "taskCd": "2239078",
        "dclDe": "-1",
        "itemSeq": 1,
        "dclNo": "C3460-2019-TZDL",
        "hsCd": "20055900000",
        "itemNm": "BAKED BEANS",
        "imptItemSttsCd": "2",
        "orgnNatCd": "BR",
        "exptNatCd": "BR",
        "pkg": 2922,
        "pkgUnitCd": null,
        "qty": 19946,
        "qtyUnitCd": "KGM",
        "totWt": 19945.57,
        "netWt": 19945.57,
        "spplrNm": "ODERICH CONSERVA QUALIDADE BRASIL",
        "agntNm": "BN METRO Ltd",
        "invcFcurAmt": 296865.6,
        "invcFcurCd": "USD",
        "invcFcurExcrt": 929.79
      }
    ]
  }
}
```

> ✅ `resultCd = 000` indicates the request was successful.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'lastReqDt' => '20190524000000'
];

$response = $client->selectImportedItems($requestData);

$itemList = $response['data']['itemList'] ?? [];
echo "Import items found: " . count($itemList) . "\n";

foreach ($itemList as $item) {
    echo "- Task: {$item['taskCd']}, Declaration: {$item['dclNo']}, Item: {$item['itemNm']}, Qty: {$item['qty']}\n";
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.selectImportedItems({
  lastReqDt: '20190524000000'
});

const itemList = response.data?.itemList || [];
console.log(`Import items found: ${itemList.length}`);

itemList.forEach(item => {
  console.log(`- Task: ${item.taskCd}, Declaration: ${item.dclNo}, Item: ${item.itemNm}, Qty: ${item.qty}`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
import_data = {
    'lastReqDt': '20190524000000'
}

response = client.select_imported_items(import_data)
item_list = response.get('data', {}).get('itemList', [])
print(f"Import items found: {len(item_list)}")

for item in item_list:
    print(f"- Task: {item['taskCd']}, Declaration: {item['dclNo']}, Item: {item['itemNm']}, Qty: {item['qty']}")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Handle non-`000` result codes gracefully.
*   Expect `itemList` to be empty if no items exist for the request date.
*   Do not cache import item data permanently (details may change).
*   Use the returned `taskCd`, `dclDe`, and `itemSeq` for subsequent **Update Import Item Status** operations.
