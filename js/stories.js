"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// Define the submitNewStory function
async function submitNewStory(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get data from the form fields
  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();

  // Create a new story object
  const newStory = new Story({ author, title, url });

  // Add the new story to the story list
  await storyList.addStory(currentUser, newStory);

  // Generate HTML markup for the new story
  const $newStoryMarkup = generateStoryMarkup(newStory);

  // Append the new story's markup to the list of stories on the page
  $allStoriesList.prepend($newStoryMarkup);
}

// Attach the submitNewStory function to the form's submit event
$storyForm.on("submit", submitNewStory);


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
