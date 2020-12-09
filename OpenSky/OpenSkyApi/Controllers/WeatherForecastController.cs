using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace OpenSkyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> logger;
        private readonly FlightDbContext dbContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, FlightDbContext dbContext)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Flight>> Get()
        {
            HttpClient client = new HttpClient();
            var responseStream = await client.GetStringAsync("https://opensky-network.org/api/states/all");
            var rawFlights = JsonSerializer.Deserialize<RawFlights>(responseStream);

            var currentFlights = rawFlights.states
                .Where(data => (data?.Length ?? 0) >= 12)
                .Select(raw => Flight.FromRawData(raw))
                .ToDictionary(f => f.Icao24);

            var dbFlights = await dbContext.Flights.ToListAsync();
            var dbFlightsIds = dbFlights.Select(f => f.Icao24).ToHashSet();

            var dbExistingFlights = dbFlights.Where(f => currentFlights.ContainsKey(f.Icao24) && f.LastContact < currentFlights[f.Icao24].LastContact);
            foreach (var flight in dbExistingFlights)
            {
                var currFlight = currentFlights[flight.Icao24];
                flight.BaroAltitude = currFlight.BaroAltitude;
                flight.CallSign = currFlight.CallSign;
                flight.LastContact = currFlight.LastContact;
                flight.Latitude = currFlight.Latitude;
                flight.Longitude = currFlight.Longitude;
                flight.OnGround = currFlight.OnGround;
                flight.OriginCountry = currFlight.OriginCountry;
                flight.TimePosition = currFlight.TimePosition;
                flight.TrueTrack = currFlight.TrueTrack;
                flight.Velocity = currFlight.Velocity;
                flight.VerticalRate = currFlight.VerticalRate;
            }

            var dbNewFlights = currentFlights.Where(f => !dbFlightsIds.Contains(f.Key));
            dbContext.Flights.AddRange(dbNewFlights.Select(f => f.Value));

            await dbContext.SaveChangesAsync();

            return dbContext.Flights.Take(10);
        }
    }
}
