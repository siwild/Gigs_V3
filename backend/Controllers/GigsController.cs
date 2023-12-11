using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;



namespace GigsApi.Controllers
{
    [ApiController]
    [Route("api/gigs")]
    public class GigsController : ControllerBase
    {
        private readonly List<Gig> gigs = new List<Gig>
        {
            new Gig(1, "Rock & Roll", "Liam Gallagher", "01-06-2024", "Sheffield", "Sheffield - Utilita Arena", "£79.90", "LG.jpg"),
            new Gig(2, "Indie", "Kasabian", "05-02-2024", "Sheffield", "Sheffield - O2 Academy", "£49.50", "Kasabian.jpg"),
            new Gig(3, "Pop", "Paloma Faith", "10-09-2024", "Sheffield", "Sheffield - The Leadmill", "£42.25", "PalomaFaith.jpg"),
            new Gig(4, "Rock & Roll", "The Bootleg Beatles", "12-05-2024", "Sheffield", "Sheffield - The Leadmill", "£39.99", "BootlegBeatles.jpg"),
            new Gig(5, "Electronic", "The Prodigy", "18-08-2024", "Manchester", "Manchester - AO Arena", "£65.00", "Prodigy.jpg"),
            new Gig(6, "Indie", "The Stone Roses", "21-07-2024", "Manchester", "Manchester - Etihad Stadium", "£80.00", "StoneRoses.jpg"),
            new Gig(7, "Electronic", "Leftfield", "20-08-2024", "Manchester", "Manchester - AO Arena", "£35.20", "Leftfield.jpg"),
            new Gig(8, "Electronic", "The Chemical Brothers", "31-07-2024", "Manchester", "Manchester - Etihad Stadium", "£79.90", "ChemicalBrothers.jpg"),
            new Gig(9, "Hip Hop", "Snoop Dogg", "01-05-2024", "London", "London - The O2", "£84.99", "Snoop.jpg"),
            new Gig(10, "Rock & Roll", "The Rolling Stones", "10-02-2024", "London", "London - The O2", "£89.90", "RollingStones.jpg"),
            new Gig(11, "R&B", "Beyonce", "28-04-2024", "London", "London - The O2", "£120.00", "Beyonce.jpg"),
            new Gig(12, "Pop", "Take That", "11-08-2024", "Edinburgh", "Edinburgh - O2 Academy", "£52.60", "TakeThat.jpg"),
            new Gig(13, "Electronic", "Fatboy Slim", "02-10-2024", "Edinburgh", "Edinburgh - O2 Academy", "£44.99", "FatboySlim.jpg"),
            new Gig(14, "Hip Hop", "Stormzy", "02-12-2024", "Edinburgh", "Edinburgh - O2 Academy", "£79.99", "Stormzy.jpg")
        };

        [HttpGet]
        public IActionResult GetGigs()
        {
            return Ok(gigs);
        }
    }

    record Gig(
        int Id,
        string Genre,
        string Artist,
        string Date,
        string Location,
        string Venue,
        string Price,
        string ImageFileName
    );
}