using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using LockApp.Models;
using LockApp.ViewModels;
using System.Reflection;

namespace LockApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MasterDetail : MasterDetailPage
    {
		public MasterDetail ()
		{
			InitializeComponent ();
            profileImage.Source = ImageSource.FromFile("padLock.png");

            navigationList.ItemsSource = GetMenuList();

            IsPresented = false;
        }

        public List<MasterMenuItems> GetMenuList()
        {
            var list = new List<MasterMenuItems>();

            // Add all the views to the navigation list
            list.Add(new MasterMenuItems()
            {
                Text = "Lock Page",
                Detail = "Try it out",
                ImagePath = "padLock.png",
                TargetViewModel = typeof(LockViewModel)
            });
            list.Add(new MasterMenuItems()
            {
                Text = "GPS Page",
                Detail = "Try it out",
                ImagePath = "kompas.png",
                TargetViewModel = typeof(GPSViewModel)
            });

            return list;
        }

        private void OnMenuItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            var selectedMenuItem = (MasterMenuItems)e.SelectedItem;

            var viewModel = (ViewModels.MasterDetailViewModel)this.BindingContext;
            viewModel.ChangeVMCMD.Execute(selectedMenuItem);

            IsPresented = false;
        }
    }
}