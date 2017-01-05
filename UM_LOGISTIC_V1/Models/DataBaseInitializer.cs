﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Models
{
    public class DataBaseInitializer<T> : DropCreateDatabaseIfModelChanges<DataBaseContext>
    {
        protected override void Seed(DataBaseContext context)
        {
            IList<Role.Role> roles = new List<Role.Role>();

            roles.Add(new Role.Role()
            {
                Id = 1,
                Name = "admin",
                Number = 0
            });
            roles.Add(new Role.Role()
            {
                Id = 2,
                Name = "manager",
                Number = 1
            });
            roles.Add(new Role.Role()
            {
                Id = 3,
                Name = "client",
                Number = 2
            });
            foreach (Role.Role role in roles)
                context.Roles.Add(role);

            var account = new UM_LOGISTIC_V1.Models.Account.Account();
            account.FullName = "Федюк Сергій Миколайович";
            account.WorkPhone = "0984294989";
            account.Country = "УКРАЇНА";
            account.Region = "Львівська область";
            account.City = "Львів";
            account.Street = "вул. Польова 29/a";
            account.Id = 1;
            context.Accounts.Add(account);
            context.SaveChanges();

            IList<User.User> users = new List<User.User>();

            users.Add(new User.User()
            {
                UserName = "Supervisor",
                UserPassword = "Supervisor",
                AccountId = 1,
                RoleId = 1
            });

            foreach (User.User user in users)
                context.Users.Add(user);

            IList<CooperationApplication.ApplicationWorkType> applicationWorkTypes = new List<CooperationApplication.ApplicationWorkType>();

            applicationWorkTypes.Add(new CooperationApplication.ApplicationWorkType()
            {
                Id = 1,
                Name = "грн/год"
            });
            applicationWorkTypes.Add(new CooperationApplication.ApplicationWorkType()
            {
                Id = 2,
                Name = "один підйом"
            });

            foreach (CooperationApplication.ApplicationWorkType applicationWorkType in applicationWorkTypes)
                context.ApplicationWorkTypes.Add(applicationWorkType);

            base.Seed(context);
        }
    }
}