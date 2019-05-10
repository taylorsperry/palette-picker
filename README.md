# Palette Picker
This is a REST API to track projects and associated color palettes.

## Make Requests
- Use GET, POST, PUT, DELETE endpoints view, add to, update, or delete from the API.

## Initial:
The base url to make requests to the api:
#### `https://liz-taylor-palette.herokuapp.com`

## Projects

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
```
  {
    method: "PUT",
    body: JSON.stringify({name: 'New Project Name'}),
    headers: { 
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
```
  {
    method: "PUT",
    body: JSON.stringify({name: 'New Project Name'}),
    headers: { 
      "Content-Type": "application/json"
    }
  }
```

#### DELETE `/api/v1/projects/:id` (Delete Existing Project)
The project with an id that matches the request paramaters will be deleted from the database.

## Palettes

#### GET `/api/v1/palettes` (All Palettes)
The response sends all the palettes in the database:

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/palettes` example:
```json
[
    {
        "id": 1,
        "palette_name": "Minty Fresh",
        "color_1": "#1C520F",
        "color_2": "#AB3F45",
        "color_3": "#D6AF52",
        "color_4": "#6744C8",
        "color_5": "#37A5F4",
        "project_id": 1,
        "created_at": "2019-05-06T21:17:55.110Z",
        "updated_at": "2019-05-06T21:17:55.110Z"
    },
    {
        "id": 2,
        "palette_name": "Violets",
        "color_1": "#1C520F",
        "color_2": "#AB3F45",
        "color_3": "#D6AF52",
        "color_4": "#6744C8",
        "color_5": "#37A5F4",
        "project_id": 4,
        "created_at": "2019-05-07T21:33:23.026Z",
        "updated_at": "2019-05-07T21:33:23.026Z"
    }
]
```

#### GET `/api/v1/projects/:id/palettes` (Request Single Project)
Response will send all of the palettes associated with a specific project that matches the id parameter in the request.

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/1/palettes` example:
```json
[
  {
        "id": 2,
        "palette_name": "Violets",
        "color_1": "#1C520F",
        "color_2": "#AB3F45",
        "color_3": "#D6AF52",
        "color_4": "#6744C8",
        "color_5": "#37A5F4",
        "project_id": 4,
        "created_at": "2019-05-07T21:33:23.026Z",
        "updated_at": "2019-05-07T21:33:23.026Z"
    },
    {
        "id": 3,
        "palette_name": "Neon",
        "color_1": "#1C520F",
        "color_2": "#AB3F45",
        "color_3": "#D6AF52",
        "color_4": "#6744C8",
        "color_5": "#37A5F4",
        "project_id": 4,
        "created_at": "2019-05-07T21:33:23.026Z",
        "updated_at": "2019-05-07T21:33:23.026Z"
    }
]
```

#### POST `/api/v1/projects/` (Create New Project)
A user can add an additional project the database. Below is the required parameters and an example post.

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| palette_name | string    | unique name for each palette            |
| color_1      | string    | hex code for first color                |
| color_2      | string    | hex code for second color               |
| color_3      | string    | hex code for third color                |
| color_4      | string    | hex code for fourth color               |
| color_5      | string    | hex code for fifth color                |

POST options object example:
```
  {
    method: "PUT",
    body: JSON.stringify({
      palette_name: 'Neon',
      color_1: '#1C520F',
      color_2: '#AB3F45',
      color_3: '#D6AF52',
      color_4: '#6744C8',
      color_5: '#37A5F4',
     }),
    headers: { 
      "Content-Type": "application/json"
    }
  }
```

#### PUT `/api/v1/palettes/:id` (Edit Existing Project)
A user can edit a saved project in the database. Below are the required parameters and an example post.

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| palette_name | string    | updated name for each palette           |
| color_1      | string    | updated hex code for first color                |
| color_2      | string    | updated hex code for second color               |
| color_3      | string    | updated hex code for third color                |
| color_4      | string    | updated hex code for fourth color               |
| color_5      | string    | updated hex code for fifth color                |
PUT options object example:
```
  {
    method: "PUT",
    body: JSON.stringify({
      palette_name: 'Neon',
      color_1: '#1C520F',
      color_2: '#AB3F45',
      color_3: '#D6AF52',
      color_4: '#6744C8',
      color_5: '#37A5F4',
     }),
    headers: { 
      "Content-Type": "application/json"
    }
  }
```

#### DELETE `/api/v1/palettes/:id` (Delete Existing Project)
The palette with an id that matches the request paramaters will be deleted from the database.
