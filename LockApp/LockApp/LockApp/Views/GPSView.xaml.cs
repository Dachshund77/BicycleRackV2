﻿using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Maps;
using Xamarin.Forms.Xaml;

namespace LockApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class GPSView : ContentPage
    {
        public GPSView()
        {
            InitializeComponent();
            
            GetCurrentLocation();

            //MyMap = (Application.Current as App).GeneralMap;

           

            foreach (var newPin in (Application.Current as App).MyPins)
            {
                MyMap.Pins.Add(newPin);
            }

        }       

        private async void GetCurrentLocation()
        {
            
            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 1;
            var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));
            MyMap.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude),
                                                         Distance.FromKilometers(0.2)));
            var pin = new Pin()
            {
                Position = new Position(position.Latitude, position.Longitude),
                Label = "Current Location"
            };

            MyMap.Pins.Add(pin);
        }
    }
}