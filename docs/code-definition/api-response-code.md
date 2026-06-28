---
id: api-response-code
title: API Response Code
---

# API Response Code

This document lists the API response codes returned by the RRA API, including the response code, the originating system, and a description of each response.

| Code | System | Description |
|------|--------|-------------|
| 000 | Server | Request succeeded. |
| 001 | Server | No search results found. |
| 891 | Client | An error occurred while creating the request URL. |
| 892 | Client | An error occurred while creating the request headers. |
| 893 | Client | An error occurred while creating the request body. |
| 894 | Client | A server communication error occurred. |
| 895 | Client | An invalid request method was used. |
| 896 | Client | A request status error occurred. |
| 899 | Client | A client error occurred. |
| 900 | Server | Header information is missing. |
| 901 | Server | Invalid device. |
| 902 | Server | This device is already installed. |
| 903 | Server | Only **VSDC** devices can be verified. |
| 910 | Server | Request parameter error. |
| 911 | Server | Request body is missing. |
| 912 | Server | Invalid request method. |
| 921 | Server | Sales or sales invoice data that has already been declared cannot be received. |
| 922 | Server | Sales invoice data can only be received after the corresponding sales data has been received. |
| 990 | Server | The maximum number of views has been exceeded. |
| 991 | Server | An error occurred during registration. |
| 992 | Server | An error occurred during modification. |
| 993 | Server | An error occurred during deletion. |
| 994 | Server | Duplicate data exists. |
| 995 | Server | No downloaded file was found. |
| 999 | Server | An unknown error occurred. Please contact the administrator. |