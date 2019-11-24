using System;
using System.Collections.Generic;

namespace Advantage.API
{
    public class Helpers
    {
        private static Random _rand = new Random();
        private static string GetRandom(IList<string> items)
        {
            return items[_rand.Next(items.Count)];
        }
        //
        internal static string MakeUniqueCustomerName(List<string> names)
        {
            var maxNames = bizPrefix.Count + bizSuffix.Count;

            if(names.Count >= maxNames)
            {
                throw new System.InvalidOperationException("max num of unique names exceeded");
            }
            var prefix = GetRandom(bizPrefix);
            var suffix = GetRandom(bizSuffix);
            var bizName = prefix + suffix;
            if(names.Contains(bizName))
            {
                MakeUniqueCustomerName(names);
            }
            return bizName;
        }

        private static readonly List<string> bizPrefix = new List<string>()
        {
            "ABC",
            "XYZ",
            "FAY",
            "FAAG",
            "RADY",
            "JAB",
            "BRONY",
            "MOPNGO",
            "WAGA",
            "BAKA",
            "FAMAS",
            "COMFORT"
        };
        private static readonly List<string> bizSuffix = new List<string>()
        {
            "Co",
            "Corp",
            "Holdings",
            "Corporation",
            "Movers",
            "Cleaners",
            "Bakery",
            "Apparel",
            "Rentals",
            "Storage",
            "Transit",
            "Logistics"
        };

        internal static string MakeCustomerEmail(string CustomerName)
        {
            return $"contact@{CustomerName.ToLower()}.com";
        }
        
        internal static string GetRandomState()
        {
            return GetRandom(usStates);
        }
        internal static decimal GetRandomOrderTotal()
        {
            return _rand.Next(100, 5000);
        }

        internal static DateTime GetRandomOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-50);

            TimeSpan possibleSpan = end - start;
            TimeSpan newSpan = new TimeSpan( 0, _rand.Next(0, (int)possibleSpan.TotalMinutes),0);

            return start + newSpan;
        }

        internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
        {
            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(7);
            var timePassed = now - orderPlaced;

            if(timePassed < minLeadTime)
            {
                return null;
            }
            return orderPlaced.AddDays(_rand.Next(7,14));
        }        
        private static readonly List<string> usStates = new List<string>()
        {
            "AS", "QW", "QY", "YT", "AD", "GG", "HT", "WE", "WE", 
            "FL", "AS"
        };

        
    }
}