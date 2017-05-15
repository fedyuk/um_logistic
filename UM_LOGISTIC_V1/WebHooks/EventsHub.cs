using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace UM_LOGISTIC_V1.WebHooks
{
    [HubName("eventsHub")]
    public class EventsHub : Hub
    {
    }
}