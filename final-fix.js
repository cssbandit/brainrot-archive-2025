// Final comprehensive fix for table of contents and cleanup
document.addEventListener('DOMContentLoaded', function() {
    console.log('Final fix script loaded');
    
    // Wait for page to fully load
    setTimeout(function() {
        
        // STEP 1: Remove all "Description original text" elements
        const descriptionElements = document.querySelectorAll('strong[data-v-96dae53a]');
        descriptionElements.forEach(function(element) {
            if (element.textContent.includes('Description original text') || 
                element.textContent.includes('Description Original text')) {
                // Remove the entire table row containing this element
                const tableRow = element.closest('tr');
                if (tableRow) {
                    tableRow.remove();
                }
            }
        });
        
        // STEP 2: Remove all "Expand/Collapse" text elements
        const expandElements = document.querySelectorAll('*');
        expandElements.forEach(function(element) {
            if (element.textContent && element.textContent.includes('Expand/Collapse')) {
                element.textContent = element.textContent.replace(/\[.*?Expand\/Collapse.*?\]/g, '');
            }
        });
        
        // STEP 3: Expand all wiki-folding elements
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
        
        // STEP 4: Find the table of contents in the main content
        const tocElements = document.querySelectorAll('dl.wiki-folding, .wiki-folding');
        let tableOfContents = null;
        
        tocElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            if (dt && dt.textContent.includes('목차') || dt.textContent.includes('Table of Contents')) {
                tableOfContents = element.cloneNode(true);
            }
        });
        
        // STEP 5: Find Recent Changes panel and replace its content
        const recentChangesSelectors = [
            '[class*="RecentChanges"]',
            '[id*="RecentChanges"]',
            '.RecentChanges',
            '#RecentChanges'
        ];
        
        let recentChangesPanel = null;
        recentChangesSelectors.forEach(function(selector) {
            const element = document.querySelector(selector);
            if (element) {
                recentChangesPanel = element;
            }
        });
        
        // If we found both the TOC and Recent Changes panel, replace the content
        if (tableOfContents && recentChangesPanel) {
            // Clear the Recent Changes panel
            recentChangesPanel.innerHTML = '';
            
            // Add a title
            const title = document.createElement('h3');
            title.textContent = 'Table of Contents';
            title.style.color = '#fff';
            title.style.marginBottom = '10px';
            title.style.borderBottom = '1px solid #444';
            title.style.paddingBottom = '5px';
            recentChangesPanel.appendChild(title);
            
            // Add the table of contents
            recentChangesPanel.appendChild(tableOfContents);
            
            // Style the TOC to match dark theme
            const tocLinks = recentChangesPanel.querySelectorAll('a');
            tocLinks.forEach(function(link) {
                link.style.color = '#4a9eff';
                link.style.textDecoration = 'none';
                link.style.display = 'block';
                link.style.padding = '3px 0';
                link.style.fontSize = '14px';
                
                link.addEventListener('mouseenter', function() {
                    this.style.color = '#66b3ff';
                    this.style.textDecoration = 'underline';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.color = '#4a9eff';
                    this.style.textDecoration = 'none';
                });
            });
            
            // Make the Recent Changes panel visible and styled
            recentChangesPanel.style.display = 'block';
            recentChangesPanel.style.visibility = 'visible';
            recentChangesPanel.style.opacity = '1';
            recentChangesPanel.style.backgroundColor = '#2a2a2a';
            recentChangesPanel.style.padding = '15px';
            recentChangesPanel.style.borderRadius = '5px';
            recentChangesPanel.style.border = '1px solid #444';
            recentChangesPanel.style.maxHeight = '80vh';
            recentChangesPanel.style.overflowY = 'auto';
            
            console.log('Table of contents successfully placed in Recent Changes panel');
        } else {
            console.log('Could not find table of contents or Recent Changes panel');
        }
        
    }, 1000); // Wait 1 second for page to load
});
