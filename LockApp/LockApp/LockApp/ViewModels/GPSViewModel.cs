using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms.Maps;
using Xamarin.Forms;
using Plugin.Geolocator;
using LockApp.Views;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Collections.ObjectModel;

namespace LockApp.ViewModels
{
    class GPSViewModel : BaseViewModel
    {
        public LockViewModel LockViewModel { get; set; }

        public ObservableCollection<Pin> pins { get; set; }


    }
}
