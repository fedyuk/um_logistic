using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Services
{
    public static class TextConstants
    {
        public static string TokenNotValid = "Token is not valid";
        public static string AccessDenied = "Access is denied";
        public static string LoginAlreadyExists = "Такий логін вже існує в базі";
        public static string TrasnportationGetPicturesUrl = "/api/t_pictures?id=";
        public static string CooperationGetPicturesUrl = "/api/c_pictures?id=";
        public static string ApiEmptyFilter = "The filter is empty";
        public static string InvalidLoginOrPassword = "Неправильний логін або(і) пароль";
        public static string TransportationApplicationAccepted = "Оформлено заявку на перевезення";
        public static string CooperationApplicationAccepted = "Оформлено заявку на співробітництво";
    }
}