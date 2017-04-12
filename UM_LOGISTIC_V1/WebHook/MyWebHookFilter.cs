using Microsoft.AspNet.WebHooks;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace UM_LOGISTIC_V1.WebHook
{
    public class MyWebHookFilter : IWebHookFilterProvider
    {
        private readonly Collection<WebHookFilter> filters = new Collection<WebHookFilter>
        {
            new WebHookFilter { Name = "changed_not_filtered_count", Description = "Not filtered applications count have been changed"}
        };

        public Task<Collection<WebHookFilter>> GetFiltersAsync()
        {
            return Task.FromResult(this.filters);
        }
    }
}