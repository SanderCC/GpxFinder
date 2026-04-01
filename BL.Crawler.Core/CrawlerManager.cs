using BL.Core.Attributes;

namespace BL.Crawler.Core;

public interface ICrawlerManager
{
    Task RunAllCrawlersAsync(CancellationToken ct = default);
    Task RunCrawlerAsync(string source, CancellationToken ct = default);
}

[Service]
public class CrawlerManager(IEnumerable<ICrawler> crawlers) : ICrawlerManager
{
    public async Task RunAllCrawlersAsync(CancellationToken ct = default)
    {
        foreach (var crawler in crawlers)
        {
            await crawler.RunAsync(ct);
        }
    }

    public async Task RunCrawlerAsync(string source, CancellationToken ct = default)
    {
        var crawler = crawlers.FirstOrDefault(c => c.Source.Equals(source, StringComparison.OrdinalIgnoreCase));
        if (crawler != null)
        {
            await crawler.RunAsync(ct);
        }
        else
        {
            throw new ArgumentException($"Crawler for source '{source}' not found.", nameof(source));
        }
    }
}
