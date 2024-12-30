/**
 * rent-record router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::rent-record.rent-record');


export const customRoutes = [
    {
        method: 'POST',
        path: '/rent-records/:id/rent',
        handler: 'api::rent-record.rent-record.rentAppartment',
        config: {
          auth: {
            enabled: true, 
            scope: ['admin', 'user'], 
          },
          policies: [],
          middlewares: [],
        },
      },
    {
      method: 'GET',
      path: '/my-rent-records',
      handler: 'api::rent-record.rent-record.myRentRecords',
      config: {
        auth: {
          enabled: true,
          scope: ['admin', 'user'], 
        },  
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

  ];
