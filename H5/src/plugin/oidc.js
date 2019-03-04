import Oidc from 'oidc-client'

var config = {
  authority: "http://192.168.103.251:5000",
  client_id: "base",
  redirect_uri: "http://localhost:8080/callback.html",
  response_type: "id_token token",
  scope:"openid profile base",
  post_logout_redirect_uri : "http://localhost:8080"
};

// new Oidc.UserManager().signinRedirectCallback().then(function () {
//     //window.location = "index.html";
//     console.log("User not logged in");
// }).catch(function (e) {
//     console.error(e);
// });

var mgr = new Oidc.UserManager(config);

// mgr.getUser().then(function (user) {
//     if (user) {
//        console.log("User logged in", user.profile);
//     }
//     else {
//         login();
//         console.log("User not logged in");
//     }
// });

function login() {
    mgr.signinRedirect();
}

function api() {
    mgr.getUser().then(function (user) {
        var url = "http://localhost:5001/identity";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function logout() {
    mgr.signoutRedirect();
}

export default mgr