app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {

  let addUser = (authData) => {
    return $q((resolve, reject) => {
      console.log("consoling auth", authData);
      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
        JSON.stringify({ 
          uid: authData.uid,
          username: authData.username,
          imageURL: authData.imgURL
        })
      )
      .then((storeUserSuccess) => {
        resolve(storeUserSuccess);
      })
      .catch((storeUserError) => {
        reject(storeUserError);
      });
    });
  };

  let getUser = (userId) =>{
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userObject) => {
          let users = [];
          Object.keys(userObject.data).forEach((key) => {
            users.push(userObject.data[key]);
            users[0].id = key;
          });
          resolve(users[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  let editEmail = (newEmail) => {
    var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(function() {
    }, function(error) {
        // An error happened.
    });
  };

  let editUser = (id, updatedInfo) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/users/${id.id}.json`, JSON.stringify({
            name: updatedInfo.name,
            uid: id.uid,
            id: id.id
      }))
      .then((resultz) => {
        resolve(resultz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };
  return {addUser:addUser, getUser:getUser, editUser:editUser, editEmail:editEmail};
});