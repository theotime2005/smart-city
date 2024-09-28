'use strict';

/**
 * waste service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::waste.waste');
