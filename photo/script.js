const directories = Array.from({ length: 79 }, (_, i) => ({  //change this when adding more directories
    id: i + 1,
    name: `${i + 1}`
}));

function createDirectoryGrid() {
    const grid = document.getElementById('directoryGrid');

    directories.forEach(dir => {
        const card = document.createElement('div');
        card.className = 'directory-card';
        card.innerHTML = `
            <div class="directory-icon">📁</div>
            <div class="directory-name">${dir.name}</div>
        `;

        card.addEventListener('click', () => {
            localStorage.setItem('selectedDirectory', dir.id);
            window.location.href = 'viewer.html';
        });

        grid.appendChild(card);
    });
}

createDirectoryGrid();

// Add theme toggle handler
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-bs-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
