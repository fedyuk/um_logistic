using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using UM_LOGISTIC_V1.Models;

namespace UM_LOGISTIC_V1.Services
{
    public static class Images
    {
        private static DataBaseContext db = new DataBaseContext();
        public static string GetDefaultImage(string key)
        {
            var image = db.Images.Where(x => x.Key == key).Select(x => x.Data).FirstOrDefault();

            if (String.IsNullOrEmpty(image))
            {
                return null;
            }
            var base64Data = Regex.Match(image, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            return base64Data;
        }
    }
}