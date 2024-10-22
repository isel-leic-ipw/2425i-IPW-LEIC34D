var requestOptions = {
  method: 'GET',
  headers : {"x-apisports-key": process.env.KEY}, 
  // To run this: KEY=<your key> node test-api-sports.mjs
};

// Number => Promise<obj>
function getObjAPI(id){
  return fetch(`https://v3.football.api-sports.io/teams?id=${id}`, requestOptions)
  .then(response => response.json())
  .then(obj => obj.response[0])
  //.then(obj => console.log(obj.response[0].team.id))
  .catch(error => console.log('error', error));
}

getObjAPI(228)
.then(console.log);