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
                "~/Client/Modules/LightBoxModule.js",
                "~/Client/Modules/MainModule.js",
                "~/Client/Constants/ModuleConstants.js",
                "~/Client/Directives/ConfirmClick.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Services").Include(
                "~/Client/Services/Login/LoginService.js",
				"~/Client/Services/Account/AccountService.js",
				"~/Client/Services/Cooperation/CooperationService.js",
				"~/Client/Services/Session/SessionService.js",
				"~/Client/Services/Transportation/TransportationService.js",
                "~/Client/Services/User/UserService.js",
				"~/Client/Services/ApplicationPicture/ApplicationPictureService.js",
                "~/Client/Services/Notification/NotificationService.js",
                "~/Client/Services/image-loader-service.js",
                "~/Client/Services/lightbox-service.js",
                "~/Client/Services/lightbox-src-directive.js",
                "~/Client/Services/Form/FormHelper.js",
                "~/Client/Services/Filter/FilterService.js",
                "~/Client/Services/ClientTask/ClientTaskService.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Controllers").Include(
				"~/Client/Controllers/Profile/ProfileController.js",
				"~/Client/Controllers/Login/LoginController.js",
                "~/Client/Controllers/User/UserController.js",
				"~/Client/Controllers/Home/HomeController.js",
                "~/Client/Controllers/Cooperation/CooperationController.js",
                "~/Client/Controllers/Cooperation/CooperationApplicationController.js",
				"~/Client/Controllers/Transportation/TransportationController.js",
                "~/Client/Controllers/Transportation/TransportationApplicationController.js",
                "~/Client/Controllers/Transportation/TransportationApplicationDetailController.js",
                "~/Client/Controllers/Cooperation/CooperationApplicationDetailController.js",
                "~/Client/Controllers/RegistrationAccount/RegisterAccountController.js",
                "~/Client/Controllers/NotFilteredApplications/NotFilteredApplicationsController.js",
                "~/Client/Controllers/User/CreateUserController.js",
                "~/Client/Controllers/ClientTask/CallFeedbackController.js",
                "~/Client/Controllers/ClientTask/TasksController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Client/Libraries").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-cookies.min.js",
                "~/Scripts/angular-ui-router.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-messages.min.js",
                "~/Scripts/jquery-1.10.2.min.js",
                "~/Scripts/notify.min.js",
                "~/Scripts/angular-bootstrap-lightbox.min.js"));

            bundles.Add(new StyleBundle("~/bundles/Styles").Include(
                "~/Style/bootswatch/bootstrap.css",
                "~/Style/bootswatch/bootstrap.css",
                "~/Style/angular-bootstrap-lightbox.min.css",
                "~/Style/my-style.css",
                "~/Style/font-awesome-4.7.0/css/font-awesome.min.css"));
        }
    }
}