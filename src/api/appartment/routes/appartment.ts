/**
 * appartment router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::appartment.appartment');



export const customRoutes = [
    {
        method: 'GET',
        path: '/appartments/available',
        handler: 'api::appartment.appartment.available',
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
    {
      method: 'GET',
      path: '/appartments', 
      handler: 'api::appartment.appartment.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/appartments/:id',
      handler: 'api::appartment.appartment.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/appartments', 
      handler: 'api::appartment.appartment.create',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
    {
        method: 'PUT',
        path: '/appartments/:id',
        handler: 'api::appartment.appartment.update',
        config: {
          auth: false, 
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/appartments/:id',
        handler: 'api::appartment.appartment.delete',
        config: {
          auth: false, 
          policies: [],
          middlewares: [],
        },
      },
];



