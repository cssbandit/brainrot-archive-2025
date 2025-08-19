// Direct replacement of Recent Changes panel with Table of Contents
document.addEventListener('DOMContentLoaded', function() {
    console.log('Direct TOC replacement script loaded');
    
    // Wait for page to fully load
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
        let tocContent = null;
        const tocElements = document.querySelectorAll('dl.wiki-folding, .wiki-folding');
        tocElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            if (dt && dt.textContent.includes('목차')) {
                tocContent = element.cloneNode(true);
            }
        });
        
        if (!tocContent) {
            // Fallback: look for any table of contents structure
            const allDls = document.querySelectorAll('dl');
            allDls.forEach(function(dl) {
                const dt = dl.querySelector('dt');
                if (dt && (dt.textContent.includes('Table') || dt.textContent.includes('Contents'))) {
                    tocContent = dl.cloneNode(true);
                }
            });
        }
        
        // Find the Recent Changes panel - look for various possible selectors
        let recentChangesPanel = null;
        const possibleSelectors = [
            '[data-v-255b77a2]', // Vue component wrapper
            '.SeQedBXv', // Panel container
            'aside', // Sidebar
            '.sidebar',
            '.panel',
            '[class*="Recent"]',
            '[class*="Changes"]'
        ];
        
        for (let selector of possibleSelectors) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(function(element) {
                if (element.textContent.includes('RecentChanges') || 
                    element.innerHTML.includes('RecentChanges')) {
                    recentChangesPanel = element;
                    break;
                }
            });
            if (recentChangesPanel) break;
        }
        
        // If we found both the TOC and the panel, replace the content
        if (tocContent && recentChangesPanel) {
            console.log('Found both TOC and Recent Changes panel, replacing content...');
            
            // Clear the existing content
            recentChangesPanel.innerHTML = '';
            
            // Add the table of contents
            recentChangesPanel.appendChild(tocContent);
            
            // Style it to match the panel
            recentChangesPanel.style.padding = '10px';
            recentChangesPanel.style.backgroundColor = 'transparent';
            
            // Make all links functional
            const links = recentChangesPanel.querySelectorAll('a[href^="#"]');
            links.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
            
            console.log('Table of contents successfully placed in Recent Changes panel!');
        } else {
            console.log('Could not find TOC content or Recent Changes panel');
            console.log('TOC found:', !!tocContent);
            console.log('Panel found:', !!recentChangesPanel);
        }
    }, 1000);
});
