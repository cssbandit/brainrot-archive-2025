// Emergency fix for table of contents and cleanup
console.log('Emergency fix script loaded');

// Function to wait for page to load
function waitForPageLoad() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFix);
    } else {
        runFix();
    }
}

function runFix() {
    console.log('Running emergency fix...');
    
    // Step 1: Remove all "Description original text" elements
    console.log('Removing Description original text elements...');
    const allElements = document.querySelectorAll('*');
    allElements.forEach(function(element) {
        if (element.textContent && element.textContent.includes('Description original text')) {
            console.log('Found Description original text element:', element);
            // Remove the entire table row containing this element
            const tableRow = element.closest('tr');
            if (tableRow) {
                tableRow.remove();
                console.log('Removed table row with Description original text');
            }
        }
    });
    
    // Step 2: Expand the main table of contents
    console.log('Expanding table of contents...');
    const foldingElements = document.querySelectorAll('.wiki-folding, dl.wiki-folding');
    foldingElements.forEach(function(element) {
        const dt = element.querySelector('dt');
        const dd = element.querySelector('dd');
        if (dt && dd) {
            dd.style.display = 'block';
            dd.style.visibility = 'visible';
            dd.style.opacity = '1';
            console.log('Expanded folding element');
        }
    });
    
    // Step 3: Find and replace the Recent Changes panel
    console.log('Looking for Recent Changes panel...');
    
    // Try multiple approaches to find the Recent Changes panel
    let recentChangesPanel = null;
    
    // Method 1: Look for the RecentChanges link and trace up
    const recentChangesLink = document.querySelector('a[href="/RecentChanges"]');
    if (recentChangesLink) {
        console.log('Found RecentChanges link');
        // Find the parent container that holds the RecentChanges panel
        let parent = recentChangesLink.parentElement;
        while (parent && !recentChangesPanel) {
            if (parent.classList.contains('SeQedBXv') || 
                parent.querySelector('.SeQedBXv') ||
                parent.textContent.includes('RecentChanges')) {
                recentChangesPanel = parent;
                console.log('Found Recent Changes panel via link');
                break;
            }
            parent = parent.parentElement;
        }
    }
    
    // Method 2: Look for specific class names
    if (!recentChangesPanel) {
        recentChangesPanel = document.querySelector('.SeQedBXv');
        if (recentChangesPanel) {
            console.log('Found Recent Changes panel via class');
        }
    }
    
    // Method 3: Search all elements for RecentChanges text
    if (!recentChangesPanel) {
        allElements.forEach(function(element) {
            if (element.textContent && element.textContent.includes('RecentChanges') && !recentChangesPanel) {
                // Find the container that holds this text
                let container = element;
                while (container && container !== document.body) {
                    if (container.classList.contains('SeQedBXv') || 
                        container.querySelector('.SeQedBXv')) {
                        recentChangesPanel = container;
                        console.log('Found Recent Changes panel via text search');
                        break;
                    }
                    container = container.parentElement;
                }
            }
        });
    }
    
    if (recentChangesPanel) {
        console.log('Found Recent Changes panel, replacing content...');
        
        // Find the table of contents
        const toc = document.querySelector('.wiki-macro-toc, #toc');
        if (toc) {
            console.log('Found table of contents, copying to Recent Changes panel');
            
            // Create a styled version of the TOC
            const styledToc = toc.cloneNode(true);
            styledToc.style.cssText = `
                background: #2a2a2a;
                color: #fff;
                padding: 15px;
                border-radius: 8px;
                max-height: 400px;
                overflow-y: auto;
                font-size: 14px;
                line-height: 1.4;
            `;
            
            // Style the links
            const tocLinks = styledToc.querySelectorAll('a');
            tocLinks.forEach(function(link) {
                link.style.cssText = `
                    color: #4a9eff;
                    text-decoration: none;
                    display: block;
                    padding: 2px 0;
                `;
                link.addEventListener('mouseenter', function() {
                    this.style.color = '#6bb6ff';
                });
                link.addEventListener('mouseleave', function() {
                    this.style.color = '#4a9eff';
                });
            });
            
            // Clear the Recent Changes panel and add the TOC
            recentChangesPanel.innerHTML = '';
            recentChangesPanel.appendChild(styledToc);
            console.log('Successfully replaced Recent Changes panel with TOC');
        } else {
            console.log('Could not find table of contents');
        }
    } else {
        console.log('Could not find Recent Changes panel');
    }
    
    console.log('Emergency fix completed');
}

// Start the fix
waitForPageLoad();
