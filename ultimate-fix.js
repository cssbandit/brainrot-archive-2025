// ULTIMATE FIX - This WILL work!
console.log('ULTIMATE FIX LOADED - REMOVING ALL DESCRIPTION TEXT AND CREATING BLACK/GOLD TOC');

// Run multiple times to ensure it works
function runUltimateFix() {
    console.log('Running ultimate fix...');
    
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
    
    // Method 3: Remove any table rows containing this text
    document.querySelectorAll('tr').forEach(function(row) {
        if (row.textContent.includes('Description original text')) {
            console.log('REMOVING table row with description text:', row);
            row.remove();
        }
    });
    
    // Method 4: Remove any divs or spans containing this text
    document.querySelectorAll('div, span, td, th').forEach(function(el) {
        if (el.textContent && el.textContent.includes('Description original text')) {
            console.log('REMOVING div/span/td with description text:', el);
            el.remove();
        }
    });
    
    // STEP 2: Create Black and Gold TOC in Recent Changes Panel
    console.log('Creating black and gold TOC...');
    
    // Find the table of contents
    let tocElement = null;
    const possibleTocSelectors = [
        '.wiki-folding',
        'dl.wiki-folding',
        '[data-v-96dae53a*="목차"]',
        'dt:contains("목차")'
    ];
    
    for (let selector of possibleTocSelectors) {
        const elements = document.querySelectorAll(selector);
        for (let el of elements) {
            if (el.textContent.includes('목차') || el.textContent.includes('Contents')) {
                tocElement = el;
                console.log('Found TOC element:', tocElement);
                break;
            }
        }
        if (tocElement) break;
    }
    
    // If we found the TOC, extract its content
    if (tocElement) {
        console.log('Processing TOC element...');
        
        // Expand the TOC
        const dd = tocElement.querySelector('dd');
        if (dd) {
            dd.style.display = 'block';
            dd.style.visibility = 'visible';
            dd.style.opacity = '1';
        }
        
        // Extract TOC links
        const tocLinks = tocElement.querySelectorAll('a');
        console.log('Found TOC links:', tocLinks.length);
        
        // Create the new TOC HTML with black and gold styling
        let tocHTML = `
            <div style="
                background: #1a1a1a !important;
                color: #ffffff !important;
                padding: 15px !important;
                border-radius: 8px !important;
                border: 2px solid #ffd700 !important;
                margin: 10px 0 !important;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            ">
                <h3 style="
                    color: #ffd700 !important;
                    margin: 0 0 15px 0 !important;
                    font-size: 18px !important;
                    font-weight: bold !important;
                    text-align: center !important;
                    border-bottom: 2px solid #ffd700 !important;
                    padding-bottom: 8px !important;
                ">목차 (Table of Contents)</h3>
                <ul style="
                    list-style: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                ">
        `;
        
        // Add each TOC link with gold numbering
        tocLinks.forEach(function(link, index) {
            const linkText = link.textContent.trim();
            const linkHref = link.getAttribute('href');
            
            if (linkText && linkHref) {
                tocHTML += `
                    <li style="
                        margin: 8px 0 !important;
                        padding: 8px 12px !important;
                        background: #2a2a2a !important;
                        border-left: 4px solid #ffd700 !important;
                        border-radius: 4px !important;
                        transition: all 0.3s ease !important;
                    ">
                        <span style="
                            color: #ffd700 !important;
                            font-weight: bold !important;
                            margin-right: 8px !important;
                        ">${index + 1}.</span>
                        <a href="${linkHref}" style="
                            color: #ffffff !important;
                            text-decoration: none !important;
                            font-size: 14px !important;
                        " onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#ffffff'">
                            ${linkText}
                        </a>
                    </li>
                `;
            }
        });
        
        tocHTML += `
                </ul>
            </div>
        `;
        
        // Find Recent Changes panel and replace its content
        console.log('Looking for Recent Changes panel...');
        
        // Try multiple methods to find Recent Changes
        let recentChangesPanel = null;
        
        // Method 1: Look for RecentChanges link and find its container
        const recentChangesLinks = document.querySelectorAll('a[href*="RecentChanges"]');
        if (recentChangesLinks.length > 0) {
            console.log('Found RecentChanges link');
            recentChangesPanel = recentChangesLinks[0].closest('div[class*="SeQedBXv"]') || 
                                recentChangesLinks[0].closest('.wiki-right-menu') ||
                                recentChangesLinks[0].closest('[data-v-96dae53a]');
        }
        
        // Method 2: Look for specific classes
        if (!recentChangesPanel) {
            recentChangesPanel = document.querySelector('.SeQedBXv') || 
                                document.querySelector('[data-v-96dae53a*="recent"]');
        }
        
        // Method 3: Find any element containing "RecentChanges" text
        if (!recentChangesPanel) {
            const allDivs = document.querySelectorAll('div');
            for (let div of allDivs) {
                if (div.textContent.includes('RecentChanges') || div.textContent.includes('최근 변경')) {
                    recentChangesPanel = div;
                    break;
                }
            }
        }
        
        if (recentChangesPanel) {
            console.log('Found Recent Changes panel, replacing content...');
            recentChangesPanel.innerHTML = tocHTML;
            console.log('Successfully replaced Recent Changes with TOC!');
        } else {
            console.log('Could not find Recent Changes panel, creating new one...');
            // Create a new panel and append it to the right side
            const rightSide = document.querySelector('.wiki-right-menu') || 
                             document.querySelector('[data-v-96dae53a]') ||
                             document.body;
            
            const newPanel = document.createElement('div');
            newPanel.innerHTML = tocHTML;
            newPanel.style.position = 'fixed';
            newPanel.style.top = '20px';
            newPanel.style.right = '20px';
            newPanel.style.width = '300px';
            newPanel.style.zIndex = '9999';
            rightSide.appendChild(newPanel);
            console.log('Created new TOC panel on right side!');
        }
    } else {
        console.log('Could not find TOC element');
    }
}

// Run the fix multiple times to ensure it works
runUltimateFix();

// Run again after DOM loads
document.addEventListener('DOMContentLoaded', runUltimateFix);

// Run again after a delay
setTimeout(runUltimateFix, 1000);
setTimeout(runUltimateFix, 3000);
setTimeout(runUltimateFix, 5000);

// Also run on window load
window.addEventListener('load', runUltimateFix);

console.log('Ultimate fix script setup complete!');