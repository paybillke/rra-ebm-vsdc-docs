---
title: Notices
sidebar_label: Notices
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Notices

The **Notices API** allows taxpayers to retrieve **official notices** issued by the **Rwanda Revenue Authority (RRA)**.

Notices may include:

- Compliance alerts
- System announcements
- Regulatory updates
- Operational instructions

**Endpoint**

```text
POST /selectNoticeList
```

---

## Purpose

This API:

- Retrieves notices created or updated after a specified date and time.
- Enables taxpayer systems to display official RRA notices.
- Helps taxpayers stay informed about regulatory and operational updates.

> ℹ️ It is recommended to check for new notices regularly (for example, daily or weekly).

> ℹ️ The RRA API requires `tin`, `bhfId`, and `cmcKey` with every request. When using this SDK, these fields are automatically included, so you only need to provide the fields below.

---

## Request Object: `NoticeSearchReq`

### Request Fields

| Field | Description | Type | Required | Length |
|------|-------------|------|----------|-------:|
| `tin` | Taxpayer Identification Number | CHAR | ✅ Yes | 9 |
| `bhfId` | Branch ID | CHAR | ✅ Yes | 2 |
| `cmcKey` | Communication Key | CHAR | ✅ Yes | 255 |
| `lastReqDt` | Last request date and time (`YYYYMMDDHHmmss`) | CHAR | ✅ Yes | 14 |

> 🔎 `lastReqDt` is used to retrieve only notices created or updated after the specified timestamp.

### JSON Request Example

```json
{
  "tin": "999991130",
  "bhfId": "00",
  "cmcKey": "your-communication-key",
  "lastReqDt": "20200218191141"
}
```

---

## Response Object: `NoticeSearchRes`

### Top-Level Fields

| Field | Description | Type |
|------|-------------|------|
| `resultCd` | Result code (`000` indicates success) | CHAR(3) |
| `resultMsg` | Result message | CHAR |
| `resultDt` | Response date and time | CHAR(14) |

---

### Notice List (`noticeList`)

Each entry represents a single official notice.

| Field | Description | Type | Length |
|------|-------------|------|-------:|
| `noticeNo` | Notice number | NUMBER | — |
| `title` | Notice title | CHAR | 1000 |
| `cont` | Notice content | CHAR | 4000 |
| `dtlUrl` | Detail URL | CHAR | 200 |
| `regrNm` | Registered by | CHAR | 60 |
| `regDt` | Registration date and time | CHAR | 14 |

---

### JSON Response Example

```json
{
  "resultCd": "000",
  "resultMsg": "It is succeeded",
  "resultDt": "20200226191722",
  "data": {
    "noticeList": [
      {
        "noticeNo": 42,
        "title": "Notice Test [2020.02.18]",
        "cont": "Notice Test [2020.02.18]\r\n\r\nNotice Test [2020.02.18]",
        "dtlUrl": "http://localhost:9980/common/link/ebm/receipt/indexEbmNotice?noticeNo=42",
        "regrNm": "Administrator",
        "regDt": "20200218191141"
      }
    ]
  }
}
```

> ✅ A `resultCd` of `000` indicates that the request completed successfully.

---

## SDK Usage Examples

<Tabs>
  <TabItem value="php" label="PHP" default>

```php
$notices = $client->selectNoticeList([
    'lastReqDt' => lastReqDt('-30 days')
]);

$noticeList = $notices['data']['noticeList'] ?? [];

echo "Notices found: " . count($noticeList) . PHP_EOL;

foreach ($noticeList as $notice) {
    echo "- Notice No: {$notice['noticeNo']}" . PHP_EOL;
    echo "  Title: {$notice['title']}" . PHP_EOL;
    echo "  Contents: {$notice['cont']}" . PHP_EOL;
    echo "  Detail URL: {$notice['dtlUrl']}" . PHP_EOL;
    echo "  Registered by: {$notice['regrNm']}" . PHP_EOL;
    echo "  Registration Date: {$notice['regDt']}" . PHP_EOL . PHP_EOL;
}
```

  </TabItem>

  <TabItem value="js" label="JavaScript / Typescript">

```ts
const response = await client.selectNoticeList({
  lastReqDt: formatDateForEBM(-30),
});

const notices = response.data?.noticeList || [];
console.log(`Found ${notices.length} notices`);

notices.forEach(notice => {
  console.log(`- [${notice.noticeNo}] ${notice.title}`);
});
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
notices = client.select_notice_list({
    'lastReqDt': last_req_dt(-30)
})

notice_list = notices.get('data', {}).get('noticeList', [])
print(f"Notices found: {len(notice_list)}")

for notice in notice_list:
    print(f"- Notice No: {notice['noticeNo']}")
    print(f"  Title: {notice['title']}")
    print(f"  Contents: {notice['cont']}")
    print(f"  Detail URL: {notice['dtlUrl']}")
    print(f"  Registered by: {notice['regrNm']}")
    print(f"  Registration Date: {notice['regDt']}\n")
```

  </TabItem>
</Tabs>


---

## Best Practices

- Check for new notices regularly (daily or weekly).
- Display notices clearly to users.
- Store processed notice numbers to avoid duplicate handling.
- Do not modify or suppress official notice content.

---

## Next Steps

* 👉 **[Customers](./customers/select-customer)**
* 👉 **[Code Lists](./select-code-list)**
* 👉 **[Sales Transactions](./purchases/save-sales-transaction)**

