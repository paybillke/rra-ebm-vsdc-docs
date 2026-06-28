Here is the cleaned-up and finalized **API Reference** document. 

I have removed the raw, unformatted text dump at the bottom (which referenced the legacy VSDC endpoints and object names) and ensured the table strictly reflects the **RRA EBM / OSCU** API specifications we have been documenting throughout this session.

---

title: API Reference
sidebar_label: API Reference
---

# RRA EBM API Reference

This section documents the available **RRA EBM (Electronic Billing Machine) / OSCU API functions**, their request/response objects, and preconditions. Each function belongs to a **module** such as Initialization, Code Lists, Taxpayers & Branches, Items, Imported Items, Transactions, Stock, and Notices.

---

## List of EBM Functions

| Section | Class / Module | Method | Description | Precondition | Request Object | Response Object |
|--------|----------------|--------|------------|-------------|----------------|----------------|
| **Initialization** | Device Verification | `execute` | Lookup initial setup information of EBM device | Basic data management | [`DeviceVerificationReq`](initialization/device-verification) | [`DeviceVerificationRes`](initialization/device-verification) |
| **Code Lists** | Code | `search` | Lookup list of common codes (Tax Types, Units, etc.) | - | [`CodeSearchReq`](codes/select-code-list) | [`CodeSearchRes`](codes/select-code-list) |
| **Code Lists** | Item Classification | `searchCls` | Lookup list of item classifications | - | [`ItemClsSearchReq`](codes/select-item-classifications) | [`ItemClsSearchRes`](codes/select-item-classifications) |
| **Taxpayers & Branches** | Taxpayer | `search` | Lookup taxpayer (customer) information | - | [`CustSearchReq`](taxpayers/select-taxpayer) | [`CustSearchRes`](taxpayers/select-taxpayer) |
| **Taxpayers & Branches** | Branch | `search` | Lookup list of branch info | - | [`BhfSearchReq`](taxpayers/select-branches) | [`BhfSearchRes`](taxpayers/select-branches) |
| **Taxpayers & Branches** | Branch Customer | `save` | Save branch customer information | - | [`BhfCustSaveReq`](taxpayers/save-branch-customer) | [`BhfCustSaveRes`](taxpayers/save-branch-customer) |
| **Taxpayers & Branches** | Branch User | `save` | Save branch user account | - | [`BhfUserSaveReq`](taxpayers/save-branch-user) | [`BhfUserSaveRes`](taxpayers/save-branch-user) |
| **Taxpayers & Branches** | Insurance | `save` | Save insurance company info | - | [`BhfInsuranceSaveReq`](taxpayers/save-branch-insurance) | [`BhfInsuranceSaveRes`](taxpayers/save-branch-insurance) |
| **Items** | Item | `search` | Lookup list of items (products) | - | [`ItemSearchReq`](items/select-items) | [`ItemSearchRes`](items/select-items) |
| **Items** | Item | `save` | Save item information | - | [`ItemSaveReq`](items/save-item) | [`ItemSaveRes`](items/save-item) |
| **Items** | Item Composition | `save` | Save item composition (BOM) | - | [`ItemCompositionSaveReq`](items/save-item-composition) | [`ItemCompositionSaveRes`](items/save-item-composition) |
| **Imported Items** | Import Item | `search` | Lookup imported items | - | [`ImportItemSearchReq`](imports/select-imported-items) | [`ImportItemSearchRes`](imports/select-imported-items) |
| **Imported Items** | Import Item | `update` | Revise imported item status/details | - | [`ImportItemUpdateReq`](imports/update-imported-item) | [`ImportItemUpdateRes`](imports/update-imported-item) |
| **Transactions** | Sales | `save` | Save sales transaction | - | [`TrnsSalesSaveWrReq`](transactions/save-sales-transaction) | [`TrnsSalesSaveWrRes`](transactions/save-sales-transaction) |
| **Transactions** | Purchase/Sales | `search` | Lookup purchase and sales transactions | - | [`TrnsPurchaseSalesReq`](transactions/select-purchases-sales) | [`TrnsPurchaseSalesRes`](transactions/select-purchases-sales) |
| **Transactions** | Purchase | `save` | Save purchase transaction | - | [`TrnsPurchaseSaveReq`](transactions/save-purchase) | [`TrnsPurchaseSaveRes`](transactions/save-purchase) |
| **Stock** | Stock Master | `save` | Save stock master info | - | [`StockMasterSaveReq`](stock/save-stock-master) | [`StockMasterSaveRes`](stock/save-stock-master) |
| **Stock** | Stock Movement | `getMoveList` | Lookup stock movement list | - | [`StockMoveReq`](stock/select-stock-movement) | [`StockMoveRes`](stock/select-stock-movement) |
| **Stock** | Stock IO | `save` | Save stock in/out info | - | [`StockIoSaveReq`](stock/save-stock-io) | [`StockIoSaveRes`](stock/save-stock-io) |
| **Notices** | Notice | `search` | Lookup list of notices from RRA | - | [`NoticeSearchReq`](notices/select-notice-list) | [`NoticeSearchRes`](notices/select-notice-list) |

---

### Notes

-   **Authentication**: Almost all **Request Objects** (`Req`) require mandatory authentication fields (`tin`, `bhfId`, `cmcKey`) to be included in the payload. The `cmcKey` is obtained during the **Device Initialization** step.
-   **Response Structure**: Each **Response Object** (`Res`) follows a standard envelope containing `resultCd` (status code, where `000` means success), `resultMsg`, `resultDt`, and a `data` object.
-   **Navigation**: Functions are grouped into **modules** for easier navigation. Click the links in the table to jump to the **detailed API documentation** for each function.
-   **Caching**: Master data APIs (Code Lists, Item Classifications, Branches) should be cached locally and refreshed periodically using the `lastReqDt` parameter to minimize server load.