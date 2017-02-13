using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.CooperationApplication;
using UM_LOGISTIC_V1.Response.CooperationApplication;
using UM_LOGISTIC_V1.Security;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.CooperationController
{
    public class CooperationApplicationController : ApiController
    {
        private CooperationApplicationService applicationService = new CooperationApplicationService();

        [Route("api/cooperation")]
        [HttpGet]
        public IHttpActionResult GetCooperationApplication(long id, string token, string user)
        {
            var getCooperationApplicationResponse = new GetCooperationApplicationResponse();
            var IsValidToken = TokenService.ValidateToken(user, token);
            if (!IsValidToken)
            {
                getCooperationApplicationResponse.Success = false;
                getCooperationApplicationResponse.Error = "Token is not valid";
                getCooperationApplicationResponse.Result = null;
                return Ok(getCooperationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.CooperationApplications);
            if (isAccessedToResource)
            {
                var applicationInfo = applicationService.GetCooperationApplication(id);
                if (user != null)
                {
                    getCooperationApplicationResponse.Success = true;
                    getCooperationApplicationResponse.Error = "";
                    getCooperationApplicationResponse.Result = applicationInfo;
                    return Ok(getCooperationApplicationResponse);
                }
                else
                {
                    getCooperationApplicationResponse.Success = false;
                    getCooperationApplicationResponse.Error = "";
                    getCooperationApplicationResponse.Result = null;
                    return Ok(getCooperationApplicationResponse);
                }
            }
            else
            {
                getCooperationApplicationResponse.Success = false;
                getCooperationApplicationResponse.Error = "Access is denied";
                getCooperationApplicationResponse.Result = null;
                return Ok(getCooperationApplicationResponse);
            }
        }

        [Route("api/cooperation/create")]
        [HttpPost]
        public IHttpActionResult CreateCooperationApplication([FromBody]CreateCooperationApplicationRequest request)
        {
            var createCooperationApplicationResponse = new CreateCooperationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                createCooperationApplicationResponse.Success = false;
                createCooperationApplicationResponse.Error = "Token is not valid";
                createCooperationApplicationResponse.Result = null;
                return Ok(createCooperationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Create, tokenRole, Section.CooperationApplications);
            if (isAccessedToResource)
            {
                var applicationToCreate = new UM_LOGISTIC_V1.Models.CooperationApplication.CooperationApplication()
                {
                    FullName = request.FullName,
                    ResidenceAddress = request.ResidenceAddress,
                    ParkingPlace = request.ParkingPlace,
                    ContactPhone = request.ContactPhone,
                    IsPhysicalPerson = request.IsPhysicalPerson,
                    IsBussinessPerson = request.IsBussinessPerson,
                    CarModel = request.CarModel,
                    TransportArrow = request.TransportArrow,
                    TransportCapacity = request.TransportCapacity,
                    TransportHeight = request.TransportHeight,
                    TransportLength = request.TransportLength,
                    TransportWeight = request.TransportWeight,
                    TransportWidth = request.TransportWidth,
                    WorkCost = request.WorkCost,
                    WorkTypeId = request.WorkTypeId,
                    DeliveryCost = request.DeliveryCost
                };
                var isCreate = applicationService.CreateCooperationApplication(applicationToCreate);
                if (isCreate)
                {
                    createCooperationApplicationResponse.Success = true;
                    createCooperationApplicationResponse.Error = "";
                    createCooperationApplicationResponse.Result = null;
                    return Ok(createCooperationApplicationResponse);
                }
                else
                {
                    createCooperationApplicationResponse.Success = false;
                    createCooperationApplicationResponse.Error = "";
                    createCooperationApplicationResponse.Result = null;
                    return Ok(createCooperationApplicationResponse);
                }
            }
            else
            {
                createCooperationApplicationResponse.Success = false;
                createCooperationApplicationResponse.Error = "Access is denied";
                createCooperationApplicationResponse.Result = null;
                return Ok(createCooperationApplicationResponse);
            }
        }

        [Route("api/cooperation/update")]
        [HttpPost]
        public IHttpActionResult UpdateCooperationApplication([FromBody]UpdateCooperationApplicationRequest request)
        {
            var updateCooperationApplicationResponse = new UpdateCooperationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                updateCooperationApplicationResponse.Success = false;
                updateCooperationApplicationResponse.Error = "Token is not valid";
                updateCooperationApplicationResponse.Result = null;
                return Ok(updateCooperationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Update, tokenRole, Section.CooperationApplications);
            if (isAccessedToResource)
            {
                var applicationToUpdate = new UM_LOGISTIC_V1.Models.CooperationApplication.CooperationApplication()
                {
                    Id = request.Id,
                    FullName = request.FullName,
                    ResidenceAddress = request.ResidenceAddress,
                    ParkingPlace = request.ParkingPlace,
                    ContactPhone = request.ContactPhone,
                    IsPhysicalPerson = request.IsPhysicalPerson,
                    IsBussinessPerson = request.IsBussinessPerson,
                    CarModel = request.CarModel,
                    TransportArrow = request.TransportArrow,
                    TransportCapacity = request.TransportCapacity,
                    TransportHeight = request.TransportHeight,
                    TransportLength = request.TransportLength,
                    TransportWeight = request.TransportWeight,
                    TransportWidth = request.TransportWidth,
                    WorkCost = request.WorkCost,
                    WorkTypeId = request.WorkTypeId,
                    DeliveryCost = request.DeliveryCost
                };
                var isUpdate = applicationService.UpdateCooperationApplication(applicationToUpdate);
                if (isUpdate)
                {
                    updateCooperationApplicationResponse.Success = true;
                    updateCooperationApplicationResponse.Error = "";
                    updateCooperationApplicationResponse.Result = null;
                    return Ok(updateCooperationApplicationResponse);
                }
                else
                {
                    updateCooperationApplicationResponse.Success = false;
                    updateCooperationApplicationResponse.Error = "";
                    updateCooperationApplicationResponse.Result = null;
                    return Ok(updateCooperationApplicationResponse);
                }
            }
            else
            {
                updateCooperationApplicationResponse.Success = false;
                updateCooperationApplicationResponse.Error = "Access is denied";
                updateCooperationApplicationResponse.Result = null;
                return Ok(updateCooperationApplicationResponse);
            }
        }

        [Route("api/cooperation/delete")]
        [HttpPost]
        public IHttpActionResult RemoveCooperationApplication([FromBody]RemoveCooperationApplicationRequest request)
        {
            var deleteCooperationApplicationResponse = new DeleteCooperationApplicationResponse();
            var isValidToken = TokenService.ValidateToken(request.user, request.token);
            if (!isValidToken)
            {
                deleteCooperationApplicationResponse.Success = false;
                deleteCooperationApplicationResponse.Error = "Token is not valid";
                deleteCooperationApplicationResponse.Result = null;
                return Ok(deleteCooperationApplicationResponse);
            }
            var tokenRole = TokenService.GetRole(request.user, request.token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Remove, tokenRole, Section.CooperationApplications);
            if (isAccessedToResource)
            {
                var applicationIdToDelete = request.Id;
                var isDeleted = applicationService.RemoveCooperationApplication(applicationIdToDelete);
                if (isDeleted)
                {
                    deleteCooperationApplicationResponse.Success = true;
                    deleteCooperationApplicationResponse.Error = "";
                    deleteCooperationApplicationResponse.Result = null;
                    return Ok(deleteCooperationApplicationResponse);
                }
                else
                {
                    deleteCooperationApplicationResponse.Success = false;
                    deleteCooperationApplicationResponse.Error = "";
                    deleteCooperationApplicationResponse.Result = null;
                    return Ok(deleteCooperationApplicationResponse);
                }
            }
            else
            {
                deleteCooperationApplicationResponse.Success = false;
                deleteCooperationApplicationResponse.Error = "Access is denied";
                deleteCooperationApplicationResponse.Result = null;
                return Ok(deleteCooperationApplicationResponse);
            }
        }

        [Route("api/cooperations")]
        [HttpGet]
        public IHttpActionResult GetCooperationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            var getCooperationApplicationsByPageAndCountResponse = new GetCooperationApplicationsByPageAndCountResponse();
            var isValidToken = TokenService.ValidateToken(user, token);
            if (!isValidToken)
            {
                getCooperationApplicationsByPageAndCountResponse.Success = false;
                getCooperationApplicationsByPageAndCountResponse.Error = "Token is not valid";
                getCooperationApplicationsByPageAndCountResponse.Result = null;
                return Ok(getCooperationApplicationsByPageAndCountResponse);
            }
            var tokenRole = TokenService.GetRole(user, token);
            var isAccessedToResource = RoleApiManager.CheckAccess(Operation.Read, tokenRole, Section.CooperationApplications);
            if (isAccessedToResource)
            {
                var applications = applicationService.GetCooperationApplications(page, count);
                if (applications != null)
                {
                    getCooperationApplicationsByPageAndCountResponse.Success = true;
                    getCooperationApplicationsByPageAndCountResponse.Error = "";
                    getCooperationApplicationsByPageAndCountResponse.Result = applications;
                    return Ok(getCooperationApplicationsByPageAndCountResponse);
                }
                else
                {
                    getCooperationApplicationsByPageAndCountResponse.Success = false;
                    getCooperationApplicationsByPageAndCountResponse.Error = "";
                    getCooperationApplicationsByPageAndCountResponse.Result = null;
                    return Ok(getCooperationApplicationsByPageAndCountResponse);
                }
            }
            else
            {
                getCooperationApplicationsByPageAndCountResponse.Success = false;
                getCooperationApplicationsByPageAndCountResponse.Error = "Access is denied";
                getCooperationApplicationsByPageAndCountResponse.Result = null;
                return Ok(getCooperationApplicationsByPageAndCountResponse);
            }
        }

        [Route("api/appworktype")]
        [HttpGet]
        public IHttpActionResult GetApplicationWorkType()
        {
            var workTypes = applicationService.GetApplicationWorkTypes();
            return Ok(workTypes);

        }
    }
}