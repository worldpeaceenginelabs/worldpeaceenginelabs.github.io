/*!elementor-pro - v3.4.2 - 12-10-2021*/(self["webpackChunkelementor_pro"]=self["webpackChunkelementor_pro"]||[]).push([["table-of-contents"],{"../modules/table-of-contents/assets/js/frontend/handlers/table-of-contents.js":/*!*************************************************************************************!*\
!*** ../modules/table-of-contents/assets/js/frontend/handlers/table-of-contents.js ***!
\*************************************************************************************/((__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",({value:true}));exports.default=void 0;class TOCHandler extends elementorModules.frontend.handlers.Base{getDefaultSettings(){const elementSettings=this.getElementSettings(),listWrapperTag='numbers'===elementSettings.marker_view?'ol':'ul';return{selectors:{widgetContainer:'.elementor-widget-container',postContentContainer:'.elementor:not([data-elementor-type="header"]):not([data-elementor-type="footer"]):not([data-elementor-type="popup"])',expandButton:'.elementor-toc__toggle-button--expand',collapseButton:'.elementor-toc__toggle-button--collapse',body:'.elementor-toc__body',headerTitle:'.elementor-toc__header-title'},classes:{anchor:'elementor-menu-anchor',listWrapper:'elementor-toc__list-wrapper',listItem:'elementor-toc__list-item',listTextWrapper:'elementor-toc__list-item-text-wrapper',firstLevelListItem:'elementor-toc__top-level',listItemText:'elementor-toc__list-item-text',activeItem:'elementor-item-active',headingAnchor:'elementor-toc__heading-anchor',collapsed:'elementor-toc--collapsed'},listWrapperTag};}
getDefaultElements(){const settings=this.getSettings();return{$pageContainer:this.getContainer(),$widgetContainer:this.$element.find(settings.selectors.widgetContainer),$expandButton:this.$element.find(settings.selectors.expandButton),$collapseButton:this.$element.find(settings.selectors.collapseButton),$tocBody:this.$element.find(settings.selectors.body),$listItems:this.$element.find('.'+settings.classes.listItem)};}
getContainer(){const settings=this.getSettings(),elementSettings=this.getElementSettings();if(elementSettings.container){return jQuery(elementSettings.container);}
const $documentWrapper=this.$element.parents('.elementor');if('popup'===$documentWrapper.attr('data-elementor-type')){return $documentWrapper;}
return jQuery(settings.selectors.postContentContainer);}
bindEvents(){const elementSettings=this.getElementSettings();if(elementSettings.minimize_box){this.elements.$expandButton.on('click',()=>this.expandBox());this.elements.$collapseButton.on('click',()=>this.collapseBox());}
if(elementSettings.collapse_subitems){this.elements.$listItems.on('hover',event=>jQuery(event.target).slideToggle());}}
getHeadings(){const elementSettings=this.getElementSettings(),tags=elementSettings.headings_by_tags.join(','),selectors=this.getSettings('selectors'),excludedSelectors=elementSettings.exclude_headings_by_selector;return this.elements.$pageContainer.find(tags).not(selectors.headerTitle).filter((index,heading)=>{return!jQuery(heading).closest(excludedSelectors).length;});}
addAnchorsBeforeHeadings(){const classes=this.getSettings('classes');this.elements.$headings.before(index=>{if(jQuery(this.elements.$headings[index]).data('hasOwnID')){return;}
return `<span id="${classes.headingAnchor}-${index}" class="${classes.anchor} "></span>`;});}
activateItem($listItem){const classes=this.getSettings('classes');this.deactivateActiveItem($listItem);$listItem.addClass(classes.activeItem);this.$activeItem=$listItem;if(!this.getElementSettings('collapse_subitems')){return;}
let $activeList;if($listItem.hasClass(classes.firstLevelListItem)){$activeList=$listItem.parent().next();}else{$activeList=$listItem.parents('.'+classes.listWrapper).eq(-2);}
if(!$activeList.length){delete this.$activeList;return;}
this.$activeList=$activeList;this.$activeList.stop().slideDown();}
deactivateActiveItem($activeToBe){if(!this.$activeItem||this.$activeItem.is($activeToBe)){return;}
const{classes}=this.getSettings();this.$activeItem.removeClass(classes.activeItem);if(this.$activeList&&(!$activeToBe||!this.$activeList[0].contains($activeToBe[0]))){this.$activeList.slideUp();}}
followAnchor($element,index){const anchorSelector=$element[0].hash;let $anchor;try{$anchor=jQuery(decodeURIComponent(anchorSelector));}catch(e){return;}
elementorFrontend.waypoint($anchor,direction=>{if(this.itemClicked){return;}
const id=$anchor.attr('id');if('down'===direction){this.viewportItems[id]=true;this.activateItem($element);}else{delete this.viewportItems[id];this.activateItem(this.$listItemTexts.eq(index-1));}},{offset:'bottom-in-view',triggerOnce:false});elementorFrontend.waypoint($anchor,direction=>{if(this.itemClicked){return;}
const id=$anchor.attr('id');if('down'===direction){delete this.viewportItems[id];if(Object.keys(this.viewportItems).length){this.activateItem(this.$listItemTexts.eq(index+1));}}else{this.viewportItems[id]=true;this.activateItem($element);}},{offset:0,triggerOnce:false});}
followAnchors(){this.$listItemTexts.each((index,element)=>this.followAnchor(jQuery(element),index));}
populateTOC(){this.listItemPointer=0;const elementSettings=this.getElementSettings();if(elementSettings.hierarchical_view){this.createNestedList();}else{this.createFlatList();}
this.$listItemTexts=this.$element.find('.elementor-toc__list-item-text');this.$listItemTexts.on('click',this.onListItemClick.bind(this));if(!elementorFrontend.isEditMode()){this.followAnchors();}}
createNestedList(){this.headingsData.forEach((heading,index)=>{heading.level=0;for(let i=index-1;i>=0;i--){const currentOrderedItem=this.headingsData[i];if(currentOrderedItem.tag<=heading.tag){heading.level=currentOrderedItem.level;if(currentOrderedItem.tag<heading.tag){heading.level++;}
break;}}});this.elements.$tocBody.html(this.getNestedLevel(0));}
createFlatList(){this.elements.$tocBody.html(this.getNestedLevel());}
getNestedLevel(level){const settings=this.getSettings(),elementSettings=this.getElementSettings(),icon=this.getElementSettings('icon');let renderedIcon;if(icon){if(elementorFrontend.config.experimentalFeatures.e_font_icon_svg&&!elementorFrontend.isEditMode()){renderedIcon=icon.rendered_tag;}else{renderedIcon=`<i class="${icon.value}"></i>`;}}
let html=`<${settings.listWrapperTag} class="${settings.classes.listWrapper}">`;while(this.listItemPointer<this.headingsData.length){const currentItem=this.headingsData[this.listItemPointer];let listItemTextClasses=settings.classes.listItemText;if(0===currentItem.level){listItemTextClasses+=' '+settings.classes.firstLevelListItem;}
if(level>currentItem.level){break;}
if(level===currentItem.level){html+=`<li class="${settings.classes.listItem}">`;html+=`<div class="${settings.classes.listTextWrapper}">`;let liContent=`<a href="#${currentItem.anchorLink}" class="${listItemTextClasses}">${currentItem.text}</a>`;if('bullets'===elementSettings.marker_view&&icon){liContent=`${renderedIcon}${liContent}`;}
html+=liContent;html+='</div>';this.listItemPointer++;const nextItem=this.headingsData[this.listItemPointer];if(nextItem&&level<nextItem.level){html+=this.getNestedLevel(nextItem.level);}
html+='</li>';}}
html+=`</${settings.listWrapperTag}>`;return html;}
handleNoHeadingsFound(){let noHeadingsText=elementorProFrontend.config.i18n.toc_no_headings_found;if(elementorFrontend.isEditMode()){noHeadingsText=elementorPro.translate('toc_no_headings_found');}
return this.elements.$tocBody.html(noHeadingsText);}
collapseOnInit(){const minimizedOn=this.getElementSettings('minimized_on'),currentDeviceMode=elementorFrontend.getCurrentDeviceMode();if('tablet'===minimizedOn&&'desktop'!==currentDeviceMode||'mobile'===minimizedOn&&'mobile'===currentDeviceMode){this.collapseBox();}}
getHeadingAnchorLink(index,classes){const headingID=this.elements.$headings[index].id,wrapperID=this.elements.$headings[index].closest('.elementor-widget').id;let anchorLink='';if(headingID){anchorLink=headingID;}else if(wrapperID){anchorLink=wrapperID;}
if(headingID||wrapperID){jQuery(this.elements.$headings[index]).data('hasOwnID',true);}else{anchorLink=`${classes.headingAnchor}-${index}`;}
return anchorLink;}
setHeadingsData(){this.headingsData=[];const classes=this.getSettings('classes');this.elements.$headings.each((index,element)=>{const anchorLink=this.getHeadingAnchorLink(index,classes);this.headingsData.push({tag:+element.nodeName.slice(1),text:element.textContent,anchorLink});});}
run(){this.elements.$headings=this.getHeadings();if(!this.elements.$headings.length){return this.handleNoHeadingsFound();}
this.setHeadingsData();if(!elementorFrontend.isEditMode()){this.addAnchorsBeforeHeadings();}
this.populateTOC();if(this.getElementSettings('minimize_box')){this.collapseOnInit();}}
expandBox(){const boxHeight=this.getCurrentDeviceSetting('min_height');this.$element.removeClass(this.getSettings('classes.collapsed'));this.elements.$tocBody.slideDown();this.elements.$widgetContainer.css('min-height',boxHeight.size+boxHeight.unit);}
collapseBox(){this.$element.addClass(this.getSettings('classes.collapsed'));this.elements.$tocBody.slideUp();this.elements.$widgetContainer.css('min-height','0px');}
onInit(...args){super.onInit(...args);this.viewportItems=[];jQuery(()=>this.run());}
onListItemClick(event){this.itemClicked=true;setTimeout(()=>this.itemClicked=false,2000);const $clickedItem=jQuery(event.target),$list=$clickedItem.parent().next(),collapseNestedList=this.getElementSettings('collapse_subitems');let listIsActive;if(collapseNestedList&&$clickedItem.hasClass(this.getSettings('classes.firstLevelListItem'))){if($list.is(':visible')){listIsActive=true;}}
this.activateItem($clickedItem);if(collapseNestedList&&listIsActive){$list.slideUp();}}}
exports.default=TOCHandler;})}]);