# New Note SPA Diagram

```mermaid
sequenceDiagram
participant Browser
participant Server
activate Browser
Note left of Browser: Execute JavaScript code
Note left of Browser: Rerender notes
Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
deactivate Browser
activate Server
Note right of Server: Receive data in json format
Note right of Server: { content: "joankii was here",
Note right of Server: date: "2023-06-13T02:57:39.158Z" }
Server-->>Browser: Code 201 Created
deactivate Server
````