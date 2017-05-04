using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UM_LOGISTIC_V1.Request.ApplicationTrash;
using UM_LOGISTIC_V1.Response;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.Controllers.ApplicationTrash
{
    public class ApplicationTrashController : ApiController
    {
        private ApplicationTrashService service = new ApplicationTrashService();

        [Route("api/trash/add")]
        [HttpPost]
        public IHttpActionResult AddApplicationTrash([FromBody] CreateApplicationTrashRequest request)
        {
            var response = new BaseResponse();
            response.Success = service.InsertTrashApplication(request.UserId, request.ApplicationId, request.Type);
            return Ok(response);
        }

    }
}