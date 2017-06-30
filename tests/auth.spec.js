var constants = require('../utils/constants');
var AuthService = require('../services/auth.so');
var authService = new AuthService();

describe('Portal and Client Authentication Testing', function() {
  describe('Portal Authentication Tests', function() {

    after('reseting ' + constants.auth.userFullName.DAISY + '\'s password', function() {
      authService.openPortal();
      authService.loginPortal(constants.auth.usernames.DAISY_DIALER,
        constants.auth.NEW_PASSWORD);
      authService.checkPortalLoginWasSuccessful();
      authService.openPortalUserSettings(constants.auth.userFullName.DAISY);
      authService.openUserUpdateScreen();
      authService.changeUserPassword(constants.auth.DEFAULT_PASSWORD);
      authService.navigateToPortalLogoutPage();
      authService.logoutOfPortal();
    });

    describe('Portal Authnetication Success Tests', function() {
      describe('Testing Login to Portal', function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should login to portal app as "' + constants.auth.usernames.TREVER_SMITH + '" with password "' + constants.auth.DEFAULT_PASSWORD + '"' , function() {
          authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
            constants.auth.DEFAULT_PASSWORD);
        });

        it('should check login was successful', function() {
          authService.checkPortalLoginWasSuccessful();
        });
      });

      describe('Testing Logout of Portal', function() {
        it('should navigate to the logout page', function() {
          authService.navigateToPortalLogoutPage();
        });

        it('should log out of portal', function() {
          authService.logoutOfPortal();
        });

        it('should check logout was successful', function() {
          authService.checkPortalLogoutWasSuccessful();
        });
      });
    });

    describe("Portal Authentication Failure Tests", function() {
      describe("Attempt to login to portal with wrong password", function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should try to login to portal app as username "' + constants.auth.usernames.TREVER_SMITH + '" with password "' + constants.auth.INVALID_PASSWORD + '"', function() {
          authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
            constants.auth.INVALID_PASSWORD);
        });

        it(constants.login.AUTH_FAIL_MSG + ' should be displayed', function() {
          authService.confirmUserAuthneticationError();
        });
      });

      describe("Attempt to login to portal with invalid user", function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should try to login to portal as username "' + constants.auth.usernames.INVALID_USER + '" with password "' + constants.auth.DEFAULT_PASSWORD + '"', function() {
          authService.loginPortal(constants.auth.usernames.INVALID_USER,
            constants.auth.DEFAULT_PASSWORD );
        });

        it(constants.login.AUTH_FAIL_MSG + ' should be displayed', function() {
          authService.confirmUserAuthneticationError();
        });
      });

      describe("Attempt login to portal without entering password", function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should try to login to portal as username "' + constants.auth.usernames.INVALID_USER + '" with no password', function() {
          authService.loginPortal(constants.auth.usernames.INVALID_USER, "");
        });

        it(constants.login.PASSWORD_MISSING_MSG + ' should be displayed', function() {
          authService.confirmPasswordMissingError();
        });
      });

      describe("Attempt login to portal without entering username", function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should try to login to portal without a username with password "' + constants.auth.DEFAULT_PASSWORD + '"', function() {
          authService.loginPortal("", constants.auth.DEFAULT_PASSWORD);
        });

        it(constants.login.USERNAME_MISSING_MSG + ' should be displayed', function() {
          authService.confirmUsernameMissingError();
        });
      });
    });

    describe("Change User Password Tests", function() {
      describe("Change user password", function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should login to portal app as "' + constants.auth.usernames.DAISY_DIALER + '" with password "' + constants.auth.DEFAULT_PASSWORD + '"' , function() {
          authService.loginPortal(constants.auth.usernames.DAISY_DIALER,
            constants.auth.DEFAULT_PASSWORD);
        });

        it('should check login was successful', function() {
          authService.checkPortalLoginWasSuccessful();
        });

        it('should open user settings page for ' + constants.auth.userFullName.DAISY, function() {
          authService.openPortalUserSettings(constants.auth.userFullName.DAISY);
        });

        it('should open user update screen for ' + constants.auth.userFullName.DAISY, function() {
          authService.openUserUpdateScreen();
        });

        it('should change the user password', function() {
          authService.changeUserPassword(constants.auth.NEW_PASSWORD);
        });

        it('should navigate to the logout page', function() {
          authService.navigateToPortalLogoutPage();
        });

        it('should log out of portal', function() {
          authService.logoutOfPortal();
        });
      });

      describe('login with new password', function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should login to portal app as "' + constants.auth.usernames.DAISY_DIALER + '" with password "' + constants.auth.NEW_PASSWORD + '"' , function() {
          authService.loginPortal(constants.auth.usernames.DAISY_DIALER,
            constants.auth.NEW_PASSWORD);
        });

        it('should check login was successful', function() {
          authService.checkPortalLoginWasSuccessful();
        });

        it('should navigate to the logout page', function() {
          authService.navigateToPortalLogoutPage();
        });

        it('should log out of portal', function() {
          authService.logoutOfPortal();
        });
      });

      describe('attempt to login with old password', function() {
        it('should open portal login page', function() {
          authService.openPortal();
        });

        it('should try to login to portal app as "' + constants.auth.usernames.DAISY_DIALER + '" with password "' + constants.auth.DEFAULT_PASSWORD + '"' , function() {
          authService.loginPortal(constants.auth.usernames.DAISY_DIALER,
            constants.auth.DEFAULT_PASSWORD);
        });

        it(constants.login.AUTH_FAIL_MSG + ' should be displayed', function() {
          authService.confirmUserAuthneticationError();
        });
      });
    });
  });

  // TODO - add authentication for client
  // describe('Client Authentication Tests', function() {
  //
  // });
});
