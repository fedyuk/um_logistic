﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace UM_LOGISTIC_V1.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/Client/Template").Include(
                "~/Client/Templates/TemplateModule.js",
                "~/Client/Templates/TemplateService.js",
                "~/Client/Templates/TemplateController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Modules").Include(
                "~/Client/Modules/MainModule.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Services").Include(
                "~/Client/Services/Login/LoginService.js",
                "~/Client/Services/User/UserService.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Controllers").Include(
                "~/Client/Controllers/User/UserController.js"));
        }
    }
}