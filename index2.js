const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(body => {
    for(const passTime of body){
      const dateTime = new Date(0)
      dateTime.setUTCSeconds(passTime.risetime);
      console.log(`Next pass at ${dateTime} for ${passTime.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });