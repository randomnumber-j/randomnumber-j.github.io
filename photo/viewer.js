document.addEventListener('DOMContentLoaded', () => {
    // Add back button handling at the start
    const backButton = document.querySelector('.back-button');
    const viewerSource = localStorage.getItem('viewerSource');

    if (viewerSource === 'single-draw') {
        backButton.href = '../number/single-draw.html';
        // Clear the source after setting the href
        localStorage.removeItem('viewerSource');
    }

    // Add theme toggle handler at the start
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

    const selectedDirectory = localStorage.getItem('selectedDirectory');
    const directoryTitle = document.getElementById('directoryTitle');
    const imageGrid = document.getElementById('imageGrid');

    if (!selectedDirectory) {
        window.location.href = 'index.html';
        return;
    }

    // Define the number of images for each directory
    const directoryImageCounts = {};
    for (let i = 1; i <= 79; i++) {   //change this when adding more directories
        directoryImageCounts[i] = 20;
    }

    directoryTitle.textContent = `${selectedDirectory}`;

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const videoExtensions = ['.mp4', '.webm', '.mov'];
    const allExtensions = [...imageExtensions, ...videoExtensions];
    const imageCount = directoryImageCounts[selectedDirectory] || 0;

    // Create array based on actual number of images
    const imagePaths = Array.from({ length: imageCount }, (_, i) => ({
        paths: allExtensions.map(ext => `./src/${selectedDirectory}/${i + 1}${ext}`)
    }));

    // Show a message if no files are found
    if (imagePaths.length === 0) {
        imageGrid.innerHTML = '<p>No media files found in this directory</p>';
        return;
    }

    imagePaths.forEach(media => {
        const card = document.createElement('div');
        card.className = 'image-card';

        // Try loading as video first
        const video = document.createElement('video');
        const img = document.createElement('img');
        let currentPathIndex = 0;
        let isVideo = false;

        function tryNextPath() {
            currentPathIndex++;
            if (currentPathIndex < media.paths.length) {
                const ext = media.paths[currentPathIndex].split('.').pop().toLowerCase();
                if (videoExtensions.some(ve => ve.includes(ext))) {
                    tryLoadVideo(media.paths[currentPathIndex]);
                } else {
                    tryLoadImage(media.paths[currentPathIndex]);
                }
            } else {
                card.style.display = 'none';
            }
        }

        function tryLoadVideo(path) {
            video.src = path;
            video.controls = true;
            video.muted = true;
            video.className = 'media-content';

            video.onerror = tryNextPath;
            video.onloadeddata = () => {
                isVideo = true;
                const link = createMediaLink(video, path);
                card.appendChild(link);
            };
        }

        function tryLoadImage(path) {
            img.src = path;
            img.className = 'media-content';

            img.onerror = tryNextPath;
            img.onload = () => {
                const link = createMediaLink(img, path);
                card.appendChild(link);
            };
        }

        function createMediaLink(element, path) {
            const link = document.createElement('a');
            link.href = path;
            link.target = '_blank';

            const container = document.createElement('div');
            container.className = 'image-container';
            container.appendChild(element);

            link.appendChild(container);
            return link;
        }

        // Start with first path
        const ext = media.paths[0].split('.').pop().toLowerCase();
        if (videoExtensions.some(ve => ve.includes(ext))) {
            tryLoadVideo(media.paths[0]);
        } else {
            tryLoadImage(media.paths[0]);
        }

        imageGrid.appendChild(card);
    });
});
