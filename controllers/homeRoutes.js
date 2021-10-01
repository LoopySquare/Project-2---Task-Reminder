const router = require('express').Router();
const { Message, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all messages and JOIN with user data
    const messageData = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ['first_Name', 'last_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const messages = messageData.map((message) => message.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      messages, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/message/:id', async (req, res) => {
  try {
    const messageData = await Message.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const message = messageData.get({ plain: true });

    res.render('message', {
      ...message,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Message }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
