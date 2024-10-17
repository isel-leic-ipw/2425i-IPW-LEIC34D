# Introduction to the Web

> "The World Wide Web (WWW, or simply Web) is an information space in which the items of interest, referred to as resources, are identified by global identifiers called Uniform Resource Identifiers (URI)."
>
> Source: [Architecture of the World Wide Web, Volume One](https://www.w3.org/TR/webarch/)
- *Directory tree model* is not good enough!
    - Need hypertexts to link the resources.
- Web Application:
    - Most popular type of application on the Internet.
    - A computer network perspective:
        - Application Layer Protocol: HTTP.
        - Transport Protocol: TCP.

| Application           | Application Layer Protocol                                         | Underlying Transport Protocol |
|-----------------------|--------------------------------------------------------------------|-------------------------------|
| Electronic Mail        | SMTP [RFC 5321]                                                    | TCP                           |
| Remote Terminal Access | Telnet [RFC 854]                                                   | TCP                           |
| **Web**               | **HTTP [RFC 2616]**                                                | **TCP**                       |
| File Transfer         | FTP [RFC 959]                                                      | TCP                           |
| Streaming multimedia  | HTTP (for example, YouTube)                                        | TCP                           |
| TVoice over IP        | SIP [RFC 3261], RTP [RFC 3550] or proprietary (for example, Skype) | UDP or TCP                    |

## Brief History

- Tim Berners-Lee defines the WWW (World Wide Web) in 1990.
    - In 1989, he presented a proposal concerning the management of general information about accelerators and experiments at CERN. 
    - "I decided on 'World Wide Web' when writing the code in 1990."
    - https://www.w3.org/History/1989/proposal.html
- In 1991, the WWW (or Web) was published.
    - The HyperText Transfer Protocol (HTTP).
    - The HyperText Markup Language (HTML).
    - The first HTTP server running at CERN: CERN httpd.
    - The first Web browser: [WorldWideWeb](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html).
- Next years, several browsers were developed, such as:
    - [ViolaWWW](https://en.wikipedia.org/wiki/ViolaWWW)(1992), for X Window System (Unix-based).
    - NCSA [Mosaic](https://www.ncsa.illinois.edu/research/project-highlights/ncsa-mosaic/) (1993), cross-platform.
        - For X Windows, MS Windows and Macintosh.
- In 1993, NCSA HTTPd server was developed.
- In 1994, [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator) was released based on Mosaic, also cross-platform.
    - Most popular browser of the 1990s.
    - In 1995, JavaScript was officially released (was standardized as ECMAScript in 1997).
- In 1994, Tim Berners-Lee founded the World Wide Web Consortium (W3C).
    - The main international standards organization for the WWW.
    - Maintains technical specifications for HTML, CSS, SVG, the Semantic Web stack, XML, and other technologies.
- In 1995, the [Internet Explorer](https://pt.wikipedia.org/wiki/Internet_Explorer_1) was released with Windows 95 OS.
- In 1995, Google released a web tool, the **Google search engine**.
- Other browser (*e.g.*, Firefox, Opera, Chrome) were created since then.
- Since 1995, more than 10,000 Web servers around the world!

## Web Architecture

- Originally, a client-server.
    - 2-Tier or 3-Tier layer.
    - Currently, an N-Tier layer architecture.
- Orthogonal (independent) concepts:
    - Identification: **resources** are identified with **URIs**.
        - Example: an URL of a web document.
    - Interaction: agents may use a **URI** to access the referenced **resource** with a protocol.
        - Example: HTTP.
    - Representation: **representation format** of a identified **resource**.
        - Example: HTML representation of a web document.

![Source: https://www.w3.org/TR/webarch/uri-res-rep.png](https://www.w3.org/TR/webarch/uri-res-rep.png)

## Resources

- A **resource** is defined by to be anything that has identity on the Web.
- Examples:
    - documents, files, menu items, machines, services, people, organizations, and concepts.

## URI

- Uniform Resource Identifier (URI) identifies a single resource.
- It is a character sequence with a **syntax scheme**.
- Relation 1:N:
    - A resource can have more than one URI.
        - URI aliases.
    - An URI identifies only one resource.
- [RFC 1630](https://datatracker.ietf.org/doc/html/rfc1630).
- Syntax:
    ```
    URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]
    ```
    - Where:
        ```
        authority = [userinfo "@"] host [":" port]
        ```
- Syntax diagram:
![Syntax Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/URI_syntax_diagram.svg/1068px-URI_syntax_diagram.svg.png)

- Examples:
    ```
      foo://example.com:8042/over/there?name=ferret#nose
      \_/   \______________/\_________/ \_________/ \__/
       |           |            |            |        |
    scheme     authority       path        query   fragment
       |   _____________________|__
      / \ /                        \
      urn:example:animal:ferret:nose
    ```
- Details:
    - userinfo: an `username:password` (not used anymore for security reasons).
    - path: hierarchical path with segments separated by slash (/).
    - query: is preceded by a question mark (?), consisting of a query string of non-hierarchical data.
    - fragment: is preceded by a hash (#) that contains a fragment identifier providing direction to a secondary resource (*e.g.*, section).

### URI Schemes

- An URI scheme specifies the syntax/semantic of a URI.
    - An URI scheme name is typically a name before the colon (":").
- Examples of popular schemes:
    - http, https, ftp, mailto, file, data.
- Examples of URIs from various schemes:
    - http://weather.example.com/
    - mailto:joe@example.org
    - ftp://example.org/aDirectory/aFile
    - news:comp.infosystems.www
    - tel:+1-816-555-1212
    - ldap://ldap.example.org/c=GB?objectClass?one
    - urn:isbn:0-486-27557-4
- In http://weather.example.com/, the "http" part is a URI scheme name.
- The Internet Assigned Numbers Authority (IANA) maintains a registry of mappings between URI scheme names and scheme specifications.
    - All URI schemes: https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
    - 'http' URI scheme is defined in [RFC2616](https://www.ietf.org/rfc/rfc2616.txt).
- Fragment identifiers: the string after '#'.
    - Identify a secondary resource by reference to a primary resource.
    - Example: `http://weather.example.com/oaxaca#weekend`
    - 'weekend' is the fragment identifier that identify the secondary resource.


### URL

- Uniform Resource Locators (URL).
- URL is a URI for locating resources over the Internet.
- [RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738).
- Example for HTTP URL:
    - `http://example.com/somepath/?id=123`
- 'host' gives the **locate** from the resource.
    - Domain Naming System (DNS) resolves the hostname to an IP.

### URN

- Uniform Resource Name (URN).
- URNs are intended to serve as persistent, location-independent, resource identifiers.
- IANA URN schemes: https://www.iana.org/assignments/urn-namespaces/urn-namespaces.xhtml
- Examples:
    - urn:isbn:0-486-27557-4
    - urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66

## HTTP

- Hypertext Transport Protocol (HTTP) [[RFC 1945](https://datatracker.ietf.org/doc/html/rfc1945); [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616)].
    - Follows the **client-server** model.
    - **Stateless** connection.
- Based on **request-response** pattern.
    - Client (the agent-user) **requests** a document to the server.
    - Server returns a **response**.
- HTTP default port: 80
- HTTPS (HTTP for Secure) default port: 443

### HTTP Messages

![HTTP message Image](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)

### HTTP Request

- First single line contains:
    - **Method**: the request method, *e.g.* GET, POST, ...
    - **Request target**: URI request.
    - **Version**: HTTP version, *e.g.*, HTTP/1.1.
- Headers: list of header fields.
- Body: resource for the request (*e.g.*, for the POST method), if any.

![HTTP Request message Image](https://mdn.github.io/shared-assets/images/diagrams/http/overview/http-request.svg)

#### Request Methods

| Method  | Description                                                                                                 |
|---------|-------------------------------------------------------------------------------------------------------------|
| GET     | Requests a representation of the specified resource.                                                        |
| HEAD    | Asks for a response identical to a GET request, but without a response body.                                |
| POST    | Submits an entity to the specified resource, often causing a change in state or side effects on the server. |
| PUT     | Replaces all current representations of the target resource with the request content.                       |
| DELETE  | Deletes the specified resource.                                                                             |
| CONNECT | Establishes a tunnel to the server identified by the target resource.                                       |
| OPTIONS | Requests permitted communication options for a given URL or server.                                                |
| TRACE   | Performs a message loop-back test along the path to the target resource.                                    |

#### Request URI

- **`*`**: means that the request does not apply to a particular resource.
    - *e.g.*, `OPTIONS * HTTP/1.1`
    - The above method indicates that the client wishes to request OPTIONS for the server as a whole.
- **abs_path**: most common way.
    - *e.g.* (`Host` header is necessary): 
    ```http
    GET /pub/WWW/TheProject.html HTTP/1.1
    Host: www.w3.org
    ```
- **absoluteURI**: required when the request is being made to a proxy.
    - *e.g.*, `GET http://www.w3.org/pub/WWW/TheProject.html HTTP/1.1`
- **authority**: used with CONNECT method.

### HTTP Response

- First single line contains:
    - **HTTP version**.
    - **Status code**.
    - **Status reason-phrase**.
- Header: list of header fields.
- Body: resource for the response (*e.g.*, response for a GET), if any.

![HTTP Response Message Image](https://mdn.github.io/shared-assets/images/diagrams/http/overview/http-response.svg)

#### Status Code

- Indicates whether a specific HTTP request has been successfully completed. 
- Five classes:
    1. Informational responses (100 – 199)
        - *e.g.*, code `100 Continue` indicates the client to continue sending data (if the client asks the server to prepare to receive a PUT request, for example).
    2. Successful responses (200 – 299)
        - *e.g.*, code `200 Ok` indicates success.
    3. Redirection messages (300 – 399)
        - *e.g.*, code `302 Found` indicates that the requested resource has temporarily moved to a new location.
    4. Client error responses (400 – 499)
        - *e.g.*, code `404 Not Found` indicates that the server cannot find the requested resource.
        - https://surfonthe.net/clever-404-error-pages/
    5. Server error responses (500 – 599)
        - *e.g.*, code `500 Internal Server Error` indicates a generic error on the server side.
- See [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for a complete status code list.

### HTTP Headers

- Message headers:
    - Apply to both request and response messages and relate to the message itself rather than the entity body.
        - Headers related to intermediaries (*e.g.*, proxy), including `Cache-Control`, and `Via`.
        - Headers related to the message, including `Transfer-Encoding`, and `Trailer`.
        - Headers related to the request, including `Connection`, `Upgrade`, and `Date`.
- Request headers:
    - Apply generally to the request message.
        - Headers about the request, including `Host`, and `Expect`.
        - Headers for authentication credentials, including `User-Agent` and `From`.
        - Headers for content negotiation, including `Accept`, `Accept-Language`, and `Accept-Encoding`.
        - Headers for conditional requests, including `If-Match`, `If-None-Match`, and `If-Modified-Since`.
- Response headers:
    - Apply to the response message and not the entity body.
        - Headers for providing information about the target resource, including `Allow`, and `Server`.
        - Headers providing additional control data, such as `Age` and `Location`.
        - Headers related to the selected representation, including `ETag`, `Last-Modified`, and `Vary`.
        - Headers related to authentication challenges, including `Proxy-Authenticate`, and `WWW-Authenticate`.
- Representation headers:
    - Apply generally to the request or response entity body (content).
        - Headers about the entity body itself including `Content-Type`, `Content-Length`, `Content-Location`, and `Content-Encoding`.
    - Headers related to caching of the entity body, including `Expires`.
- Request example:
    ```http
    GET /teaching/webpage-sample HTTP/1.1
    Host: www.smplanet.com
    Accept: text/html,application/xhtml+xml
    Accept-Encoding: gzip, deflate
    Accept-Language: pt-PT,pt-BR,pt,en-US,en
    Cache-Control: max-age=0
    Connection: keep-alive
    If-Modified-Since: Mon, 03 Jun 2019 21:56:21 GMT
    If-None-Match: "790-58a726f45cb8f-gzip"
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
    ```
- Response example:
    ```http
    HTTP/1.1 200 OK
    Date: Fri, 11 Oct 2024 18:08:29 GMT
    Server: Apache
    Upgrade: h2
    Connection: Upgrade, Keep-Alive
    Last-Modified: Mon, 03 Jun 2019 21:56:21 GMT
    ETag: "790-58a726f45cb8f-gzip"
    Accept-Ranges: bytes
    Cache-Control: max-age=600
    Expires: Fri, 11 Oct 2024 18:18:29 GMT
    Vary: Accept-Encoding,User-Agent
    Content-Encoding: gzip
    Content-Length: 1016
    Keep-Alive: timeout=5, max=100
    Content-Type: text/html 
    ```

### HTTP Versions

- HTTP/1.0 [RFC 1945](https://datatracker.ietf.org/doc/html/rfc1945)
    - Allowed only one request to be outstanding at a time on a given TCP connection.
- HTTP/1.1 [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616)
    - Persistent protocol with pipeline: multiple requests along the same TCP connection without waiting for a response to each.
- HTTP/2 [RFC 9113](https://datatracker.ietf.org/doc/html/rfc9113)
    - Multiplexing, binary message framing, allows prioritization of requests.
- HTTP/3 [RFC 9114](https://datatracker.ietf.org/doc/html/rfc9114)
    - Introduction of the QUIC protocol.

## Testing HTTP Requests

- Example tools:
    - VScode extension: **Rest Client** from Huachao Mao.
        - Installation guide: in extensions, search for **Rest Client** and install the tool on VScode.
    - Postman:
        - https://www.postman.com/downloads/
        - Also as add-on in Edge Browser ([Postman Interceptor](https://microsoftedge.microsoft.com/addons/detail/postman-interceptor/nbjbemmokmdpdokpnbfpdfbikmhgilmc)).
    - Restman extension for chrome:
        - https://chromewebstore.google.com/detail/restman
- View response:
    - Inspect mode in the browser, tab *Network*.

## Request Examples with Fetch

- HTTP GET: [examples/test-http-get-fetch.mjs](examples/test-http-get-fetch.mjs)
- HTTP POST: [examples/test-http-post-fetch.mjs](examples/test-http-post-fetch.mjs)