using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Threading.Tasks;
using LockApp.ViewModels;
using LockApp.Services;
using Xamarin.Forms.Maps;
using System.Collections.ObjectModel;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace LockApp
{


    public partial class App : Application
    {
        ISettingsService _settingsService;
        public Map GeneralMap;
        public ObservableCollection<Pin> MyPins = new ObservableCollection<Pin>(); 
        public App()
        {
            InitializeComponent();

            

            ServiceContainer.Register<ISettingsService>(() => new SettingsService());
            _settingsService = ServiceContainer.Resolve<ISettingsService>();
            ServiceContainer.Register<INavigationService>(() => new NavigationService(_settingsService));
            // add all your Viewmodel that are going to be used

            ServiceContainer.Register<LoginViewModel>(() => new LoginViewModel());
            ServiceContainer.Register<LockViewModel>(() => new LockViewModel());
            ServiceContainer.Register<GPSViewModel>(() => new GPSViewModel());
            ServiceContainer.Register<RegistrationViewModel>(() => new RegistrationViewModel());

            var masterDetailViewModel = new MasterDetailViewModel();
            ServiceContainer.Register<MasterDetailViewModel>(() => masterDetailViewModel);

            //MainPage = new MainPage();
            var master = new Views.MasterDetail();
            MainPage = master;
            master.BindingContext = masterDetailViewModel;

           
        }

        private Task InitNavigation()
        {
            var navigationService = ServiceContainer.Resolve<INavigationService>();
            return navigationService.InitializeAsync();
        }

        protected async override void OnStart()
        {
            // Handle when your app starts
            base.OnStart();
            await InitNavigation();
            base.OnResume();
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}

