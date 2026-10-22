# HOW TO UPDATE THIS SITE

## The important idea

After the first upload, you usually edit only:

`site-data.js`

You DO NOT need to delete the website folder and upload everything again.

### Add a project
Open `site-data.js`, find `projects: [`, copy one project block, paste it, and change the values.

### Remove a project
Delete that project's `{ ... }` block from `site-data.js`.

### Add a screenshot
1. Put the image in `assets/projects/`
2. Example: `assets/projects/queueup.jpg`
3. In `site-data.js`, change `image: ""` to:
   `image: "assets/projects/queueup.jpg"`

Upload only:
- the new image
- `site-data.js`

### Add LinkedIn
Find `linkedin: ""` in `site-data.js` and paste your LinkedIn URL.

### Change skills, experience, courses, email, project text
Edit only `site-data.js`.

### Change colors/design
Edit only `style.css`.

### Change your resume
Upload a new `resume.pdf`. Keep the same filename.

## Future GitHub workflow
- Project/text change → upload `site-data.js`
- New image → upload image + `site-data.js`
- Design change → upload `style.css`
- New resume → upload `resume.pdf`

Do not replace the entire folder every time.
