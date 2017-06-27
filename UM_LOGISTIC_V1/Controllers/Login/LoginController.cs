using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.User;
using UM_LOGISTIC_V1.Request.User;
using UM_LOGISTIC_V1.Response.User;
using UM_LOGISTIC_V1.Security;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.Login
{
    public class LoginController : ApiController
    {

        private UserService userService = new UserService();
        [Route("api/login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]AuthenticateUserRequest request)
        {
            var authenticateUserResponse = new AuthenticateUserResponse();
            var userToAuthenticate = new User()
            {
                UserName = request.UserName,
                UserPassword = request.UserPassword
            };
            var user = userService.AuthenticateUser(userToAuthenticate);
            if(user != null)
            {
                var token = TokenService.GenerateToken(request.UserName, user.RoleId);
                ResponseHelper.FillResponse(ref authenticateUserResponse, true, null, user, token);
                return Ok(authenticateUserResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref authenticateUserResponse, false, TextConstants.InvalidLoginOrPassword, null, null);
                return Ok(authenticateUserResponse);
            }
        }

        [Route("api/user")]
        [HttpGet]
        public IHttpActionResult GetUser(long id, string token, string user)
        {
            var getUserResponse = new GetUserResponse();
            var IsValidToken = TokenService.ValidateToken(user, token);
            if(!IsValidToken)
            {
                ResponseHelper.FillResponse(ref getUserResponse, false, TextConstants.TokenNotValid, null);
                return Ok(getUserResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.Users);
            if (isAccessedToResource)
            {
                var userInfo = userService.GetUser(id);
                if (user != null)
                {
                    ResponseHelper.FillResponse(ref getUserResponse, true, null, userInfo);
                    getUserResponse.Success = true;
                    getUserResponse.Result = userInfo;
                    return Ok(getUserResponse);
                }
                else
                {
                    ResponseHelper.FillResponse(ref getUserResponse, false, null, null);
                    return Ok(getUserResponse);
                }
            }
            else
            {
                ResponseHelper.FillResponse(ref getUserResponse, false, TextConstants.AccessDenied, null);
                return Ok(getUserResponse);
            }
        }

        [Route("api/user/create")]
        [HttpPost]
        public IHttpActionResult CreateUser([FromBody]CreateUserRequest request)
        {
            var createUserResponse = new CreateUserResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if(!isValidToken)
            {
                ResponseHelper.FillResponse(ref createUserResponse, false, TextConstants.TokenNotValid, null);
                return Ok(createUserResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Create, tokenRole, Section.Users);
            if (isAccessedToResource)
            {
                var userToCreate = new User()
                {
                    UserName = request.UserName,
                    UserPassword = request.UserPassword,
                    AccountId = request.AccountId,
                    RoleId = request.RoleId
                };
                var isCreate = userService.CreateUser(userToCreate);
                ResponseHelper.FillResponse(ref createUserResponse, isCreate, null, null);
                return Ok(createUserResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref createUserResponse, false, TextConstants.AccessDenied, null);
                return Ok(createUserResponse);
            }
        }

        [Route("api/user/update")]
        [HttpPost]
        public IHttpActionResult UpdateUser([FromBody]UpdateUserRequest request)
        {
            var updateUserResponse = new UpdateUserResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref updateUserResponse, false, TextConstants.TokenNotValid, null);
                return Ok(updateUserResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Update, tokenRole, Section.Users);
            if (isAccessedToResource)
            {
                var userToUpdate = new User()
                {
                    Id = request.Id,
                    UserName = request.UserName,
                    UserPassword = request.UserPassword,
                    AccountId = request.AccountId,
                    RoleId = request.RoleId
                };
                var isUpdated = userService.UpdateUser(userToUpdate);
                ResponseHelper.FillResponse(ref updateUserResponse, isUpdated, null, null);
                return Ok(updateUserResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref updateUserResponse, false, TextConstants.AccessDenied, null);
                return Ok(updateUserResponse);
            }
        }

        [Route("api/user/delete")]
        [HttpPost]
        public IHttpActionResult RemoveUser([FromBody]RemoveUserRequest request)
        {
            var deleteUserResponse = new DeleteUserResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref deleteUserResponse, false, TextConstants.TokenNotValid, null);
                return Ok(deleteUserResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Remove, tokenRole, Section.Users);
            if (isAccessedToResource)
            {
                var userIdToDelete = request.Id;
                var isDeleted = userService.RemoveUser(userIdToDelete);
                ResponseHelper.FillResponse(ref deleteUserResponse, isDeleted, null, null);
                return Ok(deleteUserResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref deleteUserResponse, false, TextConstants.AccessDenied, null);
                return Ok(deleteUserResponse);
            }
        }

        [Route("api/users")]
        [HttpGet]
        public IHttpActionResult GetUsersByPageAndCount(int page, int count, string token, string user)
        {
            var getUsersByPageAndCountResponse = new GetUsersByPageAndCountResponse();
            var isValidToken = TokenService.ValidateToken(user, token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref getUsersByPageAndCountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(getUsersByPageAndCountResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.Users);
            if (isAccessedToResource)
            {
                var users = userService.GetUsers(page, count);
                var success = users != null;
                ResponseHelper.FillResponse(ref getUsersByPageAndCountResponse, success, null, users);
                return Ok(getUsersByPageAndCountResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref getUsersByPageAndCountResponse, false, TextConstants.AccessDenied, null);
                return Ok(getUsersByPageAndCountResponse);
            }
        }
    }
}