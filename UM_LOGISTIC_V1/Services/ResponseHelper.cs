using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.Account;
using UM_LOGISTIC_V1.Models.CooperationApplication;
using UM_LOGISTIC_V1.Models.TransportationApplication;
using UM_LOGISTIC_V1.Models.User;
using UM_LOGISTIC_V1.Response.Account;
using UM_LOGISTIC_V1.Response.CooperationApplication;
using UM_LOGISTIC_V1.Response.TransportationApplication;
using UM_LOGISTIC_V1.Response.User;

namespace UM_LOGISTIC_V1.Services
{
    public static class ResponseHelper
    {
        public static void FillResponse(ref GetAccountResponse response, bool success, string error, Account account)
        {
            response.Success = success;
            response.Error = error;
            response.Result = account;
        }

        public static void FillResponse(ref CreateAccountResponse response, bool success, string error, Account account)
        {
            response.Success = success;
            response.Error = error;
            response.Result = account;
        }

        public static void FillResponse(ref UpdateAccountResponse response, bool success, string error, Account account)
        {
            response.Success = success;
            response.Error = error;
            response.Result = account;
        }

        public static void FillResponse(ref DeleteAccountResponse response, bool success, string error, Account account)
        {
            response.Success = success;
            response.Error = error;
            response.Result = account;
        }

        public static void FillResponse(ref GetAccountsByPageAndCountResponse response, bool success, string error, List<Account> account)
        {
            response.Success = success;
            response.Error = error;
            response.Result = account;
        }

        public static void FillResponse(ref RegisterAccountResponse response, bool success, string error, User user, string token)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
            response.Token = token;
        }

        public static void FillResponse(ref GetUserResponse response, bool success, string error, User user)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
        }

        public static void FillResponse(ref CreateCooperationApplicationResponse response, bool success, string error, long id)
        {
            response.Success = success;
            response.Error = error;
            response.Id = id;
        }

        public static void FillResponse(ref AuthenticateUserResponse response, bool success, string error, User user, string token)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
            response.Token = token;
        }

        public static void FillResponse(ref CreateUserResponse response, bool success, string error, User user)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
        }

        public static void FillResponse(ref UpdateUserResponse response, bool success, string error, User user)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
        }

        public static void FillResponse(ref DeleteUserResponse response, bool success, string error, User user)
        {
            response.Success = success;
            response.Error = error;
            response.Result = user;
        }

        public static void FillResponse(ref GetUsersByPageAndCountResponse response, bool success, string error, List<User> users)
        {
            response.Success = success;
            response.Error = error;
            response.Result = users;
        }

        public static void FillResponse(ref GetTransportationApplicationResponse response, bool success, string error, TransportationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref CreateTransportationApplicationResponse response, bool success, string error, long? id)
        {
            response.Success = success;
            response.Error = error;
            response.Id = id;
        }
        public static void FillResponse(ref UpdateTransportationApplicationResponse response, bool success, string error, TransportationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref DeleteTransportationApplicationResponse response, bool success, string error, TransportationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref GetTransportationApplicationsByPageAndCountResponse response, bool success, string error, List<TransportationApplication> applications)
        {
            response.Success = success;
            response.Error = error;
            response.Result = applications;
        }

        public static void FillResponse(ref GetCooperationApplicationResponse response, bool success, string error, CooperationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref CreateCooperationApplicationResponse response, bool success, string error, long? id)
        {
            response.Success = success;
            response.Error = error;
            response.Id = id;
        }

        public static void FillResponse(ref UpdateCooperationApplicationResponse response, bool success, string error, CooperationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref DeleteCooperationApplicationResponse response, bool success, string error, CooperationApplication application)
        {
            response.Success = success;
            response.Error = error;
            response.Result = application;
        }

        public static void FillResponse(ref GetCooperationApplicationsByPageAndCountResponse response, bool success, string error, List<CooperationApplication> applications)
        {
            response.Success = success;
            response.Error = error;
            response.Result = applications;
        }
    }
}