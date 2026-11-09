# Pasidu Daham Senasighe — Multi-Page E-Portfolio (2026)

> **Major:** Business Analytics (B.A. Hons)  
> **Academic Pathway:** Nawaloka College of Higher Studies (affiliated with Swinburne University of Technology) &rarr; RMIT University  
> **Aesthetic Theme:** Executive Midnight Obsidian, Royal Sapphire Blue & Arctic Cyan Frost

---

## 🌐 Multi-Page Structure & Slide-by-Slide System

Unlike single-page scrolling sites, this e-portfolio is split across **individual HTML pages** with **slide-by-slide interactive viewers** matching Adobe Portfolio:

```
pasidu-eportfolio/
├── index.html                  # 1. Home (About Me, Bio, Social Links)
├── skills-work.html            # 2. Skills Work (Coursework Menu)
│   ├── self-reflection.html    #    └── Self Reflection Essay (3 Pages Slide-by-Slide)
│   ├── study-schedule.html     #    └── Study Schedule Sheet (Document View)
│   └── academic-summary.html   #    └── Academic Article Summary (3 Parts Slide-by-Slide)
├── research-project.html       # 3. Research Project (Report Slide View)
├── oral-presentation.html      # 4. Oral Presentation (10-Slide Deck Slide-by-Slide)
├── peer-reviews.html           # 5. Peer Reviews (Evaluation Cards & Rubrics)
├── contact.html                # 6. Contact (Direct Form)
├── style.css                   # Shared Theme Stylesheet (Midnight Sapphire & Cyan)
├── script.js                   # Shared Slide Deck Engine & Navigation
└── images/                     # Put your image files here (or in root)
```

---

## 📸 Image Paths Reference (Drop Your Files Here)

You can simply place your image files in the `images/` directory with the following exact names:

| Page | Feature | Image Path / Filename |
| :--- | :--- | :--- |
| **Home** | Profile Photo | `images/pro.png` |
| **Self Reflection** | Essay Page 1 | `images/self 01.png` |
| **Self Reflection** | Essay Page 2 | `images/self 02.png` |
| **Self Reflection** | Essay Page 3 | `images/self 03.png` |
| **Study Schedule** | Timetable Sheet | `images/studyshchedule.png` *(or `studyschedule.png`)* |
| **Academic Summary** | Summary Part 1 | `images/sum1.png` |
| **Academic Summary** | Summary Part 2 | `images/sum2.png` |
| **Academic Summary** | Summary Part 3 | `images/sum3.png` |
| **Research Project** | Report Slide 1 & 2 | `images/research1.png`, `images/research2.png` |
| **Oral Presentation** | Slides 1 to 10 | `images/ed1.png`, `images/ed2.png`, ... `images/ed10.png` |
| **Peer Reviews** | Evaluation Sheets | `images/peer1.png`, `images/peer2.png` |

> *Note: Until you add your actual files, every slide displays a placeholder mockup showing the required filename and path, allowing you to test the entire slide-by-slide navigation immediately without errors.*

---

## 🚀 How to Host on GitHub Pages

1. Create a repository on [GitHub](https://github.com) named `e-portfolio` (or `<your-username>.github.io`).
2. Upload all files from this folder (`index.html`, `skills-work.html`, `self-reflection.html`, `study-schedule.html`, `academic-summary.html`, `research-project.html`, `oral-presentation.html`, `peer-reviews.html`, `contact.html`, `style.css`, `script.js`, and the `images/` folder).
3. In your GitHub repository:
   - Go to **Settings &rarr; Pages**.
   - Under **Build and deployment &gt; Branch**, select **main** and **/ (root)**.
   - Click **Save**.
4. In 1–2 minutes, your website is live worldwide at:  
   `https://<your-username>.github.io/<repo-name>/`
