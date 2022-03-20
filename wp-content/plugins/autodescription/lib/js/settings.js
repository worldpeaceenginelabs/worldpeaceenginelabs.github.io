'use strict';window.tsfSettings=function($){const l10n='undefined'!==typeof tsfSettingsL10n&&tsfSettingsL10n;const _getSettingsId=name=>`autodescription-site-settings[${name}]`;const _dispatchAtInteractive=tsf.dispatchAtInteractive;const _initGeneralSettings=()=>{const toggleCharCounterDisplay=event=>{document.querySelectorAll('.tsf-counter-wrap').forEach(el=>{el.style.display=event.target.checked?'':'none';});event.target.checked&&tsfC.triggerCounterUpdate();}
document.getElementById(_getSettingsId('display_character_counter'))?.addEventListener('click',toggleCharCounterDisplay);const togglePixelCounterDisplay=event=>{document.querySelectorAll('.tsf-pixel-counter-wrap').forEach(el=>{el.style.display=event.target.checked?'':'none';});event.target.checked&&tsfC.triggerCounterUpdate();}
document.getElementById(_getSettingsId('display_pixel_counter'))?.addEventListener('click',togglePixelCounterDisplay);const excludedPostTypes=new Set(),excludedTaxonomies=new Set(),excludedPtTaxonomies=new Set(),excludedTaxonomiesAll=new Set();const validateTaxonomyState=()=>{let taxEntries=document.querySelectorAll('.tsf-excluded-taxonomies'),triggerchange=false;taxEntries.forEach(element=>{const taxonomy=element.name.split(/(?:.+\[)(.+?)(?:])/).join('');const taxPostTypes=JSON.parse(element.dataset?.postTypes||0)||[],isDisabled=taxPostTypes&&taxPostTypes.every(postType=>excludedPostTypes.has(postType));if(isDisabled){if(!excludedPtTaxonomies.has(taxonomy)){triggerchange=true;}
excludedPtTaxonomies.add(taxonomy);}else{if(excludedPtTaxonomies.has(taxonomy)){excludedPtTaxonomies.delete(taxonomy);triggerchange=true;}}
refreshTaxonomies();triggerchange&&dispatchTaxonomySupportChangedEvent(taxonomy);});}
document.body.addEventListener('tsf-post-type-support-changed',validateTaxonomyState);const validateTaxonomiesCache=new Map(),getValidateTaxonomiesCache=key=>validateTaxonomiesCache.get(key)||(new Set());const validateTaxonomies=event=>{validateTaxonomiesCache.set('excludedTaxonomiesAll',new Set(excludedTaxonomiesAll));validateTaxonomiesCache.set('excludedTaxonomies',new Set(excludedTaxonomies));validateTaxonomiesCache.set('excludedPtTaxonomies',new Set(excludedPtTaxonomies));}
document.body.addEventListener('tsf-taxonomy-support-changed',validateTaxonomies);const refreshTaxonomies=()=>{excludedTaxonomiesAll.clear();excludedTaxonomies.forEach(taxonomy=>excludedTaxonomiesAll.add(taxonomy));excludedPtTaxonomies.forEach(taxonomy=>excludedTaxonomiesAll.add(taxonomy));}
const dispatchTaxonomySupportChangedEvent=taxonomy=>{document.body.dispatchEvent(new CustomEvent('tsf-taxonomy-support-changed',{detail:{taxonomy,set:excludedTaxonomies,setPt:excludedPtTaxonomies,setAll:excludedTaxonomiesAll,}}));}
const dispatchPosttypeSupportChangedEvent=postType=>{document.body.dispatchEvent(new CustomEvent('tsf-post-type-support-changed',{detail:{postType,set:excludedPostTypes,}}));}
let init=false;const checkDisabledPT=event=>{if(!event.target.name)return;let postType=event.target.name.split(/(?:.+\[)(.+?)(?:])/).join('');if(event.target.checked){excludedPostTypes.add(postType);dispatchPosttypeSupportChangedEvent(postType);}else{if(init){excludedPostTypes.delete(postType);dispatchPosttypeSupportChangedEvent(postType);}}}
const checkDisabledTaxonomy=event=>{if(!event.target.name)return;let taxonomy=event.target.name.split(/(?:.+\[)(.+?)(?:])/).join('');if(event.target.checked){excludedTaxonomies.add(taxonomy);refreshTaxonomies();dispatchTaxonomySupportChangedEvent(taxonomy);}else{if(init){excludedTaxonomies.delete(taxonomy);refreshTaxonomies();dispatchTaxonomySupportChangedEvent(taxonomy);}}}
document.querySelectorAll('.tsf-excluded-post-types').forEach(el=>{el.addEventListener('change',checkDisabledPT);_dispatchAtInteractive(el,'change');});document.querySelectorAll('.tsf-excluded-taxonomies').forEach(el=>{el.addEventListener('change',checkDisabledTaxonomy);_dispatchAtInteractive(el,'change');});init=true;}
const _initColorPicker=()=>{document.querySelectorAll('.tsf-color-picker').forEach(element=>{let $input=$(element),currentColor='',defaultColor=$input.data('tsf-default-color');$input.wpColorPicker({defaultColor:defaultColor,width:238,change:(event,ui)=>{currentColor=$input.wpColorPicker('color');if(''===currentColor)
currentColor=defaultColor;element.value=defaultColor;tsfAys.registerChange();},clear:()=>{if(defaultColor.length){element.value=defaultColor;$input.closest('.wp-picker-container').find('.wp-color-result').css('backgroundColor',defaultColor);}
tsfAys.registerChange();},palettes:false,});});}
const _initTitleSettings=()=>{const additionsToggle=document.getElementById(_getSettingsId('title_rem_additions')),socialAdditionsToggle=document.getElementById(_getSettingsId('social_title_rem_additions')),titleAdditionsHelpTemplate=wp.template('tsf-disabled-title-additions-help-social')();const toggleAdditionsDisplayExample=event=>{if(event.target.checked){document.querySelectorAll('.tsf-title-additions-js').forEach(el=>el.style.display='none');if(socialAdditionsToggle){socialAdditionsToggle.dataset.disabledWarning=1;socialAdditionsToggle.closest('label').insertAdjacentHTML('beforeend',titleAdditionsHelpTemplate);tsfTT.triggerReset();}}else{document.querySelectorAll('.tsf-title-additions-js').forEach(el=>el.style.display='inline');if(socialAdditionsToggle?.dataset.disabledWarning)
socialAdditionsToggle.closest('label').querySelector('.tsf-title-additions-warning-social')?.remove();}
document.body.dispatchEvent(new CustomEvent('tsf-update-title-rem-additions',{detail:{removeAdditions:!!event.target.checked}}));}
if(additionsToggle){additionsToggle.addEventListener('change',toggleAdditionsDisplayExample);_dispatchAtInteractive(additionsToggle,'change');}
const toggleAdditionsLocationExample=event=>{let value;document.getElementsByName(event.target.name).forEach(el=>{if(el.checked)value=el.value;});const showLeft='left'===value,locationClass='tsf-title-additions-location-hidden';document.querySelectorAll('.tsf-title-additions-example-left').forEach(el=>{el.classList.toggle(locationClass,!showLeft);el.classList.remove('hidden');});document.querySelectorAll('.tsf-title-additions-example-right').forEach(el=>{el.classList.toggle(locationClass,showLeft);el.classList.remove('hidden');});tsfTitle.updateStateAll('additionPlacement',showLeft?'before':'after',_getSettingsId('homepage_title'));}
document.querySelectorAll('#tsf-title-location input').forEach(el=>{el.addEventListener('change',toggleAdditionsLocationExample);if(el.checked)
_dispatchAtInteractive(el,'change');});const adjustPrefixExample=event=>{const showPrefix=!event.target.checked,prefixClass='tsf-title-tax-prefix-hidden';document.querySelectorAll('.tsf-title-tax-prefix').forEach(el=>{el.classList.toggle(prefixClass,!showPrefix);el.classList.remove('hidden');});document.querySelectorAll('.tsf-title-tax-noprefix').forEach(el=>{el.classList.toggle(prefixClass,showPrefix);el.classList.remove('hidden');});tsfTitle.updateStateAll('showPrefix',showPrefix,_getSettingsId('homepage_title'));}
const titleRemPrefixes=document.getElementById(_getSettingsId('title_rem_prefixes'));if(titleRemPrefixes){titleRemPrefixes.addEventListener('change',adjustPrefixExample);_dispatchAtInteractive(titleRemPrefixes,'change');}
const updateSeparator=event=>{const separator=tsf.decodeEntities(event.target.dataset.entity),activeClass='tsf-title-separator-active';document.querySelectorAll('.tsf-sep-js').forEach(el=>{el.textContent=` ${separator} `;});window.dispatchEvent(new CustomEvent('tsf-title-sep-updated',{detail:{separator}}));let oldActiveLabel=document.querySelector(`.${activeClass}`);oldActiveLabel&&oldActiveLabel.classList.remove(activeClass,'tsf-no-focus-ring');let activeLabel=document.querySelector(`label[for="${event.target.id}"]`);activeLabel&&activeLabel.classList.add(activeClass);}
document.querySelectorAll('#tsf-title-separator input').forEach(el=>{el.addEventListener('click',updateSeparator);});const addNoFocusClass=event=>{event.target.classList.add('tsf-no-focus-ring');}
document.querySelectorAll('#tsf-title-separator label').forEach(el=>{el.addEventListener('click',addNoFocusClass);});const homeTitleId=_getSettingsId('homepage_title'),siteTitleInput=document.getElementById(_getSettingsId('site_title'));const adjustSiteTitleExampleOuput=event=>{let examples=document.querySelectorAll('.tsf-site-title-js'),newVal=tsf.decodeEntities(tsf.sDoubleSpace(event.target.value.trim()));newVal=newVal||tsf.decodeEntities(event.target.placeholder);tsfTitle.updateStateOf(homeTitleId,'defaultTitle',newVal);tsfTitle.updateStateAll('additionValue',newVal,homeTitleId);let htmlVal=tsf.escapeString(newVal);examples.forEach(el=>{el.innerHTML=htmlVal});}
if(siteTitleInput){siteTitleInput.addEventListener('input',adjustSiteTitleExampleOuput);_dispatchAtInteractive(siteTitleInput,'input');}}
const _initHomeTitleSettings=()=>{const _titleId=_getSettingsId('homepage_title');const titleInput=document.getElementById(_titleId),taglineInput=document.getElementById(_getSettingsId('homepage_title_tagline')),taglineToggle=document.getElementById(_getSettingsId('homepage_tagline'));tsfTitle.setInputElement(titleInput);const state=JSON.parse(document.getElementById(`tsf-title-data_${_titleId}`)?.dataset.state||0);tsfTitle.updateStateOf(_titleId,'allowReferenceChange',!state.refTitleLocked);tsfTitle.updateStateOf(_titleId,'defaultTitle',state.defaultTitle);tsfTitle.updateStateOf(_titleId,'addAdditions',state.addAdditions);tsfTitle.updateStateOf(_titleId,'useSocialTagline',!!(state.useSocialTagline||false));tsfTitle.updateStateOf(_titleId,'additionValue',state.additionValue);tsfTitle.updateStateOf(_titleId,'additionPlacement',state.additionPlacement);tsfTitle.updateStateOf(_titleId,'hasLegacy',!!(state.hasLegacy||false));tsfTitle.enqueueUnregisteredInputTrigger(_titleId);const toggleHoverAdditionsPlacement=event=>{let newPlacement='left'===event.target.value?'before':'after';tsfTitle.updateStateOf(_titleId,'additionPlacement',newPlacement);}
document.querySelectorAll('#tsf-home-title-location input').forEach(el=>{el.addEventListener('change',toggleHoverAdditionsPlacement);_dispatchAtInteractive(el,'change');});const setTitleVisibilityPrefix=visibility=>{let oldPrefixValue=tsfTitle.getStateOf(_titleId,'prefixValue'),prefixValue='';switch(visibility){case 'password':prefixValue=tsfTitle.protectedPrefix;break;case 'private':prefixValue=tsfTitle.privatePrefix;break;default:case 'public':prefixValue='';break;}
if(prefixValue!==oldPrefixValue)
tsfTitle.updateStateOf(_titleId,'prefixValue',prefixValue);}
if(l10n.states.isFrontPrivate){setTitleVisibilityPrefix('private');}else if(l10n.states.isFrontProtected){setTitleVisibilityPrefix('password');}
const adjustHomepageExampleOutput=event=>{let examples=document.querySelectorAll('.tsf-custom-title-js'),val=tsf.decodeEntities(tsf.sDoubleSpace(event.target.value.trim()));if(val.length){val=tsf.escapeString(val);examples.forEach(el=>el.innerHTML=val);}else{val=tsf.escapeString(tsf.decodeEntities(tsfTitle.getStateOf(_titleId,'defaultTitle')));examples.forEach(el=>el.innerHTML=val);}}
titleInput.addEventListener('input',adjustHomepageExampleOutput);_dispatchAtInteractive(titleInput,'input');let updateHomePageTaglineExampleOutputBuffer;const updateHomePageTaglineExampleOutput=()=>{clearTimeout(updateHomePageTaglineExampleOutputBuffer);updateHomePageTaglineExampleOutputBuffer=setTimeout(()=>{let value=tsfTitle.getStateOf(_titleId,'additionValue');value=tsf.decodeEntities(tsf.sDoubleSpace(value.trim()));if(value.length&&tsfTitle.getStateOf(_titleId,'addAdditions')){document.querySelectorAll('.tsf-custom-tagline-js').forEach(el=>{el.innerHTML=tsf.escapeString(value);});document.querySelectorAll('.tsf-custom-blogname-js').forEach(el=>{el.style.display=null;});}else{document.querySelectorAll('.tsf-custom-blogname-js').forEach(el=>{el.style.display='none';});}},1000/60);}
const updateHoverAdditionsValue=()=>{let value=taglineInput.value.trim();if(!value.length)
value=taglineInput.placeholder||'';value=tsf.escapeString(tsf.decodeEntities(value.trim()));tsfTitle.updateStateOf(_titleId,'additionValue',value);updateHomePageTaglineExampleOutput();}
taglineInput.addEventListener('input',updateHoverAdditionsValue);_dispatchAtInteractive(taglineInput,'input');const toggleHomePageTaglineExampleDisplay=event=>{let addAdditions=false;if(event.target.checked){addAdditions=true;taglineInput.readOnly=false;}else{addAdditions=false;taglineInput.readOnly=true;}
tsfTitle.updateStateOf(_titleId,'addAdditions',addAdditions);updateHomePageTaglineExampleOutput();}
taglineToggle.addEventListener('change',toggleHomePageTaglineExampleDisplay);_dispatchAtInteractive(taglineToggle,'change');const updateSeparator=event=>{tsfTitle.updateStateAll('separator',event.detail.separator);}
window.addEventListener('tsf-title-sep-updated',updateSeparator);}
const _initHomeDescriptionSettings=()=>{const descId=_getSettingsId('homepage_description');tsfDescription.setInputElement(document.getElementById(descId));const state=JSON.parse(document.getElementById(`tsf-description-data_${descId}`)?.dataset.state||0);if(state){tsfDescription.updateStateOf(descId,'defaultDescription',state.defaultDescription.trim());tsfDescription.updateStateOf(descId,'hasLegacy',!!(state.hasLegacy||false));}
tsfDescription.enqueueUnregisteredInputTrigger(descId);}
const _initHomeSocialSettings=()=>{const _socialGroup='homepage_social_settings';tsfSocial.setInputInstance(_socialGroup,_getSettingsId('homepage_title'),_getSettingsId('homepage_description'));const groupData=JSON.parse(document.getElementById(`tsf-social-data_${_socialGroup}`)?.dataset.settings||0);if(!groupData)return;tsfSocial.updateStateOf(_socialGroup,'addAdditions',groupData.og.state.addAdditions);tsfSocial.updateStateOf(_socialGroup,'defaults',{ogTitle:groupData.og.state.defaultTitle,twTitle:groupData.tw.state.defaultTitle,ogDesc:groupData.og.state.defaultDesc,twDesc:groupData.tw.state.defaultDesc,});tsfSocial.updateStateOf(_socialGroup,'placeholderLocks',{ogTitle:groupData.og.state?.titlePhLock||false,twTitle:groupData.tw.state?.titlePhLock||false,ogDesc:groupData.og.state?.descPhLock||false,twDesc:groupData.tw.state?.descPhLock||false,});}
const _initHomeGeneralListeners=()=>{const enqueueGeneralInputListeners=()=>{tsfTitle.enqueueUnregisteredInputTrigger(_getSettingsId('homepage_title'));tsfDescription.enqueueUnregisteredInputTrigger(_getSettingsId('homepage_description'));}
const triggerPostboxSynchronousUnregisteredInput=(event,elem)=>{if('autodescription-homepage-settings'===elem.id){let inside=elem.querySelector('.inside');if(inside.offsetHeight>0&&inside.offsetWidth>0){enqueueGeneralInputListeners();}}}
$(document).on('postbox-toggled',triggerPostboxSynchronousUnregisteredInput);document.getElementById('tsf-homepage-tab-general')?.addEventListener('tsf-tab-toggled',enqueueGeneralInputListeners);}
const _getPtaInputId=(postType,id)=>`${_getSettingsId('pta')}[${postType}][${id}]`;let _cachedPtaData=void 0;const _getPtaData=()=>_cachedPtaData||=JSON.parse(document.getElementById('tsf-post-type-archive-data')?.dataset.postTypes||0)||{};const _initPtaSettings=()=>{const postTypeData=_getPtaData(),itemLength=Object.keys(postTypeData).length;switch(true){case itemLength>1:_initPtaSelector();case itemLength>0:_initPtaListeners();break;default:break;}
for(const postType in postTypeData){_initPtaTitleSettings(postType);_initPtaDescriptionSettings(postType);_initPtaSocialSettings(postType);_initPtaVisibilitySettings(postType);_initPtaMainListeners(postType);}}
const _initPtaSelector=()=>{const postTypeData=_getPtaData();const select=document.getElementById('tsf-post-type-archive-selector'),optionOption=document.createElement('option');const headerWrap=document.getElementById('tsf-post-type-archive-header-wrap');headerWrap&&(headerWrap.style.display=null);const populateSelect=()=>{for(const postType in postTypeData){let _option=optionOption.cloneNode();_option.value=tsf.escapeString(postType);_option.innerHTML=tsf.escapeString(postTypeData[postType].label);select?.appendChild(_option);}}
populateSelect();document.querySelectorAll('.tsf-post-type-header').forEach(el=>el.classList.add('hidden'));let _debounceSwitch=void 0,_detailsEl;const switchPostTypeSettingsView=event=>{clearTimeout(_debounceSwitch);_debounceSwitch=setTimeout(()=>{_detailsEl&&headerWrap?.removeChild(_detailsEl);document.querySelectorAll('.tsf-post-type-archive-wrap').forEach(el=>{if(event.target.value===el.dataset.postType){el.style.display=null;_detailsEl=el.querySelector('.tsf-post-type-archive-details')?.cloneNode(true);}else{el.style.display='none';}
el.classList.remove('hide-if-tsf-js');});_detailsEl&&headerWrap?.appendChild(_detailsEl);document.body.dispatchEvent(new CustomEvent('tsf-post-type-archive-switched',{detail:{postType:event.target.value,hasKompaanChocolateBananaBeer:false,}}));},1000/60);}
if(select){select.addEventListener('change',switchPostTypeSettingsView);_dispatchAtInteractive(select,'change');}}
const _initPtaListeners=()=>{const augmentSwitcher=event=>{const{postType,set}=event.detail,wrap=document.querySelector(`.tsf-post-type-archive-wrap[data-post-type="${postType}"]`),excluded=set.has(postType);wrap?.querySelector('.tsf-post-type-archive-if-excluded')?.classList.toggle('hidden',!excluded);wrap?.querySelector('.tsf-post-type-archive-if-not-excluded')?.classList.toggle('hidden',excluded);document.body.dispatchEvent(new CustomEvent('tsf-post-type-archive-switched',{detail:{postType:postType,}}));}
document.body.addEventListener('tsf-post-type-support-changed',augmentSwitcher);}
const _initPtaTitleSettings=postType=>{const _titleId=_getPtaInputId(postType,'doctitle'),_inputEl=document.getElementById(_titleId);tsfTitle.setInputElement(_inputEl);const state=JSON.parse(document.getElementById(`tsf-title-data_${_titleId}`)?.dataset.state||0);if(state){tsfTitle.updateStateOf(_titleId,'defaultTitle',state.defaultTitle);tsfTitle.updateStateOf(_titleId,'addAdditions',state.addAdditions);tsfTitle.updateStateOf(_titleId,'useSocialTagline',!!(state.useSocialTagline||false));tsfTitle.updateStateOf(_titleId,'additionValue',state.additionValue);tsfTitle.updateStateOf(_titleId,'additionPlacement',state.additionPlacement);tsfTitle.updateStateOf(_titleId,'prefixValue',state.prefixValue);tsfTitle.updateStateOf(_titleId,'showPrefix',state.showPrefix);}
const updateTitlePrefix=event=>{let showPrefix=!event.target.value.trim().length;if(document.getElementById(_getSettingsId('title_rem_prefixes'))?.checked)
showPrefix=false;tsfTitle.updateStateOf(_titleId,'showPrefix',showPrefix);}
_inputEl.addEventListener('input',updateTitlePrefix);const updateTitleAdditions=event=>{let addAdditions=!event.target.checked;if(document.getElementById(_getSettingsId('title_rem_additions'))?.checked)
addAdditions=false;tsfTitle.updateStateOf(_titleId,'addAdditions',addAdditions);}
const disabledTitleAdditionsHelp=wp.template('tsf-disabled-title-additions-help')();const blogNameTrigger=document.getElementById(_getPtaInputId(postType,'title_no_blog_name'));const updateTitleRemoveAdditions=event=>{const{removeAdditions}=event.detail;blogNameTrigger.disabled=removeAdditions;if(removeAdditions){blogNameTrigger.closest('label').insertAdjacentHTML('beforeend',disabledTitleAdditionsHelp);tsfTT.triggerReset();}else{blogNameTrigger.closest('label').querySelector('.tsf-title-additions-warning')?.remove();}
blogNameTrigger.dispatchEvent(new Event('change'));}
if(blogNameTrigger){document.body.addEventListener('tsf-update-title-rem-additions',updateTitleRemoveAdditions);blogNameTrigger.addEventListener('change',updateTitleAdditions);_dispatchAtInteractive(blogNameTrigger,'change');}
tsfTitle.enqueueUnregisteredInputTrigger(_titleId);}
const _initPtaDescriptionSettings=postType=>{const _descId=_getPtaInputId(postType,'description');tsfDescription.setInputElement(document.getElementById(_descId));const state=JSON.parse(document.getElementById(`tsf-description-data_${_descId}`)?.dataset.state||0);if(state)
tsfDescription.updateStateOf(_descId,'defaultDescription',state.defaultDescription.trim());tsfDescription.enqueueUnregisteredInputTrigger(_descId);}
const _initPtaSocialSettings=postType=>{const _socialGroup=`pta_social_settings_${postType}`;const groupData=JSON.parse(document.getElementById(`tsf-social-data_${_socialGroup}`)?.dataset.settings||0);tsfSocial.setInputInstance(_socialGroup,_getPtaInputId(postType,'doctitle'),_getPtaInputId(postType,'description'));tsfSocial.updateStateOf(_socialGroup,'addAdditions',groupData.og.state.addAdditions);tsfSocial.updateStateOf(_socialGroup,'defaults',{ogTitle:groupData.og.state.defaultTitle,twTitle:groupData.tw.state.defaultTitle,ogDesc:groupData.og.state.defaultDesc,twDesc:groupData.tw.state.defaultDesc,});}
const _initPtaVisibilitySettings=postType=>{const robotsData={site:new Map(),pt:new Map(),}
const isOff=robotsType=>{let off=false;if('noindex'===robotsType)
off=!_getPtaData()[postType].hasPosts;return off||robotsData.site.get(robotsType)||robotsData.pt.get(robotsType);}
const setDefaultRobotsValue=robotsType=>{const robotsSelect=document.getElementById(_getPtaInputId(postType,robotsType));const _defaultIndexOption=robotsSelect?.querySelector('[value="0"]'),_data=robotsSelect?.dataset||{};let newHTML=_data.defaultI18n?.replace('%s',tsf.decodeEntities(isOff(robotsType)?_data.defaultOff:_data.defaultOn));if(newHTML!==_defaultIndexOption.innerHTML){_defaultIndexOption.innerHTML=newHTML;robotsSelect.dispatchEvent(new Event('change'));}}
const _registerPTDefaultRobotsValue=event=>{const{postType:pt,robotsType,set}=event.detail;if(postType!==pt)return;robotsData.pt.set(robotsType,set.has(postType));setDefaultRobotsValue(robotsType);}
const _registerSiteDefaultRobotsValue=event=>{const{checked,robotsType}=event.detail;robotsData.site.set(robotsType,!!checked);setDefaultRobotsValue(robotsType);}
document.body.addEventListener('tsf-post-type-robots-changed',_registerPTDefaultRobotsValue);document.body.addEventListener('tsf-site-robots-changed',_registerSiteDefaultRobotsValue);['noindex','nofollow','noarchive'].forEach(type=>{setDefaultRobotsValue(type)});const canonicalInput=document.getElementById(_getPtaInputId(postType,'canonical'));const indexInput=document.getElementById(_getPtaInputId(postType,'noindex'));const setRobotsIndexingState=value=>{let type='',placeholder='';switch(value){case 0:type=isOff('noindex')?'noindex':'index';break;case-1:type='index';break;case 1:type='noindex';break;}
if('noindex'===type){placeholder='';}else{placeholder=_getPtaData()[postType].url;}
canonicalInput.placeholder=placeholder;}
if(canonicalInput&&indexInput){indexInput.addEventListener('change',event=>setRobotsIndexingState(+event.target.value));setRobotsIndexingState(+indexInput.value);}}
const _initPtaMainListeners=postType=>{const enqueueGeneralInputListeners=()=>{tsfTitle.enqueueUnregisteredInputTrigger(_getPtaInputId(postType,'doctitle'));tsfDescription.enqueueUnregisteredInputTrigger(_getPtaInputId(postType,'description'));}
const triggerPostboxSynchronousUnregisteredInput=(event,elem)=>{if('autodescription-post-type-archive-settings'===elem.id){let inside=elem.querySelector('.inside');if(inside.offsetHeight>0&&inside.offsetWidth>0){enqueueGeneralInputListeners();}}}
$(document).on('postbox-toggled',triggerPostboxSynchronousUnregisteredInput);const triggerPtaSynchronousUnregisteredInput=event=>{if(event.detail?.postType===postType){enqueueGeneralInputListeners();}}
document.body.addEventListener('tsf-post-type-archive-switched',triggerPtaSynchronousUnregisteredInput);document.getElementById(`tsf-post_type_archive_${postType}-tab-general`)?.addEventListener('tsf-tab-toggled',enqueueGeneralInputListeners);}
const _initSocialSettings=()=>{const socialTitleRemoveAdditions=document.getElementById(_getSettingsId('social_title_rem_additions'));const updateSocialAdditions=event=>{if(event.target.checked){tsfSocial.updateStateAll('addAdditions',false);}else{tsfSocial.updateStateAll('addAdditions',true);}}
if(socialTitleRemoveAdditions){socialTitleRemoveAdditions.addEventListener('change',updateSocialAdditions);_dispatchAtInteractive(socialTitleRemoveAdditions,'change');}}
const _initRobotsInputs=()=>{const copyrightToggle=document.getElementById(_getSettingsId('set_copyright_directives'));if(copyrightToggle){const controlNodes=["max_snippet_length","max_image_preview","max_video_preview",].map(name=>document.getElementById(_getSettingsId(name)));const surrogateClass='tsf-toggle-directives-surrogate';const toggleCopyrightControl=event=>{if(event.target.checked){controlNodes.forEach(el=>el.disabled=false);document.querySelectorAll(`.${surrogateClass}`).forEach(el=>el.remove());}else{controlNodes.forEach(el=>{el.disabled=true;let surrogate=document.createElement('input');surrogate.type='hidden';surrogate.name=el.name||'';surrogate.value=el.value||0;surrogate.classList.add(surrogateClass);el.insertAdjacentElement('afterend',surrogate);});}}
copyrightToggle.addEventListener('change',toggleCopyrightControl);_dispatchAtInteractive(copyrightToggle,'change');}
const robotsPostTypes={},robotsPtTaxonomies={};[robotsPostTypes,robotsPtTaxonomies].forEach(_const=>{_const.noindex=new Set();_const.nofollow=new Set();_const.noarchive=new Set();});const dispatchPosttypeRobotsChangedEvent=(postType,robotsType)=>{document.body.dispatchEvent(new CustomEvent('tsf-post-type-robots-changed',{detail:{postType,robotsType,set:robotsPostTypes[robotsType],}}));}
const dispatchTaxonomyRobotsChangedEvent=(taxonomy,robotsType)=>{document.body.dispatchEvent(new CustomEvent('tsf-taxonomy-robots-changed',{detail:{taxonomy,robotsType,set:robotsPtTaxonomies[robotsType],}}));}
const dispatchSiteRobotsChangedEvent=(checked,robotsType)=>{document.body.dispatchEvent(new CustomEvent('tsf-site-robots-changed',{detail:{checked,robotsType,}}));}
const postTypeRobotsHelp=wp.template('tsf-robots-pt-help')();const addTaxRobotsByPtWarning=(taxonomy,robotsType,disable)=>{let taxEl=document.getElementById(`${ _getSettingsId(`${robotsType}_taxonomies`)}[${taxonomy}]`);if(disable){taxEl.closest('label').insertAdjacentHTML('beforeend',postTypeRobotsHelp);tsfTT.triggerReset();}else{taxEl.closest('label').querySelector('.tsf-taxonomy-from-pt-robots-warning')?.remove();}
toggleWarnings(taxonomy);}
const validateTaxonomyState=robotsType=>{const taxEntries=document.querySelectorAll(`.tsf-robots-taxonomies[data-robots="${robotsType}"]`);let triggerchange=false;taxEntries.forEach(element=>{let taxonomy=element.name.split(/(?:.+\[)(.+?)(?:])/).join('');const taxPostTypes=JSON.parse(element.dataset.postTypes||0),hasRobots=taxPostTypes&&taxPostTypes.every(postType=>robotsPostTypes[robotsType].has(postType));if(hasRobots){if(!robotsPtTaxonomies[robotsType].has(taxonomy)){triggerchange=true;}
robotsPtTaxonomies[robotsType].add(taxonomy);}else{if(robotsPtTaxonomies[robotsType].has(taxonomy)){robotsPtTaxonomies[robotsType].delete(taxonomy);triggerchange=true;}}
triggerchange&&dispatchTaxonomyRobotsChangedEvent(taxonomy,robotsType);});}
const validateTaxonomiesCache={noindex:new Map(),nofollow:new Map(),noarchive:new Map(),};const getValidateTaxonomiesCache=(key,robotsType)=>validateTaxonomiesCache[robotsType].get(key)||(new Set());const validateTaxonomies=event=>{const{taxonomy,robotsType}=event.detail;if(getValidateTaxonomiesCache('robotsPtTaxonomies',robotsType).size
!==robotsPtTaxonomies[robotsType].size)addTaxRobotsByPtWarning(taxonomy,robotsType,robotsPtTaxonomies[robotsType].has(taxonomy));validateTaxonomiesCache[robotsType].set('robotsPtTaxonomies',new Set(robotsPtTaxonomies[robotsType]));}
document.body.addEventListener('tsf-taxonomy-robots-changed',validateTaxonomies);const validatePostTypes=event=>{validateTaxonomyState(event.detail.robotsType);}
document.body.addEventListener('tsf-post-type-robots-changed',validatePostTypes);const toggleWarnings=taxonomy=>{for(let robotsType in robotsPtTaxonomies){if(robotsPtTaxonomies[robotsType].has(taxonomy)){let taxEl=document.getElementById(`${ _getSettingsId(`${robotsType}_taxonomies`)}[${taxonomy}]`),warning=taxEl.closest('label').querySelector('.tsf-taxonomy-from-pt-robots-warning');if(taxEl.dataset.disabledWarning){warning.style.display='none';}else{warning.style.display='';}}}}
document.body.addEventListener('tsf-taxonomy-support-changed',event=>toggleWarnings(event.detail.taxonomy));let init=false;const checkRobotsPT=event=>{let postType=event.target?.name.split(/(?:.+\[)(.+?)(?:])/).join(''),robotsType=event.target?.dataset.robots;if(event.target.checked){robotsPostTypes[robotsType].add(postType);dispatchPosttypeRobotsChangedEvent(postType,robotsType);}else{if(init){robotsPostTypes[robotsType].delete(postType);dispatchPosttypeRobotsChangedEvent(postType,robotsType);}}}
document.querySelectorAll('.tsf-robots-post-types').forEach(el=>{el.addEventListener('change',checkRobotsPT);_dispatchAtInteractive(el,'change');});const checkRobotsSite=event=>{let robotsType=event.target?.dataset.robots,checked=event.target.checked;if(checked){dispatchSiteRobotsChangedEvent(checked,robotsType);}else{if(init){dispatchSiteRobotsChangedEvent(checked,robotsType);}}}
document.querySelectorAll('.tsf-robots-site').forEach(el=>{el.addEventListener('change',checkRobotsSite);_dispatchAtInteractive(el,'change');});init=true;}
const _initRobotsSupport=()=>{const getCloneClassPT=postType=>tsf.escapeString(`tsf-disabled-post-type-input-clone-${postType}`);const postTypeHelpTemplate=wp.template('tsf-disabled-post-type-help')();const getPostTypeRobotsSettings=postType=>[document.getElementById(`${ _getSettingsId('noindex_post_types')}[${postType}]`),document.getElementById(`${ _getSettingsId('nofollow_post_types')}[${postType}]`),document.getElementById(`${ _getSettingsId('noarchive_post_types')}[${postType}]`),].filter(el=>el);const augmentPTRobots=event=>{const{postType,set}=event.detail;if(set.has(postType)){getPostTypeRobotsSettings(postType).forEach(element=>{if(!element)return;let clone=element.cloneNode(true);clone.type='hidden';clone.value=element.checked?element.value:'';clone.id+='-cloned';clone.classList.add(getCloneClassPT(postType));element.disabled=true;element.dataset.disabledWarning=1;const label=element.closest('label');label.insertAdjacentHTML('beforeend',postTypeHelpTemplate);label.append(clone);});tsfTT.triggerReset();}else{getPostTypeRobotsSettings(postType).forEach(element=>{if(!element)return;if(!element.dataset.disabledWarning)return;element.closest('label').querySelector('.tsf-post-type-warning').remove();document.querySelectorAll(`.${getCloneClassPT(postType)}`).forEach(clone=>{clone.remove()});element.disabled=false;element.dataset.disabledWarning='';});}}
document.body.addEventListener('tsf-post-type-support-changed',augmentPTRobots);const taxonomyHelpTemplate=wp.template('tsf-disabled-taxonomy-help')();const taxonomyPtHelpTemplate=wp.template('tsf-disabled-taxonomy-from-pt-help')();const getCloneClassTaxonomy=taxonomy=>tsf.escapeString(`tsf-disabled-taxonomy-input-clone-${taxonomy}`);const getTaxonomyRobotsSettings=taxonomy=>[document.getElementById(`${ _getSettingsId('noindex_taxonomies')}[${taxonomy}]`),document.getElementById(`${ _getSettingsId('nofollow_taxonomies')}[${taxonomy}]`),document.getElementById(`${ _getSettingsId('noarchive_taxonomies')}[${taxonomy}]`),].filter(el=>el);const augmentTaxonomyRobots=event=>{const{taxonomy,set,setPt,setAll}=event.detail;if(setAll.has(taxonomy)){getTaxonomyRobotsSettings(taxonomy).forEach(element=>{if(!element)return;let clone=element.cloneNode(true);clone.type='hidden';clone.value=element.checked?element.value:'';clone.id+='-cloned';clone.classList.add(getCloneClassTaxonomy(taxonomy));element.disabled=true;element.dataset.disabledWarning=1;const label=element.closest('label');if(!label.querySelector('.tsf-taxonomy-warning'))
label.insertAdjacentHTML('beforeend',taxonomyHelpTemplate);if(!label.querySelector(getCloneClassTaxonomy(taxonomy)))
label.append(clone);});tsfTT.triggerReset();}else{getTaxonomyRobotsSettings(taxonomy).forEach(element=>{if(!element)return;if(!element.dataset.disabledWarning)return;element.closest('label').querySelector('.tsf-taxonomy-warning')?.remove();document.querySelectorAll(`.${getCloneClassTaxonomy(taxonomy)}`).forEach(clone=>{clone.remove()});element.disabled=false;element.dataset.disabledWarning='';});}
const taxEl=document.getElementById(`${ _getSettingsId('disabled_taxonomies')}[${taxonomy}]`);if(setPt.has(taxonomy)){if(!taxEl.closest('label').querySelector('.tsf-taxonomy-from-pt-warning')){taxEl.closest('label').insertAdjacentHTML('beforeend',taxonomyPtHelpTemplate);tsfTT.triggerReset();}}else{taxEl.closest('label').querySelector('.tsf-taxonomy-from-pt-warning')?.remove();}}
document.body.addEventListener('tsf-taxonomy-support-changed',augmentTaxonomyRobots);}
const _initWebmastersInputs=()=>{const webmasterNodes=["google_verification","bing_verification","yandex_verification","baidu_verification","pint_verification",].map(name=>document.getElementById(_getSettingsId(name)));const trimScript=event=>{let val=event.clipboardData&&event.clipboardData.getData('text')||'';if(val){let match=/<meta[^>]+content=(\"|\')?([^\"\'>\s]+)\1?.*?>/i.exec(val);if(match?.[2]?.length){event.stopPropagation();event.preventDefault();event.target.value=match[2];tsfAys.registerChange();}}}
webmasterNodes.forEach(el=>el.addEventListener('paste',trimScript));}
const _loadSettings=()=>{_initGeneralSettings();_initTitleSettings();_initHomeTitleSettings();_initHomeDescriptionSettings();_initHomeSocialSettings();_initHomeGeneralListeners();_initPtaSettings();_initSocialSettings();_initRobotsInputs();_initRobotsSupport();_initWebmastersInputs();_initColorPicker();}
const _readySettings=()=>{}
const _initTabs=()=>{tsfTabs.initStack('tsfSettings',{tabToggledEvent:new CustomEvent('tsf-tab-toggled'),HTMLClasses:{wrapper:'tsf-nav-tab-wrapper',tabRadio:'tsf-nav-tab-radio',tabLabel:'tsf-nav-tab-label',activeTab:'tsf-nav-tab-active',activeTabContent:'tsf-nav-tab-content-active',},fixHistory:true,});}
return Object.assign({load:()=>{const headerEnd=document.querySelector('.wp-header-end');document.querySelectorAll('div.updated, div.error, div.notice, .notice-error, .notice-warning, .notice-info').forEach(el=>{headerEnd.insertAdjacentElement('afterend',el)});document.body.addEventListener('tsf-onload',_loadSettings);document.body.addEventListener('tsf-ready',_readySettings);_initTabs();}},{l10n});}(jQuery);window.tsfSettings.load();