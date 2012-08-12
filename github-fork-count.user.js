// ==UserScript==
// @name           Github: Fork Count
// @namespace      https://github.com/skratchdot/github-fork-count.user.js
// @description    A user script to display repo counts (public, private, sources, forks, mirrors) where the "public" repo counts used to be.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @updateURL      https://github.com/skratchdot/github-fork-count.user.js/raw/master/github-fork-count.user.js
// @version        1.2
// ==/UserScript==
/*global jQuery */
/*jslint browser: true */

var userScript = function () {
	'use strict';

	jQuery(document).ready(function () {
		// Initial our variables (and jQuery selectors)
		var countRepos = 0,
			countPublic = 0,
			countPrivate = 0,
			countSources = 0,
			countForks = 0,
			countMirrors = 0,
			repoList = jQuery('ul.repo_list > li'),
			stats = jQuery('body.page-profile div.profilecols ul.stats');

		// Loop through all repos, looking for public forks
		repoList.each(function () {
			try {
				var elem = jQuery(this);
				countRepos = countRepos + 1;
				if (elem.hasClass('public')) {
					countPublic = countPublic + 1;
				}
				if (elem.hasClass('private')) {
					countPrivate = countPrivate + 1;
				}
				if (elem.hasClass('source')) {
					countSources = countSources + 1;
				}
				if (elem.hasClass('fork')) {
					countForks = countForks + 1;
				}
				if (elem.hasClass('mirror')) {
					countMirrors = countMirrors + 1;
				}
			} catch (e) {}
		});

		// Display Fork Count (profile page - right column)
		if (stats.length > 0) {
			stats.append('<li>' +
				'<strong>' + countRepos + '<span style="display:inline-block;font-weight:normal;">&nbsp;repos</span></strong>' +
				'<span>' + countPublic + ' public, ' +
				countPrivate + ' private</span>' +
				'<span style="margin:0">' + countSources + ' sources, ' +
				countForks + ' forks</span>' +
				(countMirrors > 0 ? '<span style="margin:0">' + countMirrors + ' mirrors</span>' : '') +
				'</li>');
		}
	});
};

// Inject our script onto the page
var script = document.createElement('script');
script.textContent = '(' + userScript.toString() + ')();';
document.body.appendChild(script);