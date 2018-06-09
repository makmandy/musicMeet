const { connection } = require('./connection.js');

// (user login)
// query database to see if username matches password
// returns an array
// if username is not in database
// error 'invalid username
// if username is in database, but pasword is wrong
// error 'invalid password for username'

const checkUserPasswordMatchDB = (username, password, callback) => {
  let queryString = `SELECT username FROM users WHERE username = '${username}'`;
  connection.query(queryString, (err, result) => {
    console.log(result,username)
     callback(err, result)
  });
};

const saveNewUserDB = ({
  name, display_name, password, imgurl, email, bio
}, callback) => {
  const queryString = `INSERT INTO users (username, display_name, password, imgurl, email, bio) VALUES ('${name}', '${display_name}','${password}', '${imgurl}', '${email}', '${bio}')`;
  console.log(queryString);
  connection.query(queryString, (err, result) => {
    if (err) {
      console.log('username in use');
    } else {
      callback(err, result);
    }
  });
};


// Edit User data:
  // Define the query string.
const editUserDB = (username, values) => {
  
  // Set the query string based on this new object. Submit the query string.
  const queryString =
      `UPDATE users
      SET display_name = '${dummy.display_name}', password = '${dummy.password}', 
      imgUrl = '${dummy.imgUrl}', bio = '${dummy.bio}', musician = '${dummy.musician}'
      WHERE username = '${username}'`;

  connection.query(queryString, (err, result) => {
    if (err) {
      console.log(error);
    } else {
      console.log('user edited!: ', result);
    }
  });
};

// Retrieve user data:
const retrieveUserInfoDB = (username, callback) => {
  const queryString = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(queryString, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
};

const addMessageDB = (text, username, callback) => {
  const queryString = `INSERT INTO messages(text, timestamp, username) VALUES('${text}', now(), '${username}')`;

  connection.query(queryString, (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('message added:', result);
      callback(null, result);
    }
  });
};


const getMessagesDB = (username, callback) => {
  const queryString = `SELECT *  FROM messages WHERE username = '${username}'`;

  connection.query(queryString, (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('got messages!');
      callback(null, result);
    }
  });
};

const getEventsAttendingDB = (username, callback) => {
  let queryString1 = `SELECT id FROM users where username = '${username}'`;
  connection.query(queryString1, (err, result) => {
    if (err) {
      console.error('This user does not exist', err);
      callback(err);
    }else {
      let userID = result[0].id;
      console.log(userID);
      let queryString2 = `SELECT events.* FROM events, users_events where users_events.id_user = '${userID}'`;
      connection.query(queryString2, (error, results) => {
        if (err) {
          console.error(`Error finding events that ${userID} is attending`, error);
          callback(err);
        }else {
          console.log(`${userID} is attending these events: `, results);
          callback(null, results);
        }
      });
    }
  });
};


const getEventsHostingDB = (username, callback) => {
  const queryString = `SELECT * FROM events WHERE host = '${username}'`;

  connection.query(queryString, (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('events hosting: ', result);
      callback(err, result);
    }
  });
};

module.exports = {
  checkUserPasswordMatchDB,
  saveNewUserDB,
  editUserDB,
  retrieveUserInfoDB,
  addMessageDB,
  getMessagesDB,
  getEventsAttendingDB,
  getEventsHostingDB,
};