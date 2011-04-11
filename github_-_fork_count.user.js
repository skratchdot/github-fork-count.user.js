// ==UserScript==
// @name           Github - Fork Count
// @namespace      https://github.com/skratchdot/greasemonkey-github-fork-count
// @description    A GreaseMonkey script that displays the fork count on public Github repositories.
// @include        https://github.com/*
// ==/UserScript==

// Only works if Github is still using jQuery
if( typeof unsafeWindow.jQuery !== 'undefined' ) {

	// We can use the shorthand notation of jQuery
	var $ = unsafeWindow.jQuery;

	// Setup our repo/fork counts
	var repositoryPageNodes = $('div#main div.site ul.repositories > li.public'),
		repositoryPageRepoCount = repositoryPageNodes.length,
		repositoryPageForkCount = 0,
		repositoryPageForkedCount = 0;

	// Profile/Repository Page
	if( repositoryPageRepoCount > 0 ) {

		// Setup Fork Count
		repositoryPageNodes.each(function() {
			if( $(this).hasClass('fork') === true ) {
				repositoryPageForkCount++;
			}
			repositoryPageForkedCount += parseInt(
				$(this).find('ul.repo-stats li.forks a').text(),
				10
			);
		});

		// Display Fork Count
		$('div#main div.site ul.repositories').before(
			'<h4 style="margin-top:-10px;margin-bottom:10px;">' + 
			repositoryPageRepoCount + ' public repositories.  ' +
			repositoryPageForkCount + 
			(repositoryPageForkCount===1?' is a fork':' are forks') +
			'. Repos have been forked ' +
			repositoryPageForkedCount +
			(repositoryPageForkedCount===1?' time':' times') +
			'.</h4>'
		);

		// Display Fork Count (profile page - right column)
		$('div#main div.site div.columns div.last ul.stats li:first a:first').append(
			'<span style="margin-top:-5px;">' +
			repositoryPageForkCount + ' fork' +
			(repositoryPageForkCount===1?'':'s') +
			'</span>'
		);
		
	}

}