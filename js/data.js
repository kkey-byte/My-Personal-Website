/**
 * Portfolio project data & site config
 * Replace name, links, and resume path with your own.
 */
const SITE = {
  name: "Glaisa",
  title: "Creative Designer",
  email: "glaisa06292004@gmail.com",
  resume: null,
  social: {
    facebook: "https://www.facebook.com/glaisxzy",
    instagram: "https://www.instagram.com/aisaxzkr/",
    email: "mailto:glaisa06292004@gmail.com",
    linkedin: "https://www.linkedin.com/in/glaisa-mae-curato-384856419/",
  },
  roles: ["UI/UX Designer", "Graphic Designer", "Video Editor"],
  stats: [],
};

const SKILLS = [
  {
    category: "Graphic Design",
    icon: "palette",
    description: "Bold visual identities, posters, and brand-ready creative assets.",
    items: ["Photoshop", "Canva", "Branding", "Social Media Design", "Typography"],
  },
  {
    category: "Video Editing",
    icon: "film",
    description: "Cinematic storytelling, motion graphics, and short-form content.",
    items: ["CapCut", "Alight Motion", "DaVinci Resolve", "Motion Graphics", "Reels"],
  },
  {
    category: "UI/UX Design",
    icon: "layout",
    description: "Crafting intuitive interfaces with research-driven design systems.",
    items: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems"],
  },
];

const SOFTWARE = [
  { name: "Figma", tag: "UI/UX", color: "#A259FF", logo: "assets/images/tools/figma.png" },
  { name: "Canva", tag: "Design", color: "#00C4CC", logo: "assets/images/tools/canva.png" },
  { name: "Alight Motion", tag: "Motion", color: "#7CF5C8", logo: "assets/images/tools/alight-motion.png" },
  { name: "CapCut", tag: "Video", color: "#FFFFFF", logo: "assets/images/tools/capcut.png" },
  { name: "Adobe Photoshop", tag: "Raster", color: "#31A8FF", logo: "assets/images/tools/photoshop.png" },
  { name: "DaVinci Resolve", tag: "Color", color: "#E04E39", logo: "assets/images/tools/davinci-resolve.png" },
];

const TOOL_META = {
  Photoshop: { short: "Ps", color: "#31A8FF", label: "Photoshop" },
  Illustrator: { short: "Ai", color: "#FF9A00", label: "Illustrator" },
  Canva: { short: "Ca", color: "#00C4CC", label: "Canva" },
  Figma: { short: "Fi", color: "#A259FF", label: "Figma" },
  CapCut: { short: "Cc", color: "#00C2FF", label: "CapCut" },
  "Alight Motion": { short: "Am", color: "#FF6A3D", label: "Alight Motion" },
  "Premiere Pro": { short: "Pr", color: "#9999FF", label: "Premiere Pro" },
  "After Effects": { short: "Ae", color: "#9999FF", label: "After Effects" },
  "DaVinci Resolve": { short: "Dv", color: "#E04E39", label: "DaVinci Resolve" },
};

