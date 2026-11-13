export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  highlights: string[];
}

export interface FocusArea {
  code: string;
  title: string;
  detail: string;
}

export interface ProfileData {
  siteTitle: string;
  name: string;
  authorName: string;
  shortName: string;
  matricNumber: string;
  headline: string;
  positioning: string;
  statusText: string;
  location: string;
  coordinates: string;
  university: string;
  courseCode: string;
  typewriterRoles: string[];
  about: {
    whoIAm: string;
    whatIDo: string;
    securityDirection: string;
  };
  focusAreas: FocusArea[];
  experience: ExperienceItem[];
  contact: {
    email: string;
    whatsappNumberPlain: string;
    whatsappDisplay: string;
    whatsappPrefill: string;
    github: string;
    linkedin: string;
  };
}

export const profile: ProfileData = {
  siteTitle: 'My Portfolio: Da-Silva Oluwasegun',
  name: 'My Portfolio: Da-Silva Oluwasegun',
  authorName: 'Oluwasegun Gerald Da-silva',
  shortName: 'My Portfolio: Da-Silva Oluwasegun',
  matricNumber: '23120112012',
  headline: 'Software Engineering Student & Security-Focused Builder',
  positioning:
    'Software Engineering student at Pan-Atlantic University, Lagos, with a growing focus on cybersecurity (Kali Linux, defensive security, offensive security, IAM, and secure systems).',
  statusText: 'STATUS: OPEN TO INTERNSHIPS & SECURITY ROLES',
  location: 'Lagos, Nigeria',
  coordinates: '6.4698° N, 3.5852° E // WAT (UTC+1)',
  university: 'Pan-Atlantic University, Lagos',
  courseCode: 'CSC 419',
  typewriterRoles: [
    'Software Engineering Student @ Pan-Atlantic University',
    'Defensive & Offensive Security (Kali Linux)',
    'IAM, GRC, Encryption & DevSecOps Focus',
    'IT Intern @ Oando Energy Resources (2025 & 2026)'
  ],
  about: {
    whoIAm:
      'I am Oluwasegun Gerald Da-silva, a Software Engineering undergraduate at Pan-Atlantic University, Lagos. My academic training spans relational database systems, object-oriented software engineering, and full-stack web architecture, backed by hands-on enterprise IT internships at Oando Energy Resources Nigeria Limited during the summers of 2025 and 2026.',
    whatIDo:
      'I design and build structured software systems—including desktop Laboratory Information Management Systems (LIMS) and campus food ordering platforms using Java, JavaFX (FXML), Maven, and PostgreSQL, alongside modular front-end web applications in HTML, CSS, and JavaScript.',
    securityDirection:
      'My technical work increasingly centers on cybersecurity: practicing offensive and defensive workflows in Kali Linux, designing strict Identity and Access Management (IAM) boundaries, applying encryption and secure backend API patterns, and aligning software delivery with DevSecOps and GRC principles.'
  },
  focusAreas: [
    {
      code: 'SEC-01',
      title: 'Defensive & Offensive Security',
      detail:
        'Hands-on vulnerability assessment, threat triage, Linux system hardening, and probing application attack surfaces using Kali Linux.'
    },
    {
      code: 'SEC-02',
      title: 'Identity & Access Management (IAM)',
      detail:
        'Role-based access control (RBAC), least-privilege session handling, authentication workflows, and auditable user actions across multi-tier apps.'
    },
    {
      code: 'SEC-03',
      title: 'Secure Web Apps, APIs & Encryption',
      detail:
        'Parameterized SQL queries, defensive input validation, cryptographic data protection, and resilient PostgreSQL + Java backend services.'
    },
    {
      code: 'SEC-04',
      title: 'DevSecOps & GRC',
      detail:
        'Integrating automated security checks into the software development lifecycle while aligning technical controls with governance, risk, and compliance.'
    }
  ],
  experience: [
    {
      id: 'EXP-01',
      period: 'SUMMERS 2025 & 2026',
      role: 'Information Technology Intern',
      organization: 'Oando Energy Resources Nigeria Limited',
      location: 'Lagos, Nigeria',
      highlights: [
        'Supported enterprise IT operations, user identity and access workflows, and systems reliability across corporate energy teams.',
        'Worked alongside infrastructure and security personnel to observe enterprise governance controls, endpoint hardening, and incident triage.',
        'Streamlined technical support documentation and reinforced operational uptime across internal business applications.'
      ]
    },
    {
      id: 'EXP-02',
      period: '2022 — PRESENT',
      role: 'B.Sc. Software Engineering Student',
      organization: 'Pan-Atlantic University',
      location: 'Lagos, Nigeria',
      highlights: [
        'Building production-grade coursework and team systems with Java, FXML, PostgreSQL, Maven, TypeScript, React, and modern web standards.',
        'Focusing upper-level research and practical lab training on secure systems architecture, IAM, and offensive/defensive security.'
      ]
    }
  ],
  contact: {
    email: 'dasilvasegun10@gmail.com',
    whatsappNumberPlain: '2349150727449',
    whatsappDisplay: '+234 9150727449',
    whatsappPrefill:
      'Hello Oluwasegun, I viewed "My Portfolio: Da-Silva Oluwasegun" and would like to connect.',
    github: 'https://github.com/Da-silvaGerald/shegz419',
    linkedin: 'https://www.linkedin.com/in/oluwasegun-da-silva-596b0a273/'
  }
};
