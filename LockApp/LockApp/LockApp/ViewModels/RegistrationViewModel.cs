using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using XaLockApp.Models;
using Xamarin.Forms;

namespace XaLockApp.ViewModels
{
    class RegistrationViewModel : BaseViewModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Zipcode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }

        bool isBusy = false;
        public ICommand GoBack => new Command(async () => {
            if (isBusy)
                return;
            isBusy = true;

            // navigate back to login page
            await NavigationService.NavigateToAsync<LoginViewModel>();
            

            isBusy = false;
        });

        public ICommand Register => new Command(async () => {
            if (isBusy)
                return;
            isBusy = true;

            // after registration it will take you back to login page
            
            await NavigationService.NavigateToAsync<LoginViewModel>();

            //Customer cus = new Customer() { FullName = FullName };

            isBusy = false;
        });

        
    }
}
