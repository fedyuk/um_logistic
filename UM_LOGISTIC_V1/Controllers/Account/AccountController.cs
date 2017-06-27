using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.Account;
using UM_LOGISTIC_V1.Response.Account;
using UM_LOGISTIC_V1.Security;
using UM_LOGISTIC_V1.Services;
using UM_LOGISTIC_V1.Models.Account;
using UM_LOGISTIC_V1.Models.User;
using UM_LOGISTIC_V1.Response.User;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace UM_LOGISTIC_V1.Controllers.Account
{
    public class AccountController : ApiController
    {
        private AccountService accountService = new AccountService();
        private UserService userService = new UserService();

        [Route("api/account")]
        [HttpGet]
        public IHttpActionResult GetAccount(long id, string token, string user)
        {
            var getAccountResponse = new GetAccountResponse();
            var IsValidToken = TokenService.ValidateToken(user, token);
            if (!IsValidToken)
            {
                ResponseHelper.FillResponse(ref getAccountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(getAccountResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var accountInfo = accountService.GetAccount(id);
                if (user != null)
                {
                    ResponseHelper.FillResponse(ref getAccountResponse, true, null, accountInfo);
                    return Ok(getAccountResponse);
                }
                else
                {
                    ResponseHelper.FillResponse(ref getAccountResponse, false, null, null);
                    return Ok(getAccountResponse);
                }
            }
            else
            {
                ResponseHelper.FillResponse(ref getAccountResponse, false, TextConstants.AccessDenied, null);
                return Ok(getAccountResponse);
            }
        }

        [Route("api/account/create")]
        [HttpPost]
        public IHttpActionResult CreateAccount([FromBody]CreateAccountRequest request)
        {
            var createAccountResponse = new CreateAccountResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref createAccountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(createAccountResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Create, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var accountToCreate = new UM_LOGISTIC_V1.Models.Account.Account()
                {
                    FullName = request.FullName,
                    HomePhone = request.HomePhone,
                    WorkPhone = request.WorkPhone,
                    Country = request.Country,
                    Region = request.Region,
                    City = request.City,
                    Street = request.Street
                };
                var isCreate = accountService.CreateAccount(accountToCreate);
                if (isCreate)
                {
                    ResponseHelper.FillResponse(ref createAccountResponse, true, null, null);
                    return Ok(createAccountResponse);
                }
                else
                {
                    ResponseHelper.FillResponse(ref createAccountResponse, false, null, null);
                    return Ok(createAccountResponse);
                }
            }
            else
            {
                ResponseHelper.FillResponse(ref createAccountResponse, false, TextConstants.AccessDenied, null);
                return Ok(createAccountResponse);
            }
        }

        [Route("api/account/update")]
        [HttpPost]
        public IHttpActionResult UpdateAccount([FromBody]UpdateAccountRequest request)
        {
            var updateAccountResponse = new UpdateAccountResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref updateAccountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(updateAccountResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Update, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var accountToUpdate = new UM_LOGISTIC_V1.Models.Account.Account()
                {
                    Id = request.Id,
                    FullName = request.FullName,
                    HomePhone = request.HomePhone,
                    WorkPhone = request.WorkPhone,
                    Country = request.Country,
                    Region = request.Region,
                    City = request.City,
                    Street = request.Street
                };
                var isUpdate = accountService.UpdateAccount(accountToUpdate);
                if (isUpdate)
                {
                    ResponseHelper.FillResponse(ref updateAccountResponse, true, null, null);
                    return Ok(updateAccountResponse);
                }
                else
                {
                    ResponseHelper.FillResponse(ref updateAccountResponse, false, null, null);
                    return Ok(updateAccountResponse);
                }
            }
            else
            {
                ResponseHelper.FillResponse(ref updateAccountResponse, false, TextConstants.AccessDenied, null);
                return Ok(updateAccountResponse);
            }
        }

        [Route("api/account/delete")]
        [HttpPost]
        public IHttpActionResult RemoveAccount([FromBody]RemoveAccountRequest request)
        {
            var deleteAccountResponse = new DeleteAccountResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref deleteAccountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(deleteAccountResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Remove, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var accountIdToDelete = request.Id;
                var isDeleted = accountService.RemoveAccount(accountIdToDelete);
                ResponseHelper.FillResponse(ref deleteAccountResponse, isDeleted ? true : false, null, null);
                return Ok(deleteAccountResponse);
            }
            else
            {
                ResponseHelper.FillResponse(ref deleteAccountResponse, false, TextConstants.AccessDenied, null);
                return Ok(deleteAccountResponse);
            }
        }

        [Route("api/accounts")]
        [HttpGet]
        public IHttpActionResult GetAccountsByPageAndCount(int page, int count, string token, string user)
        {
            var getAccountsByPageAndCountResponse = new GetAccountsByPageAndCountResponse();
            var isValidToken = TokenService.ValidateToken(user, token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref getAccountsByPageAndCountResponse, false, TextConstants.TokenNotValid, null);
                return Ok(getAccountsByPageAndCountResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var users = accountService.GetAccounts(page, count);
                if (users != null)
                {
                    ResponseHelper.FillResponse(ref getAccountsByPageAndCountResponse, true, null, users);
                    return Ok(getAccountsByPageAndCountResponse);
                }
                else
                {
                    ResponseHelper.FillResponse(ref getAccountsByPageAndCountResponse, true, null, users);
                    return Ok(getAccountsByPageAndCountResponse);
                }
            }
            else
            {
                ResponseHelper.FillResponse(ref getAccountsByPageAndCountResponse, false, TextConstants.AccessDenied, null);
                return Ok(getAccountsByPageAndCountResponse);
            }
        }

        [Route("api/account/register")]
        [HttpPost]
        public IHttpActionResult RegisterAccount([FromBody]RegisterAccountRequest request)
        {
            var response = new RegisterAccountResponse();
            var isEmailExist = accountService.IsEmailExist(request.Login);
            if(isEmailExist)
            {
                ResponseHelper.FillResponse(ref response, false, TextConstants.LoginAlreadyExists, null, null);
                return Ok(response);
            }
            var token = TokenService.GenerateToken(request.Login, response.Result != null ? response.Result.RoleId : 0);
            ResponseHelper.FillResponse(ref response, response.Result != null ? true : false, null, accountService.RegisterAccount(request), token);
            return Ok(response);
        }

        [Route("api/account/add")]
        [HttpPost]
        public IHttpActionResult AddUserAccount([FromBody]AddAccountAndLoginRequest request)
        {
            var response = new RegisterAccountResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                ResponseHelper.FillResponse(ref response, false, TextConstants.TokenNotValid, null, null);
                return Ok(response);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Create, tokenRole, Section.Accounts);
            if (isAccessedToResource)
            {
                var user = accountService.AddAccountUser(request);
                ResponseHelper.FillResponse(ref response, user != null ? true : false, null, user != null ? user : null, null);
                return Ok(response);
            }
            else
            {
                ResponseHelper.FillResponse(ref response, false, TextConstants.AccessDenied, null, null);
                return Ok(response);
            }
        }

        [Route("api/roles")]
        [HttpGet]
        public IHttpActionResult GetRoles()
        {
            var roles = accountService.GetRoles();
            return Ok(roles);

        }

        [Route("api/user/info")]
        [HttpGet]
        public IHttpActionResult GetUserInformation(long id)
        {
            var response = new GetUserResponse();
            var user = userService.GetUserInfo(id);
            if (user != null)
            {
                ResponseHelper.FillResponse(ref response, true, null, user);
                return Ok(response);
            }
            return NotFound();
        }

        [Route("api/u_pictures")]
        [HttpGet]
        public HttpResponseMessage GetPictureidlong(long id)
        {
            var image = String.Empty;
            var defaultImage = String.Empty;
            var tasks = new List<Task>();

            tasks.Add(Task.Factory.StartNew(() => image = userService.GetPicture(id)));
            tasks.Add(Task.Factory.StartNew(() => defaultImage = Images.GetDefaultImage("empty_customer")));
            Task.WaitAll(tasks.ToArray());

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            if (image == String.Empty || defaultImage == String.Empty)
            {
                return response;
            }
            var images = image == null ? defaultImage : image;
            var byteImage = Convert.FromBase64String(images);
                    
            MemoryStream ms = new MemoryStream(byteImage);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");
            return response;
        }

        [Route("api/update_user")]
        [HttpPut]
        public IHttpActionResult UpdateUserData([FromBody]User user)
        {
            var response = new UpdateUserResponse();
            if (user != null)
            {
                var updateUser = userService.UpdateUserInfo(user);
                if (updateUser)
                {
                    return Ok(response);
                }
            }
            return NotFound();
        }
    }
}