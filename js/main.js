document.addEventListener( 'keydown', function( event ) {
if (( event.metaKey || event.ctrlKey ) && event.shiftKey && event.code === 'KeyY' ) {
        console.log( 'QNA: Hotkey Detected' );
        event.preventDefault();
        createNote();
    }
});

function createNote(options = {}) {
    // Function for removing previous overlay // ! REMOVE IT AFTER TESTING
    const existingOverlay = document.querySelector( '.QNA-main-note-frame' );
    if ( existingOverlay ) {
        existingOverlay.remove();
        console.log( 'QNA: Previous Overlay Removed' );
    }

    // Main note frame
    const overlay = document.createElement('div');
    overlay.classList.add('QNA-main-note-frame');
    
    overlay.style.position = 'fixed';
    overlay.style.top = '50px';
    overlay.style.left = '50px';
    overlay.style.zIndex = '10000';
    
    overlay.style.width = '400px';
    overlay.style.height = '360px';
    overlay.style.backgroundColor = '#EBD046';
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.cursor = 'default';
    overlay.style.overflow = 'hidden';

    // Header panel
    const header = document.createElement( 'div' );
    header.classList.add( 'QNA-header' );
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '8px 12px';
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    header.style.cursor = 'grab';
    header.style.userSelect = 'none';

    // Move handle (empty div for better UX)
    const moveHandle = document.createElement( 'div' );
    moveHandle.innerHTML = '↔';
    moveHandle.style.cursor = 'grab';
    moveHandle.style.fontSize = '16px';
    moveHandle.style.padding = '4px';

    // Delete button
    const deleteButton = document.createElement( 'button' );
    deleteButton.innerHTML = '×';
    deleteButton.style.background = 'none';
    deleteButton.style.border = 'none';
    deleteButton.style.fontSize = '20px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.padding = '0';
    deleteButton.style.width = '24px';
    deleteButton.style.height = '24px';
    deleteButton.style.borderRadius = '3px';
    deleteButton.style.display = 'flex';
    deleteButton.style.alignItems = 'center';
    deleteButton.style.justifyContent = 'center';
    
    // Hover effect for delete button
    deleteButton.addEventListener( 'mouseover', () => {
        deleteButton.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
    deleteButton.addEventListener( 'mouseout', () => {
        deleteButton.style.backgroundColor = 'transparent';
    });

    // Delete button functionality
    deleteButton.addEventListener( 'click', function( e ) {
        e.stopPropagation();
        overlay.remove();
        console.log( 'QNA: Overlay Removed via Button' );
    });

    header.appendChild( moveHandle );
    header.appendChild( deleteButton );

    // Content area
    const content = document.createElement( 'div' );
    content.style.flex = '1';
    content.style.display = 'flex';
    content.style.padding = '0';
    content.style.position = 'relative';

    // Input frame
    const input = document.createElement( 'textarea' );
    input.classList.add( 'QNA-input-note-frame' );
    
    input.placeholder = 'Start typing here...';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.padding = '15px';
    input.style.fontSize = '16px';
    input.style.outline = 'none';
    input.style.border = 'none';
    input.style.background = 'transparent';
    input.style.resize = 'none';
    input.style.boxSizing = 'border-box';
    input.style.fontFamily = 'inherit';
    input.style.color = 'inherit';

    // Drag functionality
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener( 'mousedown', function( e ) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt( window.getComputedStyle( overlay ).left, 10 );
        initialTop = parseInt( window.getComputedStyle( overlay ).top, 10 );
        header.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener( 'mousemove', function( e ) {
        if ( !isDragging ) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        overlay.style.left = ( initialLeft + deltaX ) + 'px';
        overlay.style.top = ( initialTop + deltaY ) + 'px';
    });

    document.addEventListener( 'mouseup', function() {
        if ( isDragging ) {
            isDragging = false;
            header.style.cursor = 'grab';
        }
    });

    moveHandle.addEventListener( 'click', function( e ) {
        e.stopPropagation();
    });

    content.appendChild( input );
    overlay.appendChild( header );
    overlay.appendChild( content );
    document.body.appendChild( overlay );
    
    input.focus();
    
    return overlay;
}

// Base styles
const style = document.createElement('style');
style.textContent = `
.QNA-input-note-frame:focus {
    border: none !important;
    box-shadow: none !important;
}

.QNA-header button:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
}

.QNA-main-note-frame {
    transition: box-shadow 0.2s ease;
}

.QNA-main-note-frame:active {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3) !important;
}
`;

document.head.appendChild( style );