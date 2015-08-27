(function($) {

    $.fn.inLarge = function(options) {

    	// Default settings
        var settings = $.extend({
            speed : 1000,
            autoplay : false,
	    	max_width : '100%',
	    	esc_close : true
        }, options);

        // Close on esc key
        if ( settings.esc_close == true ) {
			$(document).keyup(function(e) {
			     if (e.keyCode == 27) {
			        $('#inlarge-container').fadeOut(settings.speed);

		    		// Clear iframe src after fade out to stop videos
		    		setTimeout(function(){
		    			$('#inlarge-iframe').attr('src', '');
		    		}, settings.speed);
			    }
			});
		}

		// Add inLarge divs to body
        $('body').append('<div id="inlarge-container"><a id="inlarge-close" href="javascript:;">X</a><div id="inlarge-wrapper"><div id="inlarge-inside"></div></div></div>');

        return this.each( function() {

	    	var el_src = $(this).attr('src'); // Normal Image
	    	var el_large = $(this).attr('data-large'); // Large Image
	    	var el_mobile = $(this).attr('data-mobile'); // Mobile Image
	    	var el_iframe = $(this).attr('data-iframe'); // Iframe, YouTube, Vimeo

	    	// Open
	    	$(this).click(function(){

	    		var window_width = $(window).width(); // Check the window width

	    		$('#inlarge-container').fadeIn(settings.speed); // Fade in content

	    		if(el_iframe){ // Iframe, YouTube, Vimeo
	    			if(el_iframe.match( /(youtube|vimeo)/ )){
	    				$('#inlarge-inside').html('<iframe id="inlarge-iframe" src="'+el_iframe+'?rel=0'+(settings.autoplay ? "&autoplay=1" : "")+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		    		} else {
		    			$('#inlarge-inside').html('<iframe id="inlarge-iframe" src="'+el_iframe+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		    		}
	    		} else { // Image
	    			if(el_large && !el_mobile){ // Large, no mobile
		    			var large = el_large;
		    		} else if(el_large && el_mobile && window_width >= 768){ // Large and mobile, desktop size
		    			var large = el_large;
		    		} else if(el_mobile && window_width < 768) { // Large and mobile, mobile size
		    			var large = el_mobile;
		    		} else if(el_large && el_mobile && window_width < 768) { // Normal Mobile
		    			var large = el_mobile;
		    		} else { // Normal
		    			var large = el_src;
		    		}
		    		$('#inlarge-inside').html('<img id="inlarge-img" src="'+large+'" alt="" />');
		    	}

				// Max-width
		    	var max_width_str = settings.max_width.replace(/\D/g,'');
				if(max_width_str < window_width) {
					$('#inlarge-inside iframe, #inlarge-inside img').css('max-width', settings.max_width); // Max-width
				} else {
					$('#inlarge-inside iframe, #inlarge-inside img').css('max-width', '100%'); // Max-width
				}

		    	inLarge_dimensions();
	    		
	    	});

	    	// Close
	    	$('#inlarge-wrapper, #inlarge-close').click(function(){
	    		$('#inlarge-container').fadeOut(settings.speed);

	    		// Clear iframe src after fade out to stop videos
	    		setTimeout(function(){
	    			$('#inlarge-iframe').attr('src', '');
	    		}, settings.speed);
	    	});

        });

    }

    $(window).resize(function() {
		inLarge_dimensions();
	});

    function inLarge_dimensions() {
		window_h = $(window).height();
		window_w = $(window).width();
		iframe_h = $('#inlarge-iframe').outerWidth() * .5625;
		iframe_w = window_h * 1.7777;
		img_w = $('#inlarge-img').outerWidth();

		$('#inlarge-inside').css('height', window_h);
		$('#inlarge-iframe').css('height', iframe_h);

		if (iframe_h >= window_h) {
			$('#inlarge-iframe').css('width', iframe_w);
		} else {
			$('#inlarge-iframe').css('width', '100%');
		}

		if(img_w > window_w) {
			$('#inlarge-img').css('width', '100%');
		} else {
			$('#inlarge-img').css('width', 'auto');
		}
	}

}(jQuery));