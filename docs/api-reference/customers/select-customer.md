---
title: Customer Search
sidebar_label: Customer Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Customer Search 

The **Customer Search API** retrieves **taxpayer (customer) information** registered in the **RRA EBM system** using a customer TIN.

In EBM terminology, a **Customer = Taxpayer**.

**Endpoint**
```http
POST /selectCustomer
```

---

## Purpose

This API:

*   Validates whether a **customer TIN exists** in RRA systems
*   Returns **official taxpayer details** registered to that TIN
*   Is commonly used **before issuing invoices** (buyer validation)

> ℹ️ The server returns customer data **based on `custmTin`** provided in the request.

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `CustSearchReq`

### Request Fields

| Field        | Description                  | Type | Required | Length | Notes |
|--------------|------------------------------|------|----------|--------|-------|
| `tin`        | Taxpayer Identification Number | CHAR | ✅ Yes   | 9      | Seller's TIN |
| `bhfId`      | Branch ID                    | CHAR | ✅ Yes   | 2      | Seller's Branch ID |
| `cmcKey`     | Communication Key            | CHAR | ✅ Yes   | 255    | Security Key |
| `custmTin`   | Customer TIN                 | CHAR | ✅ Yes   | 9      | Buyer's TIN to search |

---

### JSON Request Example

```json
{
  "tin": "999992130",
  "bhfId": "00",
  "cmcKey": "YOUR_COMMUNICATION_KEY_HERE",
  "custmTin": "100600570"
}
```

---

## Response Object: `CustSearchRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `custList` |

---

### Customer List (`custList`)

The response always returns a **list of customers**, even if only one record matches.

| Field         | Description          | Type | Length | Notes |
| ------------- | -------------------- | ---- | ------ | ----- |
| `tin`         | Taxpayer TIN         | CHAR | 9      |       |
| `taxprNm`     | Taxpayer Name        | CHAR | 60     |       |
| `taxprSttsCd` | Taxpayer Status Code | CHAR | 5      | See Taxpayer Status |
| `prvncNm`     | Province Name        | CHAR | 100    |       |
| `dstrtNm`     | District Name        | CHAR | 100    |       |
| `sctrNm`      | Sector Name          | CHAR | 100    |       |
| `locDesc`     | Location Description | CHAR | 100    |       |

> 📘 `taxprSttsCd` values are defined in **Taxpayer Status Codes**.

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226192053",
  "data": {
    "custList": [
      {
        "tin": "841562115",
        "taxprNm": "TAXPAYER1",
        "taxprSttsCd": "A",
        "prvncNm": "KIGALI CITY",
        "dstrtNm": "KICUKIRO",
        "sctrNm": "KAGARAMA",
        "locDesc": "11111"
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
$customers = $client->selectCustomer([
    'custmTin' => '100600570'
]);

$custList = $customers['data']['custList'] ?? [];

echo "Customers found: " . count($custList) . PHP_EOL;

foreach ($custList as $cust) {
    echo "- TIN: {$cust['tin']}" . PHP_EOL;
    echo "  Name: {$cust['taxprNm']}" . PHP_EOL;
    echo "  Status: {$cust['taxprSttsCd']}" . PHP_EOL;
    echo "  Province: {$cust['prvncNm']}" . PHP_EOL;
    echo "  District: {$cust['dstrtNm']}" . PHP_EOL;
    echo "  Sector: {$cust['sctrNm']}" . PHP_EOL;
    echo "  Location: {$cust['locDesc']}" . PHP_EOL . PHP_EOL;
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.selectCustomer({
  custmTin: '100600570'
});

const custList = response.data?.custList || [];
console.log(`Customers found: ${custList.length}`);

custList.forEach(cust => {
  console.log(`- ${cust.tin}`);
  console.log(`  Name: ${cust.taxprNm}`);
  console.log(`  Status: ${cust.taxprSttsCd}`);
  console.log(`  Province: ${cust.prvncNm}`);
  console.log(`  District: ${cust.dstrtNm}`);
  console.log(`  Sector: ${cust.sctrNm}`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
customers = client.select_customer({
    'custmTin': '100600570'
})

cust_list = customers.get('data', {}).get('custList', [])
print(f"Customers found: {len(cust_list)}")

for cust in cust_list:
    print(f"- TIN: {cust['tin']}")
    print(f"  Name: {cust['taxprNm']}")
    print(f"  Status: {cust['taxprSttsCd']}")
    print(f"  Province: {cust['prvncNm']}")
    print(f"  District: {cust['dstrtNm']}")
    print(f"  Sector: {cust['sctrNm']}")
    print(f"  Location: {cust['locDesc']}\n")
```

  </TabItem>
</Tabs>

---

## Best Practices

*   Always validate **buyer TIN** before invoice issuance to ensure tax compliance.
*   Do not cache customer data permanently (details like address or status may change).
*   Handle non-`000` result codes gracefully.
*   Expect `custList` to be empty if the TIN is invalid, inactive, or not registered in the system.

---

## Next Steps

*   👉 **[Code Lists](../codes/select-code-list)**
*   👉 **[Item Search](../items/select-items)**
*   👉 **[Sales / Invoice Submission](../transactions/save-sales-transaction)**