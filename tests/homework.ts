/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() allowed
 - copy/paste is allowed
 - prefer css selectors
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS to make assertions
 */

import { expect } from "chai";
import * as faker from "faker";

// Each implemented test gives you 15 points (max total - 45)
 describe("Items search", function() {

     beforeEach(function() {
      browser.url("");
    });
    
    it("should show results in case multiple items matches", function() {
      $('input[type="search"]').setValue("duck");
      browser.pause(1000);
      $('input[type="search"]').addValue("Enter");
      browser.pause(1000);
      const resultOfSearch = $$('#box-search-results [data-name]');
      const resultOfDuckSearch = $$('#box-search-results [data-name*="Duck"]');
      //Сheck that we found at least something
      expect(resultOfDuckSearch.length, "No one duck found").to.be.above(1);;
      //Check that we found only what contains the word "Duck"
      expect(resultOfSearch.length, "Some of the products do not contain the word 'Duck'").to.equal(resultOfDuckSearch.length);
    });
  
    it("should redirect to item page in case only one result matches", function() {
      $('input[type="search"]').setValue("Blue");
      browser.pause(1000);
      $('input[type="search"]').addValue("Enter");
      browser.pause(1000);
      const blueDuck = "Blue Duck";
      const resultOfBlueDuckSearch = $("#box-product .title").getText();
      expect(resultOfBlueDuckSearch, "Not found the " + blueDuck).to.equal("Blue Duck");
    });

    it("should redirect to 'no matching results' in case no items matched", function() {
      $('input[type="search"]').setValue("no_result");
      browser.pause(1000);
      $('input[type="search"]').addValue("Enter");
      browser.pause(1000);
      const searchingWithoutResult = $("#box-search-results > div > em").getText();
      expect(searchingWithoutResult, "The text 'No matching results' is absent.").to.equal("No matching results");
    });
  });

   // Each implemented test gives you 20 points (max total - 40)
  describe("Search results sorting", function() {

    beforeEach(function() {
      browser.url("");
    });

    it("correctly arranges items when using 'by price' sorting", function() {
      $('input[type="search"]').setValue("Duck");
      browser.pause(1000);
      $('input[type="search"]').addValue("Enter");
      browser.pause(1000);
      $('#box-search-results a[href*="sort=price"]').click();
      browser.pause(1000);
      const allDucks = $$("#box-search-results .product");
      const arrayDucksPrices = allDucks.map(duck => parseInt(duck.getAttribute("data-price")));
      const sortByPrice = arrayDucksPrices.map(duck => duck);
      sortByPrice.sort((a, b) => a - b);
      expect(arrayDucksPrices).to.deep.equal(sortByPrice);
    });
  
    it("correctly arranges items when using 'by name' sorting", function() {
      //throw new Error("NOT IMPLEMENTED");
    });
  });
 
  // BONUS LEVEL - this test gives you 15 points
  describe("Contact us form", function() {
    it("must send messages to shop administration", function() {
        browser.url('/customer-service-s-0');
        const email = faker.internet.email(
          undefined,
          undefined,
          "ip-5236.sunline.net.ua"
        );
        browser.pause(1000);
        $('input.form-control[name="name"]').setValue("CustomerName");
        $('form[name="contact_form"] input.form-control[name="email"]').setValue(email);
        $('input[name="subject"]').setValue("A new subject massage");
        $('textarea[name="message"]').setValue("Test message");
        $('button[name="send"]').click();
        browser.pause(1000);
        const sendConfirmationText = $("#notices .alert-success").getText();
        expect(sendConfirmationText).to.contain("Your email has successfully been sent");
    });
  });  