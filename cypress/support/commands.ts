import * as commonCommands from './commpands/common';
import * as profileCommands from './commpands/profile';
import * as articleCommands from './commpands/article';
import * as commentsCommands from './commpands/comments';
import * as ratingCommands from './commpands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

export {};
