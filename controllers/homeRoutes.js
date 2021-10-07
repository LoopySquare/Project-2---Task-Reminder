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

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Message }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    //Iterate over the messages array
    const remindrs = userData.messages.map((remindr) => remindr.get({ plain: true }));

    res.render('profile', { user, remindrs });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/message/edit/:id', withAuth, async (req, res) => {

  try {
    const messageData = await Message.findByPk(req.params.id, {
      where: {
      user_id: req.session.user_id,
      },
    })

    const remindrs = messageData.get({ plain: true });

    res.render('editRemindr', { remindrs } )

  } catch (err) {
    res.status(400).json(err);
  }

});

router.get('/message/add', withAuth, async (req, res) => {

  try {

    res.render('addRemindr')

  } catch (err) {
    res.status(404).json(err);
  }

});

router.get('/account/edit', withAuth, async (req, res) => {

  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }, 
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('editAccount', { user })

  } catch (err) {
    res.status(404).json(err);
  }

});

router.get('/account/password/update', withAuth, async (req, res) => {

  try {

    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('updatePassword', { user })

  } catch (err) {
    res.status(404).json(err);
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
