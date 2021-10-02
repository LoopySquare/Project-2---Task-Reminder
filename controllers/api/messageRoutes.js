const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/api/message', withAuth, async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const messageData = await Message.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!messageData) {
      res.status(404).json({ message: 'No Message found with this id!' });
      return;
    }

    res.status(200).json(messageData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/api/message/:message_id', (req, res) => {
  try{
    const updateProject = Project.update(params[id]) ({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(updateProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
