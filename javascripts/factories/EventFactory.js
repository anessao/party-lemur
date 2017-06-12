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

  return {postNewEvent:postNewEvent};
});