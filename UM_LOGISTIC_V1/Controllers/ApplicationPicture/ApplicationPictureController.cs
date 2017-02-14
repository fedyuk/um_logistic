using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UM_LOGISTIC_V1.Services;
using UM_LOGISTIC_V1.Models.ApplicationPicture;

namespace UM_LOGISTIC_V1.Controllers.Account
{
    public class AccountController : ApiController
    {
        private ApplicationPictureService service = new ApplicationPictureService();

        [Route("api/picture")]
        [HttpGet]
        public IHttpActionResult GetPicture(long id, bool type)
        {
            var picture = service.GetPicture(id, type);
			return Ok(picture);
        }

        [Route("api/picture/load")]
        [HttpPost]
        public IHttpActionResult LoadPicture(byte[] image, long applicationId, bool type)
        {
            var isLoaded = service.LoadPicture(image, applicationId, type);
			return Ok(isLoaded);
        }

        [Route("api/picture/delete")]
        [HttpPost]
        public IHttpActionResult RemovePicture(long applicationId, bool type)
        {
            var isRemoved = service.RemovePicture(applicationId, type);
			return Ok(isRemoved);
        }
    }
}