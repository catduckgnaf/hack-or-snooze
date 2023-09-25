"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show submit on click on "submit" */
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $submitStoryForm.show();
}

$body.on("click", "#nav-submit-story", navSubmitClick);

// my stories
function navMystories(evt) {
  console.debug("navMyStories", evt);
  putUserStoriesOnPage();
  hidePageComponents();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMystories);

/** Show favorite stories on click on "favorites" */
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

// Add a global variable to track whether the user is logged in or not
let isLoggedIn = false;

// Function to update the navigation bar when the user logs in
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  isLoggedIn = true; // Set the user as logged in
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navSubmitStory.show();
}

// Function to update the navigation bar when the user logs out
function updateNavOnLogout() {
  console.debug("updateNavOnLogout");
  isLoggedIn = false; // Set the user as logged out
  $(".main-nav-links").hide();
  $navLogin.show();
  $navLogOut.hide();
  $navUserProfile.hide();
  $navSubmitStory.hide();
}