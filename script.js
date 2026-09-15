const hero = document.querySelector(".hero");
const heroBackground = document.querySelector(".home-hero-background, " + ".country-hero-background, " + ".challenges-hero-background, " + ".solutions-hero-background");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollY <= heroHeight) {
        const movement = scrollY * 0.35;

        heroBackground.style.transform =
            `translateY(${movement}px)`;
    }
});
const sectionBackgrounds =
    document.querySelectorAll(".section-background");

window.addEventListener("scroll", () => {
    sectionBackgrounds.forEach((background) => {
        const section = background.parentElement;
        const rect = section.getBoundingClientRect();

        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const movement = rect.top * -0.12;

            background.style.transform =
                `translateY(${movement}px)`;
        }
    });
});
const scrollTopButton = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollTopButton.classList.add("visible");
    } else {
        scrollTopButton.classList.remove("visible");
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);
revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const noxToggle = document.getElementById("nox-mode-toggle");
const noxOverlay = document.getElementById("nox-overlay");
const noxClose = document.getElementById("nox-close");

function enableNoxMode() {
    document.body.classList.add("nox-mode");
    noxOverlay.classList.add("active");
    noxOverlay.setAttribute("aria-hidden", "false");
}

function disableNoxMode() {
    document.body.classList.remove("nox-mode");
    noxOverlay.classList.remove("active");
    noxOverlay.setAttribute("aria-hidden", "true");
}

noxToggle?.addEventListener("click", enableNoxMode);
noxClose?.addEventListener("click", disableNoxMode);


let atBottom = false;
let noxHideTimer = null;

function showNoxButtonTemporarily() {
    if (!noxToggle) return;

    noxToggle.classList.remove("hidden");

    clearTimeout(noxHideTimer);

    noxHideTimer = setTimeout(() => {
        noxToggle.classList.add("hidden");
    }, 4000);
}

window.addEventListener("scroll", () => {
    atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

    // Always hide it unless we're actively showing it
    if (!atBottom) {
        noxToggle?.classList.add("hidden");
    }
});

window.addEventListener("wheel", (event) => {
    if (atBottom && event.deltaY > 0) {
        showNoxButtonTemporarily();
    }
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");

    summary.addEventListener("click", event => {
        event.preventDefault();

        if (item.open) {
            answer.style.height = `${answer.scrollHeight}px`;

            requestAnimationFrame(() => {
                answer.style.height = "0px";
            });

            answer.addEventListener("transitionend", () => {
                item.open = false;
            }, { once: true });

        } else {
            item.open = true;

            answer.style.height = "0px";

            requestAnimationFrame(() => {
                answer.style.height = `${answer.scrollHeight}px`;
            });

            answer.addEventListener("transitionend", () => {
                answer.style.height = "auto";
            }, { once: true });
        }
    });
});
