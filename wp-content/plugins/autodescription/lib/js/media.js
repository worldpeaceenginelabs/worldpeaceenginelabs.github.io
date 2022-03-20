'use strict';window.tsfMedia=function($){const l10n='undefined'!==typeof tsfMediaL10n&&tsfMediaL10n;let Cropper={};const _openImageEditor=event=>{const button=event.target;if(button.disabled||'undefined'===typeof wp.media){event.preventDefault();event.stopPropagation();return;}
const imageType=button.dataset.inputType||'',imageId=button.dataset.inputId||'';let frame;event.preventDefault();event.stopPropagation();_extendCropper();const _states={suggestedWidth:+(button.dataset.width||1200),suggestedHeight:+(button.dataset.height||630),isFlex:+(button.dataset.flex||1),minWidth:+(button.dataset.minWidth||200),minHeight:+(button.dataset.minHeight||200),};Cropper.control={params:{flex_width:_states.isFlex?4096:0,flex_height:_states.isFlex?4096:0,width:_states.suggestedWidth,height:_states.suggestedHeight,isFlex:_states.isFlex,minWidth:_states.minWidth,minHeight:_states.minHeight,},};frame=wp.media({button:{text:l10n.labels[imageType].imgFrameButton,close:false,},states:[new wp.media.controller.Library({title:l10n.labels[imageType].imgFrameTitle,library:wp.media.query({'type':'image'}),multiple:false,date:false,priority:20,suggestedWidth:_states.suggestedWidth,suggestedHeight:_states.suggestedHeight}),new Cropper({imgSelectOptions:_calculateImageSelectOptions}),],});const inputUrl=document.getElementById(`${imageId}-url`),inputId=document.getElementById(`${imageId}-id`);const onSelect=()=>{frame.setState('cropper');};frame.off('select',onSelect);frame.on('select',onSelect);const onCropped=croppedImage=>{let url=croppedImage.url,attachmentId=croppedImage.id;if(inputUrl){inputUrl.value=url;inputUrl.dispatchEvent(new Event('change'));}
if(inputId){inputId.value=attachmentId;inputId.dispatchEvent(new Event('change'));}};frame.off('cropped',onCropped);frame.on('cropped',onCropped);const onSkippedCrop=selection=>{let url=selection.get('url'),attachmentId=selection.get('id');if(inputUrl){inputUrl.value=url;inputUrl.dispatchEvent(new Event('change'));}
if(inputId){inputId.value=attachmentId;inputId.dispatchEvent(new Event('change'));}};frame.off('skippedcrop',onSkippedCrop);frame.on('skippedcrop',onSkippedCrop);const onDone=imageSelection=>{button.textContent=l10n.labels[imageType].imgChange;if(inputUrl){inputUrl.readOnly=true;}
_appendRemoveButton(button,true);'tsfAys'in window&&tsfAys.registerChange();};frame.off('skippedcrop cropped',onDone);frame.on('skippedcrop cropped',onDone);frame.open();}
const _appendRemoveButton=(target,animate)=>{const inputId=target.dataset?.inputId,inputType=target.dataset?.inputType;if(!inputId||!inputType)return;if(document.getElementById(`${inputId}-remove`))return;let button=document.createElement('button');button.type='button';button.id=`${inputId}-remove`
button.dataset.inputId=inputId;button.dataset.inputType=inputType;button.title=tsf.decodeEntities(l10n.labels[inputType].imgRemoveTitle);button.innerHTML=tsf.escapeString(l10n.labels[inputType].imgRemove);button.classList.add('tsf-remove-image-button','button','button-small');target.insertAdjacentElement('afterend',button);if(animate){$(button).css('opacity',0).animate({opacity:1},{queue:true,duration:1000});}
_resetImageEditorRemovalActions();}
const _removeEditorImage=event=>{const imageId=event.target.dataset.inputId||'',imageType=event.target.dataset.inputType||'';if(!imageId||!imageType)return;const inputSelect=document.getElementById(`${imageId}-select`);if(inputSelect.disabled)return;inputSelect.disabled=true;inputSelect.classList.add('disabled');const inputRemove=document.getElementById(`${imageId}-remove`);if(inputRemove){inputRemove.disabled=true;inputRemove.classList.add('disabled');$(inputRemove).fadeOut(250,()=>{inputRemove.remove();inputSelect.textContent=l10n.labels[imageType].imgSelect;inputSelect.classList.remove('disabled');inputSelect.disabled=false;});}
const inputUrl=document.getElementById(`${imageId}-url`);if(inputUrl){inputUrl.value='';inputUrl.dispatchEvent(new Event('change'));if(!inputUrl.dataset.readonly){inputUrl.readOnly=false;}}
const inputId=document.getElementById(`${imageId}-id`);if(inputId){inputId.value='';inputId.dispatchEvent(new Event('change'));}
'tsfAys'in window&&tsfAys.registerChange();}
const _extendCropper=()=>{if('undefined'!==typeof Cropper.control)
return;const View=wp.media.view;const TSFView=View.Cropper.extend({className:'crop-content tsf-image',ready:function(){View.Cropper.prototype.ready.apply(this,arguments);},onImageLoad:function(){let imgOptions=this.controller.get('imgSelectOptions'),imgSelect;if(typeof imgOptions==='function')
imgOptions=imgOptions(this.options.attachment,this.controller);if('undefined'===typeof imgOptions.aspectRatio){imgOptions=_.extend(imgOptions,{parent:this.$el,onInit:function(){this.parent.children().on('mousedown touchstart',function(e){if(e.shiftKey){imgSelect.setOptions({aspectRatio:'1:1'});}else{imgSelect.setOptions({aspectRatio:false});}});}});}
this.trigger('image-loaded');imgSelect=this.controller.imgSelect=this.$image.imgAreaSelect(imgOptions);},});const TSFCropper=wp.media.controller.Cropper.extend({createCropContent:function(){this.cropperView=new TSFView({controller:this,attachment:this.get('selection').first()});this.cropperView.on('image-loaded',this.createCropToolbar,this);this.frame.content.set(this.cropperView);},doCrop:function(attachment){let cropDetails=attachment.get('cropDetails'),control=Cropper.control;if(control.params.flex_width&&control.params.flex_height){if(cropDetails.width===cropDetails.height){if(cropDetails.width>control.params.flex_width){cropDetails.dst_width=cropDetails.dst_height=control.params.flex_width;}}else{if(cropDetails.width>control.params.flex_width||cropDetails.height>control.params.flex_height){if(cropDetails.width>cropDetails.height){let _ratio=cropDetails.width/control.params.flex_width;cropDetails.dst_width=control.params.flex_width;cropDetails.dst_height=Math.round(cropDetails.height/_ratio);}else{let _ratio=cropDetails.height/control.params.flex_height;cropDetails.dst_height=control.params.flex_height;cropDetails.dst_width=Math.round(cropDetails.width/_ratio);}}}}
if('undefined'===typeof cropDetails.dst_width){cropDetails.dst_width=0;cropDetails.dst_height=0;}
return wp.ajax.post('tsf_crop_image',{nonce:l10n.nonce,id:attachment.get('id'),context:'tsf-image',cropDetails:cropDetails});}});TSFCropper.prototype.control={};Cropper=TSFCropper;}
const _calculateImageSelectOptions=(attachment,controller)=>{const control=Cropper.control;let xInit=parseInt(control.params.width,10),yInit=parseInt(control.params.height,10);const flexWidth=!!parseInt(control.params.flex_width,10),flexHeight=!!parseInt(control.params.flex_height,10);const realWidth=attachment.get('width'),realHeight=attachment.get('height'),ratio=xInit/yInit,xImg=xInit,yImg=yInit;let canSkipCrop;if(control.params.isFlex){canSkipCrop=!_mustBeCropped(control.params.flex_width,control.params.flex_height,realWidth,realHeight);}else{canSkipCrop=ratio===realWidth/realHeight;}
controller.set('control',control.params);controller.set('canSkipCrop',canSkipCrop);if(realWidth/realHeight>ratio){yInit=realHeight;xInit=yInit*ratio;}else{xInit=realWidth;yInit=xInit/ratio;}
let x1=(realWidth-xInit)/2,y1=(realHeight-yInit)/2;const imgSelectOptions={handles:true,keys:true,instance:true,persistent:true,imageWidth:realWidth,imageHeight:realHeight,minWidth:xImg>xInit?xInit:xImg,minHeight:yImg>yInit?yInit:yImg,x1:x1,y1:y1,x2:xInit+x1,y2:yInit+y1};if(!control.params.isFlex){imgSelectOptions.handles='corners';imgSelectOptions.aspectRatio=xInit+':'+yInit;}else if(!flexHeight&&!flexWidth){imgSelectOptions.aspectRatio=xInit+':'+yInit;}else{if(flexHeight){imgSelectOptions.minHeight=control.params.minHeight;imgSelectOptions.maxWidth=realWidth;}
if(flexWidth){imgSelectOptions.minWidth=control.params.minWidth;imgSelectOptions.maxHeight=realHeight;}}
return imgSelectOptions;}
const _mustBeCropped=(dstW,dstH,imgW,imgH)=>{if(imgW<=dstW&&imgH<=dstH)
return false;return true;}
const _updateButtonText=event=>{const imageId=event.target.dataset.id||'',imageType=event.target.dataset.type||'';if(!imageId||!imageType)return;const inputSelect=document.getElementById(`${imageId}-select`);if(inputSelect.disabled)return;inputSelect.textContent=event.target.value.length?l10n.labels[imageType].imgChange:l10n.labels[imageType].imgSelect;}
const _checkImageEditorInput=()=>{document.querySelectorAll('.tsf-set-image-button').forEach(element=>{const imageId=element.dataset.inputId||'',inputId=imageId&&document.getElementById(`${imageId}-id`),inputUrl=imageId&&document.getElementById(`${imageId}-url`);if(inputId&&inputId.value>0){if(inputUrl)inputUrl.readOnly=true;_appendRemoveButton(element,false);}
if(inputUrl){inputUrl.addEventListener('change',_updateButtonText);inputUrl.dispatchEvent(new Event('change'));}});}
const _resetImageEditorSetActions=()=>{document.querySelectorAll('.tsf-set-image-button').forEach(el=>{el.addEventListener('click',_openImageEditor);});}
const _resetImageEditorRemovalActions=()=>{document.querySelectorAll('.tsf-remove-image-button').forEach(el=>{el.addEventListener('click',_removeEditorImage);});}
const _setupImageEditorActions=()=>{_resetImageEditorSetActions();_resetImageEditorRemovalActions();document.querySelectorAll('.tsf-enable-media-if-js').forEach(el=>{el.disabled=false;el.classList.remove('tsf-enable-media-if-js');});_checkImageEditorInput();_prepareTooltip();}
let _debounceActionReset=void 0;const resetImageEditorActions=()=>{clearTimeout(_debounceActionReset);_debounceActionReset=setTimeout(_setupImageEditorActions,500);}
let _updateToolTipBuffer={};const _updateToolTip=event=>{const imageId=_inferImageId(event.target.id||''),preview=imageId&&document.getElementById(`${imageId}-preview`);if(!preview)return;(imageId in _updateToolTipBuffer)&&clearTimeout(_updateToolTipBuffer[imageId]);let pageLoaded=preview.dataset.tsfLoaded||false;preview.dataset.tsfLoaded=1;let src=event.target.value||event.target.placeholder||'';const updateToolTip=()=>{let
style="max-width:225px;max-height:225px;min-width:60px;min-height:60px;border-radius:3px;display:block;";if(!src.length){if(pageLoaded){$(preview).not(':hidden').fadeOut(250);}else{$(preview).hide();}
return;}
preview.dataset.desc=`<img src=${tsf.escapeString(src)} style="${style}" />`;if(pageLoaded){$(preview).not(':visible').fadeIn(250);}else{$(preview).show();}
(new Image()).src=src;tsfTT.triggerUpdate(preview);}
_updateToolTipBuffer[imageId]=setTimeout(updateToolTip,pageLoaded&&src.length?1000/(115/60):0);}
const _prepareTooltip=()=>{document.querySelectorAll('.tsf-image-preview').forEach(el=>{const inputUrl=document.getElementById(`${el.dataset.for}-url`);if(!inputUrl)return;inputUrl.addEventListener('input',_updateToolTip);inputUrl.addEventListener('change',_updateToolTip);inputUrl.dispatchEvent(new Event('change'));});}
const _inferImageId=id=>id.replace(/-[a-z]+$/,'');return Object.assign({load:()=>{document.body.addEventListener('tsf-ready',_setupImageEditorActions);}},{resetImageEditorActions,},{l10n});}(jQuery);window.tsfMedia.load();