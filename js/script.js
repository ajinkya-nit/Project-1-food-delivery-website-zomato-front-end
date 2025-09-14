// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const searchInput = document.querySelector('input[type="text"]');
    const navLinks = document.querySelectorAll('header ul li a');
    const main = document.querySelector('main');
    const header = document.querySelector('header');

    // Search functionality
    const restaurants = [
        'Pizza Hut', 'McDonald\'s', 'KFC', 'Burger King', 'Subway',
        'Domino\'s Pizza', 'Taco Bell', 'Starbucks', 'Dunkin\'', 
        'Chinese Wok', 'Biryani Blues', 'Cafe Coffee Day', 'Haldiram\'s',
        'Barbeque Nation', 'Mainland China', 'Wow! Momo', 'Faasos',
        'Behrouz Biryani', 'Oven Story Pizza', 'La Pino\'z Pizza'
    ];

    // Create search suggestions dropdown
    function createSuggestionDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 0 0 15px 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        // Position search input container relatively
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(dropdown);
        
        return dropdown;
    }

    const suggestionDropdown = createSuggestionDropdown();

    // Search input functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestionDropdown.style.display = 'none';
            return;
        }

        const filteredRestaurants = restaurants.filter(restaurant => 
            restaurant.toLowerCase().includes(query)
        );

        if (filteredRestaurants.length > 0) {
            displaySuggestions(filteredRestaurants);
            suggestionDropdown.style.display = 'block';
        } else {
            suggestionDropdown.style.display = 'none';
        }
    });

    // Display search suggestions
    function displaySuggestions(suggestions) {
        suggestionDropdown.innerHTML = '';
        
        suggestions.slice(0, 5).forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.style.cssText = `
                padding: 12px 20px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: background-color 0.2s ease;
            `;
            
            suggestionItem.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            
            suggestionItem.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
            
            suggestionItem.addEventListener('click', function() {
                searchInput.value = suggestion;
                suggestionDropdown.style.display = 'none';
                performSearch(suggestion);
            });
            
            suggestionDropdown.appendChild(suggestionItem);
        });
    }

    // Handle search submission
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // Perform search function
    function performSearch(query) {
        suggestionDropdown.style.display = 'none';
        
        // Show loading animation
        showNotification(`Searching for "${query}"...`, 'info');
        
        // Simulate search delay
        setTimeout(() => {
            showNotification(`Found results for "${query}"!`, 'success');
            // Here you would typically redirect to search results page
            // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }, 1500);
    }

    // Click outside to hide suggestions
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionDropdown.contains(e.target)) {
            suggestionDropdown.style.display = 'none';
        }
    });

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            
            // Handle different navigation actions
            switch(linkText) {
                case 'Log in':
                    e.preventDefault();
                    showModal('Login', createLoginForm());
                    break;
                case 'Sign up':
                    e.preventDefault();
                    showModal('Sign Up', createSignupForm());
                    break;
                case 'Add Restaurant':
                    e.preventDefault();
                    showNotification('Redirecting to restaurant registration...', 'info');
                    break;
                case 'Investor Relations':
                    e.preventDefault();
                    showNotification('Opening investor relations page...', 'info');
                    break;
            }
        });
    });

    // Create login form
    function createLoginForm() {
        return `
            <form class="auth-form">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <button type="submit">Log In</button>
                <p>Don't have an account? <a href="#" id="switch-to-signup">Sign up</a></p>
            </form>
        `;
    }

    // Create signup form
    function createSignupForm() {
        return `
            <form class="auth-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <input type="password" placeholder="Confirm Password" required>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <a href="#" id="switch-to-login">Log in</a></p>
            </form>
        `;
    }

    // Modal functionality
    function showModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Handle modal events
        const closeBtn = modal.querySelector('.close');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.style.cssText = `
            background: white;
            padding: 0;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Handle form switching
        modal.addEventListener('click', function(e) {
            if (e.target.id === 'switch-to-signup') {
                e.preventDefault();
                modal.querySelector('.modal-body').innerHTML = createSignupForm();
                modal.querySelector('h2').textContent = 'Sign Up';
            } else if (e.target.id === 'switch-to-login') {
                e.preventDefault();
                modal.querySelector('.modal-body').innerHTML = createLoginForm();
                modal.querySelector('h2').textContent = 'Login';
            }
        });

        // Handle form submission
        modal.addEventListener('submit', function(e) {
            e.preventDefault();
            const formType = modal.querySelector('h2').textContent;
            showNotification(`${formType} successful!`, 'success');
            modal.remove();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Set colors based on type
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Smooth scrolling for internal links
    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(300px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(300px); opacity: 0; }
        }
        
        .auth-form {
            padding: 20px;
        }
        
        .auth-form input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        
        .auth-form button {
            width: 100%;
            padding: 12px;
            background: #ff7e8b;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px 0;
        }
        
        .auth-form button:hover {
            background: #e91e63;
        }
        
        .auth-form p {
            text-align: center;
            margin: 10px 0;
        }
        
        .auth-form a {
            color: #ff7e8b;
            text-decoration: none;
        }
        
        .modal-header {
            padding: 20px 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .close {
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #aaa;
        }
        
        .close:hover {
            color: #000;
        }
        
        header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Initialize tooltips
    function addTooltips() {
        navLinks.forEach(link => {
            link.setAttribute('title', `Click to ${link.textContent.toLowerCase()}`);
        });
        searchInput.setAttribute('title', 'Search for restaurants, cuisines, or dishes');
    }

    addTooltips();

    // Console welcome message
    console.log('🍕 Zomato Website Loaded Successfully! 🍔');
    console.log('Features loaded: Search, Modals, Notifications, Smooth Scrolling');
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
