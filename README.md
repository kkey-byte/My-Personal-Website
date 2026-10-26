# My Personal Website

Premium multi-page portfolio (HTML, CSS, vanilla JS). No build step.

Student / portfolio owner: **Glaisa Mae** (name present in the original project).

The existing five-page portfolio presents a personal profile, education and design practice, categorized skills, software, project galleries and case studies, and contact information. It uses semantic HTML, responsive CSS, native JavaScript, Google Fonts, and IntersectionObserver; no framework or animation dependency is needed.

## Validation and build

No dependency installation is required. Videos use Git LFS; after cloning, install Git LFS and run `git lfs pull` to download the playable files. With Node.js installed, run:

```bash
node scripts/check.cjs
```

This checks JavaScript syntax, local HTML links and anchors (including the known dynamically generated work categories), shared assets, duplicate IDs, and skip links. There are no configured lint, TypeScript, or production build commands: the source files are the deployable static site. The checker does not verify remote accounts, dynamically referenced media, visual contrast, or browser interaction.

Before publishing, manually check the five pages at phone, tablet, and desktop widths; keyboard navigation and menu dismissal; project search, category links, modal focus and video playback; reduced motion; and disabled JavaScript. Gallery and skill data require JavaScript; the profile, education, and contact information remain readable without it.

## Content to complete

- Add the school and university names and current year level in `pages/about.html`.
- Add the real GitHub profile in the personal profile. No GitHub account was supplied.
- Add an actual PDF at `assets/resume.pdf`, set `SITE.resume` in `js/data.js`, and change the CV link labels and static destinations to Download CV. Until then, View CV opens the online profile.
- Confirm existing practice dates, project counts, project software, and client descriptions before public use. Practice entries are not presented as employment; unsupported percentage ratings and numeric statistics have been removed.
- Supply actual project palette, typography, research, and process details rather than using generated case-study claims.
- Employment, phone number, and repository/demo URLs are optional and omitted until real details are provided.
- Certifications now include the two provided Cisco Networking Academy course-completion PDFs and their previews in `assets/certificates/`.
- UI/UX work includes the provided AKAY, Merch Haven, Purok, and GABAY screenshots. GABAY is described as an endorsement website. Luméa is the only social media entry and is labeled as a practice example.
- Video Edits includes the seven supplied video exports plus the existing motion graphics clip. Video previews do not autoplay; opening a card starts full playback with controls. Neutral numbered titles can be replaced in `js/data.js` when project names are available.

## GitHub and Vercel

This working folder did not contain a Git repository when inspected. Create a personal GitHub repository and commit reviewed changes in focused commits; exclude secrets, credentials, and private documents. No commits, push, or deployment have been performed.

To deploy, import that repository in Vercel, select **Other** as the framework preset, use the repository root as the project root and output directory (`.`), and leave the build and install command overrides empty. No environment variables or SPA rewrites are required. `vercel.json` preserves the existing `.html` URLs and adds basic response headers. Check Home, About, Works, Contact, and `pages/project.html?id=landing-page` after deployment.

Live Vercel URL: **Not deployed — add the verified URL here after deployment.**

## Quick start

Open `index.html`, or:

```bash
python -m http.server 5500
```

Visit `http://localhost:5500`

## Add your photos & videos

**Read this first:** [ADD-YOUR-WORK.md](./ADD-YOUR-WORK.md)

Short version:

| Section | Folder |
|---|---|
| Facebook Feeds | `assets/images/social/genplex/fb-01.jpg` … `fb-10.jpg` |
| Others | `assets/images/social/genplex/others.png` |
| Posters | `assets/images/posters/` |
| T-shirts | `assets/images/tshirts/` |
| UI/UX | `assets/images/uiux/` |
| Videos | `assets/videos/*.mp4` |

Then match filenames in `js/data.js` (or copy an existing item).

## Customize site info

Edit `js/data.js`:

- `SITE` — name, email, socials, resume
- `PROJECTS` — posters, UI/UX, t-shirts, videos
- `SOCIAL_MEDIA_BRANDS` — social campaigns
- `SKILLS`, `SOFTWARE`

## Structure

```
├── index.html
├── ADD-YOUR-WORK.md      ← how to add media
├── pages/
│   ├── about.html
│   ├── works.html
│   ├── contact.html
│   └── project.html      ← UI/UX case study
├── css/
├── js/
│   ├── data.js           ← all content lives here
│   ├── main.js
│   └── project.js
└── assets/
    ├── images/
    │   ├── posters/
    │   ├── social/
    │   ├── tshirts/
    │   ├── uiux/
    │   ├── videos/       ← video cover images
    │   └── tools/
    ├── videos/           ← MP4 files
    └── resume.pdf
```
