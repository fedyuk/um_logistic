mainModule.service('SessionService', function ($cookieStore) {
    this.saveSessionToken = function (token) {
        $cookieStore.put("token-session",token);
    }
	
	this.removeSessionToken = function () {
        $cookieStore.remove("token-session");
    }
	
	this.isSessionValid = function (token) {
        var sessionToken = $cookieStore.get("token-session");
		return sessionToken != undefined ? true : false;
    }
	
	this.closeSession = function () {
        this.removeSessionToken();
    }
	
});