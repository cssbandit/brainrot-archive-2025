// Fix table of contents and folding functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make all wiki-folding elements functional
    const foldingElements = document.querySelectorAll('.wiki-folding');
    
    foldingElements.forEach(function(element) {
        const dt = element.querySelector('dt');
        const dd = element.querySelector('dd');
        
        if (dt && dd) {
            // Initially hide the content
            dd.style.display = 'none';
            
            // Make the dt clickable
            dt.style.cursor = 'pointer';
            dt.style.userSelect = 'none';
            dt.style.padding = '5px';
            dt.style.borderRadius = '3px';
            dt.style.backgroundColor = '#f8f9fa';
            dt.style.border = '1px solid #dee2e6';
            dt.style.marginBottom = '5px';
            
            // Add click event
            dt.addEventListener('click', function() {
                if (dd.style.display === 'none') {
                    dd.style.display = 'block';
                    dt.textContent = dt.textContent.replace('[ Expand/Collapse ]', '[ Collapse ]');
                    dt.textContent = dt.textContent.replace('[ Table of Contents Expand/Collapse ]', '[ Table of Contents Collapse ]');
                } else {
                    dd.style.display = 'none';
                    dt.textContent = dt.textContent.replace('[ Collapse ]', '[ Expand/Collapse ]');
                    dt.textContent = dt.textContent.replace('[ Table of Contents Collapse ]', '[ Table of Contents Expand/Collapse ]');
                }
            });
            
            // Add hover effect
            dt.addEventListener('mouseenter', function() {
                dt.style.backgroundColor = '#e9ecef';
            });
            
            dt.addEventListener('mouseleave', function() {
                dt.style.backgroundColor = '#f8f9fa';
            });
        }
    });
    
    // Also fix any existing collapsed elements to show their content
    const existingCollapsed = document.querySelectorAll('.wiki-folding dd');
    existingCollapsed.forEach(function(dd) {
        if (dd.style.display === 'none') {
            dd.style.display = 'block';
        }
    });
    
    // Make table of contents links work
    const tocLinks = document.querySelectorAll('.toc-item a');
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some styling to make the TOC more visible
    const toc = document.getElementById('toc');
    if (toc) {
        toc.style.backgroundColor = '#f8f9fa';
        toc.style.padding = '15px';
        toc.style.borderRadius = '5px';
        toc.style.border = '1px solid #dee2e6';
        toc.style.marginBottom = '20px';
    }
    
    // Make TOC items more clickable
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach(function(item) {
        item.style.padding = '2px 0';
        item.style.cursor = 'pointer';
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e9ecef';
            this.style.borderRadius = '3px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderRadius = '';
        });
    });
});
