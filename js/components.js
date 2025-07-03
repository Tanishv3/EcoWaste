// Component Loader Utility
class ComponentLoader {
    static async loadComponent(componentPath, targetElement) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status} ${response.statusText}`);
            }
            const html = await response.text();
            
            let element;
            if (typeof targetElement === 'string') {
                element = document.querySelector(targetElement);
                if (!element) {
                    throw new Error(`Target element not found: ${targetElement}`);
                }
            } else {
                element = targetElement;
            }
            
            if (element) {
                element.innerHTML = html;
            } else {
                throw new Error('Target element is null or undefined');
            }
        } catch (error) {
            console.error('Error loading component:', error);
            // Try to show a fallback message
            const element = typeof targetElement === 'string' ? 
                document.querySelector(targetElement) : targetElement;
            if (element) {
                element.innerHTML = `<div style="color: red; padding: 20px;">Error loading component: ${error.message}</div>`;
            }
        }
    }

    static async loadHeader(targetSelector = 'header-placeholder') {
        await this.loadComponent('./components/header.html', `#${targetSelector}`);
    }

    static async loadFooter(targetSelector = 'footer-placeholder') {
        await this.loadComponent('./components/footer.html', `#${targetSelector}`);
        // Confirm footer loaded
        const el = document.querySelector(`#${targetSelector}`);
        if (el && el.innerHTML.trim().length > 0) {
        } else {
            console.error('Footer failed to load or is empty.');
        }
    }

    static async loadAllComponents() {
        // Load header if placeholder exists
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            await this.loadHeader();
        }

        // Load footer if placeholder exists
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            await this.loadFooter();
        }

        // Initialize app after components are loaded
        if (typeof EcoWasteApp !== 'undefined' && !window.app) {
            window.app = new EcoWasteApp();

            // If on marketplace page, initialize its specific content
            if (document.getElementById('marketplaceGrid')) {
                window.app.initMarketplace();
            } else {
                // For all other pages, filter/render whatever is necessary
                window.app.filterItems('all');
            }
        }
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadAllComponents();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
