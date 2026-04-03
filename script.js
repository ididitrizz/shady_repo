// Make windows draggable
const windows = document.querySelectorAll('.window');

windows.forEach(win => {
    const titlebar = win.querySelector('.titlebar');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titlebar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            win.style.left = (e.clientX - offsetX) + 'px';
            win.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Close button functionality
    const closeBtn = win.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            win.style.opacity = '0';
            setTimeout(() => {
                win.style.display = 'none';
            }, 300);
        });
    }

    // Re-add windows occasionally with animation
    const randomReappear = () => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                win.style.display = 'block';
                win.style.opacity = '1';
                win.style.left = Math.random() * window.innerWidth * 0.7 + 'px';
                win.style.top = Math.random() * window.innerHeight * 0.7 + 'px';
                randomReappear();
            }
        }, 3000 + Math.random() * 5000);
    };

    randomReappear();
});

// Continuous chaos
setInterval(() => {
    windows.forEach(win => {
        if (Math.random() > 0.95) {
            win.style.zIndex = Math.floor(Math.random() * 1000);
        }
    });
}, 500);
