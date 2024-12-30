// src/api/rent-record/controllers/rent-record.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::rent-record.rent-record', ({ strapi }) => ({

  async rentAppartment(ctx) {
    const { id } = ctx.params;
  

    const { start_date, end_date, tenant_id } = ctx.request.body?.data || ctx.request.body;
  
    if (!start_date || !end_date || !tenant_id) {
      return ctx.badRequest('fill in all fields');
    }
  
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
  
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return ctx.badRequest('no valid date format');
    }
  

    const appartment = await strapi.db.query('api::appartment.appartment').findOne({
      where: { id: Number(id) },
    });
  
    if (!appartment) {
      return ctx.notFound('Appartment not found');
    }
  

    const rentConflict = await strapi.db.query('api::rent-record.rent-record').findOne({
      where: {
        appartment: id,
        start_date: { $lte: endDate },
        end_date: { $gte: startDate },
      },
    });
  
    if (rentConflict) {
      return ctx.badRequest(' appartment is already rented for the specified period');
    }
  

    const rentRecord = await strapi.db.query('api::rent-record.rent-record').create({
      data: {
        start_date: startDate,
        end_date: endDate,
        tenant: tenant_id,
        appartment: id,
      },
    });
  
    return ctx.send({ data: rentRecord });
  },
  


  async find(ctx) {
    const rentRecords = await strapi.entityService.findMany('api::rent-record.rent-record', {
      populate: ['appartment', 'tenant'],
    });

    return ctx.send({ data: rentRecords });
  },


  async myRentRecords(ctx) {
    const { user } = ctx.state;

    if (!user) {
      return ctx.unauthorized('not authenticated');
    }

    const rentRecords = await strapi.db.query('api::rent-record.rent-record').findMany({
      where: { tenant: user.id },
      populate: ['appartment'],
    });

    return ctx.send({ data: rentRecords });
  },
}));
