'use strict';var WPFormsEntryPreview=window.WPFormsEntryPreview||(function(document,window,$){var app={init:function(){$(document).on('wpformsBeforePageChange',app.pageChange).on('wpformsEntryPreviewUpdated',function(e,$form,$entryPreviewField){$entryPreviewField.find('.wpforms-iframe').each(app.updateIframe);}).on('wpformsAjaxSubmitSuccessConfirmation',function(){$('.wpforms-container > .wpforms-entry-preview .wpforms-iframe').each(app.updateIframe);});$(window).on('load',function(){$('.wpforms-iframe').each(app.updateIframe);});},pageChange:function(event,currentPage,$form){if(!$(event.target).hasClass('wpforms-page-next')){return;}
wpforms.saveTinyMCE();app.update(currentPage,$form);},update:function(currentPage,$form){var $entryPreviewField=$form.find('.wpforms-page-'+currentPage+' .wpforms-field-entry-preview');if(!$entryPreviewField.length){return;}
var entryPreviewId=$entryPreviewField.data('field-id'),$fieldUpdatingMessage=$entryPreviewField.find('.wpforms-entry-preview-updating-message'),$fieldNotice=$entryPreviewField.find('.wpforms-entry-preview-notice'),$fieldWrapper=$entryPreviewField.find('.wpforms-entry-preview-wrapper'),formData=new FormData($form.get(0));formData.append('action','wpforms_get_entry_preview');formData.append('current_entry_preview_id',entryPreviewId);$.ajax({data:formData,type:'post',url:wpforms_settings.ajaxurl,dataType:'json',processData:false,contentType:false,beforeSend:function(){$entryPreviewField.addClass('wpforms-field-entry-preview-updating');$fieldNotice.hide();$fieldWrapper.hide();$fieldUpdatingMessage.show();},success:function(response){if(!response.data){$entryPreviewField.hide();return;}
$fieldWrapper.html(response.data);$entryPreviewField.show();},complete:function(){$entryPreviewField.removeClass('wpforms-field-entry-preview-updating');$fieldUpdatingMessage.hide();$fieldNotice.show();$fieldWrapper.show();$(document).trigger('wpformsEntryPreviewUpdated',[$form,$entryPreviewField]);},});},updateIframe:function(){var wrapper=this,iframe=document.createElement('iframe');iframe.onload=function(){app.iframeStyles(iframe);app.iframeBody(iframe,wrapper.innerHTML);app.iframeFullHeight(iframe);wrapper.remove();};wrapper.after(iframe);},iframeStyles:function(iframe){var doc=iframe.contentWindow.document,head=doc.querySelector('head'),style=doc.createElement('style'),font=$('body').css('font-family');style.setAttribute('type','text/css');style.innerHTML='body.mce-content-body {'+
'	margin: 0 !important;'+
'	background-color: transparent !important;'+
'	font-family: '+font+';'+
'}'+
'*:first-child {'+
'	margin-top: 0'+
'}'+
'*:last-child {'+
'	margin-bottom: 0'+
'}'+
'pre {'+
'	white-space: pre !important;'+
'	overflow-x: auto !important;'+
'}'+
'a,'+
'img {'+
'	display: inline-block;'+
'}';head.appendChild(style);if(!wpforms_settings.entry_preview_iframe_styles){return;}
wpforms_settings.entry_preview_iframe_styles.forEach(function(src){var link=doc.createElement('link');link.setAttribute('rel','stylesheet');link.setAttribute('href',src);link.onload=function(){app.iframeFullHeight(iframe);};head.appendChild(link);});},iframeBody:function(iframe,html){var doc=iframe.contentWindow.document,body=doc.querySelector('body'),wrapper=doc.createElement('div');wrapper.classList.add('wpforms-iframe-wrapper');body.append(wrapper);wrapper.innerHTML=html;body.classList.add('mce-content-body');body.querySelectorAll('a').forEach(function(el){el.setAttribute('rel','noopener');if(!el.hasAttribute('target')){el.setAttribute('target','_top');}});},iframeFullHeight:function(iframe){if(!iframe.contentWindow||!iframe.contentWindow.document){return;}
var doc=iframe.contentWindow.document,wrapper=doc.querySelector('.wpforms-iframe-wrapper');iframe.style.height=wrapper.scrollHeight+'px';},};return app;}(document,window,jQuery));WPFormsEntryPreview.init();