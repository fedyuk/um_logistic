using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.TransportationApplication;
using UM_LOGISTIC_V1.Response.TransportationApplication;
using UM_LOGISTIC_V1.Security;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.TransportationController
{
    public class TransportationController : ApiController
    {
        private TransportationApplicationService applicationService = new TransportationApplicationService();

        [Route("api/transportation")]
        [HttpGet]
        public IHttpActionResult GetTransportationApplication(long id, string token, string user)
        {
            var getTransportationApplicationResponse = new GetTransportationApplicationResponse();
            var IsValidToken = TokenService.ValidateToken(user, token);
            if (!IsValidToken)
            {
                getTransportationApplicationResponse.Success = false;
                getTransportationApplicationResponse.Error = "Token is not valid";
                getTransportationApplicationResponse.Result = null;
                return Ok(getTransportationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.TransportationApplications);
            if (isAccessedToResource)
            {
                var applicationInfo = applicationService.GetTransportationApplication(id);
                if (user != null)
                {
                    getTransportationApplicationResponse.Success = true;
                    getTransportationApplicationResponse.Error = "";
                    getTransportationApplicationResponse.Result = applicationInfo;
                    return Ok(getTransportationApplicationResponse);
                }
                else
                {
                    getTransportationApplicationResponse.Success = false;
                    getTransportationApplicationResponse.Error = "";
                    getTransportationApplicationResponse.Result = null;
                    return Ok(getTransportationApplicationResponse);
                }
            }
            else
            {
                getTransportationApplicationResponse.Success = false;
                getTransportationApplicationResponse.Error = "Access is denied";
                getTransportationApplicationResponse.Result = null;
                return Ok(getTransportationApplicationResponse);
            }
        }

        [Route("api/transportation/create")]
        [HttpPost]
        public IHttpActionResult CreateTransportationApplication([FromBody]CreateTransportationApplicationRequest request)
        {
            var createTransportationApplicationResponse = new CreateTransportationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                createTransportationApplicationResponse.Success = false;
                createTransportationApplicationResponse.Error = "Token is not valid";
                createTransportationApplicationResponse.Result = null;
                return Ok(createTransportationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Create, tokenRole, Section.TransportationApplications);
            if (isAccessedToResource)
            {
                var applicationToCreate = new UM_LOGISTIC_V1.Models.TransportationApplication.TransportationApplication()
                {
                    Name = request.Name,
                    ContactPhone = request.ContactPhone,
                    SendAddress = request.SendAddress,
                    DeliveryAddress = request.DeliveryAddress,
                    CompleteDate = request.CompleteDate,
                    ShipmentType = request.ShipmentType,
                    ShipmentCapacity = request.ShipmentCapacity,
                    ShipmentHeight = request.ShipmentHeight,
                    ShipmentLength = request.ShipmentLength,
                    ShipmentWeight = request.ShipmentWeight,
                    ShipmentWidth = request.ShipmentWidth
                };
                var isCreate = applicationService.CreateTransportationApplication(applicationToCreate);
                if (isCreate)
                {
                    createTransportationApplicationResponse.Success = true;
                    createTransportationApplicationResponse.Error = "";
                    createTransportationApplicationResponse.Result = null;
                    return Ok(createTransportationApplicationResponse);
                }
                else
                {
                    createTransportationApplicationResponse.Success = false;
                    createTransportationApplicationResponse.Error = "";
                    createTransportationApplicationResponse.Result = null;
                    return Ok(createTransportationApplicationResponse);
                }
            }
            else
            {
                createTransportationApplicationResponse.Success = false;
                createTransportationApplicationResponse.Error = "Access is denied";
                createTransportationApplicationResponse.Result = null;
                return Ok(createTransportationApplicationResponse);
            }
        }

        [Route("api/Transportation/update")]
        [HttpPost]
        public IHttpActionResult UpdateTransportationApplication([FromBody]UpdateTransportationApplicationRequest request)
        {
            var updateTransportationApplicationResponse = new UpdateTransportationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                updateTransportationApplicationResponse.Success = false;
                updateTransportationApplicationResponse.Error = "Token is not valid";
                updateTransportationApplicationResponse.Result = null;
                return Ok(updateTransportationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Update, tokenRole, Section.TransportationApplications);
            if (isAccessedToResource)
            {
                var applicationToUpdate = new UM_LOGISTIC_V1.Models.TransportationApplication.TransportationApplication()
                {
                    Id = request.Id,
                    Name = request.Name,
                    ContactPhone = request.ContactPhone,
                    SendAddress = request.SendAddress,
                    DeliveryAddress = request.DeliveryAddress,
                    CompleteDate = request.CompleteDate,
                    ShipmentType = request.ShipmentType,
                    ShipmentCapacity = request.ShipmentCapacity,
                    ShipmentHeight = request.ShipmentHeight,
                    ShipmentLength = request.ShipmentLength,
                    ShipmentWeight = request.ShipmentWeight,
                    ShipmentWidth = request.ShipmentWidth
                };
                var isUpdate = applicationService.UpdateTransportationApplication(applicationToUpdate);
                if (isUpdate)
                {
                    updateTransportationApplicationResponse.Success = true;
                    updateTransportationApplicationResponse.Error = "";
                    updateTransportationApplicationResponse.Result = null;
                    return Ok(updateTransportationApplicationResponse);
                }
                else
                {
                    updateTransportationApplicationResponse.Success = false;
                    updateTransportationApplicationResponse.Error = "";
                    updateTransportationApplicationResponse.Result = null;
                    return Ok(updateTransportationApplicationResponse);
                }
            }
            else
            {
                updateTransportationApplicationResponse.Success = false;
                updateTransportationApplicationResponse.Error = "Access is denied";
                updateTransportationApplicationResponse.Result = null;
                return Ok(updateTransportationApplicationResponse);
            }
        }

        [Route("api/Transportation/delete")]
        [HttpPost]
        public IHttpActionResult RemoveTransportationApplication([FromBody]RemoveTransportationApplicationRequest request)
        {
            var deleteTransportationApplicationResponse = new DeleteTransportationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                deleteTransportationApplicationResponse.Success = false;
                deleteTransportationApplicationResponse.Error = "Token is not valid";
                deleteTransportationApplicationResponse.Result = null;
                return Ok(deleteTransportationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Remove, tokenRole, Section.TransportationApplications);
            if (isAccessedToResource)
            {
                var applicationIdToDelete = request.Id;
                var isDeleted = applicationService.RemoveTransportationApplication(applicationIdToDelete);
                if (isDeleted)
                {
                    deleteTransportationApplicationResponse.Success = true;
                    deleteTransportationApplicationResponse.Error = "";
                    deleteTransportationApplicationResponse.Result = null;
                    return Ok(deleteTransportationApplicationResponse);
                }
                else
                {
                    deleteTransportationApplicationResponse.Success = false;
                    deleteTransportationApplicationResponse.Error = "";
                    deleteTransportationApplicationResponse.Result = null;
                    return Ok(deleteTransportationApplicationResponse);
                }
            }
            else
            {
                deleteTransportationApplicationResponse.Success = false;
                deleteTransportationApplicationResponse.Error = "Access is denied";
                deleteTransportationApplicationResponse.Result = null;
                return Ok(deleteTransportationApplicationResponse);
            }
        }

        [Route("api/Transportations")]
        [HttpGet]
        public IHttpActionResult GetTransportationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            var getTransportationApplicationsByPageAndCountResponse = new GetTransportationApplicationsByPageAndCountResponse();
            var isValidToken = TokenService.ValidateToken(user, token);
            if (!isValidToken)
            {
                getTransportationApplicationsByPageAndCountResponse.Success = false;
                getTransportationApplicationsByPageAndCountResponse.Error = "Token is not valid";
                getTransportationApplicationsByPageAndCountResponse.Result = null;
                return Ok(getTransportationApplicationsByPageAndCountResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.TransportationApplications);
            if (isAccessedToResource)
            {
                var applications = applicationService.GetTransportationApplications(page, count);
                if (applications != null)
                {
                    getTransportationApplicationsByPageAndCountResponse.Success = true;
                    getTransportationApplicationsByPageAndCountResponse.Error = "";
                    getTransportationApplicationsByPageAndCountResponse.Result = applications;
                    return Ok(getTransportationApplicationsByPageAndCountResponse);
                }
                else
                {
                    getTransportationApplicationsByPageAndCountResponse.Success = false;
                    getTransportationApplicationsByPageAndCountResponse.Error = "";
                    getTransportationApplicationsByPageAndCountResponse.Result = null;
                    return Ok(getTransportationApplicationsByPageAndCountResponse);
                }
            }
            else
            {
                getTransportationApplicationsByPageAndCountResponse.Success = false;
                getTransportationApplicationsByPageAndCountResponse.Error = "Access is denied";
                getTransportationApplicationsByPageAndCountResponse.Result = null;
                return Ok(getTransportationApplicationsByPageAndCountResponse);
            }
        }
    }
}