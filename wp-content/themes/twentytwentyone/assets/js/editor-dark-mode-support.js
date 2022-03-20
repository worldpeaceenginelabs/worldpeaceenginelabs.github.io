if(document.body.classList.contains('twentytwentyone-supports-dark-theme')){twentytwentyoneDarkModeEditorInit();}
function twentytwentyoneDarkModeEditorInit(attempt){var container=document.querySelector('.block-editor__typewriter'),maxAttempts=8;attempt=attempt||0;if(twentytwentyoneIsDarkMode()){if(null===container){if(attempt<maxAttempts){setTimeout(function(){twentytwentyoneDarkModeEditorInit(attempt+1);},25*Math.pow(2,attempt));}
return;}
document.body.classList.add('is-dark-theme');document.documentElement.classList.add('is-dark-theme');container.classList.add('is-dark-theme');}}