const PROJECTS = [
  {
    "id": "poster-1",
    "title": "AirPods Pro 2",
    "category": "graphic",
    "desc": "Product promo poster with offer badge and feature callouts.",
    "hue": 210,
    "image": "assets/images/posters/poster-1.png"
  },
  {
    "id": "tshirt-1",
    "title": "T-Shirt Design 1",
    "category": "tshirt",
    "desc": "Apparel design",
    "image": "assets/images/tshirts/tshirt-1.png"
  },
  {
    "id": "tshirt-2",
    "title": "T-Shirt Design 2",
    "category": "tshirt",
    "desc": "Apparel design",
    "image": "assets/images/tshirts/tshirt-2.png"
  },
  {
    "id": "akay",
    "title": "AKAY",
    "category": "uiux",
    "desc": "Mobile interface screens showing the loading, landing, login, and account creation flow.",
    "hue": 213,
    "image": "assets/images/uiux/akay.png",
    "gallery": [
      "assets/images/uiux/akay.png"
    ],
    "mockups": []
  },
  {
    "id": "merch-haven",
    "title": "Merch Haven",
    "category": "uiux",
    "desc": "A purple merchandise storefront interface featuring K-pop products, categories, and product cards.",
    "hue": 270,
    "image": "assets/images/uiux/merch-haven.png",
    "gallery": [
      "assets/images/uiux/merch-haven.png"
    ],
    "mockups": []
  },
  {
    "id": "purok",
    "title": "Purok",
    "category": "uiux",
    "desc": "Mobile interface for a digital governance system, including login, registration, and confirmation screens.",
    "hue": 140,
    "image": "assets/images/uiux/purok.png",
    "gallery": [
      "assets/images/uiux/purok.png"
    ],
    "mockups": []
  },
  {
    "id": "gabay",
    "title": "GABAY",
    "category": "uiux",
    "desc": "An endorsement website design for the GABAY smart cane, with home, about, contact, and product presentation screens.",
    "hue": 200,
    "image": "assets/images/uiux/gabay.png",
    "gallery": [
      "assets/images/uiux/gabay.png"
    ],
    "mockups": []
  },
  {
    "id": "video-edit-1",
    "duration": "0:51",
    "title": "Video Edit 01",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 215,
    "video": "assets/videos/lv_0_20261014160811.mp4"
  },
  {
    "id": "video-edit-2",
    "duration": "0:36",
    "title": "Video Edit 02",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 227,
    "video": "assets/videos/lv_0_20261015020330.mp4"
  },
  {
    "id": "video-edit-3",
    "duration": "0:45",
    "title": "Video Edit 03",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 239,
    "video": "assets/videos/lv_0_20261017174121.mp4"
  },
  {
    "id": "video-edit-4",
    "duration": "0:55",
    "title": "Video Edit 04",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 251,
    "video": "assets/videos/lv_0_20261019100057.mp4"
  },
  {
    "id": "video-edit-5",
    "duration": "0:45",
    "title": "Video Edit 05",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 263,
    "video": "assets/videos/lv_0_20261024185140.mp4"
  },
  {
    "id": "video-edit-6",
    "duration": "0:49",
    "title": "Video Edit 06",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 275,
    "video": "assets/videos/lv_0_20261025212315.mp4"
  },
  {
    "id": "video-edit-7",
    "duration": "0:16",
    "title": "Video Edit 07",
    "category": "video",
    "desc": "Selected video editing work. Play the video to view the full edit.",
    "hue": 287,
    "video": "assets/videos/lv_0_20261026190138.mp4"
  },
  {
    "id": "motion-graphics",
    "duration": "0:18",
    "title": "Motion Graphics",
    "category": "video",
    "desc": "A short motion graphics video.",
    "hue": 245,
    "video": "assets/videos/motion-graphics-1.mp4"
  }
];

const CATEGORY_LABELS = {
  social: "Social Media Designs",
  graphic: "Poster Design",
  uiux: "UI/UX Design",
  tshirt: "T-Shirt Designs",
  video: "Video Edits",
};

/**
 * Social Media Designs — brand case + separate photo section cards.
 * Facebook Feeds live under each brand; Others is its own card.
 */
const SOCIAL_MEDIA_BRANDS = [
  {
    "id": "lumea",
    "name": "Luméa",
    "tagline": "Social media design · Practice example",
    "description": [
      "A skincare-inspired social media design exploring product presentation and visual hierarchy.",
      "This is a practice example, not a commissioned client project."
    ],
    "meta": [
      {
        "label": "Project type",
        "value": "Practice example"
      }
    ],
    "sections": [
      {
        "title": "Sample social post",
        "images": [
          "assets/images/social/socmed-1.png"
        ]
      }
    ]
  }
];

const CATEGORY_BANNERS = [
  {
    id: "social",
    line1: "SOCIAL MEDIA",
    line2: "DESIGNS",
    nav: "Social Media Designs",
    desc: "One practice example exploring skincare product visuals for social media.",
  },
  {
    id: "graphic",
    line1: "POSTER",
    line2: "DESIGN",
    nav: "Poster Designs",
    desc: "Bold print and digital posters crafted for food, sports, events, branding, and campaigns.",
  },
  {
    id: "video",
    line1: "VIDEO",
    line2: "EDITS",
    nav: "Video Edits",
    desc: "A selection of video edits. Choose a video to watch the full edit with playback controls.",
  },
  {
    id: "tshirt",
    line1: "T-SHIRT",
    line2: "DESIGNS",
    nav: "T-Shirt Designs",
    desc: "Photo showcase of apparel and merch designs — add your own images anytime.",
  },
  {
    id: "uiux",
    line1: "UI UX",
    line2: "DESIGN",
    nav: "UI/UX Designs",
    desc: "Interface concepts for websites and apps — clean layouts, flows, and high-fidelity mockups.",
  },
];

/** Side nav links shown on Works page (order matters) */
const WORKS_NAV = [
  { id: "social", label: "Social Media Designs" },
  { id: "graphic", label: "Poster Designs" },
  { id: "video", label: "Video Edits" },
  { id: "tshirt", label: "T-Shirt Designs" },
  { id: "uiux", label: "UI/UX Designs" },
];

function getProjectDetail(project) {
  if (!project) return null;
  return {
    ...project,
    categoryLabel: CATEGORY_LABELS[project.category],
    overview: project.desc,
    problem: "Project brief to be added by the author.",
    research: "Research and process details to be added by the author.",
    process: [],
    colors: project.colors || [],
    typography: project.typography || [],
    components: project.components || [],
  };
}
