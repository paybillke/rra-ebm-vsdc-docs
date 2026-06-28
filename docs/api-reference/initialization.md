---
title: Device Initialization
sidebar_label: Device Initialization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Device Initialization

The **Device Initialization** endpoint is used to **authenticate and initialize an EBM device** with the Rwanda Revenue Authority (RRA).

This is a **mandatory first step** after obtaining your credentials and before submitting **sales, purchases, stock, or items**.

**Endpoint**
```http
POST /initializer/selectInitInfo 
```

---

## Purpose

This API:

*   Authenticates the EBM device
*   Verifies the taxpayer (TIN) and branch
*   Returns the **`cmcKey` (Communication Key)**
*   Synchronizes taxpayer, branch, and device metadata

> 🔑 The returned **`cmcKey` must be stored securely** and reused in the header or payload of all subsequent EBM API requests.

---

## Request Object: `DeviceVerificationReq`

### Request Fields

| Field        | Description            | Type | Required | Length | Notes |
|--------------|------------------------|------|----------|--------|-------|
| `tin`        | Taxpayer Identification Number | CHAR | ✅ Yes   | 9      |       |
| `bhfId`      | Branch ID              | CHAR | ✅ Yes   | 2      |       |
| `dvcSrlNo`   | Device Serial Number   | CHAR | ✅ Yes   | 100    |       |

---

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "dvcSrlNo": "dvcv1130"
}
```

---

## Response Object: `DeviceVerificationRes`

### Top-Level Fields

| Field       | Description                   | Type     | Length |
| ----------- | ----------------------------- | -------- | ------ |
| `resultCd`  | Result code (`000` = success) | CHAR     | 3      |
| `resultMsg` | Result message                | CHAR     | -      |
| `resultDt`  | Response timestamp            | CHAR     | 14     | YYYYMMDDhhmmss |
| `data`      | Response data                 | Object   | -      | Contains `info` object |

---

### Taxpayer Information (`InitTaxpayer`)

| Field      | Description       | Type | Length |
| ---------- | ----------------- | ---- | ------ |
| `tin`      | Taxpayer TIN      | CHAR | 9      |
| `taxprNm`  | Taxpayer Name     | CHAR | 60     |
| `bsnsActv` | Business Activity | CHAR | 100    |

---

### Branch Information (`InitBranch`)

| Field       | Description              | Type    | Length |
| ----------- | ------------------------ | ------- | ------ |
| `bhfId`     | Branch ID                | CHAR    | 2      |
| `bhfNm`     | Branch Name              | CHAR    | 60     |
| `bhfOpenDt` | Branch Registration Date | CHAR    | 8      | YYYYMMDD |
| `prvncNm`   | Province Name            | CHAR    | 100    |        |
| `dstrtNm`   | District Name            | CHAR    | 100    |        |
| `sctrNm`    | Sector Name              | CHAR    | 100    |        |
| `locDesc`   | Location Description     | CHAR    | 100    |        |
| `hqYn`      | Head Office Flag (`Y/N`) | CHAR    | 1      |        |
| `mgrNm`     | Manager Name             | CHAR    | 60     |        |
| `mgrTelNo`  | Manager Phone            | CHAR    | 20     |        |
| `mgrEmail`  | Manager Email            | CHAR    | 50     |        |

---

### Device Information (`InitDevice`)

| Field    | Description                  | Type      | Length |
| -------- | ---------------------------- | --------- | ------ |
| `dvcId`  | Device ID                    | CHAR      | 20     |
| `sdicId` | SDC (Sales Device Control) ID| CHAR      | 12     |
| `mrcNo`  | MRC Number                   | CHAR      | 11     |
| `cmcKey` | Communication Key            | CHAR      | 255    |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226143124",
  "data": {
    "info": {
      "tin": "999991130",
      "taxprNm": "Taxpayer1130",
      "bsnsActv": "business",
      "bhfId": "00",
      "bhfNm": "Headquarter",
      "bhfOpenDt": "20200226",
      "prvncNm": "KIGALI CITY",
      "dstrtNm": "GASABO",
      "sctrNm": "KACYIRU",
      "locDesc": null,
      "hqYn": "Y",
      "mgrNm": "manage1130_00",
      "mgrTelNo": "0789001130",
      "mgrEmail": "manage113000@test.com",
      "dvcId": "9999911300000001",
      "sdicId": "SDC013000001",
      "mrcNo": "WIS01000150",
      "cmcKey": "f0b9831bd2334874b7ec815e40347bc4"
    }
  }
}
```

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$init = $client->selectInitVsdcInfo([
    'tin'      => getenv('RRA_TIN'),
    'bhfId'    => getenv('RRA_BHF_ID') ?: '00',
    'dvcSrlNo' => getenv('DEVICE_SERIAL'),
]);

$cmcKey = $init['data']['info']['cmcKey'] ?? null;

if (!$cmcKey) {
    throw new Exception('Initialization failed: ' . ($init['resultMsg'] ?? 'Unknown error'));
}

echo "CMC Key: $cmcKey\n";
```

</TabItem>

<TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.selectInitVsdcInfo({
  tin: process.env.RRA_TIN!,
  bhfId: process.env.RRA_BHF_ID || '00',
  dvcSrlNo: process.env.DEVICE_SERIAL!,
});

const cmcKey = response.data?.info?.cmcKey;
if (!cmcKey) {
  throw new Error('Initialization failed');
}
console.log('CMC Key:', cmcKey);
```

</TabItem>

<TabItem value="python" label="Python">

```python
init_data = client.select_init_vsdc_info({
    'tin': os.getenv('RRA_TIN'),
    'bhfId': os.getenv('RRA_BHF_ID') or '00',
    'dvcSrlNo': os.getenv('DEVICE_SERIAL'),
})

cmc_key = init_data['data']['info']['cmcKey']
if not cmc_key:
    raise Exception('Initialization failed')
    
print('CMC Key:', cmc_key)
```

</TabItem>
</Tabs>

---

## Important Notes

*   This endpoint **must be called at least once per device** to obtain the `cmcKey`.
*   Store `cmcKey` securely (environment variable or secrets manager).
*   Do **not** regenerate unless:
    *   Device hardware changes.
    *   Branch configuration changes.
    *   RRA instructs re-initialization.
*   The `cmcKey` is required for almost all other API endpoints (Sales, Purchases, Items, etc.).

---

## Next Steps

*   👉 Continue to **[Code Lists](./codes/select-code-list)**
*   👉 Review **[Taxpayers & Branches](./taxpayers/select-taxpayer)**
*   👉 Start **[Sales Transactions](./transactions/save-sales-transaction)**