let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// Start dragging when clicking titlebar
document.addEventListener('mousedown', (e) => {
    const titlebar = e.target.closest('.titlebar');
    if (!titlebar) return;
    
    const win = titlebar.closest('.window');
    if (!win) return;
    
    draggedElement = win;
    win.classList.add('dragging');
    
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    win.style.zIndex = 10000;
});

// Move window while dragging
document.addEventListener('mousemove', (e) => {
    if (!draggedElement) return;
    
    draggedElement.style.left = (e.clientX - offsetX) + 'px';
    draggedElement.style.top = (e.clientY - offsetY) + 'px';
});

// Stop dragging on mouseup
document.addEventListener('mouseup', () => {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
    draggedElement = null;
});

// Handle close button clicks
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('close')) return;
    
    e.stopPropagation();
    const win = e.target.closest('.window');
    if (!win) return;
    
    win.style.display = 'none';
    
    // Respawn after 4-8 seconds
    setTimeout(() => {
        win.style.display = 'block';
        win.style.left = (Math.random() * (window.innerWidth - 350)) + 'px';
        win.style.top = (Math.random() * (window.innerHeight - 250)) + 'px';
    }, 4000 + Math.random() * 4000);
});
