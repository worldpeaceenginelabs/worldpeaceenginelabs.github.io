=== Smart User Slug Hider ===
Contributors: petersplugins
Tags: author, authors, user, users, url, link, security, secure, login, permalink, authorlink, author link, userlink, user link, authorpage, author page, classicpress
Requires at least: 4.0
Tested up to: 5.8
Stable tag: 4.0.1
Requires PHP: 5.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Hide usernames in Author Pages URLs to enhance Security

== Description ==

The [Smart User Slug Hider](https://petersplugins.com/free-wordpress-plugins/smart-user-slug-hider) Plugin hides usernames in Author Pages URLs to enhance Security

== Usage ==

The plugin automatically replaces user names with 16 digits coded strings. There are no settings. Just install and forget. Deactivating the Plugin restores the default WordPress behavior.

== Version 4.0.0 Update Notice ==

Previous versions of this plugin used a function that was removed in PHP 7.2. Version 2 of this plugin introduced a so called Future Proof Mode, that used a different encryption method to work with PHP 7.2 and newer.

In version 4.0.0 only this new method is available. The old method was completely removed. 

Unfortunately it is not possible to get the same result. This means that the coded User Slug changes if you haven't activated Future Proof Mode yet.

== Why use this plugin? ==

WordPress uses the pattern `example.com/author/name` for author page URLs where `name` represents the users login name. 

This means that the <strong>login names from all your users are publicly visible</strong> which is a serious security flaw. 

The Smart User Slug Hider Plugin changes all author page URLs from e.g. `example.com/author/john` to something like `example.com/author/e9e716def73f76ac`. 

The codes are generated automatically and its impossible to make conclusions about the user names. The WordPress default URLs will cause a 404 (not found) error. 

Also works for [BuddyPress](https://buddypress.org/) member pages.

As of version 4.0.0 also the author class from body tag is removed (see [this topic](https://wordpress.org/support/topic/author-still-in-source-code/))

== Shortcodes ==

The plugin adds three shortcodes you can use in your posts:

* `[smart_user_slug]` - the user slug of the post author - e.g. e9e716def73f76ac
* `[smart_user_url]` - the url of the post author's profile page - e.g. example.com/author/e9e716def73f76ac
* `[smart_user_link]` - adds a link to the post author's profile page

== Theme Functions ==

The plugin adds two functions that can be used in theme files:

* `get_smart_user_slug( $author_id )` to **get** the user slug for the author - the parameter $author_id is optional, if omitted the author`s ID of the current post is used
* `the_smart_user_slug( $author_id )` to **display** the user slug for the author - the parameter $author_id is optional, if omitted the author`s ID of the current post is used

== Support ==

[Support Forum](https://wordpress.org/support/plugin/smart-user-slug-hider).

== Video ==

[How to easily close a HUGE WordPress Security Gap using the free Plugin Smart User Slug Hider](https://youtu.be/g0CPog3M_Jg)

== Do you like this plugin? ==

I spend a lot of my precious spare time to develop and maintain my free WordPress plugins. You don’t need to make a donation. No money, no beer, no coffee. If you like this plugin then please do me a favor and [give it a good rating](https://wordpress.org/support/plugin/smart-user-slug-hider/reviews/). Thanks.

== Plugin Privacy Information ==

* This plugin does not set cookies
* This plugin does not collect or store any data
* This plugin does not send any data to external servers

[Peters' Plugins Privacy Information Page](https://petersplugins.com/plugin-privacy-information/)

== ClassicPress ==

This plugin is compatible with [ClassicPress](https://www.classicpress.net/).

= More plugins from Peter =

* **[404page](https://wordpress.org/plugins/404page/)** - Define any of your WordPress pages as 404 error page 
* **[hashtagger](https://wordpress.org/plugins/hashtagger/)** - Tag your posts by using #hashtags
* **[smart Custom Display Name](https://wordpress.org/plugins/smart-custom-display-name/)** - Set your Display Name to anything you like
* [See all](https://profiles.wordpress.org/petersplugins/#content-plugins)

== Stay up to date ==

[Follow me on Facebook](https://www.facebook.com/petersplugins/)
[YouTube Channel](https://www.youtube.com/channel/UCDnOjy99A7Oeq2dTWxqWEIA)

== Frequently Asked Questions ==

none so far

== Changelog ==

= 4.0.1 (2020-08-23) =
* minor UI adjustments

= 4.0.0 (2019-12-29) =
* remove user class from body tag ([See here](https://wordpress.org/support/topic/author-still-in-source-code/))
* always use Future Proof Mode, old method removed
* rewritten based on my Plugin Foundation PPF03

= 3 (2018-12-31) =
* Future Safe Mode renamed to Future Proof Mode
* automatically activate Future Proof Mode if mcrypt is not availabe
* code improvement
* UI improvements
* changed capability to manage_options to display admin page

= 2 (2018-03-14) =
* Future Safe Mode 

= 1.5 (2017-11-16) =
* faulty display in WP 4.9 fixed

= 1.4 (2017-07-15) =
* fix for BuddyExtender plugin

= 1.3 (2017-07-17) =
* BuddyPress compatibility 
* redesigned admin interface
* code improvement

= 1.2 (2016-10-04) =
* Shortcodes added
* Theme Functions added

= 1.1 (2016-06-30) =
* Code optimization
* Plugin info page added

= 1.0 (2014-10-02) =
* Initial Release

== Upgrade Notice ==

= 4.0.1 =
minor UI adjustments

= 4.0.0 =
always use Future Proof Mode, old method removed

= 3 =
prepared for PHP 7.2+ without mcrypt extension

= 2 =
Future Safe Mode

= 1.5 =
faulty display in WP 4.9 fixed

= 1.4 =
fix for BuddyExtender plugin

= 1.3 =
BuddyPress compatibility

= 1.2 =
Shortcodes and Theme Functions added

= 1.1 =
Code optimization, Plugin info page added, no functional changes