FitCRM – Simple Client Manager for a Fitness Program
====================================================

A lightweight, frontend-only CRM web app to help fitness professionals manage basic client information and track fitness goals. Built with semantic HTML and modern CSS (Flexbox/Grid), designed to work well on both desktop and mobile.

Note: This is a static prototype. Buttons and actions are placeholders and do not persist data.


Overview
--------
- **Project Type**: Frontend-only (HTML + CSS)
- **Target Users**: Fitness instructors, personal trainers, small gym owners
- **Purpose**: Provide a simple interface to add a new client (form page) and view a list of clients (table page) with mock actions


Live Demo and Repository
------------------------
- **Live App**: [Add your deployed URL here]
- **GitHub Repository**: [Add your public GitHub repo URL here]


Features (Functional Requirements)
----------------------------------
1) New Client Form (Page 1)
   - Full Name (text)
   - Age (number)
   - Gender (dropdown)
   - Email (email input)
   - Phone (tel)
   - Fitness Goal (dropdown or free text)
   - Membership Start Date (date)
   - “Add Client” button (placeholder – no persistence)

2) Client List View (Page 2)
   - Table showing 10 sample clients
   - Columns: Name, Email, Phone, Fitness Goal, Membership Start Date
   - Row actions: Edit, Delete (placeholders)
   - Search box to filter by client name (UI only in this prototype)

3) Responsive Design
   - Layout built with CSS Flexbox/Grid
   - Scales for desktop and mobile
   - Optional media queries for enhanced responsiveness


Tech Stack
----------
- **HTML5** for structure
- **CSS3** (Flexbox/Grid, media queries) for layout and responsiveness
- No JavaScript or backend included in this prototype


Project Structure
-----------------
```
fitcrm/
├── index.html
├── css/
│   └── styles.css
├── assets/
│   └── icons/
│       ├── delete.svg
│       ├── edit.svg
│       ├── logo.svg
│       └── search.svg
└── README.md
```


Getting Started (Local)
-----------------------
No build tools are required.

1. Clone or download this repository.
2. Open `index.html` directly in your browser.
   - On Windows, you can double‑click `index.html` or right‑click → Open With → your browser.


Pages
-----
- `index.html` includes the markup for:
  - New Client Form section
  - Client List View section with sample data and placeholder actions
  - A search box above the table (visual only in this prototype)

- `css/styles.css` contains all styles for layout, typography, color, and responsiveness.


Deployment
----------
You can deploy using either Netlify or GitHub Pages.

Option 1: Deploy to Netlify
1. Go to `https://www.netlify.com` and create an account.
2. Click “Add New Site” → “Import an Existing Project”.
3. Connect your GitHub account and select your repository.
4. Build settings: No build command needed; publish directory is the repository root.
5. Click Deploy. Netlify will provide a live URL (you can rename it later).

Option 2: Deploy to GitHub Pages
1. Push your code to a GitHub repository (public).
2. In your repo, go to Settings → Pages.
3. Under “Source”, select the branch (e.g., `main`) and the folder `/root`.
4. Save and wait for GitHub Pages to publish your site.
5. Your site will be available at a URL like `https://username.github.io/fitcrm/`.


Submission Guidelines
---------------------
Include the following in your submission:

1) **GitHub Repository Link**
   - Must be public
   - Code should be well‑organized with proper file structure and comments

2) **Live App Link**
   - Either GitHub Pages or Netlify URL

3) **If deployment is not working**, include one of the following:
   - A clear explanation in this README with screenshots, or
   - Local instructions to open the project (see Getting Started)

4) **README.md must include**:
   - Brief description of the project
   - Tech stack used
   - Deployment method (Netlify or GitHub Pages)


Screenshots (Optional but Recommended)
--------------------------------------
Add screenshots or GIFs of:
- New Client Form (desktop and mobile)
- Client List View with search box (desktop and mobile)

You can place images in `assets/` and reference them here, for example:
```
![FitCRM – New Client Form](assets/screenshots/new-client-form.png)
![FitCRM – Client List](assets/screenshots/client-list.png)
```


Notes & Limitations
-------------------
- This is a static prototype without data persistence.
- Edit/Delete actions and Add Client button are non‑functional placeholders.
- For a production system, you would add JavaScript for interactivity and a backend/API for data storage.


License
-------
You may use, modify, and distribute this project for educational purposes. If you plan to use it commercially, please add an appropriate license (e.g., MIT) and update this section accordingly.


