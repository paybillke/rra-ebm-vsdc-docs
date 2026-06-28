---
title: Code Lists
sidebar_label: Code Lists
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Lists (Common Codes)

The **Code Lists** endpoint allows you to retrieve **RRA-managed master codes** via the VSDC interface such as:

*   Taxation types
*   Unit codes (Packaging & Quantity)
*   Country codes
*   Payment method codes
*   Receipt types
*   Other standardized reference data

These codes are **mandatory dependencies** for many EBM requests (items, sales, stock, purchases).

**Endpoint**

```http
POST /code/selectCodes
```

> ℹ️ The RRA API requires `tin`, `bhfId`, and authentication credentials with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Purpose

This API:

*   Retrieves **code classifications** and **detail codes**
*   Returns only codes **created or modified after `lastReqDt`**
*   Ensures client-side validation aligns with RRA master data

> ℹ️ Code lists should be **cached locally** and refreshed periodically to ensure your application uses the latest valid codes.

---

## Request Object: `CodeReq`

### Request Fields

| Field       | Description                         | Type | Required | Length | Notes |
|-------------|-------------------------------------|------|----------|--------|-------|
| `tin`       | Taxpayer Identification Number      | CHAR | ✅ Yes   | 9      |       |
| `bhfId`     | Branch ID                           | CHAR | ✅ Yes   | 2      |       |
| `lastReqDt` | Last Request Date (YYYYMMDDHHmmss)  | CHAR | ✅ Yes   | 14     |       |

> 🔎 `lastReqDt` filters results to codes **registered or updated after the specified date**. Use a past date (e.g., epoch or initial setup date) to fetch all codes initially.

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "lastReqDt": "20180520000000"
}
```

---

## Response Object: `CodeRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `clsList` |

---

### Code Classification (`clsList`)

Each entry represents a **code class** (e.g., Tax Type, Unit Type).

| Field        | Description            | Type      | Length |
| ------------ | ---------------------- | --------- | ------ |
| `cdCls`      | Code Class             | CHAR      | 2      |
| `cdClsNm`    | Code Class Name        | CHAR      | 60     |
| `cdClsDesc`  | Code Class Description | CHAR      | 500    |
| `userDfnNm1` | User Defined Name 1    | CHAR      | 60     |
| `userDfnNm2` | User Defined Name 2    | CHAR      | 60     |
| `userDfnNm3` | User Defined Name 3    | CHAR      | 60     |
| `useYn`      | Use Yes/No (`Y/N`)     | CHAR      | 1      |
| `dtlList`    | Detail Codes List      | Array     | -      | See below |

---

### Code Details (`dtlList`)

Each code class contains a list of **detail codes**.

| Field        | Description         | Type      | Length |
| ------------ | ------------------- | --------- | ------ |
| `cd`         | Code                | CHAR      | 5      |
| `cdNm`       | Code Name           | CHAR      | 60     |
| `cdDesc`     | Code Description    | CHAR      | 500    |
| `srtOrd`     | Sort Order          | NUMBER    | 5      |
| `userDfnCd1` | User Defined Code 1 | CHAR      | 20     |
| `userDfnCd2` | User Defined Code 2 | CHAR      | 20     |
| `userDfnCd3` | User Defined Code 3 | CHAR      | 20     |
| `useYn`      | Use Yes/No (`Y/N`)  | CHAR      | 1      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226143506",
  "data": {
    "clsList": [
      {
        "cdCls": "04",
        "cdClsNm": "Tax Type",
        "cdClsDesc": null,
        "useYn": "Y",
        "userDfnNm1": "Tax Rate",
        "userDfnNm2": null,
        "userDfnNm3": null,
        "dtlList": [
          {
            "cd": "A",
            "cdNm": "AEX",
            "cdDesc": "...",
            "useYn": "Y",
            "srtOrd": 1,
            "userDfnCd1": "0",
            "userDfnCd2": null,
            "userDfnCd3": null
          },
          {
            "cd": "B",
            "cdNm": "B-18.00%",
            "cdDesc": "B18.00%",
            "useYn": "Y",
            "srtOrd": 2,
            "userDfnCd1": "18",
            "userDfnCd2": null,
            "userDfnCd3": null
          },
          {
            "cd": "C",
            "cdNm": "C",
            "cdDesc": "C",
            "useYn": "Y",
            "srtOrd": 3,
            "userDfnCd1": "0",
            "userDfnCd2": null,
            "userDfnCd3": null
          },
          {
            "cd": "D",
            "cdNm": "D",
            "cdDesc": "D",
            "useYn": "Y",
            "srtOrd": 4,
            "userDfnCd1": "0",
            "userDfnCd2": null,
            "userDfnCd3": null
          }
        ]
      }
    ]
  }
}
```

> ✅ `resultCd = 000` means the request succeeded.
> Refer to **API Response Codes** for error handling.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$codes = $client->selectCodeList([
    'lastReqDt' => '20180520000000'
]);

$clsList = $codes['data']['clsList'] ?? [];

echo "Code Classes found: " . count($clsList) . PHP_EOL;

foreach ($clsList as $cls) {
    echo "- {$cls['cdCls']} ({$cls['cdClsNm']})" . PHP_EOL;

    foreach ($cls['dtlList'] ?? [] as $detail) {
        echo "  • {$detail['cd']} ({$detail['cdNm']})" . PHP_EOL;
    }
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.selectCodeList({
  lastReqDt: '20180520000000',
});

const clsList = response.data?.clsList || [];

console.log(`Found ${clsList.length} code classes`);

clsList.forEach(cls => {
  console.log(`- ${cls.cdCls}: ${cls.cdClsNm}`);
  (cls.dtlList || []).forEach(detail =>
    console.log(`  • ${detail.cd}: ${detail.cdNm}`)
  );
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
codes = client.select_code_list({
    'lastReqDt': '20180520000000'
})

cls_list = codes.get('data', {}).get('clsList', [])
print(f"Code Classes found: {len(cls_list)}")

for cls in cls_list:
    print(f"- {cls['cdCls']} ({cls['cdClsNm']})")
    for detail in cls.get('dtlList', []):
        print(f"  • {detail['cd']} ({detail['cdNm']})")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   **Cache code lists locally**: Do not call this API for every transaction.
*   **Refresh periodically**: Fetch updates daily or weekly to capture new codes or deactivations.
*   **Validate inputs**: Always validate item, tax, unit, and payment codes against this API before submitting transactions.
*   **Do not hardcode values**: Unless explicitly permitted by RRA documentation, rely on the API response for valid codes.
