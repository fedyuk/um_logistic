using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.User;

namespace UM_LOGISTIC_V1.Services
{
    public class UserService
    {
        private DataBaseContext db = new DataBaseContext();

        public User AuthenticateUser(User user)
        {
            var authenticatedUser = db.Users.Where(u => u.UserName.Equals(user.UserName)
                && u.UserPassword.Equals(user.UserPassword));
            return authenticatedUser.FirstOrDefault();
        }

        public User GetUser(long id)
        {
            var user = db.Users.Find(id);
            return user;
        }
        
        public bool CreateUser(User user)
        {
            if (user != null)
            {
                user.CreatedOn = DateTime.Now;
                user.ModifiedOn = user.CreatedOn;
                db.Users.Add(user);
                try
                {
                    db.SaveChanges();
                }
                catch(Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public bool UpdateUser(User user)
        {
            var userToUpdate = db.Users.Find(user.Id); 
            if (userToUpdate != null)
            {
                userToUpdate.UserName = user.UserName;
                userToUpdate.UserPassword = user.UserPassword;
                userToUpdate.AccountId = user.AccountId;
                userToUpdate.RoleId = user.RoleId;
                userToUpdate.ModifiedOn = DateTime.Now;
                db.Entry(userToUpdate).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch(Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public bool RemoveUser(long id)
        {
            var userToDelete = db.Users.Find(id);
            if (userToDelete != null)
            {
                db.Users.Remove(userToDelete);
                try
                {
                    db.SaveChanges();
                }
                catch(Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public List<User> GetUsers(int page, int count)
        {
            var users = from u in db.Users
                        orderby u.Id ascending
                        select u;
            if(users == null)
            {
                return null;
            }
            var limitedUsers = users.Skip(count * page).Take(count).ToList();
            return limitedUsers;
        }

        public bool ConnectUser(string nick, string connectionId)
        {
            var user = db.Users.Where(u => u.UserName == nick).FirstOrDefault();
            if(user != null)
            {
                user.Connected = true;
                user.ConnectionId = connectionId;
                db.Entry(user).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
            return false;
        }

        public bool DisconnectUser(string nick)
        {
            var user = db.Users.Where(u => u.UserName == nick).FirstOrDefault();
            if (user != null)
            {
                user.Connected = false;
                user.ConnectionId = String.Empty;
                db.Entry(user).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
            return false;
        }

        public List<string> GetAdminConnectionIds()
        {
            var admins = db.Users.Where(u => u.RoleId == 1).Select(u => u.ConnectionId).ToList<string>();
            return admins;
        }

        public User GetUserInfo(long id)
        {
            var user = db.Users.Find(id);
            return user;
        }

        public string GetPicture(long id)
        {
            var image = db.UserPictures.Where(x => x.UserId == id).Select(x => x.Image).FirstOrDefault();
            if (String.IsNullOrEmpty(image))
            {
                return null;
            }
            var base64Data = Regex.Match(image, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            return base64Data;
        }

        public bool UpdateUserInfo(User user)
        {
            var userToUpdate = db.Users.Find(user.Id);
            if (userToUpdate != null)
            {
                userToUpdate.UserName = user.UserName;
                userToUpdate.UserPassword = user.UserPassword;
                userToUpdate.Account.FullName = user.Account.FullName;
                userToUpdate.Account.HomePhone = user.Account.HomePhone;
                userToUpdate.Account.WorkPhone = user.Account.WorkPhone;
                userToUpdate.Account.Country = user.Account.Country;
                userToUpdate.Account.Region = user.Account.Region;
                userToUpdate.Account.City = user.Account.City;
                userToUpdate.Account.Street = user.Account.Street;
                db.Entry(userToUpdate).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }
    }
}
