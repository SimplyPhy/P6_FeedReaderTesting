/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each have a non-empty URL', function() {
            var hasUrl = function() {
                var tf;

                /* Goes through allFeeds array, checking each index for
                 * its url property.  Returns true if it's there, and false
                 * if it isn't.
                 */
                allFeeds.forEach(function(index) {
                    if(!index.url) {
                        tf = false;
                        return tf;
                    } else {
                        tf = true;
                        return tf;
                    }
                });
                return tf;
            };

            expect(hasUrl()).toBe(true);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each have a non-empty name', function() {
            var hasUrl = function() {
                var tf;

                /* Same test as last spec, except checks for
                 * name properties this time.  This works because
                 * even if index.name === "", it will still return false.
                 */
                allFeeds.forEach(function(index) {
                    if(!index.name) {
                        tf = false;
                        return tf;
                    } else {
                        tf = true;
                        return tf;
                    }
                });
                return tf;
            };

            expect(hasUrl()).toBe(true);
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden at load', function(){

            /* Checks to see if body has the 'menu-hidden' class
             * or not, which is how this programs toggles the menu
             * to be hidden.
             */
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('opens/closes when menu icon is clicked', function() {

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var entryFeed;

        beforeEach(function(done) {

            /* Passes an index and callback as params to loadFeed,
             * then waits for the function to finish.  Once finished,
             * it sets entryFeed to the number of nodes with the class
             * 'entry' within the .feed container.  If this number is
             * above 0, then at least one was loaded.
             */
            loadFeed(1, function() {
                entryFeed = $('.feed').find('.entry').length;
                done();
            });
        });

        it('have at least one entry at load', function(done) {
            expect(entryFeed).toBeGreaterThan(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed1,
            feed2;

        beforeEach(function(done) {

            /* Again, each part of this test only runs after each loadFeed()
             * call has been completed.  First, loadFeed() is told to
             * load the first entry, and the resulting html of the .feed
             * container is stored in feed1.  Then, the feed that was
             * loaded into feed1 is replaced with a new feed, this time to
             * Apple Insider.  Variable feed2 then stores the resulting html
             * from that call.  Finally, we test whether or not feed1 and feed2
             * contain the same html, thus checking if the loading of a new feed
             * results in a change of content on the page.
             */
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

        it('actually changes when a new feed is retrieved', function(done) {
            expect(feed1).not.toEqual(feed2);
            done();
        });

    });
}());
