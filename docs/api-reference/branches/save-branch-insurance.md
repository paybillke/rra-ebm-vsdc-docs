---
title: Branch Insurance
sidebar_label: Branch Insurance
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Branch Insurance

This API function creates or updates branch insurance information on the **RRA EBM server**.  
It includes insurance code, name, and premium rate.

**Endpoint**
```http
POST /saveBhfInsurance
```

---

## Request Object: `BhfInsuranceSaveReq`

### Authentication & Request Fields

| Field      | Description                  | Type   | Required | Length | Notes |
|------------|------------------------------|--------|----------|--------|-------|
| `tin`      | Taxpayer Identification Number | CHAR   | ✅ Yes   | 9      | Seller's TIN |
| `bhfId`    | Branch ID                    | CHAR   | ✅ Yes   | 2      | Seller's Branch ID |
| `cmcKey`   | Communication Key            | CHAR   | ✅ Yes   | 255    | Security Key |
| `isrccCd`  | Insurance Code               | CHAR   | ✅ Yes   | 10     |       |
| `isrccNm`  | Insurance Name               | CHAR   | ✅ Yes   | 100    |       |
| `isrcRt`   | Premium Rate (%)             | NUMBER | ✅ Yes   | 3      | Integer representing percentage |
| `useYn`    | Active Status (Y/N)          | CHAR   | ✅ Yes   | 1      |       |
| `regrId`   | Registration ID              | CHAR   | ✅ Yes   | 20     |       |
| `regrNm`   | Registration Name            | CHAR   | ✅ Yes   | 60     |       |
| `modrId`   | Modifier ID                  | CHAR   | ✅ Yes   | 20     |       |
| `modrNm`   | Modifier Name                | CHAR   | ✅ Yes   | 60     |       |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "isrccCd": "ISRCC01",
  "isrccNm": "ISRCC NAME",
  "isrcRt": 20,
  "useYn": "Y",
  "regrId": "Test",
  "regrNm": "Test",
  "modrId": "Test",
  "modrNm": "Test"
}
```

---

## Response Object: `BhfInsuranceSaveRes`

### Response Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result Code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result Message                | CHAR     | -      |
| `resultDt`  | Response Timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Always null                   | Object   | -      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226192852",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```python
insurance_data = {
    'isrccCd': 'ISRCC01',
    'isrccNm': 'ISRCC NAME',
    'isrcRt': 20,
    'useYn': 'Y',
    'regrId': 'Test',
    'regrNm': 'Test',
    'modrId': 'Test',
    'modrNm': 'Test',
}

response = client.save_branch_insurance(insurance_data)

if response.get('resultCd') == '000':
    print("✅ Branch insurance saved successfully")
else:
    raise Exception(f"Failed to save branch insurance: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.saveBranchInsurance({
  isrccCd: `INS12345`,
  isrccNm: `Test Insurance ${Date.now()}`,
  isrcRt: 20,
  useYn: 'Y',
  regrId: 'Test',
  regrNm: 'Test',
  modrId: 'Test',
  modrNm: 'Test',
});

console.log(`✅ Branch insurance saved: ${response.resultMsg}`);
if (response.resultCd !== '000') {
  throw new Error(`Failed: ${response.resultMsg}`);
}
```

  </TabItem>

  <TabItem value="php" label="PHP">

```php
$requestData = [
    'isrccCd'   => 'ISRCC01',
    'isrccNm'   => 'ISRCC NAME',
    'isrcRt'    => 20,
    'useYn'     => 'Y',
    'regrId'    => 'Test',
    'regrNm'    => 'Test',
    'modrId'    => 'Test',
    'modrNm'    => 'Test',
];

$response = $client->saveBranchInsurance($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Branch insurance saved successfully\n";
} else {
    throw new Exception("Failed to save branch insurance: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>
</Tabs>

---

## Best Practices

* Always include the authentication headers (`tin`, `bhfId`, `cmcKey`) in the request.
* Ensure `isrccCd` is unique for each insurance company.
* `useYn` must reflect whether the insurance is active.
* Track `regrId` and `modrId` for auditing.
* Premium rate `isrcRt` is an integer representing percentage.