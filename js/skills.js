const skillsData = {
  Frontend: [
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'Javascript', icon: 'devicon-javascript-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' }
  ],
  Backend: [
  //  { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'PHP', icon: 'devicon-php-plain colored' },
   // { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'SQL', icon: 'devicon-mysql-plain colored' }
  ],
  Mobile: [
   // { name: 'React Native', icon: 'devicon-react-original colored' },
   // { name: 'Flutter', icon: 'devicon-flutter-plain colored' }
    { name: 'Cordova', icon: 'devicon-cordova-plain' }
  ],
  Tools: [
    { name: 'Github', icon: 'devicon-github-original colored', link: 'https://github.com/jude-uloko' }
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
      if (skill.link) {
        skillsHTML += `
          <div class="skill-chip">
            <a href="${skill.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white;">
              <span class="icon">
                <i class="${skill.icon}" style="color: white;"></i>
              </span>${skill.name}
            </a>
          </div>
        `;
      } else {
        skillsHTML += `
          <div class="skill-chip">
            <span class="icon"><i class="${skill.icon}"></i></span>${skill.name}
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

