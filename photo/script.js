document.addEventListener('DOMContentLoaded', () => {
    const directoryGrid = document.getElementById('directoryGrid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    let directories = [];

    // Create directory cards
    for (let i = 1; i <= 80; i++) {
        directories.push({
            id: i,
            name: i.toString()
        });
    }

    function renderDirectories(dirs) {
        directoryGrid.innerHTML = '';
        dirs.forEach(dir => {
            const card = document.createElement('div');
            card.className = 'directory-card';
            card.innerHTML = `
                <div class="directory-icon">📁</div>
                <h2 class="directory-name">${dir.name}</h2>
            `;
            card.addEventListener('click', () => {
                localStorage.setItem('selectedDirectory', dir.name);
                window.location.href = 'viewer.html';
            });
            directoryGrid.appendChild(card);
        });
    }

    function filterAndSortDirectories() {
        const searchTerm = searchInput.value.toLowerCase();
        const sortOrder = sortSelect.value;

        let filteredDirs = directories.filter(dir =>
            dir.name.toLowerCase().includes(searchTerm)
        );

        if (sortOrder !== 'default') {
            filteredDirs.sort((a, b) => {
                const numA = parseInt(a.name);
                const numB = parseInt(b.name);
                return sortOrder === 'asc' ? numA - numB : numB - numA;
            });
        }

        renderDirectories(filteredDirs);
    }

    // Event listeners for search and sort
    searchInput.addEventListener('input', filterAndSortDirectories);
    sortSelect.addEventListener('change', filterAndSortDirectories);

    // Theme toggle handler
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-bs-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Initial render
    renderDirectories(directories);
});
