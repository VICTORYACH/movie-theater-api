//import our db, Model, DataTypes
const { db, DataTypes } = require('../db/connection')

//Creating a User child class from the Model parent class
const Show = db.define("shows", {
    title: DataTypes.STRING,
    genre: DataTypes.ENUM("Comedy", "Drama", "Horror", "Sitcom"),
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING,
});
// GET all shows
router.get('/', async (req, res) => {
    try {
      const shows = await db.Show.findAll();
      res.json(shows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // GET one show
  router.get('/:id', async (req, res) => {
    try {
      const show = await db.Show.findByPk(req.params.id);
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
      res.json(show);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // GET shows of a particular genre (genre in req.params)
  router.get('/genre/:genre', async (req, res) => {
    try {
      const shows = await db.Show.findAll({
        where: {
          genre: req.params.genre,
        },
      });
      res.json(shows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // PUT update rating of a show that has been watched
  router.put('/:id/rating', async (req, res) => {
    try {
      const show = await db.Show.findByPk(req.params.id);
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
      show.rating = req.body.rating;
      await show.save();
      res.json(show);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // PUT update the status of a show
  router.put('/:id/status', async (req, res) => {
    try {
      const show = await db.Show.findByPk(req.params.id);
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
      show.status = req.body.status;
      await show.save();
      res.json(show);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // DELETE a show
  router.delete('/:id', async (req, res) => {
    try {
      const show = await db.Show.findByPk(req.params.id);
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
      await show.destroy();
      res.json({ message: 'Show deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  })
//exports
module.exports = Show,router;
