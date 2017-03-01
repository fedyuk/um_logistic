mainModule.service('SessionService', function ($cookieStore) {
    this.saveSessionToken = function (token, user) {
		var expiresDate = new Date();
		expiresDate.setDate(expiresDate.getDate() + 1);
        $cookieStore.put("token-session",token, {"expires": expiresDate});
		$cookieStore.put("user-session",user, {"expires": expiresDate});
    }
	
	this.removeSessionToken = function () {
        $cookieStore.remove("token-session");
    }
	
	this.removeSessionUser = function () {
        $cookieStore.remove("user-session");
    }
	
	this.isSessionValid = function () {
        var sessionToken = $cookieStore.get("token-session");
		return sessionToken != undefined ? true : false;
    }
	
	this.closeSession = function () {
        this.removeSessionToken();
		this.removeSessionUser();
		this.clearProfileData();
    }
	
	this.getSessionToken = function() {
		return $cookieStore.get("token-session");
	}
	
	this.getSessionUser = function() {
		return $cookieStore.get("user-session");
	}
	
	this.getSessionProfileName = function() {
		return $cookieStore.get("profile-name");
	}

	this.isStaff = function () {
	    return $cookieStore.get("profile-role") != undefined ? $cookieStore.get("profile-role") == "0" || $cookieStore.get("profile-role") == "1" : false;
	}
	
	this.saveProfileData = function(accountData) {
		var expiresDate = new Date();
		expiresDate.setDate(expiresDate.getDate() + 1);
		$cookieStore.put("profile-name", accountData.Account.FullName, { "expires": expiresDate });
		$cookieStore.put("profile-role", accountData.Role.Number, { "expires": expiresDate });
	}
	
	this.clearProfileData = function() {
	    $cookieStore.remove("profile-name");
	    $cookieStore.remove("profile-role");
	}
	
});