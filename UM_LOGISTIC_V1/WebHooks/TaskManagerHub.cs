using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Services;

namespace UM_LOGISTIC_V1.WebHooks
{
    [HubName("taskManagerHub")]
    public class TaskManagerHub : Hub
    {
    }
}