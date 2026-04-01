using System.Runtime.CompilerServices;
using BL.Core.Attributes;
using BL.Crawler.Core;
using Domain.App;
using Domain.App.Enums;
using HtmlAgilityPack;

namespace BL.Crawler.EuroVeloBelgiumCrawler;

[Crawler]
public class EuroVeloBelgiumCrawler(HttpClient httpClient) : ITrailCrawler
{
    private const string BaseUrl = "https://eurovelobelgium.be";
    public string Source => "eurovelobelgium.be";

    public async Task RunAsync(CancellationToken ct = default)
    {
        await foreach (var trail in CrawlTrailsAsync(ct))
        {
            Console.WriteLine($"Crawled trail: {trail.Name} from {Source} - URL: {trail.SourceUrl}");
        }
    }

    public async IAsyncEnumerable<Trail> CrawlTrailsAsync([EnumeratorCancellation] CancellationToken ct = default)
    {
        var response = await httpClient.GetStringAsync($"{BaseUrl}/routes", ct);
        var doc = new HtmlDocument();
        doc.LoadHtml(response);

        // This is a typical structure for a list of routes on such sites
        // Usually links like <a href="/routes/ev5">...</a>
        var routeNodes = doc.DocumentNode.SelectNodes("//a[contains(@href, '/routes/')]");

        if (routeNodes == null) yield break;

        var processedUrls = new HashSet<string>();

        foreach (var node in routeNodes)
        {
            var href = node.GetAttributeValue("href", "");
            if (string.IsNullOrEmpty(href)) continue;

            var fullUrl = href.StartsWith("http") ? href : $"{BaseUrl}{href}";
            if (!processedUrls.Add(fullUrl)) continue;

            // Simple check to avoid non-route links if any
            if (fullUrl == $"{BaseUrl}/routes") continue;

            Trail? trail = null;
            try
            {
                trail = await CrawlRouteDetailsAsync(fullUrl, ct);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error crawling {fullUrl}: {ex.Message}");
            }

            if (trail != null)
            {
                yield return trail;
            }
        }
    }

    private async Task<Trail?> CrawlRouteDetailsAsync(string url, CancellationToken ct)
    {
        var response = await httpClient.GetStringAsync(url, ct);
        var doc = new HtmlDocument();
        doc.LoadHtml(response);

        var name = doc.DocumentNode.SelectSingleNode("//h1")?.InnerText.Trim() 
                  ?? doc.DocumentNode.SelectSingleNode("//title")?.InnerText.Trim() 
                  ?? "Unknown Route";

        var description = doc.DocumentNode.SelectSingleNode("//div[contains(@class, 'content')]//p")?.InnerText.Trim()
                         ?? doc.DocumentNode.SelectSingleNode("//meta[@name='description']")?.GetAttributeValue("content", "");

        // Find GPX link
        var gpxLink = doc.DocumentNode.SelectSingleNode("//a[contains(@href, '.gpx')]")?.GetAttributeValue("href", "");
        if (string.IsNullOrEmpty(gpxLink)) return null; // We only care about trails with GPX

        if (!gpxLink.StartsWith("http"))
        {
            gpxLink = $"{BaseUrl}{gpxLink}";
        }

        return new Trail
        {
            Name = name,
            Description = description,
            TrailType = TrailType.Cycling,
            SurfaceType = SurfaceType.Paved, // Defaulting to paved for EuroVelo
            DifficultyLevel = DifficultyLevel.Beginner,
            DistanceKm = 0, // Would need more specific parsing for these
            ElevationGainMeters = 0,
            EstimatedDurationMinutes = 0,
            IsDogFriendly = true,
            GpxFileUrl = gpxLink,
            SourceType = SourceType.Crawled,
            SourceName = "EuroVelo Belgium",
            SourceUrl = url,
            Country = "Belgium",
            Status = TrailStatus.Active,
            UpdatedAt = DateTimeOffset.UtcNow
        };
    }
}
