using System;
using System.Collections.Generic;
using System.Text;

namespace LockApp.Services
{
    public interface ISettingsService
    {
        string AuthAccessToken { get; set; }
        string AuthIdToken { get; set; }
    }
}
