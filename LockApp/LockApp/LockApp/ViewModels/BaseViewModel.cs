using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LockApp.Services;
using Xamarin.Forms.Maps;

namespace LockApp.ViewModels
{
    public abstract class BaseViewModel : ExtendedBindableObject
    {
        protected readonly INavigationService NavigationService;

        protected readonly Map GeneralMap;

        internal static string UserName = "";
        // prøv at indsætte protected Map her og brug det i gps og lock views


        public BaseViewModel()
        {
            NavigationService = ViewModelLocator.Resolve<INavigationService>();
            var settingsService = ViewModelLocator.Resolve<ISettingsService>();


        }
        public virtual Task InitializeAsync(object navigationData)
        {
            return Task.FromResult(false);
        }
    }
}
