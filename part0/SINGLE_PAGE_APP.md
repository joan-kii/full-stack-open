# Single Page App Diagram

```mermaid
sequenceDiagram
participant Browser
participant Server
activate Browser
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
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
deactivate Browser
activate Server
Server-->>Browser: SPA JavaScript File
deactivate Server
activate Browser
Note left of Browser: Execute JavaScript Code fetch data.json
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
deactivate Browser
activate Server
Server-->>Browser: JSON File
deactivate Server
activate Browser
Note left of Browser: Execute callback function and render the notes 
deactivate Browser
````