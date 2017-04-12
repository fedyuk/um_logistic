using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.WebHooks;
using System.Threading.Tasks;

namespace UM_LOGISTIC_V1.WebHook
{
    public class MyWebHookHandler : WebHookHandler
    {
        public override Task ExecuteAsync(string receiver, WebHookHandlerContext context)
        {
            return Task.FromResult(true);
        }
    }
}