# How to add your work (photos & videos)

You only need two steps for most items:

1. Drop the file into the correct folder  
2. Match the filename to what is already listed in `js/data.js`  
   (or copy an existing item and change the name + path)

Open the site by opening `index.html`, or run a local server:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`

---

## Folder map

| Works section | Put files here | Size tip |
|---|---|---|
| Social – Others | `assets/images/social/socmed-1.png` (add socmed-2…) | Square **1080×1080** |
| Social – Aiplex / Genplex Facebook Feeds | `assets/images/social/aiplex/genplex-1.png` … | Square **1080×1080** |
| Social – brand logo | `assets/images/social/aiplex-logo.png` | Square logo |
| Poster Designs | `assets/images/posters/poster-1.png` (add poster-2…) | Portrait **1200×1600** (3:4) |
| T-Shirt Designs | `assets/images/tshirts/` | Landscape **1600×1200** (4:3) |
| UI/UX cards | `assets/images/uiux/` | Landscape **1600×1100** |
| UI/UX case mockups | `assets/images/uiux/mockups/` | Any landscape |
| Video files | `assets/videos/` | **MP4** (vertical for reels) |
| Video covers | `assets/images/videos/` | Phone-friendly still |

PNG or JPG both work. Keep file names simple (no spaces if possible).

---
============================ SOCIAL MEDIA DESIGNS ============================
## 1) Social Media Designs

Edit `SOCIAL_MEDIA_BRANDS` in `js/data.js`.

### Add a new brand (like Genplex)

**Step 1 — folders & files**

1. Create a folder: `assets/images/social/your-brand/`
2. Put feed photos inside it, e.g. `post-1.png`, `post-2.png`
3. Put the logo here: `assets/images/social/your-brand-logo.png`

**Step 2 — copy a brand block in `js/data.js`**

Paste a new object **above** the `others` block (keep Others last). Example:

```js
{
  id: "your-brand",                    // unique id (no spaces)
  name: "Your Brand Name",             // big title
  tagline: "Short one-line tagline.",  // blue line under the name
  logo: "assets/images/social/your-brand-logo.png",
  description: [
    "First paragraph about the brand / project.",
    "Second paragraph about what you designed.",
  ],
  meta: [
    { label: "Sector", value: "Technology" },
    { label: "Client", value: "Client Name" },
    { label: "Year", value: "2025" },
  ],
  sections: [
    {
      title: "Facebook Feeds",
      subtitle: "Static post 1080×1080",
      images: [
        "assets/images/social/your-brand/post-1.png",
        "assets/images/social/your-brand/post-2.png",
      ],
    },
  ],
},
```

**What each field does**

| Field | What it shows |
|---|---|
| `name` | Brand title |
| `tagline` | Line under the title |
| `logo` | Round logo image |
| `description` | Paragraphs under the title |
| `meta` | Sector / Client / Year on the right |
| `sections[].title` | e.g. “Facebook Feeds” |
| `sections[].subtitle` | Small line under that title |
| `sections[].images` | Photo grid for that section |

**Others** (misc posts, not tied to a brand):  
Add files like `socmed-2.png` in `assets/images/social/`, then list them in the **Others** `images` array.
<!-- ============================ POSTER DESIGNS ============================ -->
## 2) Poster Designs

1. Add photo: `assets/images/posters/poster-1.png`  
2. In `PROJECTS`, it must be listed like:

```js
{
  id: "poster-1",
  title: "AirPods Pro 2",
  category: "graphic",
  image: "assets/images/posters/poster-1.png",
}
```

Dropping a file in the folder alone is not enough — add (or copy) an entry in `js/data.js`.

---
============================ TSHIRT DESIGNS ============================
## 3) T-Shirt Designs

1. Add photo: `assets/images/tshirts/tshirt-2.png`  
2. Matching entry already exists in `PROJECTS`

Add more by copying a tshirt item:

```js
{ id: "tshirt-5", title: "T-Shirt Design 5", category: "tshirt", desc: "Apparel design photo", image: "assets/images/tshirts/tshirt-5.png" },
```

---
============================ UI/UX DESIGNS ============================
## 4) UI/UX Designs

**Cover photo (landing page — shown full size, not cropped):**

```js
image: "assets/images/uiux/landing-page.png"
```

**3 photos under the landing cover** (1 row, natural size, not cropped):

```js
gallery: [
  "assets/images/uiux/gallery/ui-1.png",
  "assets/images/uiux/gallery/ui-2.png",
  "assets/images/uiux/gallery/ui-3.png",
],
```

Drop files in `assets/images/uiux/gallery/` and match the paths above (or change the paths).

**Case study final mockups** (optional):

```js
mockups: [
  "assets/images/uiux/mockups/landing-desktop.jpg",
  "assets/images/uiux/mockups/landing-mobile.jpg"
]
```

---

## 5) Video Edits

1. Put the video here: `assets/videos/motion-graphics-1.mp4`  
2. Optional cover: `assets/images/videos/motion-graphics.jpg`  
3. Entry in `PROJECTS` already has:

```js
video: "assets/videos/motion-graphics-1.mp4",
```

**Important:** the filename in the folder must match `js/data.js` exactly.  
Example: if your file is `my-edit.mp4`, either rename it or change the path in `data.js`.

Clicking play opens the video in a popup.  
Use vertical MP4 for reels (9:16). Keep files under ~20–40MB if possible.

---

## 6) Site info (name, email, socials, resume)

Edit the top of `js/data.js`:

- `SITE.name`
- `SITE.email`
- `SITE.social`
- `SITE.resume` → put PDF at `assets/resume.pdf`

---

## Tips

- After adding files, hard-refresh the browser (`Ctrl + F5`)
- Missing images show a placeholder until you drop the file in
- You can delete unused project rows in `js/data.js` to keep the Works page shorter
- Do not rename the `assets/...` folders unless you also update the paths in `js/data.js`
