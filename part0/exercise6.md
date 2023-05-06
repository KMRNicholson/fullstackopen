Below you can find a sequence diagram depicting the interaction between the user's browser and the example app web server when the user creates new notes using the form at: https://studies.cs.helsinki.fi/exampleapp/spa

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: Update notes list
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>server: Update data.json
    server-->>browser: Status code 201
    deactivate server

    browser->>browser: Console log response text
```