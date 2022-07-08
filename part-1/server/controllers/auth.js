const users = []
const bcrypt = require(`bcryptjs`)

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')

      console.log(req.body)

      const { username, password } = req.body


      for (let i = 0; i < users.length; i++) 
      {
        if (users[i].username === username && bcrypt.compareSync(password, users[i].password)) 
        {
          res.status(200).send(users[i])
          // console.log(`it worked!`)
          return;
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User');
       
        let {password} = req.body;

        const salt = bcrypt.genSaltSync(6);
        const passHash = bcrypt.hashSync(password, salt);

        req.body.password = passHash;

        users.push(req.body);
        console.log(req.body.password);

        res.status(200).send(req.body);


    }
}