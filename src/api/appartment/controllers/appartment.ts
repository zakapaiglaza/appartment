import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::appartment.appartment', ({ strapi }) => ({


  async available(ctx) {
    const { start_date, end_date } = ctx.query as { start_date: string; end_date: string };

    if (!start_date || !end_date) {
      return ctx.badRequest('Both start_date and end_date are required');
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return ctx.badRequest('Invalid date format');
    }
    // return ctx.badRequest('joooooopaaaaaa');
    // console.log('Start Date:', startDate);
    // console.log('End Date:', endDate);


    const appartments = await strapi.db.query('api::appartment.appartment').findMany({
      where: {
        rent_records: {
          start_date: { $lte: endDate },
          end_date: { $gte: startDate },
        },
      },
      populate: { rent_records: true },
    });

    return ctx.send({ data: appartments });
  },

  async find(ctx) {
    const appartments = await strapi.db.query('api::appartment.appartment').findMany();
    return appartments;
  },


  async findOne(ctx) {
    const { id } = ctx.params;
    const appartments = await strapi.db.query('api::appartment.appartment').findOne({
      where: { id: Number(id) },
    });

    if (!appartments) {
      return ctx.notFound('Appartment not found');
    }

    return appartments;
  },


  async create(ctx) {
    const { data } = ctx.request.body;


    const newAppartment = await strapi.db.query('api::appartment.appartment').create({
      data, 
    });

    return newAppartment;
  },


  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const appartment = await strapi.db.query('api::appartment.appartment').findOne({
      where: { id: Number(id) },
    });

    if (!appartment) {
      return ctx.notFound('Appartment not found');
    }

    const updatedAppartment = await strapi.db.query('api::appartment.appartment').update({
      where: { id: Number(id) },
      data,
    });

    return updatedAppartment;
  },



  async delete(ctx) {
    const { id } = ctx.params;


    const appartment = await strapi.db.query('api::appartment.appartment').findOne({
      where: { id: Number(id) },
    });

    if (!appartment) {
      return ctx.notFound('Appartment not found');
    }

    await strapi.db.query('api::appartment.appartment').delete({
      where: { id: Number(id) },
    });

    return { message: 'Appartment deleted successfully' };
  }
}));

