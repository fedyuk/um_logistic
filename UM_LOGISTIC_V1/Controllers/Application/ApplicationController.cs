using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.Application;
using UM_LOGISTIC_V1.Response.CooperationApplication;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.Application
{
    public class ApplicationController : ApiController
    {
        private ApplicationService service = new ApplicationService();
        [Route("api/application/accept")]
        [HttpPost]
        public IHttpActionResult AcceptApplication([FromBody]ApplicationAcceptRequest request)
        {
            var response = new CreateCooperationApplicationResponse();
            var applicationId = service.AcceptApplication(request.Type, request.Id);
            if (applicationId == 0L)
            {
                response.Success = false;
                response.Id = applicationId;
                return Ok(response);
            }
            response.Success = true;
            response.Id = applicationId;
            return Ok(response);
        }
    }
}