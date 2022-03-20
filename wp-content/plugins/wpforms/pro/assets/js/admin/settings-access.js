'use strict';var WPFormsSettingsAccess=window.WPFormsSettingsAccess||(function(document,window,$){var app={capsCache:{},parentCaps:{'wpforms_edit_own_forms':['wpforms_view_own_forms',],'wpforms_edit_others_forms':['wpforms_view_others_forms',],'wpforms_delete_own_forms':['wpforms_view_own_forms',],'wpforms_delete_others_forms':['wpforms_view_others_forms',],'wpforms_view_entries_own_forms':['wpforms_view_own_forms',],'wpforms_view_entries_others_forms':['wpforms_view_others_forms',],'wpforms_edit_entries_own_forms':['wpforms_view_own_forms','wpforms_view_entries_own_forms',],'wpforms_edit_entries_others_forms':['wpforms_view_others_forms','wpforms_view_entries_others_forms',],'wpforms_delete_entries_own_forms':['wpforms_view_own_forms','wpforms_view_entries_own_forms',],'wpforms_delete_entries_others_forms':['wpforms_view_others_forms','wpforms_view_entries_others_forms',],},childCaps:{'wpforms_view_own_forms':['wpforms_edit_own_forms','wpforms_delete_own_forms','wpforms_view_entries_own_forms','wpforms_edit_entries_own_forms','wpforms_delete_entries_own_forms',],'wpforms_view_others_forms':['wpforms_edit_others_forms','wpforms_delete_others_forms','wpforms_view_entries_others_forms','wpforms_edit_entries_others_forms','wpforms_delete_entries_others_forms',],'wpforms_view_entries_own_forms':['wpforms_edit_entries_own_forms','wpforms_delete_entries_own_forms',],'wpforms_view_entries_others_forms':['wpforms_edit_entries_others_forms','wpforms_delete_entries_others_forms',],},init:function(){$(app.ready);},ready:function(){app.updateAllCapsCache();app.events();},events:function(){$('.wpforms-admin-settings-access select').change(app.selectChangeEvent);},selectChangeEvent:function(){var $select=$(this),cap,currentRoles,roleAdded,roleRemoved;if(!$select.length){return;}
cap=$select.data('cap');if(!cap){return;}
currentRoles=$select.val();roleAdded=_.difference(currentRoles,app.getCapCache(cap)).toString();roleRemoved=_.difference(app.getCapCache(cap),currentRoles).toString();app.updateCapCache($select);if(roleAdded.length){app.processRoleAdded(cap,roleAdded);}
if(roleRemoved.length){app.processRoleRemoved(cap,roleRemoved);}},processRoleAdded:function(cap,role){var caps=app.getParentCapsMissing(cap,role);if(!caps.length){return;}
app.displayModal({cap:cap,caps:caps,role:role,template:wpforms_settings_access.l10n.grant_caps,confirmAction:function(){app.populateRoles(caps,role);},cancelAction:function(){app.removeRoles([cap],role);},});},processRoleRemoved:function(cap,role){var caps=app.getChildCapsPresent(cap,role);if(!caps.length){return;}
app.displayModal({cap:cap,caps:caps,role:role,template:wpforms_settings_access.l10n.remove_caps,confirmAction:function(){app.removeRoles(caps,role);},cancelAction:function(){app.populateRoles([cap],role);},});},getCapLabel:function(cap){return wpforms_settings_access.labels.caps[cap]||cap;},getCapLabels:function(caps){if(typeof caps==='undefined'||!caps.length){return[];}
return caps.map(app.getCapLabel);},getRoleLabel:function(role){return wpforms_settings_access.labels.roles[role]||role;},getCapCache:function(cap){return app.capsCache[cap]||[];},updateCapCache:function($el,value){if(!$el.length){return;}
var cap=$el.data('cap');if(!cap){return;}
value=value||$el.val();app.capsCache[cap]=value;},updateAllCapsCache:function(){$('.wpforms-admin-settings-access select').each(function(){app.updateCapCache($(this));});},getParentCapsMissing:function(cap,role){var caps=app.parentCaps[cap];if(!caps){return[];}
return caps.filter(function(_cap){var val=$('#wpforms-setting-'+_cap).val();return val?val.indexOf(role)===-1:true;});},getChildCapsPresent:function(cap,role){var caps=app.childCaps[cap];if(!caps){return[];}
return caps.filter(function(_cap){var val=$('#wpforms-setting-'+_cap).val();return val?val.indexOf(role)!==-1:false;});},displayModal:function(args){var content=args.template.replace('%1$s','<b>'+app.getCapLabel(args.cap)+'</b>').replace(/%2\$s/g,'<b>'+app.getCapLabels(args.caps).join(', ')+'</b>').replace('%3$s','<i>'+app.getRoleLabel(args.role)+'</i>');$.alert({title:wpforms_admin.heads_up,content:content,icon:'fa fa-exclamation-circle',type:'orange',boxWidth:'500px',buttons:{confirm:{text:wpforms_admin.ok,btnClass:'btn-confirm',keys:['enter'],action:args.confirmAction,},cancel:{text:wpforms_admin.cancel,action:args.cancelAction,},},});},populateRoles:function(caps,role){caps.map(function(cap){var $el=$('#wpforms-setting-'+cap),choicejs;if(!$el.length){return true;}
choicejs=$el.data('choicesjs');if(!choicejs){return true;}
choicejs.setChoiceByValue(role);app.updateCapCache($el);});},removeRoles:function(caps,role){caps.map(function(cap){var $el=$('#wpforms-setting-'+cap),choicejs;if(!$el.length){return true;}
choicejs=$el.data('choicesjs');if(!choicejs){return true;}
choicejs.removeActiveItemsByValue(role);app.updateCapCache($el);});},};return app;}(document,window,jQuery));WPFormsSettingsAccess.init();