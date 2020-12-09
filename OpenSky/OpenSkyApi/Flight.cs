using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OpenSkyApi
{
    public class Flight
    {
        [Key]
        public string Icao24 { get; set; }
        public string CallSign { get; set; }
        public string OriginCountry { get; set; }
        public int? TimePosition { get; set; }
        public int LastContact { get; set; }
        public float? Longitude { get; set; }
        public float? Latitude { get; set; }
        public float? BaroAltitude { get; set; }
        public bool OnGround { get; set; }
        public float? Velocity { get; set; }
        public float? TrueTrack { get; set; }
        public float? VerticalRate { get; set; }

        public static Flight FromRawData(object[] data)
        {
            return new Flight
            {
                Icao24 = data[0]?.ToString(),
                CallSign = data[1]?.ToString(),
                OriginCountry = data[2]?.ToString(),
                TimePosition = data[3] != null ? int.Parse(data[3].ToString()) : null,
                LastContact = int.Parse(data[4].ToString()),
                Longitude = data[5] != null ? float.Parse(data[5].ToString()) : null,
                Latitude = data[6] != null ? float.Parse(data[6].ToString()) : null,
                BaroAltitude = data[7] != null ? float.Parse(data[7].ToString()) : null,
                OnGround = bool.Parse(data[8].ToString()),
                Velocity = data[9] != null ? float.Parse(data[9].ToString()) : null,
                TrueTrack = data[10] != null ? float.Parse(data[10].ToString()) : null,
                VerticalRate = data[11] != null ? float.Parse(data[11].ToString()) : null,
            };
        }
    }

    public class RawFlights
    {
        public int time { get; set; }
        public object[][] states { get; set; }
    }
}
