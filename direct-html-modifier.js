// DIRECT HTML MODIFIER - This will definitely work!
console.log('DIRECT HTML MODIFIER LOADED - AGGRESSIVE APPROACH');

// Run immediately and multiple times
(function() {
    console.log('Starting direct HTML modification...');
    
    // STEP 1: AGGRESSIVELY REMOVE ALL "Description original text" ELEMENTS
    function removeDescriptionText() {
        console.log('Removing Description original text elements...');
        
        // Method 1: Remove all table rows containing this text
        const allTableRows = document.querySelectorAll('tr');
        allTableRows.forEach(function(row) {
            if (row.textContent.includes('Description original text') || 
                row.textContent.includes('Description Original text')) {
                console.log('REMOVING table row:', row);
                row.remove();
            }
        });
        
        // Method 2: Remove all strong elements with that data attribute
        document.querySelectorAll('strong[data-v-96dae53a]').forEach(function(el) {
            if (el.textContent.includes('Description original text') || 
                el.textContent.includes('Description Original text')) {
                console.log('REMOVING strong element:', el);
                el.remove();
            }
        });
        
        // Method 3: Remove any element containing this exact text
        const allElements = document.querySelectorAll('*');
        allElements.forEach(function(el) {
            if (el.textContent && el.textContent.trim() === 'Description original text') {
                console.log('REMOVING element with exact text:', el);
                el.remove();
            }
        });
    }
    
    // STEP 2: EXPAND THE TABLE OF CONTENTS
    function expandTOC() {
        console.log('Expanding table of contents...');
        
        // Find and expand all wiki-folding elements
        const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
        foldingElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            const dd = element.querySelector('dd');
            
            if (dt && dd) {
                // Show the content by default (expanded)
                dd.style.display = 'block';
                dd.style.visibility = 'visible';
                dd.style.opacity = '1';
                
                // Remove any "Expand/Collapse" text
                if (dt.textContent.includes('[ Expand/Collapse ]')) {
                    dt.textContent = dt.textContent.replace('[ Expand/Collapse ]', '');
                }
            }
        });
    }
    
    // STEP 3: CREATE BLACK AND GOLD TOC IN RECENT CHANGES PANEL
    function createTOCInRecentChanges() {
        console.log('Creating TOC in Recent Changes panel...');
        
        // Find the Recent Changes panel
        let recentChangesPanel = null;
        
        // Method 1: Look for the RecentChanges link and trace up
        const recentChangesLink = document.querySelector('a[href="/RecentChanges"]');
        if (recentChangesLink) {
            recentChangesPanel = recentChangesLink.closest('.SeQedBXv');
        }
        
        // Method 2: Look for the specific class
        if (!recentChangesPanel) {
            recentChangesPanel = document.querySelector('.SeQedBXv');
        }
        
        // Method 3: Look for any element containing "RecentChanges"
        if (!recentChangesPanel) {
            const allElements = document.querySelectorAll('*');
            allElements.forEach(function(el) {
                if (el.textContent && el.textContent.includes('RecentChanges')) {
                    recentChangesPanel = el.closest('.SeQedBXv') || el.closest('div');
                }
            });
        }
        
        if (recentChangesPanel) {
            console.log('Found Recent Changes panel:', recentChangesPanel);
            
            // Find the existing table of contents
            const toc = document.querySelector('.wiki-macro-toc');
            if (toc) {
                console.log('Found TOC:', toc);
                
                // Create a styled version of the TOC
                const styledTOC = toc.cloneNode(true);
                styledTOC.style.cssText = `
                    background: #000 !important;
                    color: #fff !important;
                    padding: 15px !important;
                    border-radius: 8px !important;
                    border: 2px solid #FFD700 !important;
                    margin: 10px 0 !important;
                    font-family: Arial, sans-serif !important;
                `;
                
                // Style the links to be gold
                const tocLinks = styledTOC.querySelectorAll('a');
                tocLinks.forEach(function(link) {
                    link.style.color = '#FFD700 !important';
                    link.style.textDecoration = 'none !important';
                });
                
                // Style the numbers to be gold
                const tocItems = styledTOC.querySelectorAll('.toc-item');
                tocItems.forEach(function(item) {
                    item.style.color = '#FFD700 !important';
                });
                
                // Clear the Recent Changes panel and add the styled TOC
                recentChangesPanel.innerHTML = '';
                recentChangesPanel.appendChild(styledTOC);
                
                console.log('TOC successfully placed in Recent Changes panel');
            } else {
                console.log('TOC not found');
            }
        } else {
            console.log('Recent Changes panel not found');
        }
    }
    
    // Run the functions
    removeDescriptionText();
    expandTOC();
    createTOCInRecentChanges();
    
    // Run again after a delay to catch any dynamically loaded content
    setTimeout(function() {
        removeDescriptionText();
        expandTOC();
        createTOCInRecentChanges();
    }, 1000);
    
    // Run one more time after another delay
    setTimeout(function() {
        removeDescriptionText();
        expandTOC();
        createTOCInRecentChanges();
    }, 3000);
    
})();
