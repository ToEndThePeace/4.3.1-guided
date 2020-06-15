# Node Auth 1 Guided Project

Guided project for **Node Auth 1** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.

## Sessions

- a session store is like a table on the server
- each session stores information about a client
- on every request, give the server proof of who you are - AUTH
- sessions can store any information about the client

## Cookies

- a cookie is a way to send key/value data across http
- cookies are nothing but **CONTAINERS FOR DATA**

## Server

- store a session for the client
- send a cookie with the session id

## HTTP Header Cookie Example

```javascript
    const httpMessage = {
      headers: {
        set-cookie: {name, value}
      }
    }
```
