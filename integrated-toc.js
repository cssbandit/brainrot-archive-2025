// Integrated Table of Contents for Recent Changes Panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Integrated TOC script loaded');
    
    // Fix existing wiki-folding elements to be expanded by default
    function fixWikiFolding() {
        const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
        
        foldingElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            const dd = element.querySelector('dd');
            
            if (dt && dd) {
                // Show the content by default (expanded)
                dd.style.display = 'block';
                dd.style.visibility = 'visible';
                dd.style.opacity = '1';
                
                // Style the clickable header to match dark theme
                dt.style.cursor = 'pointer';
                dt.style.userSelect = 'none';
                dt.style.padding = '8px';
                dt.style.borderRadius = '4px';
                dt.style.backgroundColor = '#2a2a2a';
                dt.style.border = '1px solid #444';
                dt.style.color = '#fff';
                dt.style.marginBottom = '5px';
                dt.style.transition = 'background-color 0.2s';
                
                // Add expand/collapse indicator
                const indicator = dt.querySelector('.fold-indicator') || document.createElement('span');
                if (!dt.querySelector('.fold-indicator')) {
                    indicator.className = 'fold-indicator';
                    indicator.style.float = 'right';
                    indicator.style.color = '#888';
                    indicator.textContent = '▼';
                    dt.appendChild(indicator);
                }
                
                // Toggle functionality
                dt.addEventListener('click', function() {
                    const isVisible = dd.style.display !== 'none';
                    dd.style.display = isVisible ? 'none' : 'block';
                    indicator.textContent = isVisible ? '▶' : '▼';
                });
                
                // Hover effects
                dt.addEventListener('mouseenter', function() {
                    dt.style.backgroundColor = '#404040';
                });
                
                dt.addEventListener('mouseleave', function() {
                    dt.style.backgroundColor = '#2a2a2a';
                });
            }
        });
    }
    
    // Replace Recent Changes content with Quick Navigation
    function replaceRecentChangesWithNavigation() {
        // Find the Recent Changes panel
        const recentChangesPanel = document.querySelector('.recent-changes, #recent-changes, [data-recent-changes]');
        let targetPanel = recentChangesPanel;
        
        // If not found, look for any right sidebar element
        if (!targetPanel) {
            const sidebars = document.querySelectorAll('.sidebar, .right-sidebar, .panel');
            targetPanel = sidebars[sidebars.length - 1]; // Get the last one (likely right sidebar)
        }
        
        // If still not found, create one
        if (!targetPanel) {
            targetPanel = document.createElement('div');
            targetPanel.style.position = 'fixed';
            targetPanel.style.top = '80px';
            targetPanel.style.right = '20px';
            targetPanel.style.width = '280px';
            targetPanel.style.zIndex = '1000';
            document.body.appendChild(targetPanel);
        }
        
        // Style the panel to match the dark theme
        targetPanel.style.backgroundColor = '#1a1a1a';
        targetPanel.style.border = '1px solid #333';
        targetPanel.style.borderRadius = '8px';
        targetPanel.style.padding = '15px';
        targetPanel.style.color = '#fff';
        targetPanel.style.fontFamily = 'inherit';
        targetPanel.style.maxHeight = '70vh';
        targetPanel.style.overflowY = 'auto';
        
        // Create navigation content
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .wiki-heading');
        const navigationHTML = createNavigationHTML(headings);
        
        targetPanel.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <span style="color: #4a9eff; margin-right: 8px;">🧭</span>
                <h3 style="margin: 0; color: #4a9eff; font-size: 16px;">Quick Navigation</h3>
            </div>
            ${navigationHTML}
        `;
    }
    
    // Create navigation HTML from headings
    function createNavigationHTML(headings) {
        if (headings.length === 0) {
            return '<p style="color: #888; font-style: italic;">No sections found</p>';
        }
        
        let html = '<ul style="list-style: none; padding: 0; margin: 0;">';
        
        headings.forEach(function(heading, index) {
            const text = heading.textContent.trim();
            const level = parseInt(heading.tagName.charAt(1)) || 2;
            
            // Create an ID if it doesn't exist
            if (!heading.id) {
                heading.id = 'section-' + index;
            }
            
            // Style based on heading level
            const indent = (level - 1) * 15;
            const fontSize = Math.max(12, 16 - level);
            const color = level <= 2 ? '#4a9eff' : '#ccc';
            
            html += `
                <li style="margin: 5px 0;">
                    <a href="#${heading.id}" 
                       onclick="scrollToSection('${heading.id}')"
                       style="
                           color: ${color};
                           text-decoration: none;
                           display: block;
                           padding: 6px 10px;
                           margin-left: ${indent}px;
                           border-radius: 4px;
                           font-size: ${fontSize}px;
                           transition: background-color 0.2s;
                           border-left: 2px solid transparent;
                       "
                       onmouseover="this.style.backgroundColor='#333'; this.style.borderLeftColor='#4a9eff';"
                       onmouseout="this.style.backgroundColor='transparent'; this.style.borderLeftColor='transparent';">
                        ${text}
                    </a>
                </li>
            `;
        });
        
        html += '</ul>';
        return html;
    }
    
    // Smooth scroll to section
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the target section briefly
            const originalBg = element.style.backgroundColor;
            element.style.backgroundColor = '#2a4a6b';
            element.style.transition = 'background-color 0.3s';
            
            setTimeout(function() {
                element.style.backgroundColor = originalBg;
            }, 1500);
        }
    };
    
    // Initialize everything
    fixWikiFolding();
    
    // Wait a bit for page to fully load, then replace recent changes
    setTimeout(replaceRecentChangesWithNavigation, 1000);
    
    console.log('Integrated TOC initialization complete');
});
