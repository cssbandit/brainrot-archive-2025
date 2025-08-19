// Enhanced Table of Contents with Right-Side Navigation Panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced TOC script loaded');
    
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
                
                // Style the clickable header
                dt.style.cursor = 'pointer';
                dt.style.userSelect = 'none';
                dt.style.padding = '8px 12px';
                dt.style.borderRadius = '4px';
                dt.style.backgroundColor = '#f8f9fa';
                dt.style.border = '1px solid #dee2e6';
                dt.style.marginBottom = '5px';
                dt.style.fontWeight = 'bold';
                dt.style.transition = 'all 0.2s ease';
                
                // Add hover effect
                dt.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#e9ecef';
                });
                
                dt.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '#f8f9fa';
                });
                
                // Add click toggle functionality
                dt.addEventListener('click', function() {
                    const isVisible = dd.style.display !== 'none';
                    dd.style.display = isVisible ? 'none' : 'block';
                    
                    // Update the text to show expand/collapse state
                    const text = dt.textContent;
                    if (text.includes('Expand')) {
                        dt.textContent = text.replace('Expand', 'Collapse');
                    } else if (text.includes('Collapse')) {
                        dt.textContent = text.replace('Collapse', 'Expand');
                    }
                });
                
                // Make sure initial text shows "Collapse" since it's expanded
                const text = dt.textContent;
                if (text.includes('Expand')) {
                    dt.textContent = text.replace('Expand', 'Collapse');
                }
            }
        });
    }
    
    // Create right-side navigation panel
    function createNavigationPanel() {
        console.log('Creating navigation panel');
        
        // Find all headings in the document
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (headings.length === 0) {
            console.log('No headings found');
            return;
        }
        
        // Create the navigation panel
        const navPanel = document.createElement('div');
        navPanel.id = 'toc-nav-panel';
        navPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 250px;
            max-height: 80vh;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 15px;
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        // Create the panel header
        const header = document.createElement('div');
        header.innerHTML = '<strong>📚 Quick Navigation</strong>';
        header.style.cssText = `
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
            color: #333;
            font-size: 16px;
        `;
        navPanel.appendChild(header);
        
        // Create navigation links
        const navList = document.createElement('ul');
        navList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
        `;
        
        headings.forEach(function(heading, index) {
            // Create an ID for the heading if it doesn't have one
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Get the heading text, clean it up
            let headingText = heading.textContent.trim();
            if (headingText.length > 40) {
                headingText = headingText.substring(0, 37) + '...';
            }
            
            link.textContent = headingText;
            link.href = '#' + heading.id;
            
            // Style based on heading level
            const level = parseInt(heading.tagName.charAt(1));
            const indent = (level - 1) * 15;
            
            link.style.cssText = `
                display: block;
                color: #007bff;
                text-decoration: none;
                padding: 4px 0 4px ${indent}px;
                border-radius: 3px;
                transition: all 0.2s ease;
                font-size: ${level === 1 ? '15px' : level === 2 ? '14px' : '13px'};
                font-weight: ${level <= 2 ? 'bold' : 'normal'};
            `;
            
            // Add hover effect
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
                this.style.paddingLeft = (indent + 5) + 'px';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.paddingLeft = indent + 'px';
            });
            
            // Smooth scroll to heading
            link.addEventListener('click', function(e) {
                e.preventDefault();
                heading.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the target heading briefly
                const originalBg = heading.style.backgroundColor;
                heading.style.backgroundColor = '#fff3cd';
                setTimeout(function() {
                    heading.style.backgroundColor = originalBg;
                }, 2000);
            });
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        
        navPanel.appendChild(navList);
        
        // Add minimize/maximize button
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '−';
        toggleBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 8px;
            border: none;
            background: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
            width: 25px;
            height: 25px;
            border-radius: 3px;
        `;
        
        let isMinimized = false;
        toggleBtn.addEventListener('click', function() {
            if (isMinimized) {
                navList.style.display = 'block';
                header.style.display = 'block';
                navPanel.style.height = 'auto';
                toggleBtn.innerHTML = '−';
                isMinimized = false;
            } else {
                navList.style.display = 'none';
                header.style.display = 'none';
                navPanel.style.height = '35px';
                toggleBtn.innerHTML = '+';
                isMinimized = true;
            }
        });
        
        navPanel.appendChild(toggleBtn);
        
        // Add to page
        document.body.appendChild(navPanel);
        console.log('Navigation panel created with', headings.length, 'headings');
    }
    
    // Initialize everything
    setTimeout(function() {
        fixWikiFolding();
        createNavigationPanel();
        console.log('Enhanced TOC initialization complete');
    }, 500);
    
    // Also try again after a longer delay in case content loads dynamically
    setTimeout(function() {
        fixWikiFolding();
        if (!document.getElementById('toc-nav-panel')) {
            createNavigationPanel();
        }
    }, 2000);
});
