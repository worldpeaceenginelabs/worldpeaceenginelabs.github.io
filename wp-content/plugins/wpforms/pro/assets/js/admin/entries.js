'use strict';var WPFormsPagesEntries=window.WPFormsPagesEntries||(function(document,window,$){var app={init:function(){$(app.ready);},ready:function(){app.initFlatpickr();app.bindResetButtons();},initFlatpickr:function(){var flatpickrLocale={rangeSeparator:' - ',},args={altInput:true,altFormat:'M j, Y',dateFormat:'Y-m-d',mode:'range',defaultDate:wpforms_admin.default_date,};if(flatpickr!=='undefined'&&Object.prototype.hasOwnProperty.call(flatpickr,'l10ns')&&Object.prototype.hasOwnProperty.call(flatpickr.l10ns,wpforms_admin.lang_code)){flatpickrLocale=flatpickr.l10ns[wpforms_admin.lang_code];flatpickrLocale.rangeSeparator=' - ';}
args.locale=flatpickrLocale;$('.wpforms-filter-date-selector').flatpickr(args);},reset:function($input){switch($input.prop('tagName').toLowerCase()){case 'input':$input.val('');break;case 'select':$input.val($input.find('option').first().val());break;}},isIgnoredForReset:function($input){return['submit','hidden'].indexOf(($input.attr('type')||'').toLowerCase())!==-1&&!$input.hasClass('flatpickr-input');},bindResetButtons:function(){$('#wpforms-reset-filter .reset').on('click',function(){var $form=$(this).parents('form');$form.find($(this).data('scope')).find('input,select').each(function(){var $this=$(this);if(app.isIgnoredForReset($this)){return;}
app.reset($this);});$form.submit();});},};return app;}(document,window,jQuery));WPFormsPagesEntries.init();