using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using UM_LOGISTIC_V1.ApiModels.Filter;
using UM_LOGISTIC_V1.Models.TransportationApplication;
using UM_LOGISTIC_V1.Request.TransportationApplication;
using UM_LOGISTIC_V1.Response.TransportationApplication;
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

        [Route("api/transportation/create")]
        [HttpPost]
        public IHttpActionResult CreateTransportationApplication([FromBody]CreateTransportationApplicationRequest request)
        {
            var createTransportationApplicationResponse = new CreateTransportationApplicationResponse();
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
                ShipmentWidth = request.ShipmentWidth,
                CreatedBy = request.CreatedBy
            };
            var id = applicationService.CreateTransportationApplication(applicationToCreate);
            if (id != null)
            {
                createTransportationApplicationResponse.Success = true;
                createTransportationApplicationResponse.Error = "";
                createTransportationApplicationResponse.Id = id;
                return Ok(createTransportationApplicationResponse);
            }
            else
            {
                createTransportationApplicationResponse.Success = false;
                createTransportationApplicationResponse.Error = "";
                createTransportationApplicationResponse.Id = null;
                return Ok(createTransportationApplicationResponse);
            }
        }

        [Route("api/transportation/update")]
        [HttpPost]
        public IHttpActionResult UpdateTransportationApplication([FromBody]UpdateTransportationApplicationRequest request)
        {
            var updateTransportationApplicationResponse = new UpdateTransportationApplicationResponse();
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

        [Route("api/transportation/delete")]
        [HttpPost]
        public IHttpActionResult RemoveTransportationApplication([FromBody]RemoveTransportationApplicationRequest request)
        {
            var deleteTransportationApplicationResponse = new DeleteTransportationApplicationResponse();
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

        [Route("api/transportations")]
        [HttpGet]
        public IHttpActionResult GetTransportationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            this.NotifyAsync("changed_not_filtered_count", new { P1 = "p1" });
            var getTransportationApplicationsByPageAndCountResponse = new GetTransportationApplicationsByPageAndCountResponse();
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

        [Route("api/trans_not_filtered")]
        [HttpGet]
        public IHttpActionResult GetNotFilteredTransportationApplicationsByPageAndCount(int page, int count, string token, string user)
        {
            var getTransportationApplicationsByPageAndCountResponse = new GetTransportationApplicationsByPageAndCountResponse();
            var applications = applicationService.GetNotFilteredTransportationApplications(page, count);
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

        [Route("api/t_applications")]
        [HttpGet]
        public IHttpActionResult GetApplications(string filter, int page, int count)
        {
            filter = WebUtility.UrlDecode(filter);
            var response = new GetTransportationApplicationsByPageAndCountResponse();
            var applications = new List<TransportationApplication>();
            if (filter == String.Empty)
            {
                response.Success = false;
                response.Error = "The filter is empty";
                response.Result = applications;
                return Ok(response);
            }
            var list = Parser.GetFilterList(filter);
            applications = applicationService.GetApplications(list, page, count);
            response.Success = true;
            response.Error = null;
            response.Result = applications;
            return Ok(response);
        }
    }
}