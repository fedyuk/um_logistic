mainModule.service('SessionService', function ($cookieStore) {
    this.saveSessionToken = function (token, user) {
		var expiresDate = new Date();
		expiresDate.setDate(expireDate.getDate() + 1);
        $cookieStore.put("token-session",token, {"expires": expiresDate});
		$cookieStore.put("user-session",user, {"expires": expiresDate});
    }
	
	this.removeSessionToken = function () {
        $cookieStore.remove("token-session");
    }
	
	this.removeSessionUser = function () {
        $cookieStore.remove("user-session");
    }
	
	this.isSessionValid = function (token) {
        var sessionToken = $cookieStore.get("token-session");
		return sessionToken != undefined ? true : false;
    }
	
	this.closeSession = function () {
        this.removeSessionToken();
		this.removeSessionUser();
    }
	
	this.getSessionToken = function() {
		return $cookieStore.get("token-session");
	}
	
	this.getSessionUser = function() {
		return $cookieStore.get("user-session");
	}
	
});