﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Request.Account
{
    public class RemoveAccountRequest : BaseRequest
    {
        public long Id { get; set; }
    }
}