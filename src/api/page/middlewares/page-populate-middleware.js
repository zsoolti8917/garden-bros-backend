"use strict";

/**
 * `page-populate-middleware` middleware
 */
//testing thew new changes
const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      image: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      button: {
        populate: true,
      },
      features: {
        populate: {
          fields: ["title", "description"],
          icon: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      category: {
        populate: {
          fields: ["title", "description", "categoryName"],
          question: {
            populate: {
              fields: ["question", "answer"],
            },
          }
        }
      },
      sluzbySections: {
        populate: {
          fields: ["title", "description", "header", "info", "anchor"],
          image: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          isRight: {
            populate: true,
          }
        }
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      socials:{
        populate: {
          feilds: ["url", "text", "newTab", "social"]
        }
      },
      contacts: {
        populate: {
          fields: ["url", "text", "type"]
        }
      },
      plans: {
        populate: ["product_features"],
      },
      submitButton: {
        populate: true,
      },
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  }
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

   // console.log("page-populate-middleware.js: ctx.query = ", ctx.query);
    console.log(next)
    await next();
  };
};
