const skillsData = {
  Frontend: [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Javascript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' }
  ],
  Backend: [
    // { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    // { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' }
  ],
  Mobile: [
    // { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    // { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-plain.svg' }
    // { name: 'Cordova', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cordova/cordova-plain.svg' }
  ],
  Tools: [
    { name: 'Github', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', link: 'https://github.com/jude-uloko' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', link: 'https://github.com/microsoft/vscode' }
  ]
};

function renderSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  let skillsHTML = '';

  Object.entries(skillsData).forEach(([category, skills]) => {
    skillsHTML += `
      <div class="skill-category">
        <p class="skill-category-label">${category}</p>
        <div class="skills-grid">
    `;

    skills.forEach(skill => {
      const iconImg = `<img src="${skill.icon}" alt="${skill.name}" width="40" height="40" />`;

      if (skill.link) {
        skillsHTML += `
          <div class="skill-chip">
            <a href="${skill.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white;">
              <span class="icon">${iconImg}</span>${skill.name}
            </a>
          </div>
        `;
      } else {
        skillsHTML += `
          <div class="skill-chip">
            <span class="icon">${iconImg}</span>${skill.name}
          </div>
        `;
      }
    });

    skillsHTML += `
        </div>
      </div>
    `;
  });

  skillsContainer.innerHTML = skillsHTML;
}

// Render skills when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSkills);
} else {
  renderSkills();
}