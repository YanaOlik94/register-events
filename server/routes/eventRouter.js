const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/eventController');

router
  .route('/')
  .get(eventsController.getAllEvents)
  .post(eventsController.createEvent);
router
  .route('/:id')
  .all(eventsController.checkEventId)
  .get(eventsController.getEventById);
router
  .route('/:eventId/register')
  .post(eventsController.addUserToEvent);
router
  .route('/:eventId/users')
  .get(eventsController.getRegisteredUsers)
router
  .route('/:eventId/users/search')
  .get(eventsController.searchUsersByQuery);

module.exports = router;
