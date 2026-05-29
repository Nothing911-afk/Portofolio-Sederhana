// Memastikan script dijalankan setelah DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsionalitas Mode Gelap (Dark Mode) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    const icon = darkModeToggle.querySelector('i');

    // Fungsi untuk menerapkan tema ke elemen HTML
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Mengganti ikon
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // Memuat tema yang tersimpan di localStorage atau mendeteksi preferensi sistem
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Pastikan tema default adalah light jika tidak ada preferensi
    }

    // Mendengarkan perubahan preferensi sistem secara real-time
    prefersDarkScheme.addEventListener('change', (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
    });

    // Mengubah tema saat tombol diklik
    darkModeToggle.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });

    // --- Efek Fade-in Saat Scrolling ---
    const sections = document.querySelectorAll('section');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    sections.forEach(section => observer.observe(section));
} else {
    // Fallback: jika IntersectionObserver tidak didukung,
    // langsung tampilkan semua section tanpa efek fade-in
    sections.forEach(section => section.classList.add('visible'));
}
});