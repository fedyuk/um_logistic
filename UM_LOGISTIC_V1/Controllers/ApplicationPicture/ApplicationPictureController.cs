using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UM_LOGISTIC_V1.Services;
using UM_LOGISTIC_V1.Request.ApplicationPicture;
using UM_LOGISTIC_V1.Models.ApplicationPicture;
using UM_LOGISTIC_V1.Response.ApplicationPicture;

namespace UM_LOGISTIC_V1.Controllers.Account
{
    public class AccountController : ApiController
    {
        private ApplicationPictureService service = new ApplicationPictureService();

        [Route("api/picture")]
        [HttpGet]
        public IHttpActionResult GetPicture(long applicationId, bool type)
        {
			var response = new GetApplicationPictureResponse();
			if(applicationId == null)
			{
				response.Success = false;
				response.Error = "Picture was not found";
				return Ok(response);
			}
            var picture = service.GetPicture(applicationId, type);
			response.Success = true;
			response.Result = picture;
			return Ok(response);
        }

        [Route("api/picture/load")]
        [HttpPost]
        public IHttpActionResult LoadPicture([FromBody]LoadApplicationPictureRequest request)
        {
			var response = new LoadApplicationPictureResponse();
            var isLoaded = service.LoadPicture(image, applicationId, type);
			response.Success  = isLoaded;
			return Ok(response);
        }

        [Route("api/picture/delete")]
        [HttpGet]
        public IHttpActionResult RemovePicture(long applicationId, bool type)
        {
			var response = new DeleteApplicationPictureResponse();
			if(applicationId == null)
			{
				response.Success = false;
				response.Error = "Picture was not found";
				return Ok(response);
			}
            var isRemoved = service.RemovePicture(applicationId, type);
			response.Success = isRemoved;
			return Ok(response);
        }
    }
}