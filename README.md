# Palette Picker
This is a REST API to track projects and associated color palettes.

## Make Requests
- Use GET, POST, PUT, DELETE endpoints view, add to, update, or delete from the API.

## Initial:
The base url to make requests to the api:
#### `https://liz-taylor-palette.herokuapp.com`

## Projects

#### GET `/api/v1/projects` (Get All Projects or Project by Name)
The response sends all the projects in the database with a 200 status code. 

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

If a name is passed through query parameters, the response will send the project with the passed name and a 200 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects?name=my%20project` example: 
```json
[
  {
    "id": "7",
    "name": "my project",
    "created_at": "2019-05-03T16:02:46.742Z",
    "updated_at": "2019-05-03T16:02:46.742Z"
  }
]
```

If the name passed through the query parameters does not match the name of any projects, the response will send an error message and a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects?name=phantom%20project` example: 
```json
"That project does not exist"
```

#### GET `/api/v1/projects/:id` (Get Single Project)
The response sends a single project with an `id` that matches the parameter in the request with a 200 status code.

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

If no `id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/999` example:
```json
[
  {
    "error": "Project with id 999 not found."
  }
]
```

#### POST `/api/v1/projects/` (Create New Project)
A user can add an additional project to the database with the following required parameters:

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| name         | string    | unique name for each project            |

POST options object example:
```json
  {
    "method": "POST",
    "body": "JSON.stringify({name: 'New Project Name'})",
    "headers": { 
      "Content-Type": "application/json"
    }
  }
```

The response has a 201 status and sends the unique id created for the new record. For example, the options object above sends the following response: 
```json
  {
    "id": 75
  }
```

If the required parameter is missing, the response has a 422 status and sends an error message. For example: 
```json 
  {
    "error": "Expected format: { name: <string> }. You're missing name."
  }
```

#### PUT `/api/v1/projects/:id` (Edit Existing Project)
A user can edit a saved project in the database with the following required parameters:

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
The response has a 201 status and sends a success message.

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/66` example:

```json
"Project with id 66 has been updated."
```

If no `id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/999` example:
```json
[
  {
    "error": "No project with id 999 was found."
  }
]
```

#### DELETE `/api/v1/projects/:id` (Delete Existing Project)
A user can delete a single project with the `id` that matches the request parameters. The project's associated palettes will also be deleted. The response sends a success message with a 200 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/1` example: 
```json 
"Project with id 1 and its associated palettes have been deleted."
```
If no `id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/999` example:
```json
"Project with id 999 was not found"
```

## Palettes

#### GET `/api/v1/palettes` (Get All Palettes)
The response sends all the palettes in the database with a 200 status code.
 
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

#### GET `/api/v1/projects/:id/palettes` (Get Palettes for Single Project)
Thre response sends all of the palettes with a `project_id` that matches the id parameter in the request and a 200 status code.

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/4/palettes` example:
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

If no `project_id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/999` example:
```json
"No palette associated with project id of 999 is found."
```

#### POST `/api/v1/projects/:id/palettes` (Create New Palette for Single Project)

A user can add a palette to the database with a `project_id` that matches the request parameters. The following parameters are also required:

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| palette_name | string    | unique name for each palette            |
| color_1      | string    | hex code for first color                |
| color_2      | string    | hex code for second color               |
| color_3      | string    | hex code for third color                |
| color_4      | string    | hex code for fourth color               |
| color_5      | string    | hex code for fifth color                |

POST options object example:
```json
  {
    "method": "PUT",
    "body": "JSON.stringify({
      palette_name: Neon,
      color_1: #1C520F,
      color_2: #AB3F45,
      color_3: #D6AF52,
      color_4: #6744C8,
      color_5: #37A5F4,
     })",
    "headers": { 
      "Content-Type": "application/json"
    }
  }
```

The response has a 201 status and sends the unique id created for the new record. Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/1/palettes` example: 
```json 
  {
    "id": 75
  }
```

If any of the required parameters are missing, the response has a 422 status and sends an error message. For example: 
```json 
  {
    "error": "Expected format: { 
          palette_name: <string>, 
          color_1: <string>, 
          color_2: <string>, 
          color_3: <string>, 
          color_4: <string>, 
          color_5: <string>,  
        },
        You're missing color_5."
  }
```

#### PUT `/api/v1/palettes/:id` (Edit Existing Project) 
A user can edit a single project with the `id` that matches the request parameters. The following parameters are also required: 

| Name         | type      | Description                             |
| :------------|:----------|:----------------------------------------|
| palette_name | string    | updated name for each palette           |
| color_1      | string    | updated hex code for first color                |
| color_2      | string    | updated hex code for second color               |
| color_3      | string    | updated hex code for third color                |
| color_4      | string    | updated hex code for fourth color               |
| color_5      | string    | updated hex code for fifth color                |
PUT options object example:
```json
  {
    "method": "PUT",
    "body": "JSON.stringify({
      palette_name: Neon,
      color_1: #1C520F,
      color_2: #AB3F45,
      color_3: #D6AF52,
      color_4: #6744C8,
      color_5: #37A5F4,
     })",
    "headers": { 
      "Content-Type": "application/json"
    }
  }
```

The response has a 201 status and sends a success message.

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/palettes/14` example:

```json
"Palette with id: 14 has been updated."
```

If no `id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/projects/999` example:
```json
[
  {
    "error": "No palette with id: 999 was found."
  }
]
```

#### DELETE `/api/v1/palettes/:id` (Delete Existing Project)
A user can delete a single palette with the `id` that matches the request parameters. The response sends a success message with a 200 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/palettes/1` example: 
```json 
"Palette with id: 1 has been deleted."
```
If no `id` matches the parameter in the request, the response sends an error message with a 404 status code. 

Response from `https://liz-taylor-palette.herokuapp.com/api/v1/palettes/999` example:
```json
"Palette with id: 999 was not found"
```
