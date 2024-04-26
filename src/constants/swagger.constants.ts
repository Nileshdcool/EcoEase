// CREATE A TASK

export const CREATE_TASK = 'Create a task';
export const RETURN_CREATED_TASK = 'Return a created Task';

// GET ALL TASKS
export const GET_ALL_TASKS = 'Get all Tasks';
export const RETURN_OF_TASKS = 'Returns an array of tasks.';

//NEAR LOCATION

export const NEAR_LOCATION_API = 'near-location';

export const GET_TASKS_NEAR_LOCATION = 'Get tasks near location';
export const RETURN_TASKS_NEAR_LOCATION = 'Returns tasks near the specified location.';

export const NEAR_LOCATION_QUERY_STRING = [
    {
      name: 'latitude',
      description: 'Latitude of the location',
      type: 'number',
    },
    {
      name: 'longitude',
      description: 'Longitude of the location',
      type: 'number',
    },
    {
      name: 'radius',
      description: 'Search radius in meters',
      type: 'number',
    },
  ]

  // task by id

export const GET_TASK_BY_ID_DESCRIPTION = 'Get task by ID';
export const GET_TASK_BY_ID_SUMMARY = 'Returns the task.';
export const GET_TASK_BY_ID_PARAM_NAME = 'id';
export const GET_TASK_BY_ID_PARAM_DESCRIPTION = 'ID of the task';

// Constants for PUT method
export const PUT_DESCRIPTION = 'Update a task by ID';
export const PUT_SUMMARY = 'Returns the updated task.';
export const PUT_PARAM_NAME = 'id';
export const PUT_PARAM_DESCRIPTION = 'ID of the task';

// Constants for DELETE method
export const DELETE_DESCRIPTION = 'Delete a task';
export const DELETE_SUMMARY = 'Task has been successfully deleted.';
export const DELETE_PARAM_NAME = 'id';
export const DELETE_PARAM_DESCRIPTION = 'ID of the task';

