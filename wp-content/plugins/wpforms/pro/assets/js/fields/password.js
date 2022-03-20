'use strict';window.WPFormsPasswordField=window.WPFormsPasswordField||(function(document,window,$){var app={passwordStrength:function(value,element){var $strengthResult=$(element).parent().find('.wpforms-pass-strength-result');if(!$strengthResult.length){$strengthResult=$('<div class="wpforms-pass-strength-result"></div>');$strengthResult.css('max-width',$(element).css('max-width'));if(!$(element).parent().find('#'+$(element).attr('id')+'-error').length){$('<label id="'+$(element).attr('id')+'-error" class="wpforms-error" for="'+$(element).attr('id')+'"></label>').insertAfter($(element));}}
$strengthResult.removeClass('short bad good strong empty');if(!value||value.trim()===''){$strengthResult.addClass('empty').html('&nbsp;');$strengthResult.remove();return 0;}
var disallowedList=Object.prototype.hasOwnProperty.call(wp.passwordStrength,'userInputDisallowedList')?wp.passwordStrength.userInputDisallowedList():wp.passwordStrength.userInputBlacklist();var strength=wp.passwordStrength.meter(value,disallowedList,value);$strengthResult=app.updateStrengthResultEl($strengthResult,strength);$strengthResult.insertAfter($(element));return strength;},updateStrengthResultEl:function($strengthResult,strength){switch(strength){case-1:$strengthResult.addClass('bad').html(pwsL10n.unknown);break;case 2:$strengthResult.addClass('bad').html(pwsL10n.bad);break;case 3:$strengthResult.addClass('good').html(pwsL10n.good);break;case 4:$strengthResult.addClass('strong').html(pwsL10n.strong);break;default:$strengthResult.addClass('short').html(pwsL10n.short);}
return $strengthResult;},};return app;}(document,window,jQuery));