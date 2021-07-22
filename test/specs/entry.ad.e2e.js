const expectChai = require('chai').expect;

describe('Entry Ad Tests', () => {

    beforeEach(() => {
        console.log('loading the home page');
        browser.url('/');
    })

    it('should display the popup on the first pageload', () => {
        browser.url('/');
        console.debug('resetting the ad state to be able to trigger it on the next page load.')
        browser.execute(() => {
            $.post('/entry-ad');
        });

        browser.url('/entry_ad');

        expect($('#modal')).toBeDisplayed();
        console.info('Test 1 completed.')
    });

    it('should not display the popup on subsequent pageloads', () => {
        console.info('Test 2 begins...');
        browser.url('/entry_ad');

        // wait for the page to load. we don't care if the modal is there or not the first time.
        browser.waitUntil(() => {
            var isExampleDisplayed = $('.example').isDisplayed();
            var isModalDisplayed = $('#modal').isDisplayed();
            console.log('isModalDisplayed = ' + isModalDisplayed);
            console.log('isExampleDisplayed = ' + isExampleDisplayed);
            return isExampleDisplayed || isModalDisplayed;
        });

        browser.url('/entry_ad');
        expect($('#modal')).toExist();

        expectChai($('#modal').isDisplayed()).to.be.false;
        console.info('Test 2 ends...');
    })

});