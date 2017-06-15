using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.ClientTask;

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
                Number = 0,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
            roles.Add(new Role.Role()
            {
                Id = 2,
                Name = "manager",
                Number = 1,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
            roles.Add(new Role.Role()
            {
                Id = 3,
                Name = "client",
                Number = 2,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
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
            account.CreatedOn = DateTime.Now;
            account.ModifiedOn = account.CreatedOn;
            context.Accounts.Add(account);
            context.SaveChanges();

            IList<User.User> users = new List<User.User>();

            users.Add(new User.User()
            {
                UserName = "Supervisor",
                UserPassword = "Supervisor",
                AccountId = 1,
                RoleId = 1,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });

            foreach (User.User user in users)
                context.Users.Add(user);

            IList<CooperationApplication.ApplicationWorkType> applicationWorkTypes = new List<CooperationApplication.ApplicationWorkType>();

            applicationWorkTypes.Add(new CooperationApplication.ApplicationWorkType()
            {
                Id = 1,
                Name = "грн/год",
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
            applicationWorkTypes.Add(new CooperationApplication.ApplicationWorkType()
            {
                Id = 2,
                Name = "один підйом",
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });

            foreach (CooperationApplication.ApplicationWorkType applicationWorkType in applicationWorkTypes)
                context.ApplicationWorkTypes.Add(applicationWorkType);

            IList<ClientTaskType> taskTypes = new List<ClientTaskType>();

            taskTypes.Add(new ClientTaskType()
            {
                Id = 1,
                Name = "Дзвінок",
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
			
			taskTypes.Add(new ClientTaskType()
            {
                Id = 2,
                Name = "Заявка на перевезення",
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
			
			taskTypes.Add(new ClientTaskType()
            {
                Id = 3,
                Name = "Заявка на співробітництво",
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            });
			
            foreach (var taskType in taskTypes)
                context.ClientTaskTypes.Add(taskType);

            var image = new UM_LOGISTIC_V1.Models.Image.Image();
            image.Data = "data:image/png;base64,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";
            image.Key = "empty_customer";
            image.CreatedOn = DateTime.Now;
            image.ModifiedOn = DateTime.Now;
            image.CreatedBy = 1;
            context.Images.Add(image);
            context.SaveChanges();

            base.Seed(context);
        }
    }
}