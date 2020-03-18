using System;
using System.Collections.Generic;
using System.Text;

namespace XaLockApp.Models
{
   public class Customer
    {
        public Customer(string name, string email, string address, string zipcode, string phoneNumber, string password)
        {
            FullName = name;
            Email = email;
            Zipcode = zipcode;
            Address = address;
            PhoneNumber = phoneNumber;
            Password = password;
        }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string Zipcode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }
}
