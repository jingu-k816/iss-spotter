const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) =>{
    if (error) {
      callback(`Conection problem: ${response.statusCode}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(`Connection problem: ${response.statusCode}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    // const latitude = JSON.parse(body).latitude;
    // const longitude = JSON.parse(body).longitude;
    //console.log(data);
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`

  request(url, (error, response, body) =>{
    if (error) {
      callback(`Connection problem: ${response.statusCode}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(null, data);
    //console.log(body);
  });
};


const nextISSTimesForMyLocation = (callback) => { 
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (eror, coords) =>{
      if(error){
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, coordinates) => {
        if(error){
          return callback(error, null);
        }
        callback(null, coordinates);
      });
    });
  });
};


module.exports = {
  nextISSTimesForMyLocation
};