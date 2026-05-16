/**
 * Happy Birthday Soumya - Robust Interaction Script
 * This script includes extensive error handling to ensure a smooth experience.
 */

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.log("Global error caught: " + msg + " at " + url + ":" + lineNo);
    return false; // Let the browser handle it too
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if external libraries are loaded
    const isConfettiLoaded = typeof confetti === 'function';
    if (!isConfettiLoaded) console.warn("Confetti library failed to load from CDN.");

    // 1. Typing Animation Logic
    const initTypingAnimation = (elementId, message, speed = 50) => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = "";
        let index = 0;

        function type() {
            if (index < message.length) {
                element.innerHTML += message.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element.closest('section') || element);
    };

    initTypingAnimation('typing-text', "Soumya, your dedication and hard work for NEET are truly inspiring. May this birthday bring you happiness, confidence, and success in every step of your journey. Keep shining and keep believing in yourself. The world is waiting for an amazing doctor like you. Happy Birthday! 💖");
    
    // Final Wishes Typing
    const finalWishesMsg = "Wishing you happiness, success in NEET, and a life full of beautiful moments. Happy Birthday Soumya 🌸";
    const finalWishesEl = document.querySelector('.final-text');
    if (finalWishesEl) {
        const finalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initTypingAnimation('final-text-id', finalWishesMsg, 70);
                    finalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Add an ID to the final text if missing for the helper function
        finalWishesEl.id = 'final-text-id';
        finalObserver.observe(document.getElementById('final-wishes') || finalWishesEl);
    }

    // 2. Countdown Timer
    const countdownDate = new Date("May 17, 2026 00:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minsEl && secsEl) {
        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minsEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secsEl.innerText = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(updateTimer);
                const timerEl = document.getElementById("timer");
                if (timerEl) timerEl.innerHTML = "<h3>HAPPY BIRTHDAY! 🎂</h3>";
            }
        }, 1000);
    }

    // 3. Floating Hearts
    const heartsContainer = document.getElementById('hearts-container');
    if (heartsContainer) {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 7 + 's';
            heart.style.fontSize = Math.random() * 1 + 1 + 'rem';
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 10000);
        }
        setInterval(createHeart, 500);
    }

    // 4. Music Player with Enhanced Error Handling
    const audio = document.getElementById('birthday-audio');
    const playPauseBtn = document.getElementById('play-pause');
    const musicPlayer = document.querySelector('.music-player');
    const songSelect = document.getElementById('song-select');

    if (audio && playPauseBtn && musicPlayer && songSelect) {
        const updateUI = (isPlaying) => {
            if (isPlaying) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                musicPlayer.classList.add('playing');
            } else {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play Music';
                musicPlayer.classList.remove('playing');
            }
        };

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => updateUI(true)).catch(err => {
                    console.error("Playback blocked or failed:", err);
                    playPauseBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Click to Play';
                });
            } else {
                audio.pause();
                updateUI(false);
            }
        });

        songSelect.addEventListener('change', () => {
            const wasPlaying = !audio.paused;
            audio.src = songSelect.value;
            audio.load();
            if (wasPlaying) {
                audio.play().then(() => updateUI(true)).catch(e => console.warn("Auto-play on switch failed"));
            }
        });

        audio.addEventListener('error', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-times-circle"></i> Music Error';
            musicPlayer.classList.remove('playing');
        });
    }

    // 5. Confetti on Load (Safe Execution)
    if (isConfettiLoaded) {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // 6. Progress Bar Animation
    const progressFill = document.querySelector('.progress-fill');
    const neetSection = document.getElementById('neet-motivation');
    if (progressFill && neetSection) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFill.style.width = '85%';
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        progressObserver.observe(neetSection);
    }

    // 7. Image Error Handling (Fallback to Placeholders)
    document.querySelectorAll('.polaroid img').forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x400?text=Sweet+Moment';
            this.style.opacity = '0.7';
        };
    });
});
