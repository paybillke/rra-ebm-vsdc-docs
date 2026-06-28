---
title: Save Branch Customer
sidebar_label: Save Branch Customer
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save Branch Customer

The **Save Branch Customer API** stores or updates customer information for a specific branch in the **RRA EBM system** via the VSDC interface.  
It includes essential customer details such as TIN, name, contact info, and status.

**Endpoint**

```http
POST /branches/saveBrancheCustomers
```

> ℹ️ The RRA API requires `tin`, `bhfId`, and authentication credentials with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `BhfCustSaveReq`

### Authentication & Request Fields

| Field      | Description                  | Type | Required | Length | Notes |
|------------|------------------------------|------|----------|--------|-------|
| `tin`      | Taxpayer Identification Number | CHAR | ✅ Yes   | 9      | Seller's TIN |
| `bhfId`    | Branch ID                    | CHAR | ✅ Yes   | 2      | Seller's Branch ID |
| `custNo`   | Customer Number              | CHAR | ✅ Yes   | 9      | Unique identifier for the customer in your system |
| `custTin`  | Customer TIN                 | CHAR | ✅ Yes   | 9      | Buyer's TIN |
| `custNm`   | Customer Name                | CHAR | ✅ Yes   | 60     |       |
| `adrs`     | Address                      | CHAR | ❌ No    | 300    |       |
| `telNo`    | Contact Number               | CHAR | ❌ No    | 20     |       |
| `email`    | Email                        | CHAR | ❌ No    | 50     |       |
| `faxNo`    | Fax Number                   | CHAR | ❌ No    | 20     |       |
| `useYn`    | Active Status (Y/N)          | CHAR | ✅ Yes   | 1      | 'Y' or 'N' |
| `remark`   | Remarks                      | CHAR | ❌ No    | 1000   |       |
| `regrId`   | Registration ID              | CHAR | ✅ Yes   | 20     | User who created the record |
| `regrNm`   | Registration Name            | CHAR | ✅ Yes   | 60     |       |
| `modrId`   | Modifier ID                  | CHAR | ✅ Yes   | 20     | User who last modified the record |
| `modrNm`   | Modifier Name                | CHAR | ✅ Yes   | 60     |       |

---

### JSON Request Example

```json
{
  "tin": "999000099",
  "bhfId": "00",
  "custNo": "999991113",
  "custTin": "107397100",
  "custNm": "ERIRWANDA",
  "adrs": null,
  "telNo": null,
  "email": null,
  "faxNo": null,
  "useYn": "Y",
  "remark": null,
  "regrNm": "Admin",
  "regrId": "Admin",
  "modrNm": "Admin",
  "modrId": "Admin"
}
```

---

## Response Object: `BhfCustSaveRes`

### Response Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result Code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result Message                | CHAR     | -      |
| `resultDt`  | Response Timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Always null                   | -        | -      |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226193115",
  "data": null
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$requestData = [
    'custNo'    => '999991113',
    'custTin'   => '107397100',
    'custNm'    => 'ERIRWANDA',
    'adrs'      => null,
    'telNo'     => null,
    'email'     => null,
    'faxNo'     => null,
    'useYn'     => 'Y',
    'remark'    => null,
    'regrId'    => 'Admin',
    'regrNm'    => 'Admin',
    'modrId'    => 'Admin',
    'modrNm'    => 'Admin',
];

$response = $client->saveBranchCustomer($requestData);

if (($response['resultCd'] ?? '') === '000') {
    echo "✅ Branch customer saved successfully\n";
} else {
    abort("Failed to save branch customer: " . ($response['resultMsg'] ?? 'Unknown error'));
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / TypeScript">

```ts
const response = await client.saveBranchCustomer({
  custNo: '999991113',
  custTin: '107397100',
  custNm: 'ERIRWANDA',
  adrs: null,
  telNo: null,
  email: null,
  faxNo: null,
  useYn: 'Y',
  remark: null,
  regrId: 'Admin',
  regrNm: 'Admin',
  modrId: 'Admin',
  modrNm: 'Admin',
});

console.log(`✅ Branch customer saved: ${response.resultMsg}`);
if (response.resultCd !== '000') {
  throw new Error(`Failed: ${response.resultMsg}`);
}
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
customer_data = {
    'custNo': '999991113',
    'custTin': '107397100',
    'custNm': 'ERIRWANDA',
    'adrs': None,
    'telNo': None,
    'email': None,
    'faxNo': None,
    'useYn': 'Y',
    'remark': None,
    'regrId': 'Admin',
    'regrNm': 'Admin',
    'modrId': 'Admin',
    'modrNm': 'Admin',
}

response = client.save_branch_customer(customer_data)

if response.get('resultCd') == '000':
    print("✅ Branch customer saved successfully")
else:
    raise Exception(f"Failed to save branch customer: {response.get('resultMsg', 'Unknown error')}")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Ensure `custNo` and `custTin` are **valid and correctly formatted** (9 digits for TIN).
*   Use the `useYn` flag to deactivate customers without deleting them to preserve historical transaction integrity.
*   Provide `regrId` and `modrId` for accurate audit tracking.
*   Optional fields like address, email, and phone can be left null if unavailable.
