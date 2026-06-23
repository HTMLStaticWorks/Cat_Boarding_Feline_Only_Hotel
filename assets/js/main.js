/**
 * Feline Only Hotel - Main Javascript
 * Author: Elena Rostova
 */

document.addEventListener('DOMContentLoaded', function () {
    // ----------------------------------------------------
    // Theme Switcher (Light / Dark Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill" title="Switch to Light Mode" aria-label="Switch to Light Mode"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill" title="Switch to Dark Mode" aria-label="Switch to Dark Mode"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Initial Theme Load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // ----------------------------------------------------
    // RTL Toggle (Right-to-Left / Left-to-Right)
    // ----------------------------------------------------
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const bootstrapCss = document.getElementById('bootstrap-css');
    
    function applyRtl(isRtl) {
        if (isRtl) {
            document.documentElement.setAttribute('dir', 'rtl');
            if (bootstrapCss) {
                bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
            }
            if (rtlToggleBtn) rtlToggleBtn.innerHTML = '<span class="toggle-text" title="Switch to LTR Layout" aria-label="Switch to LTR Layout" style="font-size: 0.75rem; font-weight: 600;">LTR</span>';
            localStorage.setItem('rtl', 'true');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            if (bootstrapCss) {
                bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
            }
            if (rtlToggleBtn) rtlToggleBtn.innerHTML = '<span class="toggle-text" title="Switch to RTL Layout" aria-label="Switch to RTL Layout" style="font-size: 0.75rem; font-weight: 600;">RTL</span>';
            localStorage.setItem('rtl', 'false');
        }
    }
    
    // Initial RTL Load
    const savedRtl = localStorage.getItem('rtl') === 'true';
    applyRtl(savedRtl);
    
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', function () {
            const currentRtl = document.documentElement.getAttribute('dir') === 'rtl';
            applyRtl(!currentRtl);
        });
    }

    // ----------------------------------------------------
    // Active Nav Menu Highlighting
    // ----------------------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // ----------------------------------------------------
    // Back to Top Button
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // Password Visibility Toggle (Eye Icon)
    // ----------------------------------------------------
    const togglePasswordIcons = document.querySelectorAll('.password-toggle-icon');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordField = document.getElementById(targetId);
            
            if (passwordField) {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    this.classList.remove('bi-eye-slash');
                    this.classList.add('bi-eye');
                } else {
                    passwordField.type = 'password';
                    this.classList.remove('bi-eye');
                    this.classList.add('bi-eye-slash');
                }
            }
        });
    });

    // ----------------------------------------------------
    // Client-side Form Validations
    // ----------------------------------------------------
    // Generic simple form validation for contact, newsletter and booking
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault(); // Stop actual submit for demo purposes
                alert('Thank you! Your request has been successfully submitted.');
                form.reset();
                form.classList.remove('was-validated');
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Newsletter footer form validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                alert(`Thank you for subscribing to my newsletter: ${emailInput.value}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ----------------------------------------------------
    // Leaflet Interactive Map Support
    // ----------------------------------------------------
    const mapElement = document.getElementById('contact-map');
    if (mapElement) {
        // Location Coordinates (Serene spot in Westchester County, NY)
        const lat = 41.0330;
        const lng = -73.7629;
        
        // Define Tile Layers
        const streetLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });
        
        const streetDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });
        
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
        
        const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
        
        // Get initial theme to choose correct street tile layer
        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        let activeStreetLayer = currentTheme === 'dark' ? streetDark : streetLight;
        
        // Initialize Map
        const map = L.map('contact-map', {
            center: [lat, lng],
            zoom: 15,
            layers: [activeStreetLayer],
            zoomControl: false // Hide default zoom controls to keep top-left clean
        });
        
        // Put zoom controls at bottom-right instead
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);
        
        // Create custom pulsing marker
        const catIcon = L.divIcon({
            className: 'custom-pulsing-marker',
            html: '<div class="marker-pulse"></div><div class="marker-pin"><i class="bi bi-cat-fill"></i></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 32],
            popupAnchor: [0, -32]
        });
        
        const marker = L.marker([lat, lng], { icon: catIcon }).addTo(map);
        
        // Add custom popup content
        const popupContent = `
            <div class="map-popup-card">
                <h6>Whisker Suites</h6>
                <p class="mb-2">742 Whisker Lane, Feline Heights, NY</p>
                <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" class="btn btn-primary btn-sm btn-popup-directions text-white">
                    <i class="bi bi-geo-alt-fill me-1"></i>Google Maps
                </a>
            </div>
        `;
        marker.bindPopup(popupContent);
        
        // Open popup by default on desktop
        if (window.innerWidth > 768) {
            marker.openPopup();
        }
        
        // Active view tracking
        let activeViewName = 'street';
        
        // View Toggle Layer Event Listeners
        const viewButtons = document.querySelectorAll('.map-view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const view = this.getAttribute('data-map-view');
                if (view === activeViewName) return;
                
                // Remove active class from other buttons
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Remove all layers
                map.removeLayer(streetLight);
                map.removeLayer(streetDark);
                map.removeLayer(satellite);
                map.removeLayer(terrain);
                
                // Add the correct layer
                if (view === 'street') {
                    const theme = document.documentElement.getAttribute('data-bs-theme') || 'light';
                    activeStreetLayer = theme === 'dark' ? streetDark : streetLight;
                    map.addLayer(activeStreetLayer);
                } else if (view === 'satellite') {
                    map.addLayer(satellite);
                } else if (view === 'terrain') {
                    map.addLayer(terrain);
                }
                
                activeViewName = view;
            });
        });
        
        // Dynamically toggle street maps when theme switches
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', function () {
                // Wait slightly for DOM attribute to be updated in main theme switcher script
                setTimeout(() => {
                    const theme = document.documentElement.getAttribute('data-bs-theme') || 'light';
                    if (activeViewName === 'street') {
                        map.removeLayer(streetLight);
                        map.removeLayer(streetDark);
                        
                        activeStreetLayer = theme === 'dark' ? streetDark : streetLight;
                        map.addLayer(activeStreetLayer);
                    }
                }, 50);
            });
        }
        
        // Directions Form Handling
        const directionsForm = document.getElementById('map-directions-form');
        if (directionsForm) {
            directionsForm.addEventListener('submit', function (e) {
                e.preventDefault();
                
                const startInput = document.getElementById('startLocation');
                if (startInput && directionsForm.checkValidity()) {
                    const startLoc = encodeURIComponent(startInput.value.trim());
                    const destination = encodeURIComponent('742 Whisker Lane, Feline Heights, NY');
                    const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLoc}&destination=${destination}`;
                    
                    window.open(googleDirectionsUrl, '_blank');
                    
                    startInput.value = '';
                    directionsForm.classList.remove('was-validated');
                } else {
                    directionsForm.classList.add('was-validated');
                }
            });
        }
    }
});
