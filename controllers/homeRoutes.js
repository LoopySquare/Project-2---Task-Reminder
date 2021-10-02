const router = require('express').Router();
const { Message, User } = require('../models');
const withAuth = require('../utils/auth');

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

  console.log(req.session.user_id);

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Message }],
    });

    console.log(userData);

     // Serialize data so the template can read it
    //  const messageArr = messageData.map((remindr) => remindr.messages);

    const user = userData.get({ plain: true });

    // console.log(user);

    const remindrs = userData.messages.map((remindr) => remindr.get({ plain: true }));

    //  const dishes = dishData.map((dish) => dish.get({ plain: true }));

    //  console.log(remindrs);

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
