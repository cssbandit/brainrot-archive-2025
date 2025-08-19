// Simple Table of Contents - Just expand the existing TOC
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple TOC script loaded');
    
    // Simply expand all wiki-folding elements without adding extra UI
    function expandWikiFolding() {
        const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
        
        foldingElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            const dd = element.querySelector('dd');
            
            if (dt && dd) {
                // Just show the content - no extra styling or indicators
                dd.style.display = 'block';
                dd.style.visibility = 'visible';
                dd.style.opacity = '1';
                
                // Remove any existing indicators or extra text
                const indicators = dt.querySelectorAll('.fold-indicator, [style*="float: right"]');
                indicators.forEach(indicator => indicator.remove());
                
                // Clean up any "Expand/Collapse" text
                if (dt.textContent.includes('Expand') || dt.textContent.includes('Collapse')) {
                    // Find the original text without the expand/collapse part
                    const originalText = dt.textContent.replace(/\[.*?Expand.*?\]/g, '').replace(/\[.*?Collapse.*?\]/g, '').trim();
                    if (originalText) {
                        dt.textContent = originalText;
                    }
                }
            }
        });
    }
    
    // Replace Recent Changes with simple navigation
    function replaceRecentChangesWithNavigation() {
        // Find the Recent Changes panel
        const recentChangesPanel = document.querySelector('.recent-changes, #recent-changes, [data-recent-changes]');
        let targetPanel = recentChangesPanel;
        
        // If not found, look for any right sidebar element
        if (!targetPanel) {
            const sidebars = document.querySelectorAll('.sidebar, .right-sidebar, .panel');
            targetPanel = sidebars[sidebars.length - 1];
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
        
        // Style to match dark theme
        targetPanel.style.backgroundColor = '#1a1a1a';
        targetPanel.style.border = '1px solid #333';
        targetPanel.style.borderRadius = '8px';
        targetPanel.style.padding = '15px';
        targetPanel.style.color = '#fff';
        targetPanel.style.fontFamily = 'inherit';
        targetPanel.style.maxHeight = '70vh';
        targetPanel.style.overflowY = 'auto';
        
        // Create simple navigation
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .wiki-heading');
        const navigationHTML = createSimpleNavigationHTML(headings);
        
        targetPanel.innerHTML = `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <h3 style="margin: 0; color: #4a9eff; font-size: 16px;">Quick Navigation</h3>
            </div>
            ${navigationHTML}
        `;
    }
    
    // Create simple navigation HTML
    function createSimpleNavigationHTML(headings) {
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
            
            // Simple styling
            const indent = (level - 1) * 15;
            const fontSize = Math.max(12, 16 - level);
            const color = level <= 2 ? '#4a9eff' : '#ccc';
            
            html += `
                <li style="margin: 3px 0;">
                    <a href="#${heading.id}" 
                       onclick="scrollToSection('${heading.id}')"
                       style="
                           color: ${color};
                           text-decoration: none;
                           display: block;
                           padding: 4px 8px;
                           margin-left: ${indent}px;
                           border-radius: 3px;
                           font-size: ${fontSize}px;
                           transition: background-color 0.2s;
                       "
                       onmouseover="this.style.backgroundColor='#333';"
                       onmouseout="this.style.backgroundColor='transparent';">
                        ${text}
                    </a>
                </li>
            `;
        });
        
        html += '</ul>';
        return html;
    }
    
    // Simple scroll function
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Initialize
    expandWikiFolding();
    setTimeout(replaceRecentChangesWithNavigation, 1000);
    
    console.log('Simple TOC initialization complete');
});
