/* feedreader.js
 *
 * Created by Eric Phy
 *
 */
$(function() {

    /* Goes through allFeeds array, checking each index for
     * its url property.  If it's always defined and !== "",
     * the test passes.
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each have a non-empty URL', function() {
            var hasUrl = function() {
                var url;

                allFeeds.forEach(function(index) {
                    url = index.url;
                });
                return url;
            };
            expect(hasUrl()).toBeDefined(true);
            expect(hasUrl()).not.toBe("");
        });

        /* Same test as last spec, except checks for
         * name properties this time.
         */
        it('each have a non-empty name', function() {
            var hasName = function() {
                var name;

                allFeeds.forEach(function(index) {
                    name = index.url;
                });
                return name;
            };
            expect(hasName()).toBeDefined(true);
            expect(hasName()).not.toBe("");
        });
    });

    /* Checks to see if body has the 'menu-hidden' class
     * or not, which is how this programs toggles the menu
     * to be hidden.
     */
    describe('The menu', function() {

        it('is hidden at load', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('opens/closes when menu icon is clicked', function() {

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Passes an index and callback as params to loadFeed,
     * then waits for the function to finish.  Once finished,
     * it sets entryFeed to the number of nodes with the class
     * 'entry' within the .feed container.  If this number is
     * above 0, then at least one was loaded.
     */
    describe('Initial Entries', function() {

        var entryFeed;

        beforeEach(function(done) {
            loadFeed(1, function() {
                entryFeed = $('.feed .entry').length;
                done();
            });
        });

        it('have at least one entry at load', function() {
            expect(entryFeed).toBeGreaterThan(0);
        });
    });

    /* Again, each part of this test only runs after each loadFeed()
     * call has been completed.  First, loadFeed() is told to
     * load the first entry, and the resulting html of the .feed
     * container is stored in feed1.  Then, the feed that was
     * loaded into feed1 is replaced with a new feed, this time to
     * Apple Insider.  Variable feed2 then stores the resulting html
     * from that call.  Finally, we test whether or not feed1 and feed2
     * contain the same html, thus checking if the loading of a new feed
     * results in a change of content on the
     */
    describe('New Feed Selection', function(){

        var feed1,
            feed2;

        beforeEach(function(done) {
            loadFeed(1, function() {
                feed1 = $('.feed').html();
                done();
            });
        });

        beforeEach(function(done) {
            allFeeds[1] = {
                name:'Apple Insider',
                url: 'http://appleinsider.com/appleinsider.rss'
            };
            loadFeed(1, function() {
                feed2 = $('.feed').html();
                done();
            });
        });

        it('actually changes when a new feed is retrieved', function() {
            expect(feed1).not.toEqual(feed2);
        });

    });
}());
