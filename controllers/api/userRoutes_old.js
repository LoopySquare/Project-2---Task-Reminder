const router = require('express').Router();
const { User, Message } = require('../../models');
const withAuth = require('../../utils/auth');

// Return All Messages associated with the User
router.get('/:id', withAuth, async (req, res) => {
  try{
    const messageData = await User.findByPk(req.params.id, {
      include: [{ model: Message}]
    })
  
    res.status(200).json(messageData);

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

router.put('/api/message/:message_id', (req, res) => {
    try {
        const user = auth.current.user

        // update data
        user.name = request.input('name')
        user.username = request.input('username')
        user.email = request.input('email')

        await user.save()

        return response.json({
            status: 'success',
            message: 'Profile updated!',
            data: user
        })
    
      } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: 'There was an error updating your profile :/',
        })
    }
}


module.exports = router;
