//import our db, Model, DataTypes
const { db, DataTypes } = require('../db/connection')

//Creating a User child class from the Model parent class
const User = db.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});
// GET all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });
  
  // GET one user
  router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  });
  
  // GET all shows watched by a user (user id in req.params)
  router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    res.json(shows);
  });
  
  // PUT update and add a show if a user has watched it
  router.put('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    await user.addShow(show, { through: { status: 'watched', rating: req.body.rating } });
    res.json({ message: 'Show added to user' });
  });
 


//exports
module.exports = User,router;