jQuery(document).ready(function($) {

	// The number of the next page to load (/page/x/)
	var pageNum = parseInt(pbd_alp.startPage) + 1;
	
	// The maximum number of pages the current query can return
	var max = parseInt(pbd_alp.maxPages);
	
	// The link of the next page of posts
	var nextLink = pbd_alp.nextLink;
	
	/**
	 * Replace the traditional navigation with our own,
	 * but only if there is at least one page of new posts to load.
	 */
	if(pageNum <= max) {
		// Insert the "More Posts" link
		
		$('#boxes-grid .wrap').append('<div class="more-posts-placeholder-'+ pageNum +'"></div>');
		$('#boxes-grid').append('<div class="load-more" id="load-more-posts"><a href="#">Load More Galleries</a></div>');
	}
	
	/**
	 * Load new posts when the link is clicked.
	 */
	$('#load-more-posts a').click(function() {
	
		// Are there more posts to load?
		if(pageNum <= max) {
		
			// Show that we're working.
			$(this).text('Loading Galleries...');
			
			$('.more-posts-placeholder-'+ pageNum).load(nextLink + ' .box',
				function() {
					// Update page number and nextLink.
					pageNum++;
					nextLink = nextLink.replace(/\/page\/[0-9]*/, '/page/'+ pageNum);
					
					// Add a new placeholder, for when user clicks again.
					$('#boxes-grid .wrap').append('<div class="more-posts-placeholder-'+ pageNum +'"></div><div class="clearfix"></div>')
					
					// Update the button message.
					if(pageNum <= max) {
						$('#load-more-posts a').text('Load More Galleries');
					} else {
						$('#load-more-posts a').text('No More Galleries To Load.');
					}
				}
			);
		} else {
			$('#load-more-posts a').append('.');
		}	
		
		return false;
	});
});