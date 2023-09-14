/// <reference types="Cypress"/>
class OAuth{
    /*POST:"https://github.com/login/oauth/access_token"
    client_id:""
    client_secreat :""
    code:""
*/
    getAccessToken(){
let at="";
cy.request({
    method:"post",
    url:"https://github.com/login/oauth/access_token",
    qs:{
        client_id:"8666f2496dd9c71201c6",
        client_secreat :"b3ca83e8e3d555cca9b02cf4de81988f4f5ac440",
        code:"fa92464a380c6503eddc"
    }
})
.then((response)=>{
const parm=response.body.split("&")
at=parm[0].split("=")[1]
cy.log(at)
})
cy.request({
    method:"get",
    url:"https://api.github.com/users/Keerthana-gopalswamy/repos",
    headers:{
        authorization:at
    }
})
.then((response)=>{
    expect(response.status).eq(200)
   expect(response.body[0].id).eq(675619540)
})
    }
    getaccess(){
        let accessToken = "";

// Step 1: Intercept the OAuth initiation request
cy.intercept("POST", "https://github.com/login/oauth/access_token").as("getToken");

// Step 2: Visit the OAuth authorization URL (initiate the OAuth flow)
cy.visit("https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=SCOPE&state=STATE"); // Replace placeholders

// Step 3: Wait for and handle the OAuth callback
cy.wait("@getToken").then((interception) => {
  // Ensure the request was made successfully
  expect(interception.response.statusCode).to.equal(200);

  // Parse the response body to get the access token
  const responseBody = interception.response.body;
  const params = new URLSearchParams(responseBody);
  accessToken = params.get("access_token");
  cy.log(accessToken);

  // Step 4: Use the access token to make authenticated requests (e.g., to access the GitHub API)
  cy.intercept("GET", "https://api.github.com/user").as("getUserInfo");

  cy.request({
    method: "GET",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((userInfoResponse) => {
    expect(userInfoResponse.status).to.equal(200);
    // Add further assertions on the user information if needed
  });
});

    }




}
export default OAuth;