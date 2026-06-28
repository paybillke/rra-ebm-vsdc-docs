---
title: Branches
sidebar_label: Branches
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Branch Search 

The **Branch Search API** retrieves branch information for a taxpayer from the **RRA EBM system**.  
This includes details such as branch name, location, manager, and head office status.

**Endpoint**
```http
POST /selectBhfList
```

---

## Purpose

This API:

- Retrieves **branch master data** for a taxpayer
- Returns all branches updated since a specified date
- Provides **manager and location details** for each branch

> ⚠️ Always verify branch status codes (`bhfSttsCd`) and head office flag (`hqYn`) before performing operations.

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `BhfSearchReq`

### Request Fields

| Field       | Description                         | Type | Required | Length | Notes |
|-------------|-------------------------------------|------|----------|--------|-------|
| `tin`       | Taxpayer Identification Number      | CHAR | ✅ Yes   | 9      |       |
| `bhfId`     | Branch ID                           | CHAR | ✅ Yes   | 2      |       |
| `cmcKey`    | Communication Key                   | CHAR | ✅ Yes   | 255    |       |
| `lastReqDt` | Last request date (YYYYMMDDHHmmss)  | CHAR | ✅ Yes   | 14     |       |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "lastReqDt": "20191130000000"
}
```

---

## Response Object: `BhfSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `bhfList` |

---

### Branch List (`bhfList`)

Each entry represents a **branch**.

| Field       | Description            | Type | Length | Notes |
| ----------- | ---------------------- | ---- | ------ | ----- |
| `tin`       | Taxpayer TIN           | CHAR | 9      |       |
| `bhfId`     | Branch Office ID       | CHAR | 2      | '00' for Head Office |
| `bhfNm`     | Branch Name            | CHAR | 60     |       |
| `bhfSttsCd` | Branch Status Code     | CHAR | 5      |       |
| `prvncNm`   | Province Name          | CHAR | 100    |       |
| `dstrtNm`   | District Name          | CHAR | 100    |       |
| `sctrNm`    | Sector Name            | CHAR | 100    |       |
| `locDesc`   | Location Description   | CHAR | 100    |       |
| `mgrNm`     | Manager Name           | CHAR | 60     |       |
| `mgrTelNo`  | Manager Contact        | CHAR | 20     |       |
| `mgrEmail`  | Manager Email          | CHAR | 100    |       |
| `hqYn`      | Head Office Yes/No     | CHAR | 1      | 'Y' or 'N' |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193023",
  "data": {
    "bhfList": [
      {
        "tin": "999991130",
        "bhfId": "00",
        "bhfNm": "Headquater",
        "bhfSttsCd": "01",
        "prvncNm": "KIGALI CITY",
        "dstrtNm": "GASABO",
        "sctrNm": "KACYIRU",
        "locDesc": null,
        "mgrNm": "manage1130_00",
        "mgrTelNo": "0789001130",
        "mgrEmail": "manage113000@test.com",
        "hqYn": "Y"
      },
      {
        "tin": "999991130",
        "bhfId": "01",
        "bhfNm": "Branch01",
        "bhfSttsCd": "01",
        "prvncNm": "KIGALI CITY",
        "dstrtNm": "KICUKIRO",
        "sctrNm": "KAGARAMA",
        "locDesc": null,
        "mgrNm": "manage1130_01",
        "mgrTelNo": "0789011130",
        "mgrEmail": "manage113001@test.com",
        "hqYn": "N"
      }
    ]
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
branches = client.select_branches({
    'lastReqDt': last_req_dt(-30)
})
bhf_list = branches.get('data', {}).get('bhfList', [])
print(f"Branches found: {len(bhf_list)}")

for branch in bhf_list:
    print(f"- Branch ID: {branch['bhfId']}")
    print(f"  Name: {branch['bhfNm']}")
    print(f"  Status: {branch['bhfSttsCd']}")
    print(f"  Province: {branch['prvncNm']}")
    print(f"  District: {branch['dstrtNm']}")
    print(f"  Sector: {branch['sctrNm']}")
    print(f"  Location: {branch['locDesc']}")
    print(f"  Manager: {branch['mgrNm']}")
    print(f"  Phone: {branch['mgrTelNo']}")
    print(f"  Email: {branch['mgrEmail']}")
    print(f"  Head Office: {branch['hqYn']}\n")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.selectBranches({
  lastReqDt: formatDateForEBM(-30)
});

const branches = response.data?.bhfList || [];
console.log(`Found ${branches.length} branches`);

branches.forEach(branch =>
  console.log(`- ${branch.bhfId}: ${branch.bhfNm} (${branch.bhfSttsCd})`)
);
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'lastReqDt' => last_req_dt('-30 days'),
];

$branches = $client->selectBranches($requestData);
$bhfList = $branches['data']['bhfList'] ?? [];

echo "Branches found: " . count($bhfList) . "\n";

foreach ($bhfList as $branch) {
    echo "- Branch ID: {$branch['bhfId']}\n";
    echo "  Name: {$branch['bhfNm']}\n";
    echo "  Status: {$branch['bhfSttsCd']}\n";
    echo "  Province: {$branch['prvncNm']}\n";
    echo "  District: {$branch['dstrtNm']}\n";
    echo "  Sector: {$branch['sctrNm']}\n";
    echo "  Location: {$branch['locDesc']}\n";
    echo "  Manager: {$branch['mgrNm']}\n";
    echo "  Phone: {$branch['mgrTelNo']}\n";
    echo "  Email: {$branch['mgrEmail']}\n";
    echo "  Head Office: {$branch['hqYn']}\n\n";
}
```

  </TabItem>
</Tabs>

---

## Best Practices

- Use `lastReqDt` to fetch **recently updated branches** (incremental sync).
- Verify `hqYn` to differentiate **head office vs branch** operations.
- Cache branch data locally for faster lookups in other operations.
- Ensure correct branch IDs when creating or updating items, transactions, or notices.

