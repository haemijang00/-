// Project Data Store
const projectsData = [
    {
        id: "product",
        category: "Product Design",
        name: "Form Wireless Speaker: Sound & Form",
        image: "images/product.png",
        background: "A premium compact wireless speaker designed around the concept of 'unity of sound and form.' The cylindrical silhouette with a natural wood top plate balances acoustic performance with living room aesthetics, blurring the line between furniture and technology.",
        role: "Product Designer (Form Development, Material Study, Acoustic Housing Engineering, CMF Direction)",
        tools: "Rhino 3D, Fusion 360, Keyshot, 3D Printing",
        description: "A minimal cylindrical wireless speaker combining matte white polymer and natural oak wood, designed to feel at home in any living space."
    },
    {
        id: "chair",
        category: "Furniture Design",
        name: "Sisu Lounge Chair: Sculptural Comfort",
        image: "images/chair.png",
        background: "Born from the concept of 'Sisu' (Finnish for strength and resilience), this chair blends sculptural artistic aesthetics with ergonomics. Designed using organic flowing curves, it provides optimal back support while acting as a standalone sculptural piece in any living room.",
        role: "Product Designer (Conceptualization, Ergonomic Modeling, Prototype Development)",
        tools: "Fusion 360, Keyshot, CNC Milling, Woodworking",
        description: "An ergonomic lounge chair featuring continuous organic curves milled from sustainable European birch wood, finished with natural oils."
    },
    {
        id: "interior",
        category: "Interior Environment Design",
        name: "Lumiere Atelier: Creative Co-working Space",
        image: "images/interior.png",
        background: "A commercial interior design project aiming to reconstruct an industrial warehouse into a warm, collaborative, and inspiring co-working atelier. The design emphasizes natural light harvesting, spatial flow, and modular zones that adapt to different creative workstyles.",
        role: "Lead Environmental Designer (Spatial Planning, Material Sourcing, Lighting Layout)",
        tools: "Rhino 3D, AutoCAD, V-Ray, Photoshop",
        description: "An eco-friendly, daylight-focused co-working space crafted within a renovated industrial warehouse, integrating sustainable materials and warm wood tones."
    },
    {
        id: "branding",
        category: "Branding Design",
        name: "Monolith Coffee House Brand Identity",
        image: "images/branding.png",
        background: "A comprehensive brand and digital identity overhaul for a specialty coffee house. The project spans from logo design, stationery, packaging, to a high-end mobile app mockup for pre-ordering coffee. The design follows a strict minimalist layout with calm blue hues.",
        role: "Brand Identity Designer (Logo Design, Visual Identity System, Stationery & Packaging Design)",
        tools: "Figma, Adobe Illustrator, Adobe Photoshop",
        description: "A complete brand refresh featuring a clean, typography-driven visual system and calm blue color scheme across print and digital media."
    },
    {
        id: "lamp",
        category: "Lighting Design",
        name: "Aura Pendant Light: Diffused Eclipse",
        image: "images/lamp.png",
        background: "The Aura pendant light explores the relationship between light and shadow. Inspired by solar eclipses, it uses an indirect light emission design where light reflects off a hand-brushed brass dome, emitting a soft, golden ambient glow without glare.",
        role: "Industrial Designer (Reflector Design, Casing Engineering, Prototype Wiring)",
        tools: "SolidWorks, Keyshot, Metal Spinning, 3D Printing",
        description: "An indirect lighting fixture featuring a spun brass dome reflector that mimics the warm, atmospheric glow of a solar eclipse."
    },
    {
        id: "oasis",
        category: "UX/UI Design",
        name: "Oasis Botanical Garden Brand & UI",
        image: "images/oasis.png",
        background: "A civic brand identity and spatial wayfinding system designed for a newly established urban greenhouse garden. The identity system utilizes soft olive-greens, organic flowing geometries, and recycled paper textures to deliver a message of environmental stewardship and tranquility.",
        role: "UX/UI & Brand Designer (Visual Identity Guidelines, Mobile App UI Wireframing & Prototyping, Environmental Graphic Layout)",
        tools: "Figma, Adobe Illustrator, Adobe Photoshop, InDesign",
        description: "An organic brand identity and UI system for a modern urban botanical garden, reflecting nature, sustainability, and harmony."
    }
];

// Document Ready
document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Sticky & Link Highlighting
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        const pageFrame = document.querySelector(".page-traditional-frame");

        // Sticky Header & Page Frame Scroll state
        if (currentScroll > 50) {
            header.classList.add("scrolled");
            if (pageFrame) pageFrame.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
            if (pageFrame) pageFrame.classList.remove("scrolled");
        }

        // Smart Navigation: Hide on scroll down, show on scroll up
        if (currentScroll > 150) {
            if (currentScroll > lastScroll && !header.classList.contains("hidden")) {
                // Scroll Down -> Hide Header
                header.classList.add("hidden");
            } else if (currentScroll < lastScroll && header.classList.contains("hidden")) {
                // Scroll Up -> Show Header
                header.classList.remove("hidden");
            }
        } else {
            // Near the top of the page -> Always Show
            header.classList.remove("hidden");
        }

        // Section Active Navigation Link
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });

        lastScroll = currentScroll;
    });

    // 2. Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal");
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Skills Bar Animation
    const skillsSection = document.getElementById("about");
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute("data-percent");
                    bar.style.width = `${percentage}%`;
                });
                skillObserver.unobserve(entry.target); // Animate once
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // 4. Modal Project Detail Controller
    const modalOverlay = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const projectCards = document.querySelectorAll(".project-card");

    const openModal = (projectId) => {
        const data = projectsData.find(p => p.id === projectId);
        if (!data) return;

        // Populate elements
        document.getElementById("modal-img").src = data.image;
        document.getElementById("modal-img").alt = data.name;
        document.getElementById("modal-cat").textContent = data.category;
        document.getElementById("modal-title").textContent = data.name;
        document.getElementById("modal-role").textContent = data.role;
        document.getElementById("modal-tools").textContent = data.tools;
        document.getElementById("modal-bg-text").textContent = data.background;
        document.getElementById("modal-desc-text").textContent = data.description;

        // Open animation
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeModal = () => {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Restore background scroll
    };

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-id");
            openModal(projectId);
        });
    });

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Handle Escape Key Close
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });

    // 5. Copy Email to Clipboard
    const emailBox = document.getElementById("email-box");
    const tooltip = document.getElementById("tooltip");

    if (emailBox) {
        emailBox.addEventListener("click", () => {
            const emailText = document.getElementById("email-address").textContent;
            navigator.clipboard.writeText(emailText).then(() => {
                tooltip.classList.add("show");
                setTimeout(() => {
                    tooltip.classList.remove("show");
                }, 2000);
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    }
});
