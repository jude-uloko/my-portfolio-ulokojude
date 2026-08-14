const grid = document.getElementById("projects-grid");

const projects = [
  {
    type: 'portfolio',
    title: 'Foliohub — Open-Source Portfolio Builder',
    desc: `An open-source SaaS platform that separates
            your profile content from your website layouts. <br> 
            Built with a real-time editor featuring a live 
            mobile preview, dynamic templates, 
            and automated visit-logging pipelines.`,
    lang: [
      'React', 'Tailwind', 
      'Node.js/Express', 'MongoDB', 
      'Rest API'
    ],
    githubUrl: 'https://github.com/jude-uloko/Foliohub',
    status: 'In Development',
    stat_col: 'in_dev',
    link: ''
  }, {
    type: 'e-commerce',
    title: 'GrabBoss',
    desc: `An open-source e-commerce portal that allows users 
          to create their own online stores, manage products, 
          and process payments. It is built with a focus 
          on scalability and ease of use.`,
    lang: [
      'React', 'Tailwind', 
      'Node.js/Express', 'MongoDB', 
      'REST API'
    ],
    githubUrl: 'https://github.com/jude-uloko/GrabBoss',
    status: 'In Development',
    stat_col: 'in_dev',
    link: ''
  }, {
  type: 'web design',
  title: 'FluxResponse',
  desc: `
        FluxResponse is a simple tool that 
        helps make websites look good on every 
        screen size without the stress of writing 
        lots of custom CSS rules. Instead of manually 
        adjusting layouts for mobile, tablet, and desktop, 
        you can paste your code and get a responsive version quickly.`,
  lang: ['Python'],
  githubUrl: 'https://github.com/jude-uloko/FluxResponse',
  status: 'In Development',
  stat_col: 'in_dev',
  link: ''
}, 
  // {
  //   type: 'software',
  //   title: 'ecmap',
  //   desc: `ECMAP is an advanced, post-exploitation 
  //   defense architecture designed to mitigate unauthorized 
  //   server reconnaissance and lateral movement. It employs 
  //   a multi-layered approach, including dynamic port 
  //   obfuscation, adaptive firewall rules, and real-time 
  //   monitoring to detect and neutralize potential threats. 
  //   ECMAP is ideal for organizations seeking to enhance 
  //   their cybersecurity posture against sophisticated attacks.`,

  //   lang: ['C'],
  //   githubUrl: 'https://github.com/jude-uloko/ecmap',
  //   status: 'Archived'
  // }
];

function renderProjects() {
  grid.innerHTML = projects.map(project => {
    const hasLink = project.link && project.link.trim();
    const statusClass = hasLink ? 'pr_ready' : (project.stat_col || 'in_dev');
    const statusText = hasLink ? 'Ready' : project.status;

    return `
      <div class="project-card">
        <p class="project-type"> ${project.type} </p>
        <h3 class="project-title"> ${project.title} </h3>
        <p class="project-desc"> ${project.desc} </p>
        <div class="project-tags">
          ${project.lang.map(lang => `<span class="tag">${lang}</span>`).join("")}
        </div>
          
        <br>
        <div class="github-cta-capsule">
          <!-- Primary Action: Visit Project -->
          <a href="${project.githubUrl}" target="_blank" rel="noreferrer" class="github-btn-primary">
            <!-- SVG GitHub Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>Visit Project on GitHub</span>
            <!-- SVG Arrow Icon -->
            <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div><br>
        <div class="project-meta">
          <p class="${statusClass}">${statusText}</p>
          ${hasLink
            ? `<span class="pr_ready">
                <a href="${project.link}" target="_blank" rel="noreferrer">Visit Project</a>
              </span>`
            : ""
          }
        </div>
      </div>
    `;
  }).join("");
}

renderProjects();