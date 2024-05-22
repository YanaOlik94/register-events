const { User, Event } = require('../models');
const {Op} = require("sequelize");

exports.checkEventId = async (req, res, next) => {
  const event = await Event.findByPk(req.params.id)

  if (event === null) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid event id',
    });
  } else {
    res.locals = event;
    next();
  }
};

exports.createEvent = async (req, res) => {
  const newEvent = await Event.create(req.body)
  res.status(201).json({ newEvent });
};

exports.getAllEvents = async (req, res) => {
  const { status, projection, sort = 'eventDate:asc', limit = 10, page = 1 } = req.query;

  try {
    const query = {};
    if (status) query.status = status;

    const projectionArray = projection ? projection.split(',') : undefined;
    const [sortField, sortOrder] = sort.split(':');
    const limitValue = parseInt(limit, 10);
    const offset = (parseInt(page, 10) - 1) * limitValue;

    const { count, rows: events } = await Event.findAndCountAll({
      where: query,
      attributes: projectionArray,
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: limitValue,
      offset: offset
    });

    res.status(200).json({
      status: 'success',
      data: {
        count,
        events,
        totalPages: Math.ceil(count / limitValue),
        currentPage: parseInt(page, 10)
      },
    });
  } catch (err) {
    res.status(500).json({error: 'Internal server error'});
  }
};

exports.getEventById = async (req, res) => {
  const event = res.locals;
  res.status(200).json({
    status: 'success',
    data: {
      event
    },
  });
};

exports.addUserToEvent = async (req, res) => {

  const { fullName, email, birthDate, referralSource } = req.body;
  const { eventId }  = req.params;

  try {

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ fullName, email, birthDate, referralSource });
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).send('Event not found');
    }

    const isRegistered = await user.hasEvent(event, { through: { selfGranted: false } });

    if (isRegistered) {
      return res.status(400).send('User is already registered for this event');
    }

    await user.addEvent(event, { through: { selfGranted: false } });

    res.json({ message: 'Registration successful!', user, event });
  } catch (error) {
    res.status(500).json({ error: 'Error registering: ' + error.message });
  }
};

exports.getRegisteredUsers = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).send('Event not found');
    }

    const users = await event.getUsers();

    res.status(200).json({
      status: 'success',
      data: {
        count: users.length,
        users
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users: ' + error.message });
  }
};

exports.searchUsersByQuery = async (req, res) => {
  const { eventId } = req.params;
  const { search } = req.query;

  const whereClause = search ? {
    [Op.or]: [
      { fullName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } }
    ]
  } : {};

  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const user = await event.getUsers({ where: whereClause });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
