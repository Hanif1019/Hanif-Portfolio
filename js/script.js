/* ==================================================
    HANIF PORTFOLIO
   MAIN JAVASCRIPT

   01. INITIAL SETUP
   02. MOBILE NAVIGATION
   03. ACTIVE NAVIGATION LINKS
   04. DARK / LIGHT MODE
   05. GSAP HOMEPAGE ANIMATIONS
   06. GSAP SCROLL ANIMATIONS
   07. ACCESSIBILITY
================================================== */


/* ==================================================
   01. INITIAL SETUP
================================================== */

console.log("Hanif portfolio JavaScript connected!");


// Select important HTML elements

const menuToggle = document.querySelector(".menu-toggle");

const nav = document.querySelector("#main-nav");

const navLinks = document.querySelectorAll("#main-nav a");

const sections = document.querySelectorAll("main section");

const themeToggle = document.querySelector(".theme-toggle");

const htmlElement = document.documentElement;


// Check whether the user prefers reduced motion

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ==================================================
   02. MOBILE NAVIGATION
================================================== */


/* --------------------------------------------------
   02.1 UPDATE MOBILE MENU
-------------------------------------------------- */

function updateMobileMenu(isOpen) {

    // Add or remove the active class

    nav.classList.toggle("active", isOpen);


    // Update the hamburger icon

    menuToggle.textContent = isOpen ? "✕" : "☰";


    // Update accessibility attributes

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

}


/* --------------------------------------------------
   02.2 OPEN / CLOSE MOBILE MENU
-------------------------------------------------- */

menuToggle.addEventListener("click", function () {

    const isOpen = nav.classList.contains("active");

    updateMobileMenu(!isOpen);

});


/* --------------------------------------------------
   02.3 CLOSE MENU AFTER CLICKING A LINK
-------------------------------------------------- */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        updateMobileMenu(false);

    });

});


/* --------------------------------------------------
   02.4 CLOSE MENU WHEN SCREEN GETS WIDER
-------------------------------------------------- */

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        updateMobileMenu(false);

    }

});


/* ==================================================
   03. ACTIVE NAVIGATION LINKS
================================================== */


/* --------------------------------------------------
   03.1 CREATE SECTION OBSERVER
-------------------------------------------------- */

const sectionObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            // Check whether a section is visible

            if (entry.isIntersecting) {

                // Remove active class from all links

                navLinks.forEach(function (link) {

                    link.classList.remove("active-link");

                });


                // Find the matching navigation link

                const activeLink = document.querySelector(
                    `#main-nav a[href="#${entry.target.id}"]`
                );


                // Highlight the matching link

                if (activeLink) {

                    activeLink.classList.add("active-link");

                }

            }

        });

    },

    {
        rootMargin: "-30% 0px -50% 0px"
    }

);


/* --------------------------------------------------
   03.2 OBSERVE ALL SECTIONS
-------------------------------------------------- */

sections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* ==================================================
   04. DARK / LIGHT MODE
================================================== */


/* --------------------------------------------------
   04.1 APPLY SELECTED THEME
-------------------------------------------------- */

function applyTheme(theme) {

    // Apply the selected theme to HTML

    htmlElement.setAttribute("data-theme", theme);


    // Update the theme toggle icon

    themeToggle.textContent =
        theme === "light" ? "🌙" : "☀️";


    // Determine the next available theme

    const nextTheme =
        theme === "light" ? "dark" : "light";


    // Update accessibility information

    themeToggle.setAttribute(
        "aria-label",
        `Switch to ${nextTheme} mode`
    );

    themeToggle.title =
        `Switch to ${nextTheme} mode`;

}


/* --------------------------------------------------
   04.2 LOAD SAVED THEME
-------------------------------------------------- */

// Default to Dark Mode

let savedTheme = "dark";


// Attempt to retrieve the saved preference

try {

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {

        savedTheme = storedTheme;

    }

} catch (error) {

    console.warn(
        "Theme preference could not be loaded:",
        error
    );

}


// Apply the theme when the website loads

applyTheme(savedTheme);


/* --------------------------------------------------
   04.3 SWITCH THEME WHEN CLICKED
-------------------------------------------------- */

themeToggle.addEventListener("click", function () {

    // Check the current theme

    const currentTheme =
        htmlElement.getAttribute("data-theme");


    // Switch to the opposite theme

    const newTheme =
        currentTheme === "light" ? "dark" : "light";


    // Apply the new theme

    applyTheme(newTheme);


    // Save the selected theme

    try {

        localStorage.setItem("theme", newTheme);

    } catch (error) {

        console.warn(
            "Theme preference could not be saved:",
            error
        );

    }

});


/* ==================================================
   05. GSAP HOMEPAGE ANIMATIONS
================================================== */


/* --------------------------------------------------
   05.1 CHECK GSAP AVAILABILITY
-------------------------------------------------- */

