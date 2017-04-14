using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.ClientTask;
using UM_LOGISTIC_V1.Response;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.ClientTask
{
    public class ClientTaskController : ApiController
    {
        private ClientTaskService service = new ClientTaskService();

        [Route("api/tasks/call_feedback")]
        [HttpPost]
        public IHttpActionResult CreateCallFeedback([FromBody]CallFeedbackRequest request)
        {
            var response = new BaseResponse();
            var isCreated = service.CreateCallFeedback(request);
            response.Success = isCreated;
            return Ok(response);
        }
    }
}