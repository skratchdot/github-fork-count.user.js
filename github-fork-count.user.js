// ==UserScript==
// @name           Github Fork Count
// @namespace      https://github.com/skratchdot/github-fork-count.user.js
// @description    A user script to display the fork count underneath the "public" repo count on a user's main GitHub page.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @updateURL      https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @version        1.0
// ==/UserScript==
/*global jQuery */
/*jslint browser: true */

var main = function () {
	'use strict';

	jQuery(document).ready(function () {
		// Initial our variables (and jQuery selectors)
		var forkCount = 0,
			repoList = jQuery('ul.repo_list li'),
			publicRepos = jQuery('div.site div.columns div.last ul.stats li:first a:first');

		// Loop through all repos, looking for public forks
		repoList.each(function () {
			try {
				var elem = jQuery(this);
				if (elem.hasClass('public') && elem.hasClass('fork')) {
					forkCount = forkCount + 1;
				}
			} catch (e) {}
		});

		// Display Fork Count (profile page - right column)
		if (publicRepos.length > 0) {
			publicRepos.append('<span style="margin-top:-2px;">' +
				forkCount + ' fork' +
				(forkCount === 1 ? '' : 's') +
				'</span>'
				);
		}
	});
};

// Inject our main script
var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);