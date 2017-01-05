using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Models
{
    public class DataBaseContext : DbContext
    {
        public DbSet<User.User> Users { get; set; }
        public DbSet<Account.Account> Accounts { get; set; }
        public DbSet<Role.Role> Roles { get; set; }
        public DbSet<CooperationApplication.CooperationApplication> CooperationApplications { get; set; }
        public DbSet<CooperationApplication.ApplicationWorkType> ApplicationWorkTypes { get; set; }
        public DbSet<TransportationApplication.TransportationApplication> TransportationApplications { get; set; }
        public DbSet<TransportationApplication.ShipmentType> ShipmentTypes { get; set; }
    }
}