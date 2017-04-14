using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.ClientTask;
using UM_LOGISTIC_V1.Response;
using UM_LOGISTIC_V1.Response.ClientTask;
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

        [Route("api/tasks")]
        [HttpGet]
        public IHttpActionResult GetClientTasksByPageAndCount(int page, int count)
        {
            var response = new GetClientTasksResponse();
            response.Success = true;
            response.Result = service.GetClientTasks(page, count);
            return Ok(response);
        }

        [Route("api/tasks/count")]
        [HttpGet]
        public IHttpActionResult GetClientTasksCount()
        {
            var response = new GetClientTasksCountResponse();
            response.Success = true;
            response.Result = service.GetClientTasksCount();
            return Ok(response);
        }
        [Route("api/tasks/accept")]
        [HttpPost]
        public IHttpActionResult AcceptTask([FromBody] AcceptTaskRequest request)
        {
            var response = new BaseResponse();
            response.Success = service.AcceptTask(request.Id);
            return Ok(response);
        }

    }
}