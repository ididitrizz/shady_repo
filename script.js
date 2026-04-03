// Global dragging state
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// Handle mousedown on titlebar to start dragging
document.addEventListener('mousedown', (e) => {
    const titlebar = e.target.closest('.titlebar');
    if (!titlebar) return;
    
    const win = titlebar.closest('.window');
    if (!win) return;
    
    e.preventDefault();
    draggedElement = win;
    offsetX = e.clientX - win.getBoundingClientRect().left;
    offsetY = e.clientY - win.getBoundingClientRect().top;
    win.style.zIndex = 10000;
});

// Handle mousemove to drag window
document.addEventListener('mousemove', (e) => {
    if (!draggedElement) return;
    
    draggedElement.style.left = (e.clientX - offsetX) + 'px';
    draggedElement.style.top = (e.clientY - offsetY) + 'px';
});

// Handle mouseup to stop dragging
document.addEventListener('mouseup', () => {
    draggedElement = null;
});

// Handle close button clicks
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('close')) return;
    
    e.stopPropagation();
    const win = e.target.closest('.window');
    if (!win) return;
    
    // Hide the window
    win.style.display = 'none';
    
    // Respawn after random delay (3-8 seconds)
    setTimeout(() => {
        win.style.display = 'block';
        const randomX = Math.random() * (window.innerWidth - 350);
        const randomY = Math.random() * (window.innerHeight - 250);
        win.style.left = randomX + 'px';
        win.style.top = randomY + 'px';
    }, 3000 + Math.random() * 5000);
});

// Initial random positioning on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.window').forEach(win => {
        const randomX = Math.random() * (window.innerWidth - 350);
        const randomY = Math.random() * (window.innerHeight - 250);
        win.style.left = randomX + 'px';
        win.style.top = randomY + 'px';
    });
});
