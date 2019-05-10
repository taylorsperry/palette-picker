# Palette Picker
This is a REST API to track projects and associated color palettes.

## Make Requests
- Use GET, POST, DELETE endpoints view, add to, or delete from the API.

## Initial:
The base url to make requests to the api:
#### `https://liz-taylor-palette.herokuapp.com`

#### GET `/api/v1/projects` (All Projects)
The response sends all the projects in the database:

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| name         | string    | unique name for each project            |

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects` example:
```json
[
  {
    "name": "My Project",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  }
]
```

#### GET `/api/v1/parties/:id` (Request Single Party)
Response will send a single party that matches the id parameter in the request

Response from `https://deleted-tweets.herokuapp.com/api/v1/parties/1` example:
```json
[
  {
    "id": 1,
    "name": "Democratic Party",
    "symbol": "Donkey",
    "founded": "1828",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  },
]
```

#### POST `/api/v1/parties/` (Create New Party)
A user can add an additional tweet to the database. Below is the required parameters and an example post.

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| name         | string    | name of party                                   |
| symbol       | string    | symbol of party                                 |
| founded      | string    | year party was founded                          |

POST Party Example:
```json
 {
  "name": "Independent Party", 
  "symbol": "Eagle", 
  "founded": "1967"
 }
```
