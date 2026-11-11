
// ========================================
// 1. MOBILE HAMBURGER MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

    menuBtn.setAttribute("aria-expanded", isOpen);

});

// Close menu after clicking a navigation link

const navItems = document.querySelectorAll(".nav-link");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        menuBtn.setAttribute("aria-expanded", "false");

    });

});


// ========================================
// 2. DARK / LIGHT MODE
// ========================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    // Change icon based on current theme

    themeBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    // Save theme preference

    localStorage.setItem("theme", isDark ? "dark" : "light");

});

// Load saved theme when page opens

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

}


// ========================================
// 3. DYNAMIC PORTFOLIO CONTENT
// ========================================

// Portfolio project data

const projects = [

    {
        id: 1,
        title: "Luxury Brand Identity",
        category: "BRANDING",
        image: "https://images.unsplash.com/photo-1634942536790-2532d7c1a8c2?w=800",
        description: "A complete visual identity concept designed to create a memorable and elegant brand experience."
    },

    {
        id: 2,
        title: "Creative Web Design",
        category: "WEB DESIGN",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        description: "A modern website concept with a clean layout, thoughtful typography and user-friendly experience."
    },

    {
        id: 3,
        title: "Social Media Campaign",
        category: "GRAPHIC DESIGN",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800",
        description: "A creative visual campaign designed to make social media communication more attractive."
    }

];


// Select portfolio container

const portfolioGrid = document.getElementById("portfolioGrid");


// Function to display projects

function displayProjects() {

    portfolioGrid.innerHTML = "";

    projects.forEach(function (project) {

        const projectCard = document.createElement("article");

        projectCard.className = "project-card";

        projectCard.innerHTML = `
            <div class="project-image">
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    loading="lazy"
                >
            </div>

            <div class="project-info">

                <span>${project.category}</span>

                <h3>${project.title}</h3>

                <button
                    class="project-btn"
                    data-id="${project.id}"
                >
                    View Project →
                </button>

            </div>
        `;

        portfolioGrid.appendChild(projectCard);

    });

}


// Display projects when page loads

displayProjects();


// ========================================
// 4. PORTFOLIO MODAL POPUP
// ========================================

const portfolioModal = document.getElementById("portfolioModal");

const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalCategory = document.getElementById("modalCategory");

const modalDescription = document.getElementById("modalDescription");


// Open modal when a project button is clicked

portfolioGrid.addEventListener("click", function (event) {

    const button = event.target.closest(".project-btn");

    if (!button) {
        return;
    }

    const projectId = Number(button.dataset.id);

    const selectedProject = projects.find(function (project) {
        return project.id === projectId;
    });

    if (!selectedProject) {
        return;
    }

    modalImage.src = selectedProject.image;

    modalImage.alt = selectedProject.title;

    modalTitle.textContent = selectedProject.title;

    modalCategory.textContent = selectedProject.category;

    modalDescription.textContent = selectedProject.description;

    portfolioModal.classList.add("active");

    portfolioModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

});


// Close modal function

function closeModal() {

    portfolioModal.classList.remove("active");

    portfolioModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// Close button event

modalClose.addEventListener("click", closeModal);


// Close modal by clicking outside

portfolioModal.addEventListener("click", function (event) {

    if (event.target === portfolioModal) {

        closeModal();

    }

});


// Close modal using Escape key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ========================================
// 5. CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");


// Form submit event

contactForm.addEventListener("submit", function (event) {

    // Prevent default form submission

    event.preventDefault();


    // Get input values

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const message = messageInput.value.trim();


    // Reset previous errors

    nameError.textContent = "";

    emailError.textContent = "";

    messageError.textContent = "";

    formSuccess.textContent = "";


    let isValid = true;


    // Validate name

    if (name.length < 3) {

        nameError.textContent = "Name must be at least 3 characters.";

        isValid = false;

    }


    // Validate email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent = "Please enter a valid email address.";

        isValid = false;

    }


    // Validate message

    if (message.length < 10) {

        messageError.textContent = "Message must be at least 10 characters.";

        isValid = false;

    }


    // If all inputs are valid

    if (isValid) {

        formSuccess.textContent =
            "Success! Your form has been validated successfully. (Demo only — no message was sent.)";

        contactForm.reset();

    }

});


// ========================================
// 6. ACTIVE NAVIGATION LINK
// ========================================

const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});
