app.factory("EventFactory", function($q, $http, FIREBASE_CONFIG) {

  let postNewEvent = (eventData) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/events.json`, JSON.stringify(eventData))
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let getSelectedParty = (id) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events/${id}.json`)
      .then((resultz) => {
        resultz.data.id = id;
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let getPartyList = (userId) => {
    let parties = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events.json?orderBy="uid"&equalTo="${userId}"`)
        .then((fbItems) => {
            var itemCollection = fbItems.data;
            if(itemCollection.length !== null) {
            Object.keys(itemCollection).forEach((key) => {
                itemCollection[key].id = key;
                parties.push(itemCollection[key]);
            });
          }
            resolve(parties);
        })
        .catch((error) => {
            reject(error);
        });
    });
  };

  let deleteSelectedEvent = (eventid) => {
    return $q((resolve, reject) => {
    $http.delete(`${FIREBASE_CONFIG.databaseURL}/events/${eventid}.json`)
    .then((results) => {
      resolve(results);
    })
    .catch((error) => {
      reject(error);
    });
    });
  };

  let editParty = (eventObj) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/events/${eventObj.id}.json`, JSON.stringify({
        title: eventObj.title,
        location: eventObj.location,
        date: eventObj.date,
        uid: eventObj.uid
      })).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {postNewEvent:postNewEvent, getPartyList:getPartyList, getSelectedParty:getSelectedParty, deleteSelectedEvent:deleteSelectedEvent, editParty:editParty};
});