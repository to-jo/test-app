const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const { env } = require("process");

module.exports = {

  jiraLink(jiraID){
    let jsonData = require('../../matrix.json');
    let issues = jsonData.issues
    let req = issues.filter(function(obj) {
      return obj.key === jiraID;
    });
    let reqUrl = "\r\n" + JSON.stringify(req[0].self);
    let descirption = JSON.stringify(req[0].fields.description);
    return jiraID + " - " + descirption + "\n\r" + reqUrl

  },
  getDescriptionsFromJira(jiraID) {
    const url =
    'https://tojowa.atlassian.net/rest/api/2/search?jql=issuetype%20%3D%20Requirement%20and%20status%20in%20("In%20Progress"%2C%20"done")&fields=description';
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic dG9ueS5qb25lczRAZ21haWwuY29tOm82TXdodms2a082Z1RjRXBENjRSNzhDNg==",
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
