var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var filePage = require('../pages/file/file.po');
var utils = require('../utils');
var fileCrudl = require('../services/file.so');

var constants = require('../utils/constants');
var AuthService = require('../services/auth.so');
var authService = new AuthService();

describe('Files E2E', function() {
  before('login to the portal app', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('FILES NAVIGATION', function() {
    it('should be able to navigate to the files section', function() {
      utils.ui.navigateToSection(filePage.locators.filesMenuButton);
      expect(filePage.locators.header.isPresent()).eventually.to.be.true;
      expect(filePage.locators.header.getText()).eventually.to.equal('Files');
      expect(filePage.locators.emptyContent.isPresent()).eventually.to.be.true;
    });
  });

  describe.skip('CREATE', function() {
    //TODO
    it('should be able to click on the create button', function() {
    });

    it('should be able to create a new file', function() {
    });

    it('should add and display the newly created file in the list', function() {
    });

    it('should be able to select and display the file details of the newly created file', function() {
    });
  });

  describe('LIST', function() {

    var fileListContainer = filePage.locators.fileListContainer;

    it('should display an empty list if no files are available', function() {
      utils.check.listSize(fileListContainer.all(by.xpath("./*")), 0);
    });

    it('should display a list of files available', function() {
      fileCrudl.create();
      authService.navigateToPortalLogoutPage();
      utils.ui.navigateToSection(filePage.locators.filesMenuButton);
      var fileListLength = fileListContainer.all(by.xpath("./*")).count();
      expect(fileListLength).eventually.to.be.above(0);
    });
  });

  describe('READ', function() {
    it('should display the file details once selected [PORTAL]', function() {
      expect(filePage.locators.emptyContent.isPresent()).eventually.to.be.true;
      filePage.commands.getFile(0).click();
      expect(filePage.locators.emptyContent.isPresent()).eventually.to.be.false;
      expect(filePage.locators.fileDetail.container.isPresent()).eventually.to.be.true;

      //Make sure all file details are correct
      var fileDetail = filePage.commands.getFileDetail();
      expect(filePage.locators.fileDetail.title.getText()).eventually.to.equal('photo.png');
      expect(fileDetail.name.getText()).eventually.to.equal('photo.png');
      expect(fileDetail.uid.getText()).eventually.not.to.equal('');
      expect(fileDetail.owner.getText()).eventually.to.equal('Trever Smith');
      expect(fileDetail.preview.isDisplayed()).eventually.to.be.true;
    });
  });

  describe('CANCEL', function() {
    it('should exit the file details when the close button is clicked', function() {
      utils.ui.navigateToSection(filePage.locators.filesMenuButton);
      filePage.commands.getFile(0).click();
      expect(filePage.locators.fileDetail.container.isPresent()).eventually.to.be.true;

      filePage.commands.closeFileDetail();
      expect(filePage.locators.fileDetail.container.isPresent()).eventually.to.be.false;
    });

    xit('should be able to cancel a file create operation', function() {
      //TODO
    });

    xit('should not have added a new file to the list when file creation is cancelled', function() {
      //TODO
    });
  });

  describe('SEARCH', function() {
    var fileListContainer = filePage.locators.fileListContainer;

    it('should have a search field visible', function() {
      expect(filePage.locators.searchBar.isPresent());
    });

    it('should be able to accept input', function() {
      expect(filePage.locators.searchBar.sendKeys('test'));
      expect(filePage.locators.searchBar.clear());
    });

    it('should be able to search for a file', function() {
      expect(filePage.locators.searchBar.sendKeys('photo'));
      utils.check.listSize(fileListContainer.all(by.xpath("./*")), 1);
      utils.check.valuesAreCorrect(fileListContainer.all(by.xpath("./*")), 'photo.png');
      expect(filePage.locators.searchBar.clear());
    });

    it('should return an empty list if file searched does not exist', function() {
      expect(filePage.locators.searchBar.sendKeys('testFile'));
      utils.check.listSize(fileListContainer.all(by.xpath("./*")), 0);
      expect(filePage.locators.searchBar.clear());
    });
  });

});