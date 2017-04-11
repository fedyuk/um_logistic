using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.CooperationApplication;
using UM_LOGISTIC_V1.Models.TransportationApplication;

namespace UM_LOGISTIC_V1.ApiModels.Filter
{
    public static class DBColumns
    {
        public static List<DBTypeRelation> transportationAplicationcolumns = new List<DBTypeRelation>();
        public static List<DBTypeRelation> cooperationAplicationcolumns = new List<DBTypeRelation>();

        static DBColumns()
        {
            var transportationApplication = new TransportationApplication();
            var properties = transportationApplication.GetType().GetProperties();
            foreach(var property in properties)
            {
                transportationAplicationcolumns.Add(new DBTypeRelation()
                {
                    column = property.Name,
                    type = property.PropertyType
                });
            }

            var cooperationApplication = new CooperationApplication();
            properties = cooperationApplication.GetType().GetProperties();
            foreach (var property in properties)
            {
                cooperationAplicationcolumns.Add(new DBTypeRelation()
                {
                    column = property.Name,
                    type = property.PropertyType
                });
            }
        }
    }

    public class DBTypeRelation
    {
        public string column { get; set; }
        public Type type { get; set; }
    }
}