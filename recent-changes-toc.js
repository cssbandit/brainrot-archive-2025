// Replace Recent Changes panel with Table of Contents
document.addEventListener('DOMContentLoaded', function() {
    console.log('Recent Changes TOC script loaded');
    
    // Wait a bit for the page to fully load
    setTimeout(function() {
        // First, expand the existing table of contents
        const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
        foldingElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            const dd = element.querySelector('dd');
            if (dt && dd) {
                dd.style.display = 'block';
                dd.style.visibility = 'visible';
                dd.style.opacity = '1';
            }
        });
        
        // Find the table of contents content
        const tocContent = document.querySelector('.wiki-macro-toc');
        if (!tocContent) {
            console.log('Table of contents not found');
            return;
        }
        
        // Clone the TOC content
        const tocClone = tocContent.cloneNode(true);
        
        // Find Recent Changes panel - look for elements with RecentChanges text
        const recentChangesLinks = Array.from(document.querySelectorAll('a')).filter(link => 
            link.textContent.includes('RecentChanges') || 
            link.href.includes('RecentChanges')
        );
        
        if (recentChangesLinks.length > 0) {
            // Find the parent container that likely contains the Recent Changes panel
            let recentChangesContainer = null;
            
            // Look for a sidebar or panel structure
            const possibleContainers = document.querySelectorAll('[class*="sidebar"], [class*="panel"], [class*="aside"], [class*="nav"]');
            
            for (let container of possibleContainers) {
                if (container.textContent.includes('RecentChanges')) {
                    recentChangesContainer = container;
                    break;
                }
            }
            
            // If we found a container, replace its content with TOC
            if (recentChangesContainer) {
                // Clear the container
                recentChangesContainer.innerHTML = '';
                
                // Add a header
                const header = document.createElement('h3');
                header.textContent = 'Table of Contents';
                header.style.cssText = 'color: #fff; margin: 0 0 15px 0; padding: 10px; background: #333; border-radius: 5px;';
                recentChangesContainer.appendChild(header);
                
                // Add the TOC content
                recentChangesContainer.appendChild(tocClone);
                
                // Style the TOC to match the dark theme
                const tocItems = recentChangesContainer.querySelectorAll('.toc-item');
                tocItems.forEach(function(item) {
                    item.style.cssText = 'display: block; padding: 5px 10px; margin: 2px 0; color: #ccc; text-decoration: none; border-radius: 3px; transition: background 0.2s;';
                    
                    // Make it clickable
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', function() {
                        // Find the corresponding heading and scroll to it
                        const text = item.textContent.trim();
                        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                        for (let heading of headings) {
                            if (heading.textContent.includes(text)) {
                                heading.scrollIntoView({ behavior: 'smooth' });
                                break;
                            }
                        }
                    });
                    
                    // Hover effect
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#555';
                    });
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                });
                
                console.log('Table of contents added to Recent Changes panel');
            } else {
                console.log('Recent Changes container not found');
            }
        } else {
            console.log('Recent Changes links not found');
        }
    }, 1000);
});
