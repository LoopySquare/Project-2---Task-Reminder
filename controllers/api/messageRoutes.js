const router = require('express').Router();
const { Message, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { toUTC } = require('../../utils/convertTime');

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


router.post('/export', async (req, res) => {
  try{
    const messageData = await Message.findAll({
      attributes: ['event_name', 'content'],
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name', 'email'],
        },
      ],
      where:{
        send_date: req.body.currTime,
      }
    });

    // writeToFile(messageData);

    res.status(200).json(messageData)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id,{
      attributes: ['timeZone'],
      where: {
        id: req.session.user_id,
      }
    })

    const userTZ = await userData.get({ plain: true })

    const utcTime = await toUTC(req.body.send_date, 
                                req.body.send_time, 
                                req.body.am_pm, 
                                userTZ.timeZone
                              );

    const newMessage = await Message.create({
      event_name: req.body.event_name,
      description: req.body.description,
      content: req.body.content,
      send_date: utcTime,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth , async (req, res) => {
  // update a category by its `id` value
  try {

    const userData = await User.findByPk(req.session.user_id,{
      attributes: ['timeZone'],
      where: {
        id: req.session.user_id,
      }
    })

    const user = await userData.get({ plain: true })

    const utcTime = await toUTC(req.body.send_date, 
                                req.body.send_time, 
                                req.body.am_pm, 
                                user.timeZone
                              );

    const messageData = await Message.update({ 
      event_name: req.body.event_name ,
      description: req.body.description ,
      content: req.body.content ,
      send_date: utcTime
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
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
