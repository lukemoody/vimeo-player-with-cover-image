# Vimeo player with cover image

Pull Vimeo data via XMLHttpRequest to display cover thumbnail within div. Onclick, automatically generate iFrame player and auto play video. The benefit of this approach is to minimise page load times as the calls to Vimeo are only made when requested and not on page load.

* Vimeo API
* XML data

## HTML to access the data

Replace {vimeo_id} with dynamic variable to get the video ID

`<div class="player" data-embed="{vimeo_id}"><div class="play-button"></div></div>`
