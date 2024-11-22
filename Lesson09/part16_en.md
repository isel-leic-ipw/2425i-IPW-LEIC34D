# Elasticsearch

## Definition

- Elasticsearch is an open-source, distributed search and analytics engine.
- Built on top of Apache Lucene.
    - An open-source search library written in Java, designed for building search applications.
- Designed for scalability, reliability, and real-time search capabilities.

### Core Features

- **Full-Text Search**: Ability to perform complex search queries on structured and unstructured data.
- **Analytics**: Real-time analysis of data with aggregation capabilities.
- **Scalability**: Handles large volumes of data across multiple nodes and clusters seamlessly.
- **RESTful API**: Communication through simple HTTP requests.

### Architecture

- **Nodes and Clusters**: A single Elasticsearch installation is called a node; multiple nodes form a cluster.
- **Indices**: Data is organized in indices, akin to databases in SQL systems.
- **Shards**: Indices are split into shards for distributed data storage and processing.
- **Replicas**: Copies of shards to ensure high availability and fault tolerance.

### Data Indexing

- **JSON Document Structure**: Data is indexed in a document-oriented format using JSON.
- **Schema-Free**: Automatically detects the structure of the data allowing for dynamic mapping.

## Installation and Execution

- Dependency: Java Runtime.
- This is a simple guide to install and execute Elasticsearch:
    - Download the compressed files (.zip or tar.gz) from the [Elasticsearch install packages](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-install-packages);
    - Extract the files from the compressed downloaded file;
    - Disable security configurations for tests:
        - Open the file `config/elasticsearch.yml` and set the following properties to false:
            ```yaml
            xpack.security.enabled: false
            xpack.security.enrollment.enabled: false
            ```
    - From a terminal (*e.g.*, Powershell), go to directory of the Elasticsearch extracted files;
    - Execute the Elasticsearch (for Windows):
        ```ps
        .\bin\elasticsearch.bat
        ```
    - Execute the Elasticsearch (for Linux/MacOS):
        ```bash
        ./bin/elasticsearch
        ```
    - Wait the Elasticsearch inits (it may take time);
    - Then, Elasticsearch database server is available at (by default): http://localhost:9200
    - Get basic information:
        ```http
        GET http://localhost:9200
        ```

## Usage

- See the [documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html).

### Indices

- A logical namespace for storing data that share similar characteristics.
- An index is a **collection of documents** uniquely identified by a name or an alias.
- Creation of an index: 
    - Optional, because Elasticsearch creates automatically the index when a document is created.
    ```http
    PUT /books
    Host: localhost:9200
    ``` 
- Get all indices:
    ```http
    GET /*
    Host: localhost:9200
    ```
- Example of response:
    ```http
    HTTP/1.1 200 OK
    X-elastic-product: Elasticsearch
    content-type: application/json
    content-encoding: gzip
    transfer-encoding: chunked

    {
    "books": {
        "aliases": {},
        "mappings": {
        "properties": {
            "author": {
            "type": "text",
            "fields": {
                "keyword": {
                "type": "keyword",
                "ignore_above": 256
                }
            }
            },
            "name": {
            "type": "text",
            "fields": {
                "keyword": {
                "type": "keyword",
                "ignore_above": 256
                }
            }
            },
            "page_count": {
            "type": "long"
            },
            "release_date": {
            "type": "date"
            }
        }
        },
        "settings": {
        "index": {
            "routing": {
            "allocation": {
                "include": {
                "_tier_preference": "data_content"
                }
            }
            },
            "number_of_shards": "1",
            "provided_name": "books",
            "creation_date": "1731937503116",
            "number_of_replicas": "1",
            "uuid": "CWggUky5TPek8Otm7clUZg",
            "version": {
            "created": "8518000"
            }
        }
        }
    }
    }
    ```


### Documents and Fields

- Elasticsearch serializes and stores data in the form of **JSON documents**.
- A document is a set of fields, which are key-value pairs that contain the data. 
- Each document has a unique ID.
    - You can create, or
    - have Elasticsearch **auto-generate** (a better option).

#### Creating a document in the books index:

- Using the path URI `/books/_doc`:
    ```http
    POST /books/_doc
    Host: localhost:9200
    Content-Type: application/json

    {
        "name": "The Handmaids Tale",
        "author": "Margaret Atwood", 
        "release_date": "1985-06-01", 
        "page_count": 311
    }
    ``` 
- A correspond response is:
    ```http
    HTTP/1.1 201 Created
    Location: /books/_doc/tXqoP5MBYf62TULrz1M8
    X-elastic-product: Elasticsearch
    content-type: application/json
    content-encoding: gzip
    content-length: 156

    {
        "_index": "books",
        "_id": "tXqoP5MBYf62TULrz1M8",
        "_version": 1,
        "result": "created",
        "_shards": {
            "total": 2,
            "successful": 1,
            "failed": 0
        },
        "_seq_no": 0,
        "_primary_term": 1
    }
    ```

#### Listing books documents:

- Using the path URI `/books/_search`:
    ```http
    GET /books/_search
    Host: localhost:9200

    ```

#### Listing books documents with a filter:

- Example: Filter documents from `/books` by `author='Margaret Atwood'`.
    ```http
    POST /books/_search
    Host: localhost:9200
    Content-Type: application/json

    {
        "query": {
            "match": {
                "author": "Margaret Atwood"
            }
        }
    }
    ```

#### Getting a document from /books by Id:

- The id's example is `nnq0OZMBYf62TULrV1M3`:
    ```http
    GET /books/_doc/nnq0OZMBYf62TULrV1M3
    Host: localhost:9200

    ```

#### Updating a document from /books by Id: 

- Update the name of the book with id 'nnq0OZMBYf62TULrV1M3':
    ```http
    PUT /books/_doc/nnq0OZMBYf62TULrV1M3
    Host: localhost:9200
    Content-Type: application/json

    {
        "name": "The Great Gatsby",
        "author": "Francis Scott Fitzgerald",
        "release_date": "1925-04-10",
        "page_count": 180
    }
    ```

#### Deleting a document from /books by Id:

- Delete the book with id `oHroOZMBYf62TULrT1OG`:
    ```http
    DELETE /books/_doc/oHroOZMBYf62TULrT1OG
    Host: localhost:9200
    ```

## Tasks Web API with Elasticsearch

- In `data/`, separate in two directories:
    - `elastic`: contains the Elasticsearch data handler for tasks and users.
    - `memory`: contains the memory data handler for tasks and users.

### Code

- The code is available at: [example-tasks-v1.2.0/](example-tasks-v1.2.0/)