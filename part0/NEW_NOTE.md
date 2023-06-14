# New Note Diagram

```mermaid
sequenceDiagram
participant Browser
participant Server
Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate Server
Note right of Server: Server Update Notes
Note right of Server: { content: "joankii was here",
Note right of Server: date: "2023-06-13T02:57:39.158Z" }
Server-->>Browser: Redirect https://studies.cs.helsinki.fi/exampleapp/notes
deactivate Server
activate Browser
Note left of Browser: Code 302
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
deactivate Browser
activate Server
Server-->>Browser: HTML Document
deactivate Server
activate Browser
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
deactivate Browser
activate Server
Server-->>Browser: CSS File
deactivate Server
activate Browser
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
deactivate Browser
activate Server
Server-->>Browser: JavaScript File
deactivate Server
activate Browser
Note left of Browser: Execute JavaScript Code fetch data.json
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
deactivate Browser
activate Server
Server-->>Browser: JSON File
deactivate Server
activate Browser
Note left of Browser: Execute callback function
Note left of Browser: Render the notes
deactivate Browser
````
