const router = require('express').Router();
const { User, Message } = require('../../models');
const withAuth = require('../../utils/auth');

// Return All Messages associated with the User
router.get('/', withAuth, async (req, res) => {
  try{
    const messageData = await User.findByPk(req.session.user_id, {
      include: [{ model: Message}]
    })
    
    res.status(200).json(messageData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New User Account
router.post('/create', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit User Account
router.put('/account/edit/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update({ 
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone
    },
    {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id
      }
    })

    console.log(userData);

    res.status(200).json(userData);
  } catch(err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// Edit User Account
router.put('/password/update/:id', withAuth, async (req, res) => {
  try {

    const passData = await User.findByPk(req.session.user_id, {
    })

    const userData = await User.update({ 
      password: req.body.newPassword,
    },
    {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id
      }
    })

    const validPassword = await userData.checkPassword(req.body.currPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log(userData);

    res.status(200).json(userData);
  } catch(err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// Login to Site
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
    where: { email: req.body.email } 
    
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: {
                    id: userData.id,   
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    phone: userData.phone,
                    email: userData.email
                  } , 
                    message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log out of Site
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
