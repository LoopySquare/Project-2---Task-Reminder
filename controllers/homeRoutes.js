const router = require('express').Router();
const { Message, User } = require('../models');
const withAuth = require('../utils/auth');
const ConvertDate = require('../utils/dateConversion');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage');
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/create', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('createAccount');
  } catch (err) {
    res.status(404).json(err);
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

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    //Iterate over the messages array
    const messages = userData.messages.map((remindr) => remindr.get({ plain: true }));

    // Convert unix date value to Week Day Name
    const remindrs = messages.map((remindr) => {
      remindr.day = ConvertDate(remindr.day)
      return remindr; 
    })

    res.render('profile', { user, remindrs });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('homepage');
});

module.exports = router;
