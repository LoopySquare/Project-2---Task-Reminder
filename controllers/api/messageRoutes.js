const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const messageData = await Message.findByPk(req.params.id, {
      where: {
      user_id: req.session.user_id,
      },
    })

    res.status(200).json(messageData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



router.post('/', withAuth, async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newMessage);

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    console.log(req.params.id);
    const messageData = await Message.update({ 
      event_name: req.body.event_name ,
      description: req.body.description ,
      content: req.body.content ,
      send_date: req.body.send_date ,
      send_time: req.body.send_time ,
      am_pm: req.body.am_pm,
    },
    {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id
      }
    })
    res.status(200).json(messageData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
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

module.exports = router;
