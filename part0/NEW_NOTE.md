sequenceDiagram
Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note right of Server: Server Update Notes { content: "joankii was here", date: "2023-06-13T02:57:39.158Z" }
Server->>Browser: Redirect https://studies.cs.helsinki.fi/exampleapp/notes
Note left of Browser: Code 302
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
Server->>Browser: HTML Document
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server->>Browser: CSS File
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server->>Browser: JavaScript File
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server->>Browser: JavaScript File
Note left of Browser: Execute JavaScript Code fetch data.json
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server->>Browser: JSON File
Note left of Browser: Execute callback function and render the notes 
