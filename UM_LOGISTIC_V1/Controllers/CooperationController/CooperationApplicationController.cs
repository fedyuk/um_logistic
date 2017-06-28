using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.ApiModels.Filter;
using UM_LOGISTIC_V1.Models.CooperationApplication;
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
        public virtual IHttpActionResult GetCooperationApplication(long id, string token, string user)
        {
            var getCooperationApplicationResponse = new GetCooperationApplicationResponse();

            var applicationInfo = applicationService.GetCooperationApplication(id);
            var success = user != null;
            ResponseHelper.FillResponse(ref getCooperationApplicationResponse, success, null, success ? applicationInfo : null);
            return Ok(getCooperationApplicationResponse);
        }

        [Route("api/cooperation/create")]
        [HttpPost]
        public virtual IHttpActionResult CreateCooperationApplication([FromBody]CreateCooperationApplicationRequest request)
        {
            var createCooperationApplicationResponse = new CreateCooperationApplicationResponse();
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
                DeliveryCost = request.DeliveryCost,
                CreatedBy = request.CreatedBy
            };
            var id = applicationService.CreateCooperationApplication(applicationToCreate);
            var success = id != null;
            ResponseHelper.FillResponse(ref createCooperationApplicationResponse, success, null, success ? id : null);
            return Ok(createCooperationApplicationResponse);

        }

        [Route("api/cooperation/update")]
        [HttpPost]
        public virtual IHttpActionResult UpdateCooperationApplication([FromBody]UpdateCooperationApplicationRequest request)
        {
            var updateCooperationApplicationResponse = new UpdateCooperationApplicationResponse();
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
            ResponseHelper.FillResponse(ref updateCooperationApplicationResponse, isUpdate, null, null);
            return Ok(updateCooperationApplicationResponse);
        }

        [Route("api/cooperation/delete")]
        [HttpPost]
        public virtual IHttpActionResult RemoveCooperationApplication([FromBody]RemoveCooperationApplicationRequest request)
        {
            var deleteCooperationApplicationResponse = new DeleteCooperationApplicationResponse();
            var applicationIdToDelete = request.Id;
            var isDeleted = applicationService.RemoveCooperationApplication(applicationIdToDelete);
            ResponseHelper.FillResponse(ref deleteCooperationApplicationResponse, isDeleted, null, null);
            return Ok(deleteCooperationApplicationResponse);
        }

        [Route("api/cooperations")]
        [HttpGet]
        public virtual IHttpActionResult GetCooperationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            var getCooperationApplicationsByPageAndCountResponse = new GetCooperationApplicationsByPageAndCountResponse();
            var applications = applicationService.GetCooperationApplications(page, count);
            var success = applications != null;
            ResponseHelper.FillResponse(ref getCooperationApplicationsByPageAndCountResponse, success, null, applications);
            return Ok(getCooperationApplicationsByPageAndCountResponse);
        }

        [Route("api/coops_not_filtered")]
        [HttpGet]
        public virtual IHttpActionResult GetNotFilteredCooperationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            var getCooperationApplicationsByPageAndCountResponse = new GetCooperationApplicationsByPageAndCountResponse();
            var applications = applicationService.GetNotFilteredCooperationApplications(page, count);
            var success = applications != null;
            ResponseHelper.FillResponse(ref getCooperationApplicationsByPageAndCountResponse, success, null, applications);
            return Ok(getCooperationApplicationsByPageAndCountResponse);
        }

        [Route("api/appworktype")]
        [HttpGet]
        public virtual IHttpActionResult GetApplicationWorkType()
        {
            var workTypes = applicationService.GetApplicationWorkTypes();
            return Ok(workTypes);

        }

        [Route("api/c_applications")]
        [HttpGet]
        public virtual IHttpActionResult GetApplications(string filter, int page, int count)
        {
            filter = WebUtility.UrlDecode(filter);
            var response = new GetCooperationApplicationsByPageAndCountResponse();
            var applications = new List<CooperationApplication>();
            var list = Parser.GetFilterList(filter);
            applications = applicationService.GetApplications(list, page, count);
            response.Success = true;
            response.Error = null;
            response.Result = applications;
            return Ok(response);
        }

        [Route("api/c_pictures")]
        [HttpGet]
        public virtual HttpResponseMessage GetPicture(long id)
        {
            var image = applicationService.GetPicture(id);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            if (image == null)
            {
                return response;
            }
            MemoryStream ms = new MemoryStream(image);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");
            return response;
        }
    }
}