if (typeof gsap !== "undefined") {

    console.log("GSAP version:", gsap.version);


    // Only run entrance animations when motion is allowed

    if (!reducedMotion) {


        /* ------------------------------------------
           05.2 CREATE HERO ANIMATION TIMELINE
        ------------------------------------------ */

        const heroTimeline = gsap.timeline({

            defaults: {
                duration: 0.8,
                ease: "power3.out"
            }

        });


        /* ------------------------------------------
           05.3 WELCOME LABEL
        ------------------------------------------ */

        heroTimeline.from(".hero-label", {

            opacity: 0,
            y: -20

        });


        /* ------------------------------------------
           05.4 MAIN HEADING
        ------------------------------------------ */

        heroTimeline.from(".hero-heading", {

            opacity: 0,
            y: 80

        }, "-=0.4");


        /* ------------------------------------------
           05.5 SOFTWARE ENGINEERING ROLE
        ------------------------------------------ */

        heroTimeline.from(".hero-role", {

            opacity: 0,
            y: 30

        }, "-=0.4");


        /* ------------------------------------------
           05.6 HERO DESCRIPTION
        ------------------------------------------ */

        heroTimeline.from(".hero-description", {

            opacity: 0,
            y: 30

        }, "-=0.4");


        /* ------------------------------------------
           05.7 HERO BUTTONS
        ------------------------------------------ */

        heroTimeline.from(".hero-buttons a", {

            opacity: 0,
            y: 20,
            stagger: 0.10

        }, "-=0.4");


        /* ------------------------------------------
           05.8 SOCIAL LINKS
        ------------------------------------------ */

        heroTimeline.from(".hero-socials", {

            opacity: 0,
            y: 20

        }, "-=0.5");


        /* ------------------------------------------
           05.9 PORTRAIT CARD
        ------------------------------------------ */

        heroTimeline.from(".hero-photo-card", {

            opacity: 0,
            scale: 0.9,
            duration: 2

        }, 0.4);


        /* ------------------------------------------
           05.10 SCROLL INDICATOR
        ------------------------------------------ */

        heroTimeline.from(".scroll-indicator", {

            opacity: 0,
            y: 20

        }, "-=0.3");

    }

}


/* ==================================================
   06. GSAP SCROLL ANIMATIONS
================================================== */


/* --------------------------------------------------
   06.1 CHECK SCROLLTRIGGER AVAILABILITY
-------------------------------------------------- */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined" &&
    !reducedMotion
) {


    // Register the ScrollTrigger plugin

    gsap.registerPlugin(ScrollTrigger);


    /* --------------------------------------------------
       06.2 ABOUT ME - HEADING
    -------------------------------------------------- */

    gsap.from(".about-title", {

        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            once: true
        },

        opacity: 0,
        x: -60,

        duration: 1,
        ease: "power3.out"

    });


    /* --------------------------------------------------
       06.3 ABOUT ME - DESCRIPTION
    -------------------------------------------------- */

    gsap.from(".about-content", {

        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            once: true
        },

        opacity: 0,
        x: 60,

        duration: 1,
        delay: 0.2,

        ease: "power3.out"

    });


    /* --------------------------------------------------
       06.4 SKILLS - HEADING & DESCRIPTION
    -------------------------------------------------- */

    gsap.from(
        "#skills .eyebrow, #skills .section-title, #skills .section-description",
        {

            scrollTrigger: {
                trigger: "#skills",
                start: "top 80%",
                once: true
            },

            opacity: 0,
            y: 40,

            duration: 0.8,
            stagger: 0.15,

            ease: "power3.out"

        }
    );


    /* --------------------------------------------------
       06.5 SKILLS - CARDS
    -------------------------------------------------- */

    gsap.from("#skills .skill-card", {

        scrollTrigger: {
            trigger: ".skills-container",
            start: "top 85%",
            once: true
        },

        opacity: 0,
        y: 50,

        duration: 0.8,
        stagger: 0.12,

        ease: "power3.out"

    });


    /* --------------------------------------------------
       06.6 PROJECTS - HEADING & DESCRIPTION
    -------------------------------------------------- */

    gsap.from(
        "#projects .eyebrow, #projects .section-title, #projects .section-description",
        {

            scrollTrigger: {
                trigger: "#projects",
                start: "top 80%",
                once: true
            },

            opacity: 0,
            y: 40,

            duration: 0.8,
            stagger: 0.15,

            ease: "power3.out"

        }
    );


    /* --------------------------------------------------
       06.7 PROJECTS - CARDS
    -------------------------------------------------- */

    gsap.from("#projects .project-card", {

        scrollTrigger: {
            trigger: ".projects-container",
            start: "top 85%",
            once: true
        },

        opacity: 0,
        y: 60,

        duration: 1,
        stagger: 0.2,

        ease: "power3.out"

    });

}


/* ==================================================
   07. ACCESSIBILITY
================================================== */

/*
   Reduced-motion preferences are checked
   in Section 01.

   When reduced motion is enabled:

   - GSAP entrance animations are skipped.
   - GSAP scroll animations are skipped.
   - Content remains visible.
   - CSS animations are reduced by the
     accessibility rules in style.css.
*/


/* ==================================================
   END OF NEPSLEEPY JAVASCRIPT
================================================== */