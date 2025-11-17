# color-playground
—
## Overview:

A fully-responsive digital tool for artists and designers that includes a space for color experimentation and a personal library of stored color schemes.

Other features include:
- A space for color palette creation.
- The ability to edit/delete color palettes from the user's color library.
- An accessability checker tool that determines the degree of contrast between 2 selected colors (incorporating WebAIM's color contrast API).


Tools and Technologies used: Node.js, Express, HTML, CSS (Grid, Flexbox, Media Queries), Bootstrap, JavaScript, WebAIM's Color Contrast API.


## Getting Started
1. Clone the repository using GIT

    `git clone https://github.com/Allison-Eigsti/color-playground.git`

2. Navigate into the project folder

    `cd color-playground`

3. Install dependencies
    `npm install`

4. Run development server
    `npm run dev`

5. In your browser, navigate to:
    `http://localhost:8000`



## File Organization
—
The Color Playground has the following file structure:
The root directory: color-playground

```python
color-playground
├─ node_modules
├─ public
│  ├─ assets
│  │  └─ icons
│  │     └─ edit-icon.png
│  │  └─ images
│  │     └─ main-graphic.png
│  ├─ css
│  │  ├─ reset.css
│  │  └─ style.css
│  ├─ js
│  │  ├─ contrast.js
│  │  ├─ index.js
│  │  ├─ library.js
│  │  └─ playground.js
│  ├─ contrast.html
│  ├─ index.html
│  ├─ library.html
│  ├─ playground.html
│  └─ playground2.html
├─ package.json
├─ README.md
└─ server.js
```


### Project Folder: project5
—
The project5 folder is the standard Django application folder, which contains the settings.py, urls.py, asgi.py, and wsgi.py. The settings.py file includes some important configurations, such as authentication redirects and setup for user-uploaded media storage.

### Application: accounts
—
Since this project uses Django’s built-in auth system to handle user authentication. The accounts app extends it by providing a custom user registration form with corresponding views and URL routes.

### Application: journal
—
The journal application consists of the following relevant files and folders:
models.py: defines the Entry model for journal posts, Profile model for user profiles, MoodTags model for the emotion tags that users can select to tag entries with, and Follow which stores the follower/following relationships between users. 
forms.py: contains Django forms for writing new entries and updating user profiles
views.py: handles the main app logic: displays entries, searches past entries, creates new ones, edits/deletes entries (etc.)
urls.py: maps URL routes to their corresponding views
admin.py: registers models to the Django admin site

Folders:
templates/journal: contains HTML templates
Layout.html: renders the navigation bar
Index.html: Renders a list of users’ previous journal entries and, when a specific entry is clicked, displays a full view of the selected entry.
Community.html: Renders a list of all that have been marked public, and opens selected entries to render the full content.
New.html: Renders form for users to create new journal entries.
Profile.html: Renders users profiles and their pinned entries.
Edit_profile.html: Renders form that allows users to update their profile picture and bio.
Search_results.html: Displays a list of entries that fit the user’s search query.
static/journal:
index.js: Provides client-side interactivity and dynamic behavior, such as full entry rendering, managing toggle buttons, and drag-drop functionality.
Reset.css: Resets default browser styles.
Styles.css: Styles elements by specifying layout, color scheme, font and responsive behavior. 
static/journal/images:
Includes open and close button images on the mobile navigation bar.

### Folder: media
—
Inside the media folder is an images folder, which contains all user-uploaded photos for the users’ profile pictures. It also contains a default.png if the user chooses not to upload a photo.


### Author 
Allison Eigsti, December 2025


Examples – Code snippets or screenshots showing how it works.
Contributing – Guidelines for people who want to help with the project.
License – Information about how the project can be used or shared.
Credits – Acknowledgments or links to related work