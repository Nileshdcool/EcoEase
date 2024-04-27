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

export const SWAGGER_DOC_TITLE = 'EcoEase Street Cleaning API';

export const SEAGGER_DOC_DESCIPTION= `This API provides endpoints to manage tasks 
for inner-city street cleaning, leveraging innovative 
solutions to tackle urban trash accumulation. 
Partnered with a food delivery company, EcoEase utilizes 
camera-equipped delivery riders to identify areas with high 
garbage concentration, allowing efficient assignment of cleaning tasks. 
This API facilitates task creation, display, and editing, empowering 
workers to contribute to cleaner and healthier urban environments.`

export const SWAGGER_CONFIGS = {
  customSiteTitle: 'Eco-Ease',
  customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
}

// API Decoractors for swagger

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

