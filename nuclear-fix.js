// NUCLEAR FIX - This WILL work!
console.log('NUCLEAR FIX LOADED - REMOVING ALL DESCRIPTION TEXT AND CREATING BLACK/GOLD TOC');

// Run multiple times to ensure it works
function runNuclearFix() {
    console.log('Running nuclear fix...');
    
    // STEP 1: NUCLEAR REMOVAL of "Description original text"
    // Method 1: Remove all strong elements with that data attribute
    document.querySelectorAll('strong[data-v-96dae53a]').forEach(function(el) {
        if (el.textContent.includes('Description original text')) {
            console.log('REMOVING strong element:', el);
            el.remove();
        }
    });
    
    // Method 2: Find and remove by text content
    const allElements = document.querySelectorAll('*');
    allElements.forEach(function(el) {
        if (el.textContent && el.textContent.trim() === 'Description original text') {
            console.log('REMOVING element with exact text:', el);
            el.remove();
        }
    });
    
    // Method 3: Remove entire table rows containing this text
    document.querySelectorAll('tr').forEach(function(row) {
        if (row.textContent.includes('Description original text')) {
            console.log('REMOVING table row:', row);
            row.remove();
        }
    });
    
    // Method 4: Remove any divs containing this text
    document.querySelectorAll('div').forEach(function(div) {
        if (div.textContent && div.textContent.includes('Description original text')) {
            console.log('REMOVING div:', div);
            div.remove();
        }
    });
    
    // STEP 2: Remove "[ Expand/Collapse ]" text
    allElements.forEach(function(el) {
        if (el.textContent && el.textContent.includes('[ Expand/Collapse ]')) {
            console.log('REMOVING Expand/Collapse element:', el);
            el.remove();
        }
    });
    
    // STEP 3: Expand the main table of contents
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
    
    // STEP 4: Create black and gold table of contents in Recent Changes panel
    const tocElement = document.querySelector('.wiki-macro-toc');
    if (tocElement) {
        console.log('Found TOC element, creating styled version...');
        
        // Find the Recent Changes panel
        const recentChangesPanel = document.querySelector('.SeQedBXv');
        if (recentChangesPanel) {
            console.log('Found Recent Changes panel, replacing content...');
            
            // Create styled TOC
            const styledTOC = document.createElement('div');
            styledTOC.innerHTML = `
                <div style="
                    background: #000;
                    color: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    border: 2px solid #FFD700;
                    margin: 10px 0;
                    font-family: Arial, sans-serif;
                ">
                    <h3 style="
                        color: #FFD700;
                        margin: 0 0 15px 0;
                        font-size: 18px;
                        text-align: center;
                        border-bottom: 1px solid #FFD700;
                        padding-bottom: 8px;
                    ">📋 Table of Contents</h3>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${tocElement.innerHTML}
                    </div>
                </div>
            `;
            
            // Style the TOC links
            const tocLinks = styledTOC.querySelectorAll('a');
            tocLinks.forEach(function(link) {
                link.style.color = '#FFD700';
                link.style.textDecoration = 'none';
                link.style.display = 'block';
                link.style.padding = '3px 0';
                link.style.borderRadius = '3px';
                link.style.transition = 'all 0.2s ease';
                
                link.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#FFD700';
                    this.style.color = '#000';
                    this.style.paddingLeft = '5px';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#FFD700';
                    this.style.paddingLeft = '0';
                });
            });
            
            // Style the TOC numbers
            const tocItems = styledTOC.querySelectorAll('.toc-item');
            tocItems.forEach(function(item) {
                const text = item.textContent;
                const numberMatch = text.match(/^(\d+\.?\d*)/);
                if (numberMatch) {
                    const number = numberMatch[1];
                    const rest = text.substring(numberMatch[0].length);
                    item.innerHTML = `<span style="color: #FFD700; font-weight: bold;">${number}</span>${rest}`;
                }
            });
            
            // Replace the Recent Changes panel content
            recentChangesPanel.innerHTML = '';
            recentChangesPanel.appendChild(styledTOC);
            
            console.log('TOC successfully placed in Recent Changes panel!');
        } else {
            console.log('Recent Changes panel not found');
        }
    } else {
        console.log('TOC element not found');
    }
}

// Run immediately
runNuclearFix();

// Run again after a short delay
setTimeout(runNuclearFix, 1000);

// Run again after page is fully loaded
window.addEventListener('load', function() {
    setTimeout(runNuclearFix, 2000);
});

// Run periodically to catch any dynamically loaded content
setInterval(runNuclearFix, 5000);
