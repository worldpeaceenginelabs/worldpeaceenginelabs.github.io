/*!elementor - v3.5.6 - 28-02-2022*/"use strict";(self["webpackChunkelementor"]=self["webpackChunkelementor"]||[]).push([["video"],{"../assets/dev/js/frontend/handlers/video.js":/*!***************************************************!*\
!*** ../assets/dev/js/frontend/handlers/video.js ***!
\***************************************************/((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;class Video extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{imageOverlay:'.elementor-custom-embed-image-overlay',video:'.elementor-video',videoIframe:'.elementor-video-iframe'}};}
getDefaultElements(){const selectors=this.getSettings('selectors');return{$imageOverlay:this.$element.find(selectors.imageOverlay),$video:this.$element.find(selectors.video),$videoIframe:this.$element.find(selectors.videoIframe)};}
handleVideo(){if(this.getElementSettings('lightbox')){return;}
if('youtube'===this.getElementSettings('video_type')){this.apiProvider.onApiReady(apiObject=>{this.elements.$imageOverlay.remove();this.prepareYTVideo(apiObject,true);});}else{this.elements.$imageOverlay.remove();this.playVideo();}}
playVideo(){if(this.elements.$video.length){if(this.youtubePlayer){this.youtubePlayer.playVideo();}else{this.elements.$video[0].play();}
return;}
const $videoIframe=this.elements.$videoIframe,lazyLoad=$videoIframe.data('lazy-load');if(lazyLoad){$videoIframe.attr('src',lazyLoad);}
$videoIframe[0].src=this.apiProvider.getAutoplayURL($videoIframe[0].src);}
async animateVideo(){const lightbox=await elementorFrontend.utils.lightbox;lightbox.setEntranceAnimation(this.getCurrentDeviceSetting('lightbox_content_animation'));}
async handleAspectRatio(){const lightbox=await elementorFrontend.utils.lightbox;lightbox.setVideoAspectRatio(this.getElementSettings('aspect_ratio'));}
async hideLightbox(){const lightbox=await elementorFrontend.utils.lightbox;lightbox.getModal().hide();}
prepareYTVideo(YT,onOverlayClick){const elementSettings=this.getElementSettings(),playerOptions={videoId:this.videoID,events:{onReady:()=>{if(elementSettings.mute){this.youtubePlayer.mute();}
if(elementSettings.autoplay||onOverlayClick){this.youtubePlayer.playVideo();}},onStateChange:event=>{if(event.data===YT.PlayerState.ENDED&&elementSettings.loop){this.youtubePlayer.seekTo(elementSettings.start||0);}}},playerVars:{controls:elementSettings.controls?1:0,rel:elementSettings.rel?1:0,playsinline:elementSettings.play_on_mobile?1:0,modestbranding:elementSettings.modestbranding?1:0,autoplay:elementSettings.autoplay?1:0,start:elementSettings.start,end:elementSettings.end}};if(elementSettings.yt_privacy){playerOptions.host='https://www.youtube-nocookie.com';playerOptions.origin=window.location.hostname;}
this.youtubePlayer=new YT.Player(this.elements.$video[0],playerOptions);}
bindEvents(){this.elements.$imageOverlay.on('click',this.handleVideo.bind(this));}
onInit(){super.onInit();const elementSettings=this.getElementSettings();if(elementorFrontend.utils[elementSettings.video_type]){this.apiProvider=elementorFrontend.utils[elementSettings.video_type];}else{this.apiProvider=elementorFrontend.utils.baseVideoLoader;}
if('youtube'!==elementSettings.video_type){return;}
this.videoID=this.apiProvider.getVideoIDFromURL(elementSettings.youtube_url);if(!this.videoID){return;}
if(elementSettings.show_image_overlay&&elementSettings.image_overlay.url){return;}
if(elementSettings.lazy_load){this.intersectionObserver=elementorModules.utils.Scroll.scrollObserver({callback:event=>{if(event.isInViewport){this.intersectionObserver.unobserve(this.elements.$video.parent()[0]);this.apiProvider.onApiReady(apiObject=>this.prepareYTVideo(apiObject));}}});this.intersectionObserver.observe(this.elements.$video.parent()[0]);return;}
if(!elementorFrontend.config.experimentalFeatures['e_optimized_assets_loading']){setTimeout(()=>{this.apiProvider.onApiReady(apiObject=>this.prepareYTVideo(apiObject));},0);}else{this.apiProvider.onApiReady(apiObject=>this.prepareYTVideo(apiObject));}}
onElementChange(propertyName){if(0===propertyName.indexOf('lightbox_content_animation')){this.animateVideo();return;}
const isLightBoxEnabled=this.getElementSettings('lightbox');if('lightbox'===propertyName&&!isLightBoxEnabled){this.hideLightbox();return;}
if('aspect_ratio'===propertyName&&isLightBoxEnabled){this.handleAspectRatio();}}}
exports["default"]=Video;})}]);