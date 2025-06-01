document.addEventListener('DOMContentLoaded', () => {
    // Update the Instagram URLs mapping
    const instagramUrls = {
        '1': 'https://www.instagram.com/p/CZOoKc-Pqzy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '2': 'https://www.instagram.com/p/CW0UJUaPr91/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '3': 'https://www.instagram.com/p/CpPzDSdSdf7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '4': 'https://www.instagram.com/p/Crs9AeySnUq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '5': 'https://www.instagram.com/p/Cm32NlAS2L8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '6': 'https://www.instagram.com/p/Cq5YIf4yP-9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '7': 'https://www.instagram.com/p/Comnc0MStpj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '8': 'https://www.instagram.com/p/CWBLRh9P3gH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '9': 'https://www.instagram.com/p/CvGA4iUy-Sc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '10': 'https://www.instagram.com/p/Cud3uyRyatF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '11': 'https://www.instagram.com/p/CuvB958SKMr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '12': 'https://www.instagram.com/reel/CvGlJ8Ju365/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '13': 'https://www.instagram.com/p/CvLUf4PyhNT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '14': 'https://www.instagram.com/p/CqafjeNSsQs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '15': 'https://www.instagram.com/p/Cz6EtqiSFHr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '16': 'https://www.instagram.com/p/C0BdOkvLoP_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '17': 'https://www.instagram.com/p/C0OzCCWShoG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '18': 'https://www.instagram.com/p/C1RuR-jyuIX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '19': 'https://www.instagram.com/p/Cg1Oeh8LlKX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '20': 'https://www.instagram.com/p/C1cBcJqy_E0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '21': 'https://www.instagram.com/p/Cv4oT4Ch9kN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '22': 'https://www.instagram.com/p/Cs8jwSYhmfA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '23': 'https://www.instagram.com/p/CujogDLSqv-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '24': 'https://www.instagram.com/p/CzBcRrCyK2u/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '25': 'https://www.instagram.com/p/ChNAIpXpEBR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '26': 'https://www.instagram.com/p/CrAnH7rSHn6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '27': 'https://www.instagram.com/p/CuHZNiCS2fu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '28': 'https://www.instagram.com/p/C0T4htSS_Hv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '29': 'https://www.instagram.com/p/C2CmVwdyKSw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        '30': 'https://www.instagram.com/p/Cq7lbahyGfg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        // Add more mappings for each directory number
    };

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
    for (let i = 1; i <= 85; i++) {   //change this when adding more directories
        directoryImageCounts[i] = 12;
    }

    directoryTitle.textContent = `${selectedDirectory}`;

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'];
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

    // Update Instagram link (modify this section)
    const instagramLink = document.getElementById('instagramLink');
    if (instagramUrls[selectedDirectory]) {
        instagramLink.href = instagramUrls[selectedDirectory];
        instagramLink.style.display = 'block'; // Changed from 'inline-block' to 'block'
    } else {
        console.log('No Instagram URL found for directory:', selectedDirectory);
        instagramLink.style.display = 'none';
    }
});
