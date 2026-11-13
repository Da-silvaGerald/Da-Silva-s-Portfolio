export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  featuredCaseStudy?: boolean;
  shortDescription: string;
  fullOverview: string;
  problemSolved: string[];
  features: string[];
  whatILearned: string[];
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  heroImage: ProjectScreenshot;
  gallery: ProjectScreenshot[];
}

export const projects: ProjectItem[] = [
  {
    id: 'PRJ-001',
    slug: 'udemy-50-projects',
    title: 'Udemy 50 Projects',
    category: 'Front-End Engineering & DOM Architecture',
    year: '2023 // DEDICATED CASE STUDY',
    featuredCaseStudy: true,
    shortDescription:
      '50 small, self-contained web projects built from scratch with semantic HTML, modern CSS, and vanilla JavaScript to master native browser APIs and UI state.',
    fullOverview:
      // [PLACEHOLDER COPY — REVIEW & CUSTOMIZE IF NEEDED]
      'Udemy 50 Projects is an intensive front-end engineering compilation of 50 modular web micro-applications built purely with HTML5, CSS3, and vanilla JavaScript. By deliberately avoiding heavy front-end frameworks, each project isolates and solves a specific UI, DOM manipulation, animation, or asynchronous API challenge from first principles.',
    problemSolved: [
      // [PLACEHOLDER COPY — REVIEW & CUSTOMIZE IF NEEDED]
      'Relying exclusively on high-level frameworks can obscure how the browser actually handles DOM trees, event propagation, repaint cycles, and native state storage.',
      'Needed a rigorous, hands-on laboratory of 50 distinct micro-applications to build muscle memory in responsive layouts, keyboard accessibility, and asynchronous API error handling.',
      'Proved that interactive widgets—from drag-and-drop boards and custom media players to live API dashboards—can be engineered with zero external runtime dependencies.'
    ],
    features: [
      // [PLACEHOLDER COPY — REVIEW & CUSTOMIZE IF NEEDED]
      '50 standalone micro-applications covering interactive forms, modals, carousels, timers, canvas games, and live data visualizers.',
      'Asynchronous REST API integrations using native Fetch and async/await with defensive loading and error-recovery states.',
      'Persistent client-side state powered by browser LocalStorage with safe JSON parsing and fallback defaults.',
      'Responsive CSS Grid and Flexbox architectures tested from 360px mobile screens to widescreen desktop displays.',
      'Event delegation, debounced filtering, and keyboard-accessible interactive controls.'
    ],
    whatILearned: [
      // [PLACEHOLDER COPY — REVIEW & CUSTOMIZE IF NEEDED]
      'Raw DOM selection, event bubbling vs. capturing, and clean listener management without framework abstractions.',
      'Internalized secure DOM rendering habits—preferring textContent over unsanitized innerHTML to mitigate client-side XSS risks.',
      'Learned how CSS custom properties and compositor-friendly properties (transform and opacity) keep UI transitions smooth at 60fps.',
      'Developed disciplined folder structuring and reusable CSS token patterns across 50 separate codebases.'
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'DOM APIs', 'Fetch API', 'LocalStorage'],
    repoUrl: 'https://github.com/Da-silvaGerald/Udemy-50-on-50',
    liveUrl: 'https://github.com/Da-silvaGerald/Udemy-50-on-50',
    heroImage: {
      src: '/screenshots/udemy-main.mp4',
      alt: 'Movie app built as one of the 50 Udemy projects with HTML, CSS, and JavaScript',
      caption: 'FIG 1.0 // Movie app built as one of the 50 Udemy projects with HTML, CSS, and JavaScript'
    },
    gallery: [
      {
        src: '/screenshots/udemy-main.mp4',
        alt: 'Movie app built as one of the 50 Udemy projects with HTML, CSS, and JavaScript',
        caption: 'FIG 1.1 // Movie app built as one of the 50 Udemy projects with HTML, CSS, and JavaScript'
      },
      {
        src: '/screenshots/udemy-detail-1.mp4',
        alt: 'Image scrollthrough, responsive micro-interactions, and custom form states',
        caption: 'FIG 1.2 // Responsive micro-interactions, Image scrollthrough, and layout states'
      },
      {
        src: '/screenshots/udemy-detail-2.mp4',
        alt: 'Rotating menu for webiste navigation, one of the 50 Udemy projects built with HTML, CSS, and JavaScript',
        caption: 'FIG 1.3 // Rotating menu for webiste navigation, one of the 50 Udemy projects built with HTML, CSS, and JavaScript'
      }
    ]
  },
  {
    id: 'PRJ-002',
    slug: 'cafeteria-app',
    title: 'CafeteriaApp',
    category: 'Food Ordering System // Desktop & Database',
    year: '2025',
    shortDescription:
      'A structured food ordering application built with Java, JavaFX (FXML), custom CSS styling, and a relational PostgreSQL database.',
    fullOverview:
      'CafeteriaApp digitizes campus meal ordering and kitchen queue management. Built with Java and FXML for the desktop user interface and backed by PostgreSQL, the platform enables users to browse categorized menus, compute real-time order totals, and persist transactions reliably.',
    problemSolved: [
      'Manual cafeteria ordering created long queues, lost paper tickets, and arithmetic errors during peak campus dining hours.',
      'Menu availability and pricing updates were difficult to synchronize across ordering counters and kitchen staff.',
      'Required a relational PostgreSQL schema with transactional integrity so concurrent orders never corrupt stock or billing records.'
    ],
    features: [
      'Categorized food and beverage catalog built in FXML with custom JavaFX CSS styling.',
      'Real-time cart management, item quantity validation, and automatic order total calculation.',
      'PostgreSQL database integration using parameterized JDBC PreparedStatement queries.',
      'Staff queue view for tracking order preparation and fulfillment status.'
    ],
    whatILearned: [
      'Structured clean separation of concerns between FXML views, Java controllers, and PostgreSQL data-access classes.',
      'Prevented SQL injection vulnerabilities by enforcing parameterized queries across every database interaction.',
      'Improved error handling around database connectivity and user input validation.'
    ],
    techStack: ['Java', 'PostgreSQL', 'CSS', 'FXML'],
    repoUrl: 'https://github.com/Da-silvaGerald/Cafeteria-App',
    heroImage: {
      src: '/screenshots/cafeteria-main.png',
      alt: 'CafeteriaApp food ordering interface built with Java, FXML, CSS, and PostgreSQL',
      caption: 'FIG 2.0 // CafeteriaApp ordering interface & PostgreSQL queue [REPLACE ME WITH REAL SCREENSHOT]'
    },
    gallery: [
      {
        src: '/screenshots/cafeteria-main.png',
        alt: 'CafeteriaApp menu and cart view',
        caption: 'FIG 2.1 // Interactive food menu and cart calculation view'
      }
    ]
  },
  {
    id: 'PRJ-003',
    slug: 'sante-diagnostics',
    title: 'SanteDiagnostics',
    category: 'Laboratory Information Management System (LIMS)',
    year: '2025',
    shortDescription:
      'A Laboratory Information Management System (LIMS) engineered with Java, FXML, PostgreSQL, Maven build tool, and Jakarta Mail for diagnostic sample tracking and automated notifications.',
    fullOverview:
      'SanteDiagnostics is a full-featured Laboratory Information Management System (LIMS) that tracks clinical specimens from patient intake through diagnostic testing and verified report delivery. Built with Java, FXML, Maven, and PostgreSQL, it uses Jakarta Mail to dispatch automated email alerts once lab results are finalized.',
    problemSolved: [
      'Paper-based and spreadsheet lab workflows risked specimen mix-ups, delayed result delivery, and unverified edits to sensitive medical records.',
      'Patients and clinicians lacked automatic notification when diagnostic test results were completed.',
      'Required role-separated workflows so receptionists, lab scientists, and administrators operate within strict access boundaries.'
    ],
    features: [
      'End-to-end specimen tracking from patient registration to diagnostic result verification.',
      'Automated email notifications powered by Jakarta Mail when lab reports are ready.',
      'Role-based access controls backed by a normalized PostgreSQL database schema.',
      'Standardized project lifecycle and dependency management using the Apache Maven build tool.'
    ],
    whatILearned: [
      'Applied practical Identity and Access Management (IAM) principles to protect sensitive diagnostic workflows.',
      'Integrated Jakarta Mail asynchronously so network SMTP operations do not block the JavaFX UI thread.',
      'Collaborated effectively in a multi-developer Git repository using Maven conventions.'
    ],
    techStack: ['Java', 'FXML', 'PostgreSQL', 'Maven', 'Jakarta Mail'],
    repoUrl: 'https://github.com/Txbe-YT/sante-lims',
    heroImage: {
      src: '/screenshots/sante-main.png',
      alt: 'SanteDiagnostics Laboratory Information Management System dashboard',
      caption: 'FIG 3.0 // SanteDiagnostics LIMS dashboard & Jakarta Mail integration [REPLACE ME WITH REAL SCREENSHOT]'
    },
    gallery: [
      {
        src: '/screenshots/sante-main.png',
        alt: 'SanteDiagnostics specimen tracking screen',
        caption: 'FIG 3.1 // Clinical sample intake and diagnostic result dispatch'
      }
    ]
  }
];
