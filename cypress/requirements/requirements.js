const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const { env } = require("process");

module.exports = {

  jiraLink(jiraID){
    let jsonData = require('../../matrix.json');
    let desc = jsonData.issues
    let myFilteredData = desc.filter(function(obj) {
      return obj.key === jiraID;
    });
    let descirption = JSON.stringify(myFilteredData[0].fields.description);
    return jiraID + " - " + descirption

  },
  getDescriptionsFromJira(jiraID) {
    const url =
    'https://code.waters.com/jira/rest/api/2/search?jql=project%20%3D%20"Informatics%20Software%20as%20a%20Service"%20AND%20issuetype%20%3D%20Requirement%20AND%20status%20in%20(done%2C%20"In%20Review")&fields=description';
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: process.env.jiracred,
        Accept: "application/json",
      },
    })
    .then(res => res.json()) // expecting a json response
    .then((json)=> {
      console.log(json)
      writeFileSync('matrix.json', JSON.stringify(json));
    })
      .catch((err) => {
        console.error(err);
        return "connection issue";
      });
  },
};
