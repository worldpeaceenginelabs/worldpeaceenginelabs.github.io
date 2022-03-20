wp.domReady(function(){wp.blocks.unregisterBlockStyle('core/separator','wide');function twentytwentyoneCopyDarkThemeClass(){var editor,attemptDelay=25,attempt=0,maxAttempts=10;if(!document.body.classList.contains('is-dark-theme')){return;}
editor=document.querySelector('.block-editor__typewriter');if(null===editor){if(attempt<maxAttempts){setTimeout(function(){twentytwentyoneCopyDarkThemeClass();},attemptDelay);attempt++;attemptDelay*=2;}
return;}
editor.classList.add('is-dark-theme');}
twentytwentyoneCopyDarkThemeClass();});