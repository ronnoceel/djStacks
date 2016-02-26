# djStacks
A web application for DJs to solicit song recommendations from a crowd and organizes them into a queue, using twitter as the source of the recommendations.

# How to use
To run, execute "DEBUG=djStacks:* npm start" in the djStacks directory.

The DJ enters a hashtag in the textbox at the top of the page and presses enter.
Any tweet of the form <i>string</i>-<i>string</i>, also containing the hashtag will then begin appearing in the queue of the webapp, as they are tweeted.
