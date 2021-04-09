const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if(error){
    return console.log("It did not work!", error);
  }

  for(const passTime of passTimes){
    
    const dateTime = new Date(0)
    dateTime.setUTCSeconds(passTime.risetime);

    console.log(`Next pass at ${dateTime} for ${passTime.duration} seconds!`);
  }
  
});
