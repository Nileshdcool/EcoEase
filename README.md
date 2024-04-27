**EcoEase API Documentation**

Welcome to the EcoEase API documentation. EcoEase is a platform designed to facilitate the management of street trash in urban areas using innovative technology. This API enables the creation, display, and editing of tasks associated with garbage collection, leveraging data from video footage analysis.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [Endpoints](#endpoints)
    - [Get Tasks Near Area](#get-tasks-near-area)
    - [Create Task](#create-task)
    - [Get Task by ID](#get-task-by-id)
    - [Update Task](#update-task)
    - [Delete Task](#delete-task)
5. [Examples](#examples)
6. [Contributing](#contributing)
7. [License](#license)

# Introduction
EcoEase revolutionizes urban cleanliness by analyzing video footage from delivery riders' bikes to pinpoint street trash. Tasks are generated for workers via the app, ensuring efficient garbage collection and a cleaner cityscape.

# Overview 
EcoEase introduces an innovative solution to address inner-city street trash. In collaboration with a leading food delivery company, EcoEase integrates camera technology onto delivery riders' bikes. This footage undergoes monthly machine learning analysis to identify individual pieces of garbage efficiently. Subsequently, EcoEase automatically generates tasks for workers, directing them to areas with the highest concentration of trash. Utilizing the EcoEase app, workers mark completed garbage collection tasks, ensuring prompt and effective cleanup operations. Join EcoEase in reshaping urban cleanliness and fostering a greener, healthier environment for all.

## Getting Started

To get started with the EcoEase API, you will need an API key for authentication. Please refer to the Authentication section for details on obtaining an API key.

## Authentication

EcoEase API uses API keys for authentication. To obtain an API key, please contact the administrator. Once you have the API key, include it in the request headers as follows:

```
Authorization: secretkey
```

## Endpoints

### Get Tasks Near Area

```
GET /api/tasks/nearby?latitude={latitude}&longitude={longitude}&radius={radius}
```

This endpoint retrieves all tasks near a specified area on the map.

#### Parameters

- `latitude` (required): Latitude coordinate of the center point.
- `longitude` (required): Longitude coordinate of the center point.
- `radius` (optional): Radius in meters to define the search area. Default is 1000 meters.

#### Response

```json
[
  {
    "id": 1,
    "description": "Collect trash at corner of Main St and Elm St",
    "workerId": 12,
    "location":{"latitude": 37.7749,
    "longitude": -122.4194},
    "status": "pending"
  },
  {
    "id": 2,
    "workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
  }
]
```

### Create Task

```
POST /api/tasks
```

This endpoint creates a new task.

#### Request Body

```json
{
    "workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
}
```

#### Response

```json
{
  "id": 3,
  "workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
}
```

### Get Task by ID

```
GET /api/tasks/{taskId}
```

This endpoint retrieves a specific task by its ID.

#### Response

```json
{
  "id": 3,
  "workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
}
```

### Update Task

```
PUT /api/tasks/{taskId}
```

This endpoint updates an existing task.

#### Request Body

```json
{
  "description": "Collect trash near the subway station entrance",
  "status": "completed"
}
```

#### Response

```json
{
  "id": 3,
  "workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
}
```

### Delete Task

```
DELETE /api/tasks/{taskId}
```

This endpoint deletes a task by its ID.

#### Response

```
Status: 204 No Content

```

## Examples

### Get Tasks Near Area

```bash
curl -X GET \
  'https://api.ecoease.com/api/tasks/nearby?latitude=37.7749&longitude=-122.4194&radius=1000' \
  -H 'Authorization: YOUR_API_KEY'
```

### Create Task

```bash
curl -X POST \
  https://api.ecoease.com/api/tasks \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
	"workerId": 13,
    "description": "Remove garbage bags near City Park",
    "location":{"latitude": 37.7662,
    "longitude": -122.4761,},
    "status": "completed"
}'
```

### Update Task

```bash
curl -X PUT \
  https://api.ecoease.com/tasks/3 \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
	"description": "Collect trash near the subway station entrance",
	"status": "completed"
}'
```

## Contributing



## License

