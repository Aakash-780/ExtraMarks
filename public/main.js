import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// animation loading
window.addEventListener('load', () => {
    AOS.init({
        delay: 30,
        duration: 600,
        easing: 'ease-in-out',
    });
});





const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 50,
    
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    
    grabCursor: true,
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
;







// form

const signupTab = document.getElementById('signup-tab');
const loginTab = document.getElementById('login-tab');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const footerText = document.getElementById('footer-text');

const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const signupBtn = document.getElementById('signup-submit');
const loginBtn = document.getElementById('login-submit');

// Helper function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Switch Functions
function switchToSignup() {
    signupTab.classList.add('active');
    signupTab.classList.remove('inactive');
    loginTab.classList.remove('active');
    loginTab.classList.add('inactive');

    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    footerText.innerHTML = `Already have an account? <a href="#" id="switch-to-login">Log in</a>`;
    document.getElementById("switch-to-login").addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
    });
}

function switchToLogin() {
    loginTab.classList.add('active');
    loginTab.classList.remove('inactive');
    signupTab.classList.remove('active');
    signupTab.classList.add('inactive');

    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    footerText.innerHTML = `Don't have an account? <a href="#" id="switch-to-signup">Sign up</a>`;
    document.getElementById("switch-to-signup").addEventListener('click', (e) => {
        e.preventDefault();
        switchToSignup();
    });
}

// Initial link listener
document.getElementById("switch-to-login").addEventListener('click', (e) => {
    e.preventDefault();
    switchToLogin();
});

// Signup Validation
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const username = signupUsername.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    if (username.length < 3) {
        alert("Username must be at least 3 characters.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.updateProfile({ displayName: username });
        })
        .then(() => {
            alert("✅ Sign up successful!");
            signupUsername.value = '';
            signupEmail.value = '';
            signupPassword.value = '';
        })
        .catch((error) => {
            alert("❌ " + error.message);
        });
});


// Login Validation
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }
    if (password === "") {
        alert("Password cannot be empty.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("✅ Log in successful!");
            loginEmail.value = '';
            loginPassword.value = '';
        })
        .catch((error) => {
            alert("❌ " + error.message);
        });
});


// Tab button switching
signupTab.addEventListener('click', switchToSignup);
loginTab.addEventListener('click', switchToLogin);



// number count
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count');

    const runCounter = (counter) => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace('+', '');
            const increment = target / 200;

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}+`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = `${target}+`;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target); // run only once
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});



