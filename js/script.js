document.addEventListener('DOMContentLoaded', () => {

    // ===== FITUR 1: EFEK KETIK (TYPING EFFECT) =====
    const typingElement = document.getElementById('typing-effect');
    const words = ["Web Developer", "UI/UX Enthusiast", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Hapus karakter
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Tambah karakter
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Cek kondisi
        if (!isDeleting && charIndex === currentWord.length) {
            // Selesai mengetik, tunggu, lalu mulai hapus
            isDeleting = true;
            setTimeout(type, 2000); // Waktu jeda sebelum menghapus
        } else if (isDeleting && charIndex === 0) {
            // Selesai menghapus, ganti kata, mulai ketik lagi
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500); // Waktu jeda sebelum kata baru
        } else {
            // Lanjutkan mengetik/menghapus
            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
    }
    
    type(); // Mulai efek ketik

    // ===== FITUR 2: ANIMASI SAAT SCROLL (FADE-IN) =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            }
        });
    }, { threshold: 0.1 }); // Muncul saat 10% elemen terlihat

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ===== FITUR 3: NAVIGASI HAMBURGER UNTUK MOBILE =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Menutup menu saat link di-klik (opsional, tapi bagus untuk UX)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

});