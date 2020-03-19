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

             
            // gets current location 
            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 1;
            var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));

            var latitude = position.Latitude;
            var longitude = position.Longitude;

            var pin = new Pin()
            {   
                /* 54,10 is hust to show another place than you current location, but 54 is going to be
                 replced with latitude and 10 with logitude*/ 
          
                Position = new Position(54, 10),
                Label  = "Locked Bike"
                
            };
           // adds pin to app shared observable list
            (Application.Current as App).MyPins.Add(pin);
            
            isBusy = false;
        });

        
       
    }
}
