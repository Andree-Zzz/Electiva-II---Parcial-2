'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async me(ctx) {

        const user = ctx.state.user//usuario autenticado
        console.log(user)
        let imagenes = await strapi.services.imagenes.find({
            user: user.id
        })

        return imagenes;//return parecido
    },
    async create(ctx) {
        // const data = await strapi.entityValidator.validateEntity(strapi.models.imagenes, ctx)
        let entity;
        const user = ctx.state.user;
        if(ctx.is('multipart')){
            //si el cotexto es mutipart, para subir imagen
            const { data, files } = parseMultipartData(ctx);
            data.user = user.id;
            entity = await strapi.services.imagenes.create(data, { 
                files,
            });
        }else {
            const data = ctx.request.body;
            data.user = user.id;
            entity = await strapi.services.imagenes.create(data);
        }
        return sanitizeEntity(entity, { model: strapi.models.imagenes });
    }
};
