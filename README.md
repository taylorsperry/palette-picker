# Palette Picker
This is a REST API to track projects and associated color palettes.

## Make Requests
- Use GET, POST, DELETE endpoints view, add to, or delete from the API.

## Initial:
The base url to make requests to the api:
#### `https://liz-taylor-palette.herokuapp.com`

#### GET `/api/v1/projects` (All Projects)
The response sends all the projects in the database:

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects` example:
```json
[
  {
    "id": "1",
    "name": "My Project",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  },
  {
    "id": "2",
    "name": "My New Project",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  }
]
```

#### GET `/api/v1/projects/:id` (Request Single Project)
Response will send a single project that matches the id parameter in the request.

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/1` example:
```json
[
  {
    "id": "1",
    "name": "My Project",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  }
]
```

#### POST `/api/v1/projects/` (Create New Project)
A user can add an additional project the database. Below is the required parameters and an example post.

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| name         | string    | unique name for each project            |

POST options object example:
```json
  {
    "method": "PUT",
    "body": "JSON.stringify({name: 'New Project Name'})",
    "headers": { 
      "Content-Type": "application/json"
    }
  }
```

#### PUT `/api/v1/projects/:id` (Edit Existing Project)
A user can edit a saved project in the database. Below is the required parameters and an example post.

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| name         | string    | updated name for the project            |

PUT options object example:
```json
  {
    "method": "PUT",
    "body": "JSON.stringify({name: 'New Project Name'})",
    "headers": { 
      "Content-Type": "application/json"
    }
  }
```

#### DELETE `/api/v1/projects/:id` (Delete Existing Project)
A user can edit a saved project in the database. Below is the required parameters and an example post.

| Name         | type         | Description                             |
| :------------|:-------------|:----------------------------------------|
| id           | req.param    | request parameter from request url      |
