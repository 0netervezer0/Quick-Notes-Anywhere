document.addEventListener( 'keydown', function( event ) {
    if ( event.ctrlKey && event.key === 'y' ) {
        event.preventDefault();
        createNote();
    }
});

function createNote( options = {} ) {
    // Main note frame
    const overlay = document.createElement( 'div' );
    overlay.classList.add( 'QNA-main-note-frame' );

    overlay.style.width = '400px';
    overlay.style.height = '360px';
    overlay.style.backgroundColor = '#EBD046';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.cursor = 'pointer';

    // Input frame
    const input = document.createElement( 'input' );
    overlay.classList.add( 'QNA-input-note-frame' );

    input.type = 'text';
    input.placeholder = 'Enter the text...';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.padding = '10px 15px';
    input.style.fontSize = '16px';
    input.style.outline = 'none';

    overlay.appendChild( input )
    document.body.appendChild( overlay );
}