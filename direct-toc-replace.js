// Robust Table of Contents replacement for Recent Changes panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Robust TOC replacement script loaded');
    
    // Function to wait for elements to be available
    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            
            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
    
    // Function to remove "Description original text" elements
    function removeDescriptionElements() {
        // Try multiple selectors to find these elements
        const selectors = [
            'strong[data-v-96dae53a]',
            'td:contains("Description original text")',
            'td:contains("Description Original text")',
            '.wiki-paragraph strong',
            'strong'
        ];
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element.textContent.includes('Description original text') || 
                        element.textContent.includes('Description Original text')) {
                        // Remove the entire table row containing this element
                        const tableRow = element.closest('tr');
                        if (tableRow) {
                            tableRow.remove();
                            console.log('Removed Description original text element');
                        }
                    }
                });
            } catch (e) {
                console.log('Selector failed:', selector, e);
            }
        });
    }
    
    // Function to expand the main table of contents
    function expandMainTOC() {
        const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
        foldingElements.forEach(function(element) {
            const dt = element.querySelector('dt');
            const dd = element.querySelector('dd');
            if (dt && dd) {
                dd.style.display = 'block';
                dd.style.visibility = 'visible';
                dd.style.opacity = '1';
                console.log('Expanded main TOC element');
            }
        });
    }
    
    // Function to create styled TOC for Recent Changes panel
    function createStyledTOC() {
        const tocElement = document.querySelector('.wiki-macro-toc, #toc');
        if (!tocElement) {
            console.log('TOC element not found');
            return null;
        }
        
        const styledTOC = tocElement.cloneNode(true);
        styledTOC.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        // Style the links
        const links = styledTOC.querySelectorAll('a');
        links.forEach(link => {
            link.style.cssText = `
                color: #4a9eff;
                text-decoration: none;
                display: block;
                padding: 2px 0;
                transition: color 0.2s;
            `;
            link.addEventListener('mouseenter', () => {
                link.style.color = '#6bb6ff';
            });
            link.addEventListener('mouseleave', () => {
                link.style.color = '#4a9eff';
            });
        });
        
        // Style the toc items
        const tocItems = styledTOC.querySelectorAll('.toc-item');
        tocItems.forEach(item => {
            item.style.cssText = `
                margin: 2px 0;
                padding: 2px 0;
            `;
        });
        
        return styledTOC;
    }
    
    // Main function to replace Recent Changes panel
    async function replaceRecentChangesPanel() {
        try {
            // Wait for the page to fully load
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Remove description elements first
            removeDescriptionElements();
            
            // Expand main TOC
            expandMainTOC();
            
            // Try to find the Recent Changes panel using multiple approaches
            let recentChangesPanel = null;
            
            // Method 1: Look for RecentChanges link and its parent container
            const recentChangesLink = document.querySelector('a[href="/RecentChanges"], a:contains("RecentChanges")');
            if (recentChangesLink) {
                // Find the parent container that might be the panel
                let parent = recentChangesLink.parentElement;
                for (let i = 0; i < 5; i++) {
                    if (parent && parent.classList.contains('SeQedBXv')) {
                        recentChangesPanel = parent;
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
            
            // Method 2: Look for specific class names
            if (!recentChangesPanel) {
                recentChangesPanel = document.querySelector('.SeQedBXv, .wepIl4L8, [data-v-11ef3aa4]');
            }
            
            // Method 3: Look for any element containing "RecentChanges" text
            if (!recentChangesPanel) {
                const elements = document.querySelectorAll('*');
                for (let element of elements) {
                    if (element.textContent.includes('RecentChanges')) {
                        recentChangesPanel = element;
                        break;
                    }
                }
            }
            
            if (recentChangesPanel) {
                console.log('Found Recent Changes panel:', recentChangesPanel);
                
                // Create styled TOC
                const styledTOC = createStyledTOC();
                if (styledTOC) {
                    // Clear the panel and add the TOC
                    recentChangesPanel.innerHTML = '';
                    recentChangesPanel.appendChild(styledTOC);
                    console.log('Successfully replaced Recent Changes panel with TOC');
                } else {
                    console.log('Could not create styled TOC');
                }
            } else {
                console.log('Recent Changes panel not found, trying alternative approach');
                
                // Alternative: Create a floating TOC panel
                const styledTOC = createStyledTOC();
                if (styledTOC) {
                    styledTOC.style.cssText += `
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        width: 300px;
                        max-height: 80vh;
                        overflow-y: auto;
                        z-index: 1000;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    `;
                    document.body.appendChild(styledTOC);
                    console.log('Created floating TOC panel');
                }
            }
            
        } catch (error) {
            console.error('Error in replaceRecentChangesPanel:', error);
        }
    }
    
    // Run the main function
    replaceRecentChangesPanel();
    
    // Also run it again after a longer delay to catch any late-loading content
    setTimeout(replaceRecentChangesPanel, 3000);
});
