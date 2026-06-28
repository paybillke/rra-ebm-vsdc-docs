---
title: API Reference
sidebar_label: API Reference
---

# RRA VSDC API Reference

This section documents the available **RRA VSDC / EBM 2.1 API functions**, their request/response objects, and operational sequence. Your CIS/ERP calls these paths on the locally deployed VSDC service, and VSDC communicates with the RRA EBM API server.

---

## Function Categories

| Category | Direction | Purpose |
| -------- | --------- | ------- |
| Initialization | Send only | Authenticate and initialize the VSDC device. |
| Basic data management | Get only | Retrieve standard codes, item classifications, taxpayers, branches, and notices. |
| Branch information management | Send only | Send branch customers, users, and insurance information. |
| Product item management | Get and send | Retrieve item lists and send item/item-composition information. |
| Imported item management | Get and send | Retrieve imported items and send revised/converted import data. |
| Sales transaction management | Send only | Send sales transactions. |
| Purchase transaction management | Get and send | Retrieve purchase-sales transactions and save purchase confirmations. |
| Stock management | Get and send | Retrieve stock movements and send stock in/out plus stock master data. |

---

## List of VSDC Functions

| Section | Class / Module | Method | Description | Precondition | Request Object | Response Object |
|--------|----------------|--------|------------|-------------|----------------|----------------|
| **Initialization** | Device Verification | `/initializer/selectInitInfo` | Lookup initial setup information of VSDC device | RRA approval and device registration | [`InitInfoReq`](initialization) | [`InitInfoRes`](initialization) |
| **Basic Data** | Code | `/code/selectCodes` | Lookup common code list | Initialized VSDC | [`CodeReq`](select-code-list) | [`CodeRes`](select-code-list) |
| **Basic Data** | Item Classification | `/itemClass/selectItemsClass` | Lookup item classifications | Initialized VSDC | [`ItemClsReq`](items/select-item-classes) | [`ItemClsRes`](items/select-item-classes) |
| **Basic Data** | Customer | `/customers/selectCustomer` | Retrieve taxpayer/customer information | Initialized VSDC | [`CustReq`](customers/select-customer) | [`CustRes`](customers/select-customer) |
| **Basic Data** | Branch | `/branches/selectBranches` | Lookup taxpayer branch information | Initialized VSDC | [`BhfReq`](branches/select-branches) | [`BhfRes`](branches/select-branches) |
| **Basic Data** | Notice | `/notices/selectNotices` | Lookup notices from RRA | Initialized VSDC | [`NoticeReq`](select-notice-list) | [`NoticeRes`](select-notice-list) |
| **Branches** | Branch Customer | `/branches/saveBrancheCustomers` | Save branch customer information | Initialized VSDC | [`BhfCustSaveReq`](branches/save-branch-customer) | [`BhfCustSaveRes`](branches/save-branch-customer) |
| **Branches** | Branch User | `/branches/saveBrancheUsers` | Save branch user account | Initialized VSDC | [`BhfUserSaveReq`](branches/save-branch-user) | [`BhfUserSaveRes`](branches/save-branch-user) |
| **Branches** | Insurance | `/branches/saveBrancheInsurances` | Save branch insurance company information | Pharmacy use case | [`BhfInsuranceSaveReq`](branches/save-branch-insurance) | [`BhfInsuranceSaveRes`](branches/save-branch-insurance) |
| **Items** | Item | `/items/selectItems` | Lookup item/product list | Initialized VSDC | [`ItemReq`](items/select-items) | [`ItemRes`](items/select-items) |
| **Items** | Item | `/items/saveItems` | Save item information | Head office/store role | [`ItemSaveReq`](items/save-item) | [`ItemSaveRes`](items/save-item) |
| **Items** | Item Composition | `/items/saveItemComposition` | Save item composition/BOM information | Head office/store role | `ItemCpstSaveReq` | `ItemCpstSaveRes` |
| **Imported Items** | Import Item | `/imports/selectImportItems` | Lookup imported items | Head office/store role | [`ImptItemReq`](imports/select-imported-items) | [`ImptItemRes`](imports/select-imported-items) |
| **Imported Items** | Import Item | `/imports/updateImportItems` | Revise imported item information | After import retrieval | [`ImptItemSaveReq`](imports/update-imported-item) | [`ImptItemSaveRes`](imports/update-imported-item) |
| **Sales** | Sales Transaction | `/trnsSales/saveSales` | Save sales transaction information | Before sales invoice/stock operations | [`TrnsSalesSaveReq`](purchases/save-sales-transaction) | [`TrnsSalesSaveRes`](purchases/save-sales-transaction) |
| **Purchases** | Purchase/Sales | `/trnsPurchase/selectTrnsPurchaseSales` | Lookup purchase-sales transaction list | Head office/store role | [`TrnsPurchaseSalesReq`](purchases/select-purchases) | [`TrnsPurchaseSalesRes`](purchases/select-purchases) |
| **Purchases** | Purchase | `/trnsPurchase/savePurchases` | Save purchase transaction confirmation | After purchase-sales retrieval | [`TrnsPurchaseSaveReq`](purchases/save-purchase) | [`TrnsPurchaseSaveRes`](purchases/save-purchase) |
| **Stock** | Stock Movement | `/stock/selectStockItems` | Lookup stock movement list | Initialized VSDC | [`StockMoveReq`](stock/select-stock-movement) | [`StockMoveRes`](stock/select-stock-movement) |
| **Stock** | Stock IO | `/saveStockItems/saveStockItems` | Save stock in/out information | After related sales invoice where applicable | [`StockIOSaveReq`](stock/save-stock-io) | [`StockIOSaveRes`](stock/save-stock-io) |
| **Stock** | Stock Master | `/stockMaster/saveStockMaster` | Save stock master inventory information | After related stock in/out | [`StockMstSaveReq`](stock/save-stock-master) | [`StockMstSaveRes`](stock/save-stock-master) |

---

### Notes

- **Response structure**: Each response follows a standard envelope containing `resultCd`, `resultMsg`, `resultDt`, and endpoint-specific `data`. Result code `000` means success.
- **Synchronization**: Lookup APIs that include `lastReqDt` return records registered or modified after that timestamp. Store successful timestamps per data category.
- **Sequencing**: Send sales transactions before related invoice/stock operations. Send stock master updates after stock in/out data.
- **Local URL**: Paths are relative to the locally deployed VSDC service, such as `http://localhost:8080`.
