# New Note Diagram

```mermaid
sequenceDiagram
Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate Server
Note right of Server: Server Update Notes { content: "joankii was here", date: "2023-06-13T02:57:39.158Z" }
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
Note left of Browser: Execute callback function and render the notes 
````
