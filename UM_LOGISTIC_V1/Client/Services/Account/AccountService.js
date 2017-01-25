﻿mainModule.service('AccountService', function ($http) {
    this.getAccount = function (user, token, id) {
        return $http.get('/api/user?id=' + id + '&token=' + token + '&user=' + user);
    }
	
	this.createAccount = function (account) {
		return $http.post("/api/account/create/", account);
	}
	
	this.updateAccount = function (account) {
		return $http.post("/api/account/update/", account);
	}
	
	this.removeAccount = function (user, token, id) {
		var request = {
			Id: id,
			User: user,
			Token: token
		};
		return $http.post("/api/account/delete/", request);
	}
	
	this.getAccounts = function (user, token, page, count) {
        return $http.get('/api/accounts?page=' + page + '&count=' + count + '&token=' + token + "&user=" + user);
    }
});