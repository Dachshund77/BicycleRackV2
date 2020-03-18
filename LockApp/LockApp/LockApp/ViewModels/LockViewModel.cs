using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using LockApp.Views;
using Xamarin.Forms;
using Xamarin.Forms.Maps;

namespace LockApp.ViewModels
{
    class LockViewModel : BaseViewModel
    {
        bool isBusy = false;
       

        public ICommand LockCommand => new Command(async () => {
            if (isBusy)
                return;
            isBusy = true;

            // TODO insert code for Locking 

            // register place where ít is locked. 

            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 1;
            var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));

            var latitude = position.Latitude;
            var longitude = position.Longitude;

            var pin = new Pin()
            {
                Position = new Position(54, 10),
                Label = "Locked Bike"
            };
            // doesnt work it doesnt add pin to the map
            //(Application.Current as App).GeneralMap.Pins.Add(pin);
            //map.Pins.Add(pin);
            (Application.Current as App).MyPins.Add(pin);

            isBusy = false;
        });

        
       
    }
